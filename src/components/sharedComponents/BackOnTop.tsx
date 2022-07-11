import React from 'react';

const BackOnTop = (): JSX.Element => {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div onClick={scrollToTop} style={{ cursor: 'pointer' }}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 0C8.97222 0 0 8.97222 0 20C0 31.0278 8.97222 40 20 40C31.0278 40 40 31.0278 40 20C40 8.97222 31.0278 0 20 0ZM20 37.7778C10.1976 37.7778 2.22222 29.8024 2.22222 20C2.22222 10.1976 10.1976 2.22222 20 2.22222C29.8024 2.22222 37.7778 10.1976 37.7778 20C37.7778 29.8024 29.8024 37.7778 20 37.7778Z"
          fill="#828282"
        />
        <path
          d="M20.7856 9.21443C20.3513 8.78009 19.6482 8.78009 19.2144 9.21443L9.21443 19.2144C8.78009 19.6488 8.78009 20.3519 9.21443 20.7856C9.64877 21.2193 10.3519 21.22 10.7856 20.7856L18.8888 12.6824V28.8888C18.8888 29.5026 19.3861 29.9999 19.9999 29.9999C20.6137 29.9999 21.111 29.5026 21.111 28.8888V12.6824L29.2142 20.7856C29.4315 21.0029 29.7155 21.1115 30.0001 21.1115C30.2847 21.1115 30.5687 21.0029 30.786 20.7862C31.2203 20.3519 31.2203 19.6488 30.786 19.215L20.7856 9.21443Z"
          fill="#828282"
        />
      </svg>
    </div>
  );
};

export default BackOnTop;