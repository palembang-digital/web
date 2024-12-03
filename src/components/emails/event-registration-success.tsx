import * as React from "react";

interface EventRegistrationSuccessProps {
  firstName: string;
}

export const EventRegistrationSuccess: React.FC<
  Readonly<EventRegistrationSuccessProps>
> = ({ firstName }) => (
  <div>
    <h1>Hai {firstName}</h1>
  </div>
);
