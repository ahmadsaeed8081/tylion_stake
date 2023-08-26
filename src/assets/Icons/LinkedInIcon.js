import React from "react";

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="25"
      fill="none"
      viewBox="0 0 26 25"
    >
      <g filter="url(#filter0_d_179_1087)">
        <path
          fill="#fff"
          d="M23.81 1.67l-3.3 15.566c-.25 1.099-.899 1.372-1.821.855l-5.03-3.706-2.426 2.334c-.269.268-.494.493-1.011.493l.361-5.122 9.321-8.423c.406-.361-.087-.561-.63-.2L7.752 10.723 2.791 9.17c-1.08-.337-1.1-1.08.224-1.597L22.419.098c.899-.337 1.685.2 1.392 1.572z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_179_1087"
          width="25.873"
          height="24.344"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_179_1087"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_179_1087"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default LinkedInIcon;
