import React from 'react';

  
const SectionTitle = (props) => {
  return (
    <div className='section-title' style={{borderLeftColor: props.color ? props.color : '#074045', borderTopColor: props.color ? props.color : '#074045', borderRightColor: props.color ? props.color : '#074045'}}>
        <h1 style={{color: props.color ? props.color : '#074045'}}>{props.title}  <span style={{color: '#000'}}>{props.addTitle}</span></h1>
    </div>
  )
}

export default SectionTitle