import React from 'react'
import Link from 'next/link' 


const LeftTopHeader = (props) => {
  return (
    <Link href={props.url} className={props.class}>
        {props.title}
    </Link>
  )
}

export default LeftTopHeader