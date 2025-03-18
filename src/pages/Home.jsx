import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/Slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Preloader from '../components/Preloader';
import { SearchContext } from '../App';

function Home() {
  const dispatch = useDispatch();

  const { categoryId, sortType } = useSelector((state) => state.filter);
  const selectedSortType = sortType.sortProperty;

  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = selectedSortType.replace('-', '');
    const order = selectedSortType.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://67b5a50207ba6e59083dcc60.mockapi.io/pizzas?&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((pizzasArr) => {
        setPizzas(pizzasArr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, selectedSortType, searchValue]);

  return (
    <>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {pizzas === 'Not found'
              ? 'Не найдено'
              : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
