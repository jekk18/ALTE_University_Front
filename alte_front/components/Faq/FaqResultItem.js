import React, { useState } from 'react'
import FaqResultArrow from '../Icons/FaqResultArrow'

const FaqResultItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`f-result-item ${isOpen ? 'f-result-open' : ''}`} onClick={() => {
            setIsOpen(!isOpen)
        }}>
            <div className="faq-item-1-title">
                <h1 className='geo-font-bold-caps'>{props.title}</h1>
                <FaqResultArrow />
            </div>
            <div className="faq-description">
                <h2 className='geo-font-bold-caps'>{props?.directories ? props?.directories[0]?.title : ''}</h2>
                <div className="f-desc geo-font-medium" dangerouslySetInnerHTML={{ __html: props.desc }} />
            </div>
        </div>
    )
}

export default FaqResultItem