import React, { useState } from 'react';

interface HookReturn {
  visible: boolean;
  title: string | React.ReactNode;
  onChangeTitle(value: string | React.ReactNode): void;
  onToggle(): void;
}

export const useDialog = (): HookReturn => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string | React.ReactNode>('');

  const onToggle = (): void => {
    setVisible(!visible);
  };

  const onChangeTitle = (value: string | React.ReactNode): void => setTitle(value);

  return {
    visible,
    title,
    onToggle,
    onChangeTitle,
  };
};
