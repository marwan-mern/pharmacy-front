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

export const UpdateSingleProduct = (id, amount , Quantity , Name , Price) => {

    return async (dispatch, getState) => {

        if (Quantity > 0) {
            const response = await api.patch(`/meds/${id}`, { Quantity: Quantity - amount  })
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

export const ResetDailyGain = () => {
    return async (dispatch, getState) => {
        const ResetDailyGainResponse = await api.patch(`/gain`, { totalGain: 0 })
        dispatch({ type: ActionTypes.DAILY_GAIN, payload: ResetDailyGainResponse.data.TotalGain })
    }

}



export const AddSingleProductToStore = (AddedId, AdedQuantity, Name, price ,OldQuantity,QuantityOverMonth) => {
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
        const AddMedecine = await api.post(`/meds`, { Name: AddedName , Quantity:AddedQuantity,Price:AddedPrice,type:AddedType,QuantityOverMonth:AddedQuantity,UpdatedToday:false })
        dispatch({ type: ActionTypes.ADD_MEDECINE, payload: AddMedecine.data })
        alert(`Successfully Added ${AddMedecine.data.Name}`)
    }
}

export const DeleteMedecineFromStock = (DeletedName) => {
    return async (dispatch, getState) => {
      const DeleteMedecine =  await api.delete(`/meds/${DeletedName}`)
      if(DeleteMedecine.data.message===null){
          alert(`Please Write a Correct Name`)
      }else{
          alert(`Successfully Deleted ${DeleteMedecine.data.message.Name}`)
      }
    }
}

export const SearchItems = (searchItem) => {
    return async (dispatch, getState) => {
        const response = await api.get(`/meds/search`,{params:{searchItem:searchItem}})
        dispatch({ type: ActionTypes.SEARCH_ITEMS, payload: response.data })
    }
};



