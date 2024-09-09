import React from "react";
import Linkdin from "../Icons/Linkdin";
import Link from "next/link";

const PersonnelItem = (props) => {
  return (
    <div className="personnel-item">
      <div className="pesronnel-img">
        <Link
          href={props.slug ? props.slug[0]?.slug : "#"}
          style={{ pointerEvents: props.slug ? "initial" : "none" }}
        >
          {props.imgData[0]?.file ? (
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props?.imgData[0]?.file}`}
              alt={props?.imgData[0]?.name}
              loading="lazy"
            />
          ) : (
            <img src="/img/defaultNews.png" alt="default" loading="lazy"/>
          )}
        </Link>

        <h3 className={props.class? props.class : ''}>{props?.posType ? props?.posType : ''}</h3> 
      </div>
      <div className="info">
        {props.linkdinLink && (
          <a href={props.linkdinLink} className="linkdin-cont"  target="blank">
            <Linkdin />
          </a>
        )}

        <Link
          href={props.slug ? props.slug[0]?.slug : "#"}
          style={{ pointerEvents: props.slug ? "initial" : "none" }}
        >
          <h1>{props.personName}</h1>
        </Link>
        <Link
          href={props.slug ? props.slug[0]?.slug : "#"}
          style={{ pointerEvents: props.slug ? "initial" : "none" }}
        >
          <div className="text"> {props?.position ? props?.position : ""}</div>
        </Link>
        {props.personEmail && (
          <a href="mailto:" className="person-email">
            {props.personEmail}
          </a>
        )}
      </div>
    </div>
  );
};

export default PersonnelItem;
