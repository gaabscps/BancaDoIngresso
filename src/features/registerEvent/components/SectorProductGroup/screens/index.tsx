import React, { useState } from 'react';
import SectorProductGroup from '@/model/SectorProductGroup';
import { SectorProductGroupContainer } from './ui';

export const SectorProductGroupScreen: React.FC = (): JSX.Element => {
  const [subgroup, setSubGroup] = useState<SectorProductGroup[]>([{ id: '1', name: 'teste' }]);

  const addSubGroup = (index: string): void => {
    setSubGroup([...subgroup, { id: index, name: 'teste' }]);
  };

  const removeSubGroup = (index: number): void => {
    const values = [...subgroup];
    values.splice(index, 1);
    setSubGroup(values);
  };

  return (
    <SectorProductGroupContainer
      subgroup={subgroup}
      addSubGroup={addSubGroup}
      removeSubGroup={removeSubGroup}
    />
  );
};
