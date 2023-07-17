import {
  Accordion,
  AccordionItem,
  Button,
  Flex,
  Notification,
  Tabs,
} from "@contentful/f36-components";
import { PlusIcon } from "@contentful/f36-icons";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { css } from "emotion";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { getRandomItem } from "../../utils/getRandomItem";
import { TypeColorGroupsState, TypeDefinedColor } from "../../utils/types";
import { ColorBox } from "../ColorBox";
import { ConfigColorBar } from "./ConfigColorBar";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";
import { GroupSettingsHeader } from "./GroupSettingsHeader";

export const TabPanelGUI = ({
  colorGroups,
  setColorGroups,
}: TypeColorGroupsState) => {
  const [openedEditModalId, setOpenedEditModalId] = useState<string>(``);
  const [openedDeleteModalId, setOpenedDeleteModalId] = useState<string>(``);
  const [modalGroupName, setModalGroupName] = useState<string>(``);

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

  const handleModalSave = (groupId: string) => {
    const updatedColorGroups = [...colorGroups];
    const groupIndexToUpdate = updatedColorGroups.findIndex(
      ({ id }) => id === groupId
    );

    if (groupIndexToUpdate >= 0 && modalGroupName) {
      updatedColorGroups[groupIndexToUpdate].groupName = modalGroupName;
      setColorGroups(updatedColorGroups);

      setOpenedEditModalId(``);
    } else {
      Notification.error(`Change group name before confirming`);
    }

    setModalGroupName(``);
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

  return (
    <Tabs.Panel id="first">
      <Accordion
        className={css({
          marginBottom: `2rem`,
          ":first-child": { borderTop: `none` },
        })}
      >
        {colorGroups?.map(({ id, groupName, definedColors }) => {
          if (!groupName && !definedColors) {
            return null;
          }

          const randomColor: TypeDefinedColor = getRandomItem(definedColors);

          return (
            <React.Fragment key={id}>
              <AccordionItem
                titleElement={`h3`}
                title={
                  <Flex
                    className={css({ fontSize: `1rem` })}
                    justifyContent={`center`}
                    alignItems={`center`}
                    gap={`0.5rem`}
                  >
                    <ColorBox color={randomColor} /> {groupName}
                  </Flex>
                }
                className={css({ width: `100%` })}
              >
                <GroupSettingsHeader
                  id={id}
                  setOpenedDeleteModalId={setOpenedDeleteModalId}
                  setOpenedEditModalId={setOpenedEditModalId}
                />
                {/* Color input bar */}
                <DndContext onDragEnd={handleDragEnd}>
                  <SortableContext items={definedColors}>
                    {definedColors?.map((color) => (
                      <ConfigColorBar
                        key={color.id}
                        {...color}
                        colorGroups={colorGroups}
                        setColorGroups={setColorGroups}
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
              <EditModal
                onClose={() => {
                  setOpenedEditModalId(``);
                }}
                modalId={openedEditModalId}
                groupId={id}
                groupName={groupName}
                setModalGroupName={setModalGroupName}
                handleModalSave={handleModalSave}
              />

              {/* Delete modal */}
              <DeleteModal
                onClose={() => {
                  setOpenedDeleteModalId(``);
                }}
                modalId={openedDeleteModalId}
                groupId={id}
                groupName={groupName}
                handleDeleteGroup={handleDeleteGroup}
              />
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
  );
};
