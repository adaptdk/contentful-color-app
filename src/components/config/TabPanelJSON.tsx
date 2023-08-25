import { json } from "@codemirror/lang-json";
import { Note, Notification, Tabs } from "@contentful/f36-components";
import ReactCodeMirror from "@uiw/react-codemirror";
import { css } from "emotion";
import React from "react";

import { TypeColorGroupsState } from "../../utils/types";

export const TabPanelJSON = ({
  colorGroups,
  setColorGroups,
}: TypeColorGroupsState) => {
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
    <Tabs.Panel id="second">
      <Note variant={`primary`} className={css({ marginBottom: `2rem` })}>
        The JSON you modify is dynamically synchronized, providing instantaneous
        visualization of your changes within the GUI panel.
      </Note>
      <ReactCodeMirror
        maxHeight={`600px`}
        value={JSON.stringify(colorGroups, null, 2)}
        extensions={[json()]}
        onChange={handleEditor}
      />
    </Tabs.Panel>
  );
};
