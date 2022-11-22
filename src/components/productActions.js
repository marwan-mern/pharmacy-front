import { ActionTypes } from "../constants/actionTypes";
import api from '../../api/items.js'



export const fetchMeds = () => {

    return async (dispatch, getState) => {
        const response = await api.get('/meds')
        dispatch({ type: ActionTypes.FETCH_Meds, payload: response.data })

        const responseOfGain = await api.get('/gain')
        dispatch({ type: ActionTypes.DAILY_GAIN, payload: responseOfGain.data })

        const responseOfDailyAll = await api.get('/AddedToday')
        dispatch({ type: ActionTypes.FETCH_Daily_Added_Products, payload: responseOfDailyAll.data })

        const responseTables = await api.get('/Tables')
        dispatch({ type: ActionTypes.AllTables, payload: responseTables.data })

        const responseOfBuyDailyAll = await api.get('/BuyToday')
        dispatch({ type: ActionTypes.FETCH_Daily_Buy_Products, payload: responseOfBuyDailyAll.data })
    }

};

export const FindLackedItems = () => {

    return async (dispatch, getState) => {
        const response = await api.get('/meds')
        const LackItems = response.data.filter((item) => {
            return item.Quantity <= 0
        })
        dispatch({ type: ActionTypes.LACK_ITEMS, payload: LackItems })
    }
};

export const ResetSingleProduct = (id, itemQuantity) => {
    return async (dispatch, getState) => {
        const response = await api.patch(`/meds/${id}/reset`, { QuantityOverMonth: itemQuantity })
        dispatch({ type: ActionTypes.RESET_SINGLE_PRODUCT, payload: response.data })

        const responseAll = await api.get('/meds')
        dispatch({ type: ActionTypes.FETCH_Meds, payload: responseAll.data })

    }
};

export const UpdateSingleProduct = (id, amount, Quantity, Name, Price, defaultValue) => {

    return async (dispatch, getState) => {

        if (Quantity > 0) {
            const response = await api.patch(`/meds/${id}`, { Quantity: Quantity - amount * defaultValue })
            dispatch({ type: ActionTypes.REDUCE_QUANTITY, payload: response.data })

            const responseAll = await api.get('/meds')
            dispatch({ type: ActionTypes.FETCH_Meds, payload: responseAll.data })

            const SingleGainResponse = await api.patch(`/gain`, { totalGain: getState().TotalGain.gain + Price * amount })
            dispatch({ type: ActionTypes.DAILY_GAIN, payload: SingleGainResponse.data.TotalGain })
        } else {
            alert("No More " + Name + " In The Store")
        }

    }

};

export const UpdateMixProduct = (Id, amount, Quantity, Name, Price, combination) => {

    return async (dispatch, getState) => {

        const IdsLength = combination.ids.length
        const IdsOfLoop = []

        const map = combination.ids.map(async (id, index) => {


            const MixedItem = await api.get(`/meds/search`, { params: { searchItem: id } })
            if (MixedItem.data.Quantity <= 0) {
                alert("No More " + MixedItem.data.name + " In The Store")
            }
            else {
                IdsOfLoop.push(id);
            }
        })
        return Promise.all(map).then(async () => {
            if (IdsOfLoop.length === IdsLength) {
                //Da kda m3nah En kol elRequired Items Mwgoda
                IdsOfLoop.map(async (idAfterChech, index) => {

                    // const MixedItemAfterCheck = await api.get(`/items/${idAfterChech}`);
                    const MixedItemAfterCheck = await api.get(`/meds/search`, { params: { searchItem: idAfterChech } })

                    const UpdatedResponse = await api.patch(`/meds/${idAfterChech}/Mix`, { Quantity: MixedItemAfterCheck.data[0].Quantity - combination.Quantities[index] * amount });
                    dispatch({ type: ActionTypes.REDUCE_QUANTITY, payload: UpdatedResponse.data });

                    const response = await api.get('/meds')
                    dispatch({ type: ActionTypes.FETCH_Meds, payload: response.data })
                })



                const MixGainResponse = await api.patch(`/gain`, { totalGain: getState().TotalGain.gain + Price * amount })
                dispatch({ type: ActionTypes.DAILY_GAIN, payload: MixGainResponse.data.TotalGain })
            } else { alert(`Can't Make ${Name}`) }
        })


    }

};

export const ResetDailyGain = () => {
    return async (dispatch, getState) => {
        const ResetDailyGainResponse = await api.patch(`/gain`, { totalGain: 0 })
        dispatch({ type: ActionTypes.DAILY_GAIN, payload: ResetDailyGainResponse.data.TotalGain })
    }

}



