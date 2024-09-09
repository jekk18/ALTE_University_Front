import React from 'react'

const SliderRightArrow = (props) => {
  return (
    <div className={props.class}> 
        <span>
        <svg
        width="17"
        height="30"
        viewBox="0 0 17 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.8591 14.591L5.35643 0.223544C5.29937 0.153391 5.22851 0.0971504 5.14865 0.0585956C5.06891 0.0199229 4.98198 -5.25324e-07 4.89416 -5.29163e-07C4.80633 -5.33002e-07 4.71951 0.0199228 4.63966 0.0585955C4.55992 0.0971504 4.48894 0.153391 4.43188 0.223544L0.623983 4.98772C0.534584 5.10209 0.485616 5.24475 0.485616 5.39331C0.485616 5.54069 0.534584 5.68454 0.623983 5.79891L7.66187 14.591C7.75291 14.7066 7.80275 14.8504 7.80275 15.0002C7.80275 15.1499 7.75291 15.2938 7.66187 15.4093L0.623982 24.2026C0.533011 24.317 0.483144 24.462 0.483144 24.6106C0.483144 24.7603 0.533011 24.9053 0.623982 25.0197L4.43188 29.7772C4.48894 29.8467 4.55992 29.9033 4.63966 29.9422C4.71951 29.98 4.80633 30 4.89416 30C4.98198 30 5.06891 29.98 5.14865 29.9422C5.2285 29.9033 5.29937 29.8467 5.35643 29.7772L16.8591 15.4093C16.9501 15.2938 17 15.1499 17 15.0002C17 14.8504 16.9501 14.7066 16.8591 14.591Z"
            fill={props.color}
        />
        </svg>
    </span>
  </div>
  )
}

export default SliderRightArrow