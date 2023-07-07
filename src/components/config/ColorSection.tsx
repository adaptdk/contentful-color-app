import { Note, Paragraph, SectionHeading } from "@contentful/f36-components";
import React from "react";

export const ColorSection = () => (
  <React.Fragment>
    <SectionHeading>Color definitions</SectionHeading>
    <Paragraph>
      You can edit your colors either via a graphical user interface, or via
      JSON!
    </Paragraph>
    <Note variant={`primary`}>
      The actual <code>value</code> saved in a field is the color{` `}
      <b>label </b>
      instead of the hex color. When validating a text field, you must also
      refer to the color <b>label</b>.
    </Note>
  </React.Fragment>
);
