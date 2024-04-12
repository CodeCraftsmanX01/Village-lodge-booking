import React from 'react'
import './NumberCounter.scss'
import { Plus, Minus } from './Icons'

const NumberCounter = ({
    min = 0,
    max = Math.min(),
    label = '',
    onChange,
    value
}) => {
    return (
        <div className='numberCounter'>
            <span className='controls'
                onClick={() => onChange(value + 1)}>
                <Plus className='icon' />
            </span>
            <span className='inputControls'>
                <label for='numberInput' className='inputLabel'>{label}</label>
                {/* <input type='number'
                    id='numberInput'
                    className='inputField'
                    min={min}
                    max={max}
                    //placeholder={label}
                    readOnly
                    value={value} /> */}
                <span className='inputField'>
                    {value}
                </span>
            </span>
            <span className='controls'
                onClick={() => onChange(min === value ? value : value - 1)}>
                <Minus className='icon' />
            </span>

        </div>
    )
}

export default NumberCounter