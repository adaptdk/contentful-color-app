import { json } from "@codemirror/lang-json";
import { ConfigAppSDK } from "@contentful/app-sdk";
import {
  Accordion,
  AccordionItem,
  Button,
  Flex,
  Form,
  IconButton,
  Modal,
  Note,
  Notification,
  Paragraph,
  SectionHeading,
  Tabs,
  TextInput,
  Tooltip,
} from "@contentful/f36-components";
import { DeleteIcon, EditIcon, PlusIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";
import { useSDK } from "@contentful/react-apps-toolkit";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import ReactCodeMirror from "@uiw/react-codemirror";
import { css } from "emotion";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ConfigColorBar } from "../components/ConfigColorBar";
import { WelcomeSection } from "../components/WelcomeSection";

export type TypeDefinedColor = {
  id: string;
  label: string;
  hexColor: string;
};

export type TypeColorGroup = {
  id: string;
  groupName: string;
  definedColors: Array<TypeDefinedColor>;
};

export interface AppInstallationParameters {
  colorGroups: Array<TypeColorGroup>;
}

const groupToolbarStyles = css({
  backgroundColor: tokens.gray200,
  borderRadius: tokens.borderRadiusMedium,
});

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({
    colorGroups: [
      {
        id: uuidv4(),
        groupName: `Default`,
        definedColors: [],
      },
    ],
  });
  const [colorGroups, setColorGroups] = useState<
    AppInstallationParameters[`colorGroups`]
  >(parameters.colorGroups || []);
  const [openedEditModalId, setOpenedEditModalId] = useState<string>(``);
  const [openedDeleteModalId, setOpenedDeleteModalId] = useState<string>(``);
  const [modalGroupName, setModalGroupName] = useState<string>(``);

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

  const onChange = ({
    id,
    label,
    hexColor,
    remove,
  }: TypeDefinedColor & { remove?: boolean }) => {
    const updatedColorGroups = [...colorGroups];
    const groupIndex = updatedColorGroups.findIndex((group) =>
      group.definedColors.some((color) => color.id === id)
    );

    if (groupIndex >= 0) {
      const colorIndex = updatedColorGroups[groupIndex].definedColors.findIndex(
        (color) => color.id === id
      );

      if (colorIndex >= 0) {
        if (remove) {
          updatedColorGroups[groupIndex].definedColors.splice(colorIndex, 1);
          setColorGroups(updatedColorGroups);
          return;
        }

        if (hexColor || hexColor === ``) {
          updatedColorGroups[groupIndex].definedColors[colorIndex].hexColor =
            hexColor;
        }

        if (label || label === ``) {
          updatedColorGroups[groupIndex].definedColors[colorIndex].label =
            label;
        }

        setColorGroups(updatedColorGroups);
      }
    }
  };

  const handleAddItem = (groupId: string) => {
    const updatedColorGroups = [...colorGroups];
    const groupIndex = updatedColorGroups.findIndex(
      (group) => group.id === groupId
    );

    if (groupIndex >= 0) {
      const group = updatedColorGroups[groupIndex];
      group.definedColors.push({ id: uuidv4(), label: ``, hexColor: `#000` });

      setColorGroups(updatedColorGroups);
    }
  };

  const handleAddGroup = () => {
    const updatedColorGroups = [...colorGroups];
    updatedColorGroups.push({
      id: uuidv4(),
      groupName: `Untitled group`,
      definedColors: [],
    });

    setColorGroups(updatedColorGroups);
  };

  const handleDeleteGroup = (groupId: string, name: string) => {
    const updatedGroups = colorGroups.filter(({ id }) => id !== groupId);
    setColorGroups(updatedGroups);
    Notification.success(`Deleted group "${name}"`);
  };

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
          const sourceIndex = sourceGroup.definedColors.findIndex(
            (color) => color.id === active.id
          );
          const targetIndex = targetGroup.definedColors.findIndex(
            (color) => color.id === over.id
          );

          if (sourceIndex >= 0 && targetIndex >= 0) {
            // Move the color from the source group to the target group
            const [removedColor] = sourceGroup.definedColors.splice(
              sourceIndex,
              1
            );
            targetGroup.definedColors.splice(targetIndex, 0, removedColor);
          }
        }

        return updatedGroups;
      });
    }
  };

  const handleEditModalOpen = (id: string) => {
    setOpenedEditModalId(id);
  };

  const handleDeleteModalOpen = (id: string) => {
    setOpenedDeleteModalId(id);
  };

  const handleModalSave = (groupId: string) => {
    const updatedColorGroups = [...colorGroups];
    const groupIndexToUpdate = updatedColorGroups.findIndex(
      ({ id }) => id === groupId
    );

    if (groupIndexToUpdate >= 0 && modalGroupName) {
      updatedColorGroups[groupIndexToUpdate].groupName = modalGroupName;
      setColorGroups(updatedColorGroups);

      closeEditModal();
    } else {
      console.log({ groupIndexToUpdate, modalGroupName });
      Notification.error(`Change group name before confirming`);
    }

    setModalGroupName(``);
  };

  const closeEditModal = () => {
    setOpenedEditModalId(``);
  };

  const closeDeleteModal = () => {
    setOpenedDeleteModalId(``);
  };

  const handleEditor = (text: string) => {
    try {
      setColorGroups(JSON.parse(text));
      Notification.closeAll();
    } catch (e: any) {
      Notification.closeAll();
      console.log(e);
      Notification.error(`${e?.name}: There's an error in your JSON!`);
    }
  };

  return (
    <Flex
      flexDirection={`column`}
      className={css({ margin: `5rem auto`, maxWidth: `800px` })}
    >
      <Form>
        <WelcomeSection user={sdk.user} />

        <SectionHeading>Color definitions</SectionHeading>
        <Paragraph>
          You can edit your colors either via a graphical user interface, or via
          JSON!
        </Paragraph>
        <Tabs defaultTab={`first`}>
          <Tabs.List
            className={css({ marginBottom: `2rem` })}
            variant={`horizontal-divider`}
          >
            <Tabs.Tab panelId="first">GUI</Tabs.Tab>
            <Tabs.Tab panelId="second">JSON</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel id="first">
            <Accordion className={css({ marginBottom: `2rem` })}>
              {colorGroups?.map(({ id, groupName, definedColors }) => {
                if (!groupName && !definedColors) {
                  return null;
                }

                return (
                  <React.Fragment key={id}>
                    <AccordionItem
                      titleElement={`h3`}
                      title={groupName}
                      className={css({ width: `100%` })}
                    >
                      <Flex
                        className={groupToolbarStyles}
                        marginBottom={`spacingM`}
                        justifyContent={`space-between`}
                        alignItems={`center`}
                      >
                        <SectionHeading
                          marginLeft={`spacingM`}
                          marginBottom={`none`}
                        >
                          Group settings
                        </SectionHeading>
                        <Flex>
                          <Tooltip
                            placement={`top`}
                            content={`Edit group settings`}
                          >
                            <IconButton
                              onClick={() => handleEditModalOpen(id)}
                              variant={`transparent`}
                              aria-label={`Edit group settings`}
                              icon={<EditIcon />}
                            />
                          </Tooltip>
                          <Tooltip placement={`top`} content={`Delete group`}>
                            <IconButton
                              onClick={() => handleDeleteModalOpen(id)}
                              variant={`transparent`}
                              aria-label={`Delete group`}
                              icon={<DeleteIcon variant={`negative`} />}
                            />
                          </Tooltip>
                        </Flex>
                      </Flex>

                      <DndContext onDragEnd={handleDragEnd}>
                        <SortableContext items={definedColors}>
                          {definedColors?.map((color) => (
                            <ConfigColorBar
                              key={color.id}
                              {...color}
                              onChange={onChange}
                            />
                          ))}
                        </SortableContext>
                      </DndContext>
                      <Button
                        startIcon={<PlusIcon />}
                        variant={`positive`}
                        onClick={() => handleAddItem(id)}
                      >
                        Add Color
                      </Button>
                    </AccordionItem>

                    {/* Edit modal */}
                    <Modal
                      onClose={closeEditModal}
                      isShown={openedEditModalId === id}
                    >
                      <Modal.Header
                        title={`Group "${groupName}" settings`}
                        onClose={closeEditModal}
                      />
                      <Modal.Content>
                        <SectionHeading marginBottom={`spacingM`}>
                          Group name
                        </SectionHeading>
                        <TextInput
                          defaultValue={groupName}
                          onChange={(e) => setModalGroupName(e.target.value)}
                        />
                        <Modal.Controls>
                          <Button variant={`negative`} onClick={closeEditModal}>
                            Cancel
                          </Button>
                          <Button
                            variant={`positive`}
                            onClick={() => handleModalSave(id)}
                          >
                            Confirm changes
                          </Button>
                        </Modal.Controls>
                      </Modal.Content>
                    </Modal>

                    {/* Delete modal */}
                    <Modal
                      onClose={closeDeleteModal}
                      isShown={openedDeleteModalId === id}
                    >
                      <Modal.Header
                        title={`Delete "${groupName}" group`}
                        onClose={closeDeleteModal}
                      />
                      <Modal.Content>
                        <Paragraph>
                          Are you sure you want to delete &quot;
                          <b>{groupName}</b>&quot; group?
                        </Paragraph>
                        <Paragraph>
                          This action will delete the group with all of
                          it&apos;s defined colors!
                        </Paragraph>
                        <Note variant={`warning`}>
                          You can reverse this action by refreshing the page
                          without clicking <b>Save</b>, but that will reset all
                          of your unsaved changes!
                        </Note>
                        <Modal.Controls>
                          <Button
                            variant={`transparent`}
                            onClick={closeDeleteModal}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant={`negative`}
                            onClick={() => handleDeleteGroup(id, groupName)}
                          >
                            Delete group
                          </Button>
                        </Modal.Controls>
                      </Modal.Content>
                    </Modal>
                  </React.Fragment>
                );
              })}
            </Accordion>
            <Button
              startIcon={<PlusIcon />}
              variant={`positive`}
              onClick={() => handleAddGroup()}
            >
              Add Group
            </Button>
          </Tabs.Panel>

          <Tabs.Panel id="second">
            <ReactCodeMirror
              maxHeight={`600px`}
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
