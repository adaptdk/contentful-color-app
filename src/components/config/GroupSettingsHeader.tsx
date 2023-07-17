import {
  Flex,
  IconButton,
  SectionHeading,
  Tooltip,
} from "@contentful/f36-components";
import { DeleteIcon, EditIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React, { Dispatch, SetStateAction } from "react";

const styles = css({
  backgroundColor: tokens.gray200,
  borderRadius: tokens.borderRadiusMedium,
});

type TypeGroupSettingsHeader = {
  id: string;
  setOpenedDeleteModalId: Dispatch<SetStateAction<string>>;
  setOpenedEditModalId: Dispatch<SetStateAction<string>>;
};

export const GroupSettingsHeader = ({
  id,
  setOpenedDeleteModalId,
  setOpenedEditModalId,
}: TypeGroupSettingsHeader) => (
  <Flex
    className={styles}
    marginBottom={`spacingM`}
    justifyContent={`space-between`}
    alignItems={`center`}
  >
    <SectionHeading marginLeft={`spacingM`} marginBottom={`none`}>
      Group settings
    </SectionHeading>
    <Flex>
      <Tooltip placement={`top`} content={`Edit group settings`}>
        <IconButton
          onClick={() => setOpenedEditModalId(id)}
          variant={`transparent`}
          aria-label={`Edit group settings`}
          icon={<EditIcon />}
        />
      </Tooltip>
      <Tooltip placement={`top`} content={`Delete group`}>
        <IconButton
          onClick={() => setOpenedDeleteModalId(id)}
          variant={`transparent`}
          aria-label={`Delete group`}
          icon={<DeleteIcon variant={`negative`} />}
        />
      </Tooltip>
    </Flex>
  </Flex>
);
