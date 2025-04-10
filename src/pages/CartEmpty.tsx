import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>Корзина пустая 😕</h2>
    <p>
      Вероятнее всего, вы ещё не заказывали пиццу.
      <br />
      Для того, чтобы заказать пиццу, перейдите на главную страницу.
    </p>
    <img
      src="https://img.freepik.com/premium-vector/laundry-basket-plastic-empty-basket-icon-vector-illustration_538002-1129.jpg?semt=ais_hybrid"
      alt="Empty cart"
    />
    <Link to="/" className="button button--black">
      <span>Вернуться назад</span>
    </Link>
  </div>
);

export default CartEmpty;
