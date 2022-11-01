import React from 'react';

interface EventContainerProps {
  title: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const EventContainer: React.FC<EventContainerProps> = ({ title }) => <div>{title}</div>;
