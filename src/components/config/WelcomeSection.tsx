import { UserAPI } from "@contentful/app-sdk";
import { Heading, Paragraph } from "@contentful/f36-components";
import { css } from "emotion";
import React from "react";

import { APP_TITLE } from "../../utils/constants";

type TypeWelcomeSection = {
  user: UserAPI;
};

export const WelcomeSection = ({ user }: TypeWelcomeSection) => (
  <React.Fragment>
    <Heading>{APP_TITLE}</Heading>
    <Heading
      as={`h2`}
      className={css({ display: `flex`, alignItems: `center`, gap: `0.25rem` })}
    >
      Hi,{` `}
      <img
        className={css({ display: `inline-block`, borderRadius: `50%` })}
        src={user.avatarUrl}
        width={20}
        height={20}
      />
      {` `}
      {user.firstName}!
    </Heading>
    <Paragraph>
      Welcome to the <b>{APP_TITLE}</b> configuration screen, a powerful tool
      for your team&apos;s designers, developers, and content editors. Here,
      precision meets design, allowing you to establish a cohesive color system
      based on Material Design principles.
    </Paragraph>
    <Paragraph>
      This application is designed to streamline and standardize your color
      choices, ensuring a consistent and professional appearance across your
      projects.
    </Paragraph>
    <Paragraph>
      Let&apos;s start by creating your first color group, or if you&apos;re a
      more experienced user, import your system via JSON!
    </Paragraph>
  </React.Fragment>
);
