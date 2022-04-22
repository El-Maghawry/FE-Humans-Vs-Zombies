import React, { useState, useRef } from 'react'
import './Collapsable.css'

const Collapsible = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const parentRef = useRef()

    return (
        <div className='collapsible'>
            <button className='toggle' onClick={() => setIsOpen(!isOpen)}>
                {label}
            </button>
            <div
                className='content-parent'
                ref={parentRef}
                style={
                    isOpen
                        ? {
                            height: parentRef.current.scrollHeight + 'px',
                        }
                        : {
                            height: '0px',
                        }
                }
            >
                <div className='content'>{children}</div>
            </div>
        </div>
    )
}

export default Collapsible
