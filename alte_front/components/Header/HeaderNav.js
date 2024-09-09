import React from 'react'

const HeaderNav = (props) => {
  return (
    <div className={props.class}>
        <ul className='nav-ul'>
            {props.children}
        </ul>
    </div>
  )
}

export default HeaderNav