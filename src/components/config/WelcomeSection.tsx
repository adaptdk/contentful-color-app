import { UserAPI } from "@contentful/app-sdk";
import { Heading, Paragraph } from "@contentful/f36-components";
import { css } from "emotion";
import React from "react";

type TypeWelcomeSection = {
  user: UserAPI;
};

export const WelcomeSection = ({ user }: TypeWelcomeSection) => (
  <React.Fragment>
    <Heading>Adaptive Colors</Heading>
    <Paragraph>
      Hi,{` `}
      <img
        className={css({ display: `inline-block`, borderRadius: `50%` })}
        src={user.avatarUrl}
        width={20}
        height={20}
      />
      {` `}
      {user.firstName}! This is a work in progress color picker app for
      Contentful. A lot of things that you see here are only placeholders.
    </Paragraph>
  </React.Fragment>
);
