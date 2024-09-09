import React from 'react';


const SubscribeItem =  (props) => { 
    
    const handleClick = (e) => {
        props.clickHandleSubscribe(e, !props.activeId);
    }
     
  return (
    <li id={props.itemId} onClick={handleClick} className={props.activeId ? 'actiev-sub-item geo-font-bold' : 'geo-font-bold'} title={props.subscribeItemsTitle}>
        {props.subscribeItemsTitle}
    </li>
  )
};

export default SubscribeItem;