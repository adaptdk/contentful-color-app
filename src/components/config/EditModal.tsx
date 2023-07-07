import {
  Button,
  Modal,
  SectionHeading,
  TextInput,
} from "@contentful/f36-components";
import React, { Dispatch, SetStateAction } from "react";

type TypeEditModal = {
  onClose: () => void;
  modalId: string;
  groupId: string;
  groupName: string;
  setModalGroupName: Dispatch<SetStateAction<string>>;
  handleModalSave: (groupId: string) => void;
};

export const EditModal = ({
  onClose,
  modalId,
  groupId,
  groupName,
  setModalGroupName,
  handleModalSave,
}: TypeEditModal) => (
  <Modal onClose={onClose} isShown={modalId === groupId}>
    <Modal.Header title={`Group "${groupName}" settings`} onClose={onClose} />
    <Modal.Content>
      <SectionHeading marginBottom={`spacingM`}>Group name</SectionHeading>
      <TextInput
        defaultValue={groupName}
        onChange={(e) => setModalGroupName(e.target.value)}
      />
      <Modal.Controls>
        <Button variant={`negative`} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={`positive`} onClick={() => handleModalSave(groupId)}>
          Confirm changes
        </Button>
      </Modal.Controls>
    </Modal.Content>
  </Modal>
);
