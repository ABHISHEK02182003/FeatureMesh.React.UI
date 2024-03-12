import { memo, SVGProps } from 'react';

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 40 27' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx={13.3333} cy={13.5} r={13.3333} fill='#FF8D47' />
    <circle cx={33} cy={6.00016} r={9} fill='#6152FF' />
    <circle cx={34} cy={24.0002} r={7} fill='#FFB78B' />
    <g filter='url(#filter0_dd_1721_392)'>
      <circle cx={25.5} cy={14.5002} r={10.5} fill='white' />
    </g>
    <defs>
      <filter
        id='filter0_dd_1721_392'
        x={-59}
        y={-28.9998}
        width={169}
        height={169}
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy={41} />
        <feGaussianBlur stdDeviation={37} />
        <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 0.927379 0 0 0 0 0.840234 0 0 0 1 0' />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1721_392' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={7.5} />
        <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 0.901515 0 0 0 0 0.783333 0 0 0 0.66 0' />
        <feBlend mode='normal' in2='effect1_dropShadow_1721_392' result='effect2_dropShadow_1721_392' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect2_dropShadow_1721_392' result='shape' />
      </filter>
    </defs>
  </svg>
);

const Memo = memo(LogoIcon);
export { Memo as LogoIcon };
