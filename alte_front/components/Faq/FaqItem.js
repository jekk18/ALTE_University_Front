import React from "react";

const FaqItem = () => {
  return (
    <li
      className={props.class}
      key={item.id}
      onClick={toggleAccordion}
    >
      <div className="faq-item-checkbox">
        <CheckboxIcon />
      </div>
      <span>{item.title}</span>
    </li>
  );
};

export default FaqItem;
