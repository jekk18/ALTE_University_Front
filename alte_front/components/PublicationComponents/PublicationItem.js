import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/core/Translations/context";



const PublicationItem = (props) => {
  const topicFilter = props?.topics?.filter((x) => x.type_id === 2);
  const TypeFilter = props?.topics?.filter((x) => x.type_id !== 2);
  const translations = useTranslations();


  return (
    <div className="publication-item" style={{ pointerEvents: props.slug ? 'initial' : 'none' }}>
      <Link href={props.slug[0]?.slug}>
        <div className="publication-image">
          {props.imgData[0]?.file ?
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.imgData[0].file}`} alt={props.imgData[0].name} loading="lazy"/>
            :
            <img src="/img/defaultNews.png" alt="default" loading="lazy" />
          }
        </div>
        <div className="publication-text">
          <h2>{props.title}</h2>
          <span>{props.year}</span>
          <div className="publication-type">
            <span>{translations?.type}:</span>  {TypeFilter.length > 0 ? TypeFilter[0]?.title : ''}
          </div>
          <div className="publication-topics">
            <span>{translations?.topics} : </span>{topicFilter?.map((item) => {
              return item.title
            }).join(', ')}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PublicationItem;
