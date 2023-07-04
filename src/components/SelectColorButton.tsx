import { FieldAppSDK } from '@contentful/app-sdk';
import { Button, ButtonGroup } from '@contentful/f36-components';
import { ChevronDownIcon, CloseIcon } from '@contentful/f36-icons';
import { useSDK } from '@contentful/react-apps-toolkit';
import { css } from 'emotion';
import { forwardRef, Ref } from 'react';
import { TypeDefinedColor } from '../locations/ConfigScreen';
import { ColorOptionItem } from './ColorOptionItem';

const styles = {
  buttonGroup: css({
    width: '100%',
    justifyContent: 'stretch',
  }),
  pickerButton: css({
    maxWidth: '100%',
    flexGrow: 1,
  }),
};

interface MenuButtonProps {
  showChevron?: boolean;
  name: string;
  color: TypeDefinedColor;
  onClick?: () => void;
  onClearClick?: () => void;
}

function _SelectColorButton(
  { showChevron, color, name, onClick, onClearClick }: MenuButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const sdk = useSDK<FieldAppSDK>();

  return (
    <ButtonGroup withDivider className={styles.buttonGroup}>
      <Button
        endIcon={showChevron ? <ChevronDownIcon /> : undefined}
        className={styles.pickerButton}
        onClick={onClick}
        ref={ref}
      >
        {color ? <ColorOptionItem color={color} /> : name}
      </Button>

      {!sdk.field.required && color !== undefined && (
        <Button
          variant="secondary"
          startIcon={<CloseIcon />}
          onClick={onClearClick}
        >
          Clear
        </Button>
      )}
    </ButtonGroup>
  );
}

export const SelectColorButton = forwardRef(_SelectColorButton);
