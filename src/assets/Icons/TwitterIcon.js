import React from "react";

function TwitterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="27"
      fill="none"
      viewBox="0 0 29 27"
    >
      <g filter="url(#filter0_d_179_1085)">
        <path
          fill="#fff"
          d="M24.43 5.06c.016.222.016.444.016.667 0 6.773-5.155 14.578-14.578 14.578-2.903 0-5.6-.841-7.868-2.3.412.047.809.063 1.237.063 2.396 0 4.6-.81 6.361-2.19a5.133 5.133 0 01-4.79-3.553c.317.048.634.08.967.08.46 0 .92-.064 1.349-.175a5.124 5.124 0 01-4.109-5.028v-.064a5.16 5.16 0 002.316.65 5.12 5.12 0 01-2.284-4.266c0-.952.254-1.825.698-2.586A14.564 14.564 0 0014.31 6.298a5.784 5.784 0 01-.127-1.174A5.121 5.121 0 0119.306 0c1.476 0 2.808.619 3.744 1.618A10.088 10.088 0 0026.302.381a5.11 5.11 0 01-2.253 2.823A10.272 10.272 0 0027 2.411a11.016 11.016 0 01-2.569 2.65z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_179_1085"
          width="29"
          height="26.305"
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
            result="effect1_dropShadow_179_1085"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_179_1085"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default TwitterIcon;
