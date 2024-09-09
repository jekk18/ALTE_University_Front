import React from 'react'

const InputComponent = (props) => {
  return (
    <input type={props.type} placeholder={props.placeholder} className={props.class}/>
  )
}

export default InputComponent