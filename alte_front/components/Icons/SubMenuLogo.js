import React from 'react'

const SubMenuLogo = (props) => {
  return (
    <span>  
        <svg width="66" height="54" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M32.1003 0.307094L0.491799 25.3782C0.337462 25.5026 0.213732 25.657 0.128911 25.8311C0.0438314 26.0049 0 26.1944 0 26.3858C0 26.5772 0.0438314 26.7664 0.128911 26.9405C0.213732 27.1143 0.337462 27.269 0.491799 27.3934L10.973 35.693C11.2246 35.8879 11.5385 35.9946 11.8653 35.9946C12.1895 35.9946 12.506 35.8879 12.7576 35.693L32.1003 20.3533C32.3545 20.1549 32.671 20.0462 33.0004 20.0462C33.3298 20.0462 33.6463 20.1549 33.9005 20.3533L53.2458 35.693C53.4974 35.8913 53.8164 36 54.1433 36C54.4727 36 54.7918 35.8913 55.0434 35.693L65.5098 27.3934C65.6628 27.269 65.7873 27.1143 65.8729 26.9405C65.9559 26.7664 66 26.5772 66 26.3858C66 26.1944 65.9559 26.0049 65.8729 25.8311C65.7873 25.657 65.6628 25.5026 65.5098 25.3782L33.9005 0.307094C33.6463 0.108666 33.3298 0 33.0004 0C32.671 0 32.3545 0.108666 32.1003 0.307094Z" fill={props.color ? props.color : "#EB5E51"}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M49.359 54H16.728C16.3733 53.9963 16.0282 53.8791 15.7379 53.664C15.4477 53.4489 15.2252 53.146 15.1058 52.7961C14.9833 52.4463 14.9672 52.0657 15.0575 51.7057C15.1478 51.3454 15.3413 51.0229 15.6122 50.7808L15.7863 50.6346L17.2344 49.3544L22.4751 44.727L23.9263 43.4286L27.7351 40.0813L31.8922 36.4235C32.205 36.1499 32.5985 36 33.0081 36C33.4177 36 33.8111 36.1499 34.1272 36.4235L38.2842 40.0813L42.093 43.4286L43.5411 44.727L48.7818 49.3544L50.2298 50.6346L50.3878 50.7808C50.6587 51.0229 50.8522 51.3454 50.9425 51.7057C51.0328 52.0657 51.0167 52.4463 50.8942 52.7961C50.7716 53.146 50.5523 53.4489 50.2621 53.664C49.9718 53.8791 49.6267 53.9963 49.272 54" fill="#144147"/>
        </svg> 
    </span>
  )
}

export default SubMenuLogo