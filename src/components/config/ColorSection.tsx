import { Note, Paragraph, SectionHeading } from "@contentful/f36-components";
import React from "react";

export const ColorSection = () => (
  <React.Fragment>
    <SectionHeading>Color definitions</SectionHeading>
    <Paragraph>
      You have the flexibility to modify your colors using either the graphical
      user interface or JSON.
    </Paragraph>
    <SectionHeading>Initial Installation</SectionHeading>
    <Paragraph>
      Upon your first installation of the application, you will immediately
      encounter a pre-configured color group containing a single color. This
      serves as an illustrative example, allowing you to visualize the structure
      of JSON data within the application.
    </Paragraph>
    <Note variant={`primary`}>
      The actual <code>value</code> saved in a field is the color{` `}
      <b>label </b>
      instead of the hex color. When validating a text field, you must also
      refer to the color <b>label</b>.
    </Note>
  </React.Fragment>
);
