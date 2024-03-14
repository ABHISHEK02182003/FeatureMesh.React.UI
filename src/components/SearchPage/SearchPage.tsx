import { memo } from 'react';
import resets from '../_resets.module.css';
import classes from './SearchPage.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

interface Props {
  className?: string;
}

export const SearchPage: React.FC<Props> = memo(function SearchPage(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.sections}>
        <SearchBar />
        <SearchResults />
      </div>
    </div>
  );
});
