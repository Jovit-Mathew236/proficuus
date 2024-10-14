import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>
      Welcome, {firstName}! your registration as a Proficuus&apos;24 volunteer
      is successful!
    </h1>
  </div>
);
