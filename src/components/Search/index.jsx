import React from 'react';
import styles from './Search.module.scss';

function Search({ searchValue, setSearchValue }) {
  return (
    <label className={styles.label}>
      <button className={styles.icon_btn_find}></button>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder='Название пиццы...'
        type='text'
      />
      {searchValue && (
        <button
          onClick={() => setSearchValue('')}
          className={styles.icon_btn_close}
        ></button>
      )}
    </label>
  );
}

export default Search;