export const AddSingleProductToStore = (AddedId, AdedQuantity, Name, price, OldQuantity, QuantityOverMonth) => {
    return async (dispatch, getState) => {
        const response = await api.patch(`/meds/${AddedId}/AddToStock`, {
            Quantity: OldQuantity + parseInt(AdedQuantity),
            QuantityOverMonth: QuantityOverMonth + parseInt(AdedQuantity)
        })
        dispatch({ type: ActionTypes.ADD_TO_STORE, payload: response.data })

        const responseDaily = await api.post(`/AddedToday`, { _id: AddedId, name: Name, Quantity: AdedQuantity, Price: price })
        dispatch({ type: ActionTypes.DAILY_ADDED, payload: responseDaily.data })

        await api.patch(`/meds/${AddedId}/updateAddedToday`, { UpdatedToday: true })

        // // De m7tota 34an trg3 el added 3la a5r wad3
        const responseOfDailyAll = await api.get('/AddedToday')
        dispatch({ type: ActionTypes.FETCH_Daily_Added_Products, payload: responseOfDailyAll.data })

        const responseAll = await api.get('/meds')
        dispatch({ type: ActionTypes.FETCH_Meds, payload: responseAll.data })
    }
};

export const DeleteAddedItemReport = (id) => {
    return async (dispatch, getState) => {

        await api.delete(`/AddedToday/${id}`);

        const ResponseToBeFalse = await api.patch(`meds/${id}/updateAddedTodayFalse`, { UpdatedToday: false })
        dispatch({ type: ActionTypes.ADDED_TO_FALSE, payload: ResponseToBeFalse.data })

        const responseOfDailyAll = await api.get('/AddedToday')
        dispatch({ type: ActionTypes.FETCH_Daily_Added_Products, payload: responseOfDailyAll.data })


    }
};

export const AddMedecineToStock = (AddedName, AddedQuantity, AddedPrice, AddedType) => {
    return async (dispatch, getState) => {
        const AddMedecine = await api.post(`/meds`, { Name: AddedName, Quantity: AddedQuantity, Price: AddedPrice, type: AddedType, QuantityOverMonth: AddedQuantity, UpdatedToday: false })
        dispatch({ type: ActionTypes.ADD_MEDECINE, payload: AddMedecine.data })
        alert(`Successfully Added ${AddMedecine.data.Name}`)
    }
}

export const DeleteMedecineFromStock = (DeletedName) => {
    return async (dispatch, getState) => {
        const DeleteMedecine = await api.delete(`/meds/${DeletedName}`)
        if (DeleteMedecine.data.message === null) {
            alert(`Please Write a Correct Name`)
        } else {
            alert(`Successfully Deleted ${DeleteMedecine.data.message.Name}`)
        }
    }
}

export const AddOrderToTable = (uniqueId, NumberOfTable, amount, ProductItem) => {

    return async (dispatch, getState) => {
        const OrderedTable = getState().AddedTables.Tables[NumberOfTable - 1];
        console.log(OrderedTable)
        let { uniqueIds, prices, quantities, types } = OrderedTable.orders
        let TotalCost
        uniqueIds = uniqueIds.push(uniqueId)
        prices = prices.push(Number(ProductItem.Price * amount))
        quantities = quantities.push(amount)
        types = types.push(ProductItem.Name)


        if (OrderedTable.orders.prices.length > 1) {
            TotalCost = OrderedTable.orders.prices.reduce((a, b) => a + b)
            console.log(TotalCost)
        } else {
            TotalCost = ProductItem.Price * amount
            console.log(TotalCost)
        }

        const response = await api.patch(`/Tables/${NumberOfTable}`, { orders: OrderedTable.orders, empty: false, TotalCost: TotalCost })
        console.log(response.data)
        dispatch({ type: ActionTypes.AddOrder, payload: response.data })

        const responseTables = await api.get('/Tables')
        dispatch({ type: ActionTypes.AllTables, payload: responseTables.data })
    }

};

