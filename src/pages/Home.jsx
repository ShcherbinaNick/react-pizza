import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setFilters } from '../redux/Slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Preloader from '../components/Preloader';
import { SearchContext } from '../App';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzaData } from '../redux/Slices/PizzasSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sortType, searchValue } = useSelector(selectFilter);

  const selectedSortType = sortType.sortProperty;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = selectedSortType.replace('-', '');
    const order = selectedSortType.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
      })
    );
  };

  // Если был первый рендер - проверяем URL параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        sortType,
        categoryId,
      });

      navigate(`/?${queryStr}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType]);

  // Нужно ли мне делать запрос на изменение пицц?
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, selectedSortType, searchValue]);

  return (
    <>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      {status === 'error' ? (
        <div>ОШИБОЧКА, не получилось получить пиццы!</div>
      ) : (
        <>
          {status === 'loading' ? (
            <Preloader />
          ) : (
            <>
              <h2 className='content__title'>Все пиццы</h2>
              <div className='content__items'>
                {items // вот тут проверку надо поправить, когда в поиске ничего не найдено - выводится массив всех пицц всё равно
                  ? items.map((pizza) => (
                      <PizzaBlock key={pizza.id} {...pizza} />
                    ))
                  : 'Не найдено'}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Home;
