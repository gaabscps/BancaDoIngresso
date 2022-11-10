import React, { useState } from 'react';
import './styles.scss';

export const Tab = ({ titles, contents }) => {
  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = index => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) => (ToggleState === index ? className : '');

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
            <div
              key={index}
              className={`content mainContainer container-fluid ${getActiveClass(
                index,
                'active-content',
              )}`}
            >
              {content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
