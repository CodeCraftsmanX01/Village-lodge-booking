import React from 'react'
import toast from 'react-hot-toast'
import { Info, Cross } from '../../common/icons';
import './Notifications.scss'

const createNotification = (type, message = '', subMessage = '') => {
    switch (type) {
        case 'info':
            return toast(
                (t) => (
                    <div className='customNotificationElements'>
                        <span className='customNotificationText '>
                            <span>{message}</span>
                            <span>{subMessage}</span>
                        </span>
                        <i onClick={() => toast.dismiss(t.id)}><Cross style={{ width: '15px', height: '15px' }} fill='white' /></i>
                    </div>
                ),
                {
                    className: 'customNotification',
                    style: {
                        backgroundColor: '#2f96b4',
                        color: 'white',
                        fontWeight: 400,
                    },
                    icon: <Info style={{ width: '25px', height: '25px' }} fill='white' />,
                    id: message,
                }
            )
        case 'success':
            return toast.success((t) => (
                <div className='customNotificationElements'>
                    <span className='customNotificationText '>
                        <span>{message}</span>
                        <span>{subMessage}</span>
                    </span>
                    <i onClick={() => toast.dismiss(t.id)}><Cross style={{ width: '15px', height: '15px' }} fill='#ff4b4b' /></i>
                </div>
            ))
        case 'loading':
            return toast.loading((t) => (
                <div className='customNotificationElements'>
                    <span className='customNotificationText '>
                        <span>{message}</span>
                        <span>{subMessage}</span>
                    </span>
                    <i onClick={() => toast.dismiss(t.id)}><Cross style={{ width: '15px', height: '15px' }} fill='#ff4b4b' /></i>
                </div>
            ))
        case 'error':
            return toast.error((t) => (
                <div className='customNotificationElements'>
                    <span className='customNotificationText '>
                        <span>{message}</span>
                        <span>{subMessage}</span>
                    </span>
                    <i onClick={() => toast.dismiss(t.id)}><Cross style={{ width: '15px', height: '15px' }} fill='#ff4b4b' /></i>
                </div>
            ))
        default:
            //console.log('error in notification')
            break
    }
}

export const createNotificationPromise = (promise, loadingMsg = '', successMsg = '', errorMsg = '') => {
    return toast.promise(promise, {
        loading: (t) => (
            <div className='customNotificationElements'>
                <span className='customNotificationText '>
                    <span>{loadingMsg}</span>
                </span>
                <i onClick={() => toast.dismiss(t.id)}><Cross style={{ width: '15px', height: '15px' }} fill='#ff4b4b' /></i>
            </div>
        ),
        success: (t) => (
            <div className='customNotificationElements'>
                <span className='customNotificationText '>
                    <span>{successMsg}</span>
                </span>
                <i onClick={() => toast.dismiss(t.id)}><Cross style={{ width: '15px', height: '15px' }} fill='#ff4b4b' /></i>
            </div>
        ),
        error: (t) => (
            <div className='customNotificationElements'>
                <span className='customNotificationText '>
                    <span>{errorMsg}</span>
                </span>
                <i onClick={() => toast.dismiss(t.id)}><Cross style={{ width: '15px', height: '15px' }} fill='#ff4b4b' /></i>
            </div>
        ),
    })
}

export default createNotification