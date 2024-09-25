import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delItemAction, changeQuantityAction } from "../../redux/reducers/shopReducer";
export default function Carts(props) {
  let { cart } = useSelector((state) => state.shopReducer);
  const total = cart.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Carts</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img src={item.image} alt="..." style={{ width: 50 }} />
                </td>
                <td>{item.price.toLocaleString()}</td>
                <td>
                  <button className="btn btn-outline-primary mr-2" onClick={() => {
                    const itemQuantity = {
                      id: item.id,
                      quantity: 1
                    }
                    const action = changeQuantityAction(itemQuantity);
                    dispatch(action);
                  }}>+</button>
                  {item.quantity}
                  <button className="btn btn-outline-primary ml-2" onClick={() => {
                    const itemQuantity = {
                      id: item.id,
                      quantity: -1
                    }
                    const action = changeQuantityAction(itemQuantity);
                    dispatch(action);
                  }}>-</button>
                </td>
                <td>{(item.price * item.quantity).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => {
                      const action = delItemAction(item.id);
                      dispatch(action);
                    }}
                    className="btn btn-danger"
                  >
                    Del
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}></td>
            <td>Total</td>
            <td>{total.toLocaleString()}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
