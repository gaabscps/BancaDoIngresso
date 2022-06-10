import React from 'react'
import { Button } from 'reactstrap'


function SuperButton(props) {
  return (
    <Button 
    {...props}
    color="#222222"
    style={{
        height: "50px",
        borderRadius: "5px",
        backgroundColor:"#222222",
        color: "#fff",
        ...props.style,
      }}
    />
  )
}

export default SuperButton