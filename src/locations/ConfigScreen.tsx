import { ConfigAppSDK } from '@contentful/app-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  Accordion,
  AccordionItem,
  Button,
  Flex,
  Form,
  Heading,
  Notification,
  Paragraph,
  SectionHeading,
  Tabs
} from '@contentful/f36-components';
import { PlusIcon } from '@contentful/f36-icons';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { css } from 'emotion';
import React, { useCallback, useEffect, useState } from 'react';
import { ConfigColorBar } from '../components/ConfigColorBar';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export type TypeDefinedColor = {
  id: string;
  label: string;
  hexColor: string;
}

export interface AppInstallationParameters {
  colorGroups: Array<{
    id: string;
    groupName: string;
    definedColors: Array<TypeDefinedColor>
  }>
}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({
    colorGroups: [
      {
        id: uuidv4(),
        groupName: "Default",
        definedColors: [],
      },
    ],
  });
  const [colorGroups, setColorGroups] = useState<AppInstallationParameters['colorGroups']>(
    parameters.colorGroups || []
  );

  const sdk = useSDK<ConfigAppSDK>();

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get the current state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    const formattedColorGroups = colorGroups.map(({ id, groupName, definedColors }) => {
      const formattedColors = definedColors.map(({ hexColor, label, ...color }) => ({
        ...color,
        hexColor: hexColor.toLowerCase(),
        label: label.trim(),
      }));

      return {
        id,
        groupName,
        definedColors: formattedColors,
      };
    });

    const params: AppInstallationParameters = {
      colorGroups: formattedColorGroups,
    };

    return {
      // Parameters to be persisted as the app configuration.
      parameters: params,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [colorGroups, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get the current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);

        if (currentParameters?.colorGroups) {
          setColorGroups(currentParameters.colorGroups);
        }
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to the user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  const onChange = ({ id, label, hexColor, remove }: TypeDefinedColor & { remove?: boolean }) => {
    const updatedColorGroups = [...colorGroups];
    const groupIndex = updatedColorGroups.findIndex((group) => group.definedColors.some((color) => color.id === id));

    if (groupIndex >= 0) {
      const colorIndex = updatedColorGroups[groupIndex].definedColors.findIndex((color) => color.id === id);

      if (colorIndex >= 0) {
        if (remove) {
          updatedColorGroups[groupIndex].definedColors.splice(colorIndex, 1);
          setColorGroups(updatedColorGroups);
          return;
        }

        if (hexColor || hexColor === '') {
          updatedColorGroups[groupIndex].definedColors[colorIndex].hexColor = hexColor;
        }

        if (label || label === '') {
          updatedColorGroups[groupIndex].definedColors[colorIndex].label = label;
        }

        setColorGroups(updatedColorGroups);
      }
    }
  };

  const handleAddItem = (groupId: string) => {
    const updatedColorGroups = [...colorGroups];
    const groupIndex = updatedColorGroups.findIndex((group) => group.id === groupId);

    if (groupIndex >= 0) {
      const group = updatedColorGroups[groupIndex];
      group.definedColors.push({ id: uuidv4(), label: '', hexColor: '#000' });

      setColorGroups(updatedColorGroups);
    }
  };

  const handleAddGroup = () => {
    const updatedColorGroups = [...colorGroups];
    updatedColorGroups.push({ id: uuidv4(), groupName: `Untitled group`, definedColors: [] })

    setColorGroups(updatedColorGroups);
  }


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setColorGroups((groups) => {
        const updatedGroups = [...groups];

        // Find the source color and target color within their respective groups
        const sourceGroupIndex = updatedGroups.findIndex((group) =>
          group.definedColors.some((color) => color.id === active.id)
        );
        const targetGroupIndex = updatedGroups.findIndex((group) =>
          group.definedColors.some((color) => color.id === over.id)
        );

        if (sourceGroupIndex >= 0 && targetGroupIndex >= 0) {
          const sourceGroup = updatedGroups[sourceGroupIndex];
          const targetGroup = updatedGroups[targetGroupIndex];

          // Find the source color and target color indices within their groups
          const sourceIndex = sourceGroup.definedColors.findIndex((color) => color.id === active.id);
          const targetIndex = targetGroup.definedColors.findIndex((color) => color.id === over.id);

          if (sourceIndex >= 0 && targetIndex >= 0) {
            // Move the color from the source group to the target group
            const [removedColor] = sourceGroup.definedColors.splice(sourceIndex, 1);
            targetGroup.definedColors.splice(targetIndex, 0, removedColor);
          }
        }

        return updatedGroups;
      });
    }
  };


  const handleEditor = (text: string) => {
    try {
      setColorGroups(JSON.parse(text))
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

        <SectionHeading>Color definitions</SectionHeading>
        <Paragraph>
          You can edit your colors either via a graphical user interface, or via JSON!
        </Paragraph>
        <Tabs defaultTab={'first'}>
          <Tabs.List className={css({ marginBottom: '2rem' })} variant={'horizontal-divider'}>
            <Tabs.Tab panelId="first">GUI</Tabs.Tab>
            <Tabs.Tab panelId="second">JSON</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel id="first">
            <Accordion className={css({ marginBottom: '2rem' })}>
              {colorGroups?.map(({ id, groupName, definedColors }) => (
                <AccordionItem title={groupName} key={id}>
                  <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext items={definedColors}>
                      {definedColors?.map((color) => {
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
                  <Button startIcon={<PlusIcon />} variant={'positive'} onClick={() => handleAddItem(id)}>Add Color</Button>
                </AccordionItem>
              ))}
            </Accordion>
            <Button startIcon={<PlusIcon />} variant={'positive'} onClick={() => handleAddGroup()}>Add Group</Button>
          </Tabs.Panel>

          <Tabs.Panel id="second">
            <ReactCodeMirror
              value={JSON.stringify(colorGroups, null, 2)}
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
