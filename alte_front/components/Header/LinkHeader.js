
import Link from 'next/link'
import React from 'react'

const LinkHeader = (props) => {
  return (
    <Link href={props.link} target='blank'>
        {props.children}
    </Link>
  )
}

export default LinkHeader