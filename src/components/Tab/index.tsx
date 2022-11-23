import React, { FC, useState } from 'react';
import './styles.scss';

import { ReactComponent as CheckTab } from '@/assets/images/svg/CheckTab.svg';

interface TabProps {
  titles: string[];
  contents: string[] | React.ReactNode[];
  numberStap: number;
}

export const Tab: FC<TabProps> = ({ titles, contents, numberStap }) => {
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
          {titles.map((title, index) => (
            <div
              key={index}
              className={`tabs ${getActiveClass(index, 'active-tabs')}`}
              // onClick={() => toggleTab(index)}
            >
              {ToggleState > index ? <CheckTab className="mr-2" /> : ''}
              {title}
              <div className={`${getActiveClass(index, 'active-indicator')}`} />
            </div>
          ))}
        </div>
        <div className="content-container">
          {contents.map((content, index) => (
            <div key={index} className={`content ${getActiveClass(index, 'active-content')}`}>
              {content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
