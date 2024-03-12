import { memo } from 'react';
import resets from '../_resets.module.css';
import classes from './LandingPage.module.css';
import Showcase from '../Showcase/Showcase';
import Analytics from '../Analytics/Analytics';

interface Props {
  className?: string;
}

export const LandingPage: React.FC<Props> = memo(function LandingPage(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.sections}>
        <Showcase />
        <Analytics />
      </div>
    </div>
  );
});
