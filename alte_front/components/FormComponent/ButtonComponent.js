import React from 'react'

const ButtonComponent = (props) => {
  return (
    <button type="button" className={props.class}>{props.title}</button>
  )
}

export default ButtonComponent