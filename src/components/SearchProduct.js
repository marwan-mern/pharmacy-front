import React, { useState } from 'react'
import './SearchProduct.css'
import { UpdateSingleProduct, SearchItems } from '../redux/actions/productActions';
import { useDispatch } from 'react-redux'




const SearchProduct = ({ ProductItem }) => {

    const [Amount, setAmount] = useState();
    const Id = ProductItem._id;

    const dispatch = useDispatch();



    const Enter = (amount, Quantity, Name, Price) => {
        dispatch(UpdateSingleProduct(Id, amount, Quantity, Name, Price))
        setAmount(``)
        setTimeout(() => {
            dispatch(SearchItems(Name))
        }, 500)
    }

    return (
        <div className={ProductItem.Quantity <= 0 ? 'SearchProductdanger SearchProductCard' : 'SearchProductCard'}>
            <p className='SearchProductName' >
                {ProductItem.Name}
            </p>
            <div>
                {
                    <p className='SearchProductQuantity'> Quantity : {ProductItem.Quantity}  </p>
                }
            </div>

            <p className='SearchProductPrice'>
                Price : {Amount > 1 ? ProductItem.Price * Amount : ProductItem.Price} $
            </p>
            <div className='SearchProductdata'>
                <input className='SearchProductDataInput' value={Amount} type='number' min={0} placeholder='Enter Amount' onChange={(e) => { setAmount(e.target.value) }} />
                <button onClick={() => { Enter(Amount, ProductItem.Quantity, ProductItem.Name, ProductItem.Price) }}>Enter</button>
            </div>
        </div>
    )
}

export default SearchProduct
