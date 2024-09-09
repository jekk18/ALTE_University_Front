import Link from "next/link";
import React from "react";

const Breadcrumb = (props) => {
  let language; 
  
if(props.BrItems)
{
  language = props.BrItems[0].url.split("/")[0];
}
  return (
    <div className="container">
      <div className="breadcrumbs">
        <div className="br-item" >
          <span>/</span>
          <Link href={language === "en" ? "en/" : "ka/"} className="geo-font-medium-caps">
            {language === "en" ? "Home" : "მთავარი"}
          </Link>
        </div> 
        {props.BrItems?.map((item, index) => {
          return (
            <div className="br-item" key={index}>
              <span>/</span>
              <Link href={item.url} className="geo-font-medium-caps">{item.title}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
