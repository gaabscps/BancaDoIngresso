import React from 'react';

interface SelectInputProps {
  name: string;
  id: string;
  option1: string;
  option2: string;
  size: string;
}

type props = SelectInputProps;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const SelectInput = (proops: props) => {
  if (proops.size === 'small') {
    return (
      <div className="input-container small-select-input-container">
        <label htmlFor="state" className="label-style">
          {proops.name}
        </label>
        <select className="input-style small-select-input" id={proops.id} name={proops.id}>
          <option value="" selected className="select-placeholder">
            {proops.option1}
          </option>
          <option value=""> {proops.option2}</option>
        </select>
      </div>
    );
  }
  if (proops.size === 'medium') {
    return (
      <div className="input-container medium-select-input-container">
        <label htmlFor="state" className="label-style">
          {proops.name}
        </label>
        <select className="input-style" id={proops.id} name={proops.id}>
          <option value="" selected className="select-placeholder">
            {proops.option1}
          </option>
          <option value=""> {proops.option2}</option>
        </select>
      </div>
    );
  }
  return <div></div>;
};

export default SelectInput;
