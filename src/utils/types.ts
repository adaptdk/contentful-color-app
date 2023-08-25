import { Dispatch, SetStateAction } from "react";

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

export type TypeColorGroupsState = {
  colorGroups: Array<TypeColorGroup>;
  setColorGroups: Dispatch<SetStateAction<TypeColorGroup[]>>;
};
