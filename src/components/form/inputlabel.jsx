import React from 'react'
export default function Inputlabel({type ,label, placeholder, value, change, name}) {
    return (
        <>  
            <div className="form-group">
                <label htmlFor={label}>{label}</label>
                <input type={type} className="form-control" name={name} id={label} placeholder={placeholder} value={value} onChange={change}/>
            </div>
        </>
    )
}