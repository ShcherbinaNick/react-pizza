import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://67b5a50207ba6e59083dcc60.mockapi.io/pizzas/' + id
        );
        setPizza(data);
        console.log(data);
      } catch (err) {
        alert(`Ошибка при получении пиццы: ${err}`);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка....';
  }
  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='' />
      <h2>{pizza.id}</h2>
      <p>{pizza.title}</p>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
