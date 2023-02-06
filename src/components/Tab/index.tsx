import React, { FC, useState } from 'react';
import './styles.scss';

import { ReactComponent as CheckTab } from '@/assets/images/svg/CheckTab.svg';

type Contents = {
  component: JSX.Element;
  completion: boolean;
  title: string;
};
interface TabProps {
  contents: Contents[];
  numberStap: number;
}

export const Tab: FC<TabProps> = ({ contents, numberStap }) => {
  const [ToggleState, setToggleState] = useState(0);

  // set ToggleState when numberStap change
  if (numberStap !== ToggleState) {
    setToggleState(numberStap);
  }

  // const toggleTab = (index: number): void => {
  //   if (index <= ToggleState) {
  //     setToggleState(index);
  //   }
  // };

  const getActiveClass = (index: number, className: string): string =>
    ToggleState === index ? className : '';

  return (
    <div className="tab-component">
      <div className="container-header">
        <div className="tab-list">
          {contents.map((content, index) => (
            <div
              key={index}
              className={`tabs ${getActiveClass(index, 'active-tabs')}`}
              // onClick={() => toggleTab(index)}
            >
              {ToggleState > index || content.completion ? <CheckTab className="mr-2" /> : ''}
              {content.title}
              <div className={`${getActiveClass(index, 'active-indicator')}`} />
            </div>
          ))}
        </div>
        <div className="content-container">
          {contents.map((content, index) => (
            <div key={index} className={`content ${getActiveClass(index, 'active-content')}`}>
              {content.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