export const UpdateOrder = (tableNumber, tableOrdersIndex) => {
    return async (dispatch, getState) => {
        const OrderedTable = getState().AddedTables.Tables[tableNumber - 1]

        let { uniqueIds, prices, quantities, types } = OrderedTable.orders
        const testprice = prices[tableOrdersIndex];
        const testUniqueId = uniqueIds[tableOrdersIndex];
        const testQuantity = quantities[tableOrdersIndex];

        const AllItems = await api.get('/meds')

        const testProductObject = AllItems.data.find((product) => { return product.uniqueId === testUniqueId })
        if (testProductObject.Mix === true) {
            testProductObject.combination.Quantities.map(async (Quantity, i) => {
                const currentId = testProductObject.combination.ids[i];
                // console.log(currentId)

                const AllItems = await api.get('/meds')
                console.log(AllItems.data)
                const CurrentProductObject = AllItems.data.find((product) => { return parseInt(product.uniqueId) === currentId })
                // console.log(CurrentProductObject)

                const response = await api.patch(`/meds/${currentId}/AddToStockAfterRemove`, {
                    Quantity: CurrentProductObject.Quantity + parseInt(testQuantity*Quantity),
                    QuantityOverMonth: CurrentProductObject.QuantityOverMonth + parseInt(testQuantity*Quantity)
                })
                // console.log(response)

                dispatch({ type: ActionTypes.ADD_TO_STORE, payload: response.data })
            })
        } else {
            const response = await api.patch(`/meds/${testUniqueId}/AddToStockAfterRemove`, {
                Quantity: testProductObject.Quantity + parseInt(testQuantity * testProductObject.default),
                QuantityOverMonth: testProductObject.QuantityOverMonth + parseInt(testQuantity * testProductObject.default)
            })
            dispatch({ type: ActionTypes.ADD_TO_STORE, payload: response.data })
        }

        // console.log(`Price:`+testprice)
        // console.log(`uniqueId:`+testUniqueId)
        // console.log(`Quantity:`+testQuantity)



        const SingleGainResponse = await api.patch(`/gain`, { totalGain: getState().TotalGain.gain - testprice })
        dispatch({ type: ActionTypes.DAILY_GAIN, payload: SingleGainResponse.data.TotalGain })

        uniqueIds = uniqueIds.splice(tableOrdersIndex, 1)
        prices = prices.splice(tableOrdersIndex, 1)
        quantities = quantities.splice(tableOrdersIndex, 1)
        types = types.splice(tableOrdersIndex, 1)

        let TotalCost
        if (OrderedTable.orders.prices.length === 0) {
            TotalCost = 0;
        } else {
            TotalCost = OrderedTable.orders.prices.reduce((a, b) => a + b)
        }

        const updatedOrder = await api.patch(`/Tables/${tableNumber}`, { orders: OrderedTable.orders, TotalCost: TotalCost })
        dispatch({ type: ActionTypes.UpdateOrderItem, payload: updatedOrder.data })

        const responseTables = await api.get('/Tables')
        dispatch({ type: ActionTypes.AllTables, payload: responseTables.data })

        // const responseAll = await api.get('/items')
        // dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: responseAll.data })
        
    }

}

export const RemoveTableFromOrders = (tableNumber) => {
    return async (dispatch, getState) => {

        const OrderedTable = getState().AddedTables.Tables[tableNumber - 1]
        let { prices, quantities, types ,uniqueIds} = OrderedTable.orders
        uniqueIds = uniqueIds.splice(0, OrderedTable.orders.uniqueIds.length)
        prices = prices.splice(0, OrderedTable.orders.prices.length)
        quantities = quantities.splice(0, OrderedTable.orders.quantities.length)
        types = types.splice(0, OrderedTable.orders.types.length)


        const DeletedTable = await api.patch(`/Tables/${tableNumber}`, { orders: OrderedTable.orders, empty: true, TotalCost: 0 })
        dispatch({ type: ActionTypes.DeleteTable, payload: DeletedTable.data })
        console.log(DeletedTable.data)

        const responseTables = await api.get('/Tables')
        dispatch({ type: ActionTypes.AllTables, payload: responseTables.data })

        // const responseAll = await api.get('/items')
        // dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: responseAll.data })
    }

}

export const BuyTodayProduct = (tableNumber,orders,TotalCost) => {
    return async (dispatch, getState) => {
        const BuyMedecine = await api.post(`/BuyToday`, { TableNumber: tableNumber, orders: orders, TotalCost: TotalCost, Date: (new Date()).setHours((new Date()).getHours() + 2) })
        dispatch({ type: ActionTypes.Add_Buy_MEDECINE, payload: BuyMedecine.data })

        const responseOfBuyDailyAll = await api.get('/BuyToday')
        dispatch({ type: ActionTypes.FETCH_Daily_Buy_Products, payload: responseOfBuyDailyAll.data })

        ///////Add to buy database for save not to use in app
        await api.post(`/AllBuyData`, { TableNumber: tableNumber, orders: orders, TotalCost: TotalCost, Date: (new Date()).setHours((new Date()).getHours() + 2) })
    }
}

export const ResetBuyTodaty = () => {
    return async (dispatch, getState) => {

        await api.delete(`/BuyToday`)

    }
}

// export const SearchItems = (searchItem) => {
//     return async (dispatch, getState) => {
//         const response = await api.get(`/meds/search`,{params:{searchItem:searchItem}})
//         dispatch({ type: ActionTypes.SEARCH_ITEMS, payload: response.data })
//     }
// };



