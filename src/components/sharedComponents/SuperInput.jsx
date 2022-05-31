import React from "react";
import { Input } from "reactstrap";

function SuperInput(props) {
  return (
    <Input
      {...props}
      style={{
        width: "546px",
        height: "62px",
        borderRadius: "5px",
        backgroundColor: "#E6E6E6",
        ...props.style,
      }}
    >
      {props.children}
    </Input>
  );
}

export default SuperInput;
