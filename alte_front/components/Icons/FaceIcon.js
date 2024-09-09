import React from 'react'

const FaceIcon = (props) => {
  return (
    <span className={props.class}>
        <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.04246 18.9527H5.96832V9.39525H8.70711L8.99806 6.19544H5.96832V4.36943C5.96832 3.6148 6.12446 3.32 6.87511 3.32H9V0H6.28448C3.36239 0 2.04537 1.24975 2.04537 3.64436V6.19544H0V9.43913H2.04246V18.9527Z" fill={props.color}/>
        </svg> 
    </span>
  )
}

export default FaceIcon;