import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import './Gain.css'
import { ResetDailyGain } from '../redux/actions/productActions';


const Gain = () => {
    const gain = useSelector((state) => state.TotalGain.gain)
    const dispatch = useDispatch();


    const GetGain = () => {
        let Password = prompt("What is Your Password?")
        if (Password === '123') {
            document.getElementById('Gain').classList.remove('hidden')
        }else(
            alert('Wrong Password')
        )
    }

    const ResetGain=()=>{
        let Password = prompt("What is Your Password?")
        if (Password === '123') {
            dispatch(ResetDailyGain())
        }else(
            alert('Wrong Password')
        )
    }

    const HideGain = () => {
        document.getElementById('Gain').classList.add('hidden')
    }


    return (
        <div className='GainContainer'>
            <p id='Gain' className='Gain hidden'>
                Total Gain : <span className='GainValue'> {gain} $</span>
            </p>
            <div className='GainDiv'>
                <button className='ResetGain' onClick={()=>{ResetGain()}}>
                    Reset Daily gain
                </button>
                <button className='ShowGain' onClick={() => { GetGain() }}>
                    Show Daily Gain
                </button>
                <button className='HideGain' onClick={() => { HideGain() }}>
                    Hide Daily Gain
                </button>
            </div>
        </div>
    )
}

export default Gain
