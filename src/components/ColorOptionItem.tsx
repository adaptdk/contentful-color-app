import { Flex } from "@contentful/f36-components";
import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React from "react";

import { TypeDefinedColor } from "../utils/types";
import { ColorBox } from "./ColorBox";

const style = css({
  color: tokens.gray500,
  fontVariantNumeric: `tabular-nums`,
  width: `70px`,
  display: `inline-block`,
  textAlign: `left`,
});

export const ColorOptionItem = ({ color }: { color: TypeDefinedColor }) => (
  <Flex alignItems="center" gap="spacingXs">
    <ColorBox color={color} />
    <Flex gap="spacing2Xs">
      {color.label}
      {` `}
      <span className={style}>{color.hexColor}</span>
    </Flex>
  </Flex>
);
