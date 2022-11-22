import React, { useState } from 'react'
import './Product.css'
import { UpdateSingleProduct} from '../redux/actions/productActions';
import { useDispatch } from 'react-redux'




const Product = ({ ProductItem }) => {

    const [Amount, setAmount] = useState();
    const Id = ProductItem._id;

    const dispatch = useDispatch();



    const Enter = (amount , Quantity , Name , Price) => {
        dispatch(UpdateSingleProduct(Id, amount , Quantity , Name ,Price))
    }

    return (
        <div className={ProductItem.Quantity <= 0 ? 'danger Card' : 'Card'}>
            <p className='Name' >
                {ProductItem.Name}
            </p>
            <div>
                {
                     <p className='Quantity'> Quantity : {ProductItem.Quantity}  </p> 
                }
            </div>
            
            <p className='Price'>
                Price : {Amount>1 ? ProductItem.Price * Amount : ProductItem.Price} $
            </p>
            <div className='data'>
                <input className='DataInput' type='number' min={0} placeholder='Enter Amount' onChange={(e) => { setAmount(e.target.value) }} />
                <button onClick={() => { Enter(Amount , ProductItem.Quantity , ProductItem.Name ,ProductItem.Price) }}>Enter</button>
            </div>
        </div>
    )
}

export default Product
