import React from 'react'
import ArrowIcon from '../Icons/ArrowIcon'
import Link from 'next/link'

const ProgramsItem = (props) => {  
  return (
    <Link href={props.slug ? props.slug[0]?.slug : '#'} className='programs-item'>
      <div className="icon">
        <ArrowIcon color={props.color} seccondColor={props.seccondColor} />
      </div>
      <div className="content">
        <h1 className="geo-font-bold" style={{ color: props.color ? props.color : '#074045' }}>{props.addText}</h1>
        <p className="geo-font-medium">{props?.type[0]?.title}</p>  
      </div>
    </Link>
  )
}

export default ProgramsItem