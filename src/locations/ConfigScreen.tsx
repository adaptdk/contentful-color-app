import { ConfigAppSDK } from '@contentful/app-sdk';
import { Box, Button, Flex, Form, Heading, Notification, Paragraph, Switch, Tabs } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { css } from 'emotion';
import { useCallback, useEffect, useState } from 'react';
import { ConfigColorBar } from '../components/ConfigColorBar';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export type TypeDefinedColor = {
  id: number;
  label: string;
  hexColor: string;
}

export interface AppInstallationParameters {
  definedColors: Array<TypeDefinedColor>
}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({ definedColors: [] });
const [colors, setColors] = useState(parameters?.definedColors || [])

  const sdk = useSDK<ConfigAppSDK>();

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    const formattedColors = colors.map(({ hexColor, label, ...color }) => {
      return { ...color, hexColor: hexColor.toLowerCase(), label: label.trim() }
    })

    const params = { ...parameters, definedColors: formattedColors }

    return {
      // Parameters to be persisted as the app configuration.
      parameters: params,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk, colors]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
        setColors(currentParameters.definedColors)
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  const onChange = ({ id, label, hexColor, remove }: TypeDefinedColor & { remove?: boolean }) => {
    const updatedColors = [...colors];
    const indexOfItem = updatedColors.findIndex((color) => color.id === id);

    if (indexOfItem >= 0) {
      if (remove) {
        updatedColors.splice(indexOfItem, 1);
        setColors(updatedColors);
        return;
      }

      if (hexColor || hexColor === '') {
        updatedColors[indexOfItem].hexColor = hexColor;
      }

      if (label || label === '') {
        updatedColors[indexOfItem].label = label;
      }

      setColors(updatedColors);
    }
  }

  const handleAddItem = () => {
    const biggestId = Math.max(...colors.map(({ id }) => id))
    if (biggestId >= 0) {
      setColors([...colors, { id: biggestId + 1, label: '', hexColor: '#000' }])
      return
    }

    setColors([...colors, { id: 1, label: '', hexColor: '#000' }])
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setColors((items) => {
        const oldIndex = items.findIndex((color) => color.id === active.id);
        const newIndex = items.findIndex((color) => color.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleEditor = (text: string) => {
    try {
      setColors(JSON.parse(text))
      Notification.closeAll();
    } catch (e: any) {
      Notification.closeAll();
      console.log(e);
      Notification.error(`${e?.name}: There's an error in your JSON!`);
    }
  }

  return (
    <Flex flexDirection={'column'} className={css({ margin: '5rem auto', maxWidth: '800px' })}>
      <Form>
        <Heading>Adaptive Colors</Heading>
        <Paragraph>Hi,{' '}
          <img className={css({ display: 'inline-block', borderRadius: '50%' })} src={sdk.user.avatarUrl} width={20} height={20} />
          {' '}{sdk.user.firstName}!
          This is a work in progress color picker app for Contentful.
          A lot of things that you see here are only placeholders.
        </Paragraph>

        <Heading>Color definitions</Heading>
        <Paragraph>
          You can edit your colors either via a graphical user interface, or via JSON!
        </Paragraph>
        <Tabs defaultTab={'first'}>
          <Tabs.List className={css({ marginBottom: '2rem' })} variant={'horizontal-divider'}>
            <Tabs.Tab panelId="first">GUI</Tabs.Tab>
            <Tabs.Tab panelId="second">JSON</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel id="first">
            <DndContext onDragEnd={handleDragEnd}>
              <SortableContext items={colors}>
                {colors?.map((color) => {
                  return (
                    <ConfigColorBar
                      key={color.id}
                      {...color}
                      onChange={onChange}
                    />
                  )
                })}
            </SortableContext>
            </DndContext>
            <Button onClick={handleAddItem}>Add Color</Button>
          </Tabs.Panel>

          <Tabs.Panel id="second">
            <ReactCodeMirror
              value={JSON.stringify(colors, null, 2)}
              extensions={[json()]}
              onChange={handleEditor}
            />
          </Tabs.Panel>
        </Tabs>
      </Form>
    </Flex>
  );
};

export default ConfigScreen;
