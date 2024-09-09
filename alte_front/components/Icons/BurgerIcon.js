import React from 'react'

const BurgerIcon = (props) => {
  return (
    <span className={props.class}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_307_1246)">
            <path d="M3.5 4.66675H24.5V7.00008H3.5V4.66675ZM5.83333 22.1667H22.1667V24.5001H5.83333V22.1667ZM3.5 16.3334H24.5V18.6667H3.5V16.3334ZM5.83333 10.5001H22.1667V12.8334H5.83333V10.5001Z" fill={props.color}/>
            </g>
            <defs>
            <clipPath id="clip0_307_1246">
            <rect width="28" height="28" fill="red"/>
            </clipPath>
            </defs>
            </svg>

    </span>
  )
}

export default BurgerIcon