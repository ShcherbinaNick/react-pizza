import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Preloader from '../components/Preloader';
import Pagination from '../Pagination'

function Home({ searchValue }) {

  const [ pizzas, setPizzas ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ categoryId, setCategoryId ] = React.useState(0);
  const [ currentPage, setCurrentPage ] = React.useState(1);
  const [ selectedSortType, setSelectedSortType ] = React.useState({
    name: 'популярности(возр.)',
    sortProperty: 'rating'
  });
  
  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = selectedSortType.sortProperty.replace('-', '');
    const order = selectedSortType.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(`https://67b5a50207ba6e59083dcc60.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then(res => res.json())
    .then((pizzasArr) => {
      setPizzas(pizzasArr);
      setIsLoading(false);
    })
    window.scrollTo(0, 0);
  }, [categoryId, selectedSortType, searchValue, currentPage])  

  return (
    <>
      <div className="content__top">
        <Categories value={ categoryId } onChangeCategory={(i) => setCategoryId(i) } />
        <Sort value={ selectedSortType } onChangeSort={(i) => setSelectedSortType(i) } />
      </div>
      {isLoading ? <Preloader /> : 
      <>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            pizzas.map((pizza) => <PizzaBlock key={ pizza.id } { ...pizza } />
          )}
        </div>
        <Pagination onChangePage={(number) => setCurrentPage(number) }/>
      </>
      }
    </>
  )
}

export default Home;