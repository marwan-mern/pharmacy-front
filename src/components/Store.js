import React from 'react'
import './Store.css'
import { useSelector,useDispatch } from 'react-redux'
import { ResetSingleProduct } from '../redux/actions/productActions';



const Store = () => {
    const dispatch = useDispatch();

    const Meds = useSelector((state) => state.medsReducer.items)

    if (Meds.length === 0) {
        window.location.replace("/")
    }

    const Reset =(id,itemQuantity)=>{
        dispatch(ResetSingleProduct(id,itemQuantity))
    }

    return (
        <div className='storeContainer'>
            <div className='storeItems'>

                {
                    Meds.length > 0 && Meds.map((item, index) => {
                        return (
                            <div className={item.Quantity <= 0 ? 'storeItem dangers' : 'storeItem'} key={index}>
                                <p className='Name'>{item.Name}</p>
                                <p className='Quantity'>{item.Quantity} : gm</p>
                                <button className={item.Quantity===item.QuantityOverMonth? 'hide': ' '} onClick={()=>{Reset(item._id,item.Quantity)}}>Monthly Reset</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Store
