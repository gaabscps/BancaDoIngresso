import React, { Fragment } from 'react';

type LoaderProps = {
  isVisible: boolean;
};

const Loader = ({ isVisible }: LoaderProps): JSX.Element => (
  <Fragment>
    <div className={`loader-wrapper ${isVisible ? '' : 'loderhide'}`}>
      <div className="loader-index">
        <span></span>
      </div>
      <svg>
        <defs></defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur"></feGaussianBlur>
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          >
            {' '}
          </feColorMatrix>
        </filter>
      </svg>
    </div>
  </Fragment>
);

export default Loader;
