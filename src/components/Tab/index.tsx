import React, { FC, useState } from 'react';
import './styles.scss';

interface TabProps {
  titles: string[];
  contents: string[] | React.ReactNode[];
}

export const Tab: FC<TabProps> = ({ titles, contents }) => {
  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index: number): void => {
    setToggleState(index);
  };

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
              onClick={() => toggleTab(index)}
            >
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
