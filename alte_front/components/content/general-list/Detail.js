import React from 'react'
import Breadcrumb from '@/components/BreadCrumb/Breadcrumb' 
import TextImgElement from '@/components/TextPageComponents/TextImgElement/TextImgElement' 
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';
import { useEffect } from 'react';
 

const Detail = (props) => {
 
  const [loader, setLoader] = useState(true);
  const router = useRouter(); 
  const { locale } = router; 

  // useEffect(() => {
  //   if (props.page.post && props.page.post !== null) {
  //     setLoader(true);
  //     const postSlug = props.page.post.slugs.find((x) => x.locale === locale);
  //     router.push(postSlug.slug);
  //   }
  //   else{
  //     setLoader(false);
  //   }
  // }, [props.page.post, locale, router]);

  return (
   <> 
      <Breadcrumb BrItems={props.breadcrumb}/>
      <TextImgElement page={props.page} components={props.components} active={props?.page?.active}/> 
      {props.components}
   </>
  )
}

export default Detail