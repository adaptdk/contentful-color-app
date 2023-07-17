import { json } from "@codemirror/lang-json";
import { Notification, Tabs } from "@contentful/f36-components";
import ReactCodeMirror from "@uiw/react-codemirror";
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
      <ReactCodeMirror
        maxHeight={`600px`}
        value={JSON.stringify(colorGroups, null, 2)}
        extensions={[json()]}
        onChange={handleEditor}
      />
    </Tabs.Panel>
  );
};
