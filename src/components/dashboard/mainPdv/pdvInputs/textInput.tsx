import React from 'react';

interface TextInputProps {
  name: string;
  placeholder: string;
  id: string;
  size: string;
}

type props = TextInputProps;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const TextInput = (proops: props) => {
  if (proops.size === 'large') {
    return (
      <div className="input-container">
        <label htmlFor="name" className="label-style">
          {proops.name}
        </label>
        <input
          placeholder={proops.placeholder}
          className="input-style"
          id={proops.id}
          name={proops.id}
        ></input>
      </div>
    );
  }
  if (proops.size === 'medium') {
    return (
      <div className="input-container medium-select-input-container">
        <label htmlFor="name" className="label-style">
          {proops.name}
        </label>
        <input
          placeholder={proops.placeholder}
          className="input-style"
          id={proops.id}
          name={proops.id}
        ></input>
      </div>
    );
  }
  return <div></div>;
};
export default TextInput;
