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
        <ul className="tab-list">
          {titles.map((title, index) => (
            <li
              key={index}
              className={`tabs ${getActiveClass(index, 'active-tabs')}`}
              onClick={() => toggleTab(index)}
            >
              {title}
            </li>
          ))}
        </ul>
        <div className="content-container">
          {contents.map((content, index) => (
            <div key={index} className={`content ${getActiveClass(index, 'active-content')}`}>
              <h2>{content}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
