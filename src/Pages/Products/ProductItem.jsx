import React from 'react'
import { addToCartAction } from '../../redux/reducers/shopReducer';
import { useDispatch } from 'react-redux';

export default function ProductItem(props) {
  const {item} = props;
  const dispatch = useDispatch();
  return (
  <div className='card'>
        <img src={item.image} alt="..." />
        <div className="card-body">
            <h2 style={{height: 50, fontSize: 22}}>{item.name}</h2>
            <p>{item.price}</p>
            <button onClick={() => {
              // const action = {
              //   type: 'shopReducer',
              //   payload: item
              // }
              const itemCart = {...item, quantity : 1};
              const action = addToCartAction(itemCart);
              dispatch(action);
            }} className='btn btn-success'>Add to cart <i className="fa fa-cart-plus"></i></button>
        </div>
    </div>
  )
}
