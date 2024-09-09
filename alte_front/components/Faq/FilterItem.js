import React, { useState } from "react";
import CheckboxIcon from "../Icons/CheckboxIcon";
import { useEffect } from "react";

const FilterItem = (props) => { 
    const [isOpen, setIsOpen] = useState(props.selected ?? false);
  
    const toggleClick = (event) => {
      setIsOpen(!isOpen);
      props.check(props.value, !isOpen) 
    } 
   
    useEffect(() => { setIsOpen(props.selected) }, [props.selected])
  
    return (
      <li
        className={`faq-select-item ${props.class} ${isOpen ? "faq-select-item-active" : ""
          }`}
        onClick={toggleClick}
      >
        <div className="faq-item-checkbox">
          <CheckboxIcon />
        </div>
        <h5>{props.title}</h5>
      </li>
    );
  };

export default FilterItem;