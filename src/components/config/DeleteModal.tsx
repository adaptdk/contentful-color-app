import { Button, Modal, Note, Paragraph } from "@contentful/f36-components";
import React from "react";

type TypeDeleteModal = {
  onClose: () => void;
  modalId: string;
  groupId: string;
  groupName: string;
  handleDeleteGroup: (groupId: string, name: string) => void;
};

export const DeleteModal = ({
  onClose,
  modalId,
  groupId,
  groupName,
  handleDeleteGroup,
}: TypeDeleteModal) => (
  <Modal onClose={onClose} isShown={modalId === groupId}>
    <Modal.Header title={`Delete "${groupName}" group`} onClose={onClose} />
    <Modal.Content>
      <Paragraph>
        Are you sure you want to delete &quot;
        <b>{groupName}</b>&quot; group?
      </Paragraph>
      <Paragraph>
        This action will delete the group with all of it&apos;s defined colors!
      </Paragraph>
      <Note variant={`warning`}>
        You can reverse this action by refreshing the page without clicking{` `}
        <b>Save</b>, but that will reset all of your unsaved changes!
      </Note>
      <Modal.Controls>
        <Button variant={`transparent`} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant={`negative`}
          onClick={() => handleDeleteGroup(groupId, groupName)}
        >
          Delete group
        </Button>
      </Modal.Controls>
    </Modal.Content>
  </Modal>
);
