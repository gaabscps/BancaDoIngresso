import React, { Fragment, useState, useEffect } from 'react';

const Loader = (): JSX.Element => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);

  return (
    <Fragment>
      <div className={`loader-wrapper ${show ? '' : 'loderhide'}`}>
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
};

export default Loader;
