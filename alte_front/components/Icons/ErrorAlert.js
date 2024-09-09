import React from "react";

const ErrorAlert = () => {
  return (
    <span>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 0C77.615 0 100 22.385 100 50C100 77.615 77.615 100 50 100C22.385 100 0 77.615 0 50C0 22.385 22.385 0 50 0ZM39.395 32.32C38.4973 31.4137 37.2871 30.8848 36.0123 30.8416C34.7374 30.7983 33.4942 31.244 32.5371 32.0873C31.58 32.9307 30.9815 34.1079 30.864 35.3781C30.7465 36.6483 31.1189 37.9154 31.905 38.92L32.325 39.395L42.925 49.995L32.325 60.605C31.4187 61.5027 30.8898 62.7129 30.8466 63.9877C30.8033 65.2626 31.249 66.5058 32.0923 67.4629C32.9357 68.42 34.1129 69.0185 35.3831 69.136C36.6533 69.2535 37.9204 68.8811 38.925 68.095L39.395 67.68L50 57.07L60.605 67.68C61.5027 68.5863 62.7129 69.1152 63.9877 69.1584C65.2626 69.2017 66.5058 68.756 67.4629 67.9127C68.42 67.0693 69.0185 65.8921 69.136 64.6219C69.2535 63.3517 68.8811 62.0846 68.095 61.08L67.68 60.605L57.07 50L67.68 39.395C68.5863 38.4973 69.1152 37.2871 69.1584 36.0123C69.2017 34.7374 68.756 33.4942 67.9127 32.5371C67.0693 31.58 65.8921 30.9815 64.6219 30.864C63.3517 30.7465 62.0846 31.1189 61.08 31.905L60.605 32.32L50 42.93L39.395 32.32Z"
          fill="#FF003E"
        />
      </svg>
    </span>
  );
};

export default ErrorAlert;