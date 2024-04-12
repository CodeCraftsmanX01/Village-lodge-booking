import React, { useRef, useState } from 'react'
import { Cross, Upload } from '../../../common/icons'
import './FileUpload.scss'

const FileUpload = ({
    handlerKey = '',
    value,
    onChangeField,
    labelText = '',
    required = false,
    accept = '',
    multiple = false,
    error = false,
    helperText = '',
    clearingMethod,
    textFieldValue
}) => {
    const [fileName, setFileName] = useState(labelText)
    const inputRef = useRef()

    const onChangeHandler = (event) => {
        setFileName(event.target.files[0].name)
        onChangeField(handlerKey, event.target.files)
    }

    const browseHandler = () => {
        inputRef.current.click()
    }

    const clearinput = () => {
        clearingMethod && clearingMethod(inputRef.current.files, handlerKey)
        inputRef.current.value = ''
        setFileName(labelText)
    }

    return <div className='customFileUpload'>
        <div className='controlsContainer'>
            <span className='fileUploadIcons' onClick={browseHandler}>
                <Upload fill={error ? "#e30000" : "#7f7f7f"} />
            </span>
            <label className='fileUploadLabel'>
                {fileName}
            </label>
            {
                fileName !== labelText &&
                <span className='fileUploadIcons' onClick={clearinput}>
                    <Cross
                        width='15px'
                        height='15px'
                        fill="#e30000" />
                </span>
            }
            <input
                ref={inputRef}
                id={labelText}
                type='file'
                onChange={onChangeHandler}
                className='fileInput'
                required={required}
                accept={accept}
                multiple={multiple}
            />
        </div>
        <div className='helperTextContainer'>
            <span className='helperText'>{helperText}</span>
        </div>

    </div>

}

export default FileUpload