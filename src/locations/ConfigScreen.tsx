import { ConfigAppSDK } from "@contentful/app-sdk";
import { Flex, Form, Tabs } from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import { css } from "emotion";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ColorSection } from "../components/config/ColorSection";
import { TabPanelGUI } from "../components/config/TabPanelGUI";
import { TabPanelJSON } from "../components/config/TabPanelJSON";
import { WelcomeSection } from "../components/config/WelcomeSection";
import { TypeColorGroup } from "../utils/types";

export interface AppInstallationParameters {
  colorGroups: Array<TypeColorGroup>;
}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({
    colorGroups: [
      {
        id: uuidv4(),
        groupName: `Default`,
        definedColors: [
          { id: uuidv4(), label: `lime-50`, hexColor: `#efffd2` },
        ],
      },
    ],
  });
  const [colorGroups, setColorGroups] = useState<
    AppInstallationParameters[`colorGroups`]
  >(parameters.colorGroups || []);

  const sdk = useSDK<ConfigAppSDK>();

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get the current state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    const formattedColorGroups = colorGroups?.map(
      ({ id, groupName, definedColors }) => {
        const formattedColors = definedColors?.map(
          ({ hexColor, label, ...color }) => ({
            ...color,
            hexColor: hexColor.toLowerCase(),
            label: label.trim(),
          })
        );

        return {
          id,
          groupName,
          definedColors: formattedColors,
        };
      }
    );

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
      const currentParameters: AppInstallationParameters | null =
        await sdk.app.getParameters();

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

  return (
    <Flex
      flexDirection={`column`}
      className={css({ margin: `5rem auto`, maxWidth: `800px` })}
    >
      <Form>
        <WelcomeSection user={sdk.user} />
        <ColorSection />

        <Tabs defaultTab={`first`}>
          <Tabs.List
            className={css({ marginBottom: `2rem` })}
            variant={`horizontal-divider`}
          >
            <Tabs.Tab panelId="first">GUI</Tabs.Tab>
            <Tabs.Tab panelId="second">JSON</Tabs.Tab>
          </Tabs.List>

          <TabPanelGUI
            colorGroups={colorGroups}
            setColorGroups={setColorGroups}
          />
          <TabPanelJSON
            colorGroups={colorGroups}
            setColorGroups={setColorGroups}
          />
        </Tabs>
      </Form>
    </Flex>
  );
};

export default ConfigScreen;
