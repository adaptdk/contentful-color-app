import { Box } from "@contentful/f36-components";
import { css } from "emotion";
import React, { ElementType } from "react";

import { TypeDefinedColor } from "../locations/ConfigScreen";

const styles = {
  colorBox: (color: string, size?: string, as?: ElementType<any>) =>
    css({
      display: as === `div` ? `block` : `inline-block`,
      width: size ?? `16px`,
      height: size ?? `16px`,
      boxShadow: `inset 0 0 0 1px rgba(0, 0, 0, 0.1)`,
      backgroundColor: color,
      borderRadius: `4px`,
      flexShrink: 0,
    }),
};

interface Props {
  color: TypeDefinedColor | string;
  size?: string;
  as?: ElementType<any>;
  onClick?: () => void;
}

export function ColorBox({ color, size, onClick, as }: Props) {
  return (
    <Box
      as={as ?? `span`}
      onClick={onClick}
      className={styles.colorBox(
        (typeof color === `string` ? color : color?.hexColor) ?? `#ffffff`,
        size
      )}
    />
  );
}
