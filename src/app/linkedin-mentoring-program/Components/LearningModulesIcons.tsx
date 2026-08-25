import React from "react";

export const BrochureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M19.1666 24H5.83332C4.40883 24 3.06952 23.4452 2.06212 22.4378C1.05477 21.4306 0.5 20.0912 0.5 18.6666V17.3332C0.5 16.5968 1.09692 15.9999 1.83334 15.9999C2.56976 15.9999 3.16668 16.5968 3.16668 17.3332V18.6666C3.16668 19.3789 3.44409 20.0486 3.94767 20.5522C4.4514 21.0559 5.12103 21.3333 5.83332 21.3333H19.1666C19.8789 21.3333 20.5485 21.0559 21.0522 20.5522C21.5559 20.0485 21.8333 19.3788 21.8333 18.6666V17.3332C21.8333 16.5968 22.4302 15.9999 23.1666 15.9999C23.903 15.9999 24.5 16.5968 24.5 17.3332V18.6666C24.5 20.0911 23.9452 21.4304 22.9378 22.4378C21.9304 23.4452 20.5911 24 19.1666 24ZM12.5 18.6666C12.3155 18.6666 12.1399 18.6291 11.9802 18.5615C11.8311 18.4985 11.6911 18.407 11.5685 18.2874L6.22386 12.9428C5.70318 12.4221 5.70318 11.5779 6.22386 11.0571C6.74454 10.5365 7.58883 10.5364 8.1095 11.0571L11.1667 14.1143V1.33334C11.1666 0.596923 11.7636 0 12.5 0C13.2364 0 13.8334 0.596923 13.8334 1.33334V14.1143L16.8905 11.0571C17.4111 10.5365 18.2555 10.5365 18.7761 11.0571C19.2968 11.5778 19.2968 12.4221 18.7761 12.9428L13.4428 18.2761C13.2751 18.4285 13.1508 18.5062 13.0193 18.5616C12.8576 18.6297 12.6832 18.6666 12.5 18.6666Z"
      fill="#16945D"
    />
  </svg>
);

interface PlayCircleIconProps {
  idSuffix: string;
}

export const PlayCircleIcon = ({ idSuffix }: PlayCircleIconProps) => {
  const filterId = `filter0_i_1966_1946-${idSuffix}`;
  const clipId = `bgblur_0_1966_1946_clip_path-${idSuffix}`;
  const gradientId = `paint0_linear_1966_1946-${idSuffix}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="30"
      viewBox="0 0 29 30"
      fill="none"
      aria-hidden="true"
    >
      <foreignObject x="-5.62533" y="-5.12435" width="40.2507" height="40.2487">
        <div
          style={{
            backdropFilter: "blur(2.92px)",
            clipPath: `url(#${clipId})`,
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <g filter={`url(#${filterId})`} data-figma-bg-blur-radius="5.83333">
        <circle cx="14.5" cy="15" r="14" fill="#16945D" />
        <circle
          cx="14.5"
          cy="15"
          r="14.1458"
          stroke={`url(#${gradientId})`}
          strokeOpacity="0.4"
          strokeWidth="0.291667"
        />
      </g>
      <path
        d="M10.708 10.6259C10.7084 9.95293 11.4374 9.53217 12.0205 9.86808L19.6025 14.2411C20.1863 14.5778 20.1863 15.421 19.6025 15.7577L12.0205 20.1308C11.4372 20.4672 10.708 20.0464 10.708 19.373V10.6259Z"
        fill="white"
      />
      <defs>
        <filter
          id={filterId}
          x="-5.62533"
          y="-5.12435"
          width="40.2507"
          height="40.2487"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="0.425966" operator="dilate" in="SourceAlpha" result="effect1_innerShadow_1966_1946" />
          <feOffset dx="-0.212983" dy="0.212983" />
          <feGaussianBlur stdDeviation="0.106491" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1966_1946" />
        </filter>
        <clipPath id={clipId} transform="translate(5.62533 5.12435)">
          <circle cx="14.5" cy="15" r="14" />
        </clipPath>
        <linearGradient
          id={gradientId}
          x1="25.2258"
          y1="2.91936"
          x2="14.5"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
