import React, { useEffect, useState } from 'react';
import { ChevronsUp } from 'react-feather';

const Taptop = (): JSX.Element => {
  const [taptopStyle, setTapTopStyle] = useState('none');

  const executeScroll = (): void => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleScroll = (): void => {
    if (window.scrollY > 600) {
      setTapTopStyle('block');
    } else {
      setTapTopStyle('none');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="tap-top" style={{ display: taptopStyle }}>
      <ChevronsUp onClick={() => executeScroll()} />
    </div>
  );
};

export default Taptop;
