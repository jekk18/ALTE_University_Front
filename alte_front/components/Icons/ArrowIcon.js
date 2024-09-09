import React from 'react';

const ArrowIcon = (props) => {
  return (
     <span className={props.class}>
        <svg width="77" height="63" viewBox="0 0 46 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M21.9413 0.211621L0.390005 17.4883C0.284775 17.574 0.200414 17.6805 0.142582 17.8004C0.0845726 17.9202 0.0546875 18.0507 0.0546875 18.1826C0.0546875 18.3146 0.0845726 18.445 0.142582 18.5649C0.200414 18.6847 0.284775 18.7913 0.390005 18.877L7.53627 24.5963C7.70782 24.7306 7.92182 24.8041 8.14466 24.8041C8.36573 24.8041 8.5815 24.7306 8.75305 24.5963L21.9413 14.0256C22.1146 13.8889 22.3303 13.814 22.555 13.814C22.7796 13.814 22.9953 13.8889 23.1686 14.0256L36.3586 24.5963C36.5302 24.733 36.7477 24.8079 36.9706 24.8079C37.1952 24.8079 37.4127 24.733 37.5843 24.5963L44.7204 18.877C44.8248 18.7913 44.9097 18.6847 44.968 18.5649C45.0246 18.445 45.0547 18.3146 45.0547 18.1826C45.0547 18.0507 45.0246 17.9202 44.968 17.8004C44.9097 17.6805 44.8248 17.574 44.7204 17.4883L23.1686 0.211621C22.9953 0.0748823 22.7796 0 22.555 0C22.3303 0 22.1146 0.0748823 21.9413 0.211621Z" fill={props.color ? props.color : "#EB5E51"} />
            <path fillRule="evenodd" clipRule="evenodd" d="M31.5012 36.2463H13.6068C13.4123 36.2444 13.223 36.1859 13.0639 36.0784C12.9047 35.971 12.7827 35.8197 12.7172 35.6449C12.65 35.4701 12.6412 35.28 12.6907 35.1002C12.7402 34.9202 12.8463 34.7591 12.9949 34.6382L13.0904 34.5651L13.8845 33.9256L16.7584 31.6141L17.5543 30.9655L19.6429 29.2935L21.9226 27.4662C22.0942 27.3296 22.3099 27.2547 22.5346 27.2547C22.7592 27.2547 22.9749 27.3296 23.1482 27.4662L25.4279 29.2935L27.5166 30.9655L28.3107 31.6141L31.1846 33.9256L31.9787 34.5651L32.0654 34.6382C32.2139 34.7591 32.32 34.9202 32.3696 35.1002C32.4191 35.28 32.4102 35.4701 32.343 35.6449C32.2758 35.8197 32.1556 35.971 31.9964 36.0784C31.8372 36.1859 31.648 36.2444 31.4534 36.2463" fill={props.seccondColor ? props.seccondColor : "#144147"}/>
        </svg>
     </span>
  )
}

export default ArrowIcon