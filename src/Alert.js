import React, { useEffect } from 'react'

const Alert = (props) => {
    const { type, msg, removeAlert } = props; 
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 3000);
        return () => clearTimeout(timeout);
    }, [])
    return <p className={`alert alert-${type}`}>{msg}</p>
}
export default Alert; 