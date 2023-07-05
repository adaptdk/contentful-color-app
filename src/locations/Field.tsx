import React from 'react';
import { FieldAppSDK } from '@contentful/app-sdk';
import { Form, Menu } from '@contentful/f36-components';
import { useFieldValue, useSDK } from '@contentful/react-apps-toolkit';
import { css } from 'emotion';
import { useEffect, useMemo, useState } from 'react';
import { SelectColorButton } from '../components/SelectColorButton';
import { TypeDefinedColor } from './ConfigScreen';
import { ColorOptionItem } from '../components/ColorOptionItem';

const styles = {
  displayNone: css({
    display: 'none',
  }),
  menuList: css({
    width: 'calc(100% - 2px)', // -2px to keep borders visible
    left: 0,
  }),
};

// Dropdown + margin top + box shadow
const HEIGHT_DEFAULT = 41;
const HEIGHT_BASE = 52 + 4 + 14;
const HEIGHT_ITEM = 36;

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useFieldValue<string>();

  const validationIn = sdk.field.validations.find(obj => Object.prototype.hasOwnProperty.call(obj, 'in'));
  const theme = sdk.parameters.installation;
  const { definedColors: colors } = theme;

  const filteredColors = useMemo<TypeDefinedColor[]>(() => {
    if (validationIn?.in && validationIn?.in?.at(0)) {
      return colors.filter(({ label }: { label: TypeDefinedColor['label']}) => validationIn?.in?.includes(label));
    }

    return colors;
  }, [colors]);


  useEffect(() => {
    if (!isOpen) {
      sdk.window.updateHeight(HEIGHT_DEFAULT);
      return;
    }

    const calculatedHeight =
      HEIGHT_BASE + filteredColors.length * HEIGHT_ITEM;

    sdk.window.updateHeight(calculatedHeight <= 400 ? calculatedHeight : 400);
  }, [isOpen, sdk, theme]);

  const color = useMemo<TypeDefinedColor>(() => {
    return colors.find((c: TypeDefinedColor) => c.label === value || c.hexColor === value);
  }, [colors, value]);

  const name = useMemo<string>(() => {
    switch (typeof value) {
    case 'string':
      if (color) {
        return color.label;
      }

      return 'Invalid';

    case 'undefined':
      if (sdk.field.required) {
        return 'Invalid';
      } else {
        return 'Select a color…';
      }

    default:
      return 'Invalid';
    }
  }, [sdk.field.required, colors, value]);

  return (
    <Form>
      <Menu
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <Menu.Trigger>
          <SelectColorButton
            showChevron
            color={color}
            name={name}
            onClearClick={() => setValue(undefined)}
          />
        </Menu.Trigger>

        <Menu.List className={styles.menuList}>
          {filteredColors.map((color: TypeDefinedColor) => (
            <Menu.Item
              key={color.id}
              onClick={() => setValue(color.label)}
            >
              <ColorOptionItem color={color} />
            </Menu.Item>
          ))}
        </Menu.List>
      </Menu>
    </Form>
  );
};

export default Field;
