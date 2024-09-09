import Link from 'next/link'
import React from 'react'
import SubMenuLogo from '../Icons/SubMenuLogo'

const SubmenuItem = (props) => {
  return ( 
        <Link href={props?.slug[0]?.slug ? props?.slug[0]?.slug: ''} className='submenu-item'>
            <SubMenuLogo color={props?.color ? props.color : ''}/>
            <p className='geo-font-bold-caps'>
                {props.title}
            </p>
        </Link> 
  )
}

export default SubmenuItem