import React, { useState } from 'react'
import './AddProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { AddMedecineToStock, DeleteMedecineFromStock } from '../redux/actions/productActions';


const AddToStock = () => {
    const dispatch = useDispatch();
    const Meds = useSelector((state) => state.medsReducer.items)


    if (Meds.length === 0) {
        window.location.replace("/")
    }


    const [AddedName, setAddedName] = useState()
    const [AddedQuantity, setAddedQuantity] = useState()
    const [AddedPrice, setAddedPrice] = useState()
    const [AddedType, setAddedType] = useState()

    const [DeletedName, setDeletedName] = useState()




    const AddProduct = (AddedName, AddedQuantity, AddedPrice, AddedType) => {
        if (!AddedName || !AddedQuantity || !AddedPrice || !AddedType) {
            alert('Please Fill All The Inputs')
        } else {
            let Password = prompt("What is Your Password?")
            if (Password === '123') {
                dispatch(AddMedecineToStock(AddedName, AddedQuantity, AddedPrice, AddedType))
                setAddedName('')
                setAddedQuantity(0)
                setAddedPrice(0)
                setAddedType('')
            } else {
                alert('Wrong Password')
            }
        }
    }
    const DeleteProduct = (DeletedName) => {
        if (!DeletedName) {
            alert('Please Fill All The Deleted Name')
        } else {
            let Password = prompt("What is Your Password?")
            if (Password === '123') {
                dispatch(DeleteMedecineFromStock(DeletedName))
                setDeletedName('')
            } else {
                alert('Wrong Password')
            }
        }
    }



    return (
        <div className='storeContainerAddedProduct'>
            <div className='dataAddedProduct'>
                <span>Add Medicine</span>
                <input className='DataInputAddedProduct' value={AddedName} type='text' placeholder='The Added Name' onChange={(e) => { setAddedName(e.target.value) }} />
                <input className='DataInputAddedProduct' value={AddedQuantity} type='number' min={0} placeholder='The Added Quantity' onChange={(e) => { setAddedQuantity(e.target.value) }} />
                <input className='DataInputAddedProduct' value={AddedPrice} type='number' min={0} placeholder='The Added Price' onChange={(e) => { setAddedPrice(e.target.value) }} />
                <input className='DataInputAddedProduct' value={AddedType} type='text' placeholder='The Added Type' onChange={(e) => { setAddedType(e.target.value) }} />
                <button onClick={() => { AddProduct(AddedName, AddedQuantity, AddedPrice, AddedType) }} >Add To Store </button>
            </div>
            <div className='dataAddedProduct'>
                <span>Delete Medicine</span>
                <input className='DataInputAddedProduct' value={DeletedName} type='text' placeholder='The Deleted Name' onChange={(e) => { setDeletedName(e.target.value) }} />
                <button onClick={() => { DeleteProduct(DeletedName) }} >Delete From Store </button>
            </div>
        </div>
    )
}

export default AddToStock
