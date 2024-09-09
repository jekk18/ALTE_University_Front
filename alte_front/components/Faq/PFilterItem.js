import React, { useEffect, useState } from 'react'
import CheckboxIcon from '../Icons/CheckboxIcon';
import { useRouter } from 'next/router';

const PFilterItem = (props) => {
  const [isOpen, setIsOpen] = useState(props.selected ?? false);

  const toggleClick = (event) => {
    setIsOpen(!isOpen);
    props.check(props.value, !isOpen)
  }
  useEffect(() => {
    if (!props.clear) {
      setIsOpen(props.clear)
    }
  }, [props.clear])

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

export default PFilterItem