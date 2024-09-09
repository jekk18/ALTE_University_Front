import React from 'react';
import Link from 'next/link';
import { useTranslations } from "@/core/Translations/context";
const SeeAllLink = (props) => {
  const translations = useTranslations();
  return (
    <div className={props.classNam}> 
      <h1>{props.title}</h1>
      {
        props?.seeLink && <Link href={props.seeLink}>{translations?.see_all}</Link>
      }
    </div>
  )
}

export default SeeAllLink