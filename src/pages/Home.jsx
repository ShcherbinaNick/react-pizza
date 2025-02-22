import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Preloader from '../components/Preloader';

function Home() {

  const [ pizzas, setPizzas ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(true);

  React.useEffect(() => {
    fetch('https://67b5a50207ba6e59083dcc60.mockapi.io/pizzas')
    .then(res => res.json())
    .then((pizzasArr) => {
      setPizzas(pizzasArr);
      setIsLoading(false);
    })
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      {isLoading ? <Preloader /> : 
      <>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            pizzas.map((pizza) => <PizzaBlock key={ pizza.id } { ...pizza } />
          )}
        </div>
      </>
      }
    </>
  )
}

export default Home;