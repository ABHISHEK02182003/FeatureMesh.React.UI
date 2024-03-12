import { memo, SVGProps } from 'react';

const BackgroundIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 1920 438' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx={390.5} cy={126.5} r={80.5} fill='#FFB58E' />
  </svg>
);

const Memo = memo(BackgroundIcon);
export { Memo as BackgroundIcon };
