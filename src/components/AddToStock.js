import React, { useState } from 'react'
import './AddToStock.css'
import { useSelector, useDispatch } from 'react-redux'
import { AddSingleProductToStore } from '../redux/actions/productActions';


const AddToStock = () => {
    const dispatch = useDispatch();

    const Meds = useSelector((state) => state.medsReducer.items)

    if (Meds.length === 0) {
        window.location.replace("/")
    }
    const [AddedAmount, setAddedAmount] = useState(0)

    const AddToStore = (id, itemAmount,name,price,OldQuantity,QuantityOverMonth) => {
        if(itemAmount>0){
            dispatch(AddSingleProductToStore(id, itemAmount,name,price,OldQuantity,QuantityOverMonth))
        }else{
            alert("Please Add Valid Amount More Than Zero")
        }
    }
    

    return (
        <div className='storeContainer'>
            
            <div className='storeItems'>
                {
                    Meds.length > 0 && Meds.map((item, index) => {
                        return (
                            <div className='storeItem' key={index}>
                                <p className='Name'>{item.Name}</p>
                                <p className='Quantity'>{item.Quantity} : gm</p>
                                <div className='data'>
                                <input className='DataInput' type='number' min={0} placeholder='The Added Amount' onChange={(e) => { setAddedAmount(e.target.value) }} />
                                {item.UpdatedToday === true  ? <p className='Added'>Has Been Added Today</p> : <button onClick={() => { AddToStore(item._id, AddedAmount,item.Name,item.Price ,item.Quantity ,item.QuantityOverMonth) }}>Add To Store </button>}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default AddToStock
