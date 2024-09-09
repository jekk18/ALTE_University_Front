import Link from 'next/link'
import React from 'react'

const NavList = (props) => {
  return (
    <li className={props.classLi} onMouseEnter={(e) => {
      props?.onHover?.(true)
    }} onMouseLeave={(e) => {
      props?.onHover?.(false)
    }}>
      {props.children}
    </li>
  )
}

export default NavList