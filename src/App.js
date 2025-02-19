import React from 'react'
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {

  const [ pizzas, setPizzas ] = React.useState([]);
  
  React.useEffect(() => {
    fetch('https://67b5a50207ba6e59083dcc60.mockapi.io/pizzas')
    .then(res => res.json())
    .then((pizzasArr) => {
      setPizzas(pizzasArr)
    })
  }, [])

  return (
    <div className="wrapper">     
     <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzas.map((pizza) => 
                <PizzaBlock key={ pizza.id } { ...pizza } />
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
