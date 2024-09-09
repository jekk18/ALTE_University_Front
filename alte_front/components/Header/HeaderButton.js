import Link from 'next/link'
import React from 'react'

const HeaderButton = (props) => {
  return (
    <Link href={props.link} className={props.class}>
      {props.title}
    </Link>
  )
}

export default HeaderButton