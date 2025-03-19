import React from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

function Search() {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);

  const updatedSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );

  const onClickClear = () => {
    setValue('');
    setSearchValue('');
  }

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updatedSearchValue(event.target.value);
  };

  return (
    <label className={styles.label}>
      <button className={styles.icon_btn_find}></button>
      <input
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Название пиццы...'
        type='text'
      />
      {value && (
        <button
          onClick={onClickClear}
          className={styles.icon_btn_close}
        ></button>
      )}
    </label>
  );
}

export default Search;
