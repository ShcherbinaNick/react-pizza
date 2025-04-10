import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/Slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const updatedSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
