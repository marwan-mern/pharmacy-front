import React from 'react'
import './Report.css'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAddedItemReport } from '../redux/actions/productActions';


const Report = () => {
    const dispatch = useDispatch();
    const gain = useSelector((state) => state.TotalGain.gain)
    const lackedItems = useSelector((state) => state.getlack.lack)
    const Meds = useSelector((state) => state.medsReducer.items)
    const AddedProducts = useSelector((state) => state.getDailyAdded.Added)
    let AddedTodayCost = 0;

    const LackedItemsArray = [];
    const ProductsQuantityArray = [];
    const ProductsAddedToday = [];
    const AllProductNameWithMontlySell = [];
    const AllStoreProductsNameWithQuantityWithCost = [];

    Meds.length > 0 && Meds.map((item) => {
        return (
            AllProductNameWithMontlySell.push(`Name :${item.Name}`, `The Sold Quantity In This Month :${(item.QuantityOverMonth - item.Quantity)}`)
           
        )
    })
    Meds.length > 0 && Meds.map((item) => {
        return (
            AllStoreProductsNameWithQuantityWithCost.push(`Name :${item.Name}`, `Quantity :${item.Quantity}`, `Total Cost:${item.Quantity*item.Price}`)
           
        )
    })

    Meds.length > 0 && Meds.map((Product) => {
        return (ProductsQuantityArray.push(Product.Name, Product.Quantity))
    })

    lackedItems.map((lackedItem) => {
        return (
            LackedItemsArray.push(lackedItem.Name)
        )
    })

    AddedProducts && AddedProducts.map((product) => {
        return (AddedTodayCost = AddedTodayCost + product.Quantity * product.Price,
            ProductsAddedToday.push(`Name:${product.Name}`,`Quantity:${product.Quantity}`))
    })





    if (gain.length === 0) {
        window.location.replace("/")
    }


    const DailyReset = async (id) => {
        dispatch(DeleteAddedItemReport(id))
    }
   



    return (
        <div className='ReportContainer'>
        
            <div className='Daily'>
                <a  className='SendReport' href={'https://wa.me/2001067889532?text=' +
                    'Daily Gain Is :' + gain + "%0a" +
                    '_ Lacked Items In The Store :' + LackedItemsArray + "%0a" +
                    '_ Added Items today In the Store With Quantity:' + ProductsAddedToday + "%0a" +
                    '_ Added Today Cost:' + AddedTodayCost + "%0a" +
                    '_ Total Profit Is :' + (gain - AddedTodayCost)} rel='noreferrer' target="_blank">Send WhatsApp Daily Report</a>
                <div className='AddedToday'>
                    <p className='AddedTitle'>Today Added Items Need To Reset After Sending The Daily Report</p>
                    <div className='AddedItems'>
                        {
                            AddedProducts && AddedProducts.map((product) => {
                                return (
                                    <div className='AddedItem' key={product._id}>
                                        <p className='AddedItemName'>{product.Name}</p>
                                        <button onClick={() => { DailyReset(product._id) }}>Daily Reset For {product.Name}</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='Montly'>
                <a className='SendReport' href={'https://wa.me/2001067889532?text=' +
                    'Monthly Report :' + AllProductNameWithMontlySell+ "%0a"
                } rel='noreferrer' target="_blank">Send WhatsApp Montly Report</a>
                <p className='AddedTitle'>Don't Forget To Reset All The Items In The Store After Sending The Montly Report</p>
            </div>

            <div className='Montly'>
                <a className='SendReport' href={'https://wa.me/2001067889532?text=' +
                    'Store Report :' + AllStoreProductsNameWithQuantityWithCost+ "%0a"
                } rel='noreferrer' target="_blank">Send WhatsApp Store Report</a>
            </div>


        </div>
    )
}

export default Report
