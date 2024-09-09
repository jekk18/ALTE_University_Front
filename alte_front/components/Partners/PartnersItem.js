import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PartnersItem = (props) => {
  return (
    <Link href={props.slug ? props.slug[0]?.slug : '#'} className="news-slider-item news-loader-item" style={{pointerEvents: props.slug ? 'initial' : 'none'}}>
        <div className="news-img">
        {/* <img src={`http://localhost/storage/${props.imgData[0].file}`} alt={props.alt[0]?.alt} />  */} 
        {props.imgData[0]?.file ? 
          <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.imgData[0].file}`} alt={props.imgData[0].alt} loading="lazy"/> 
          : 
          <img src="/img/defaultNews.png" alt="default" loading="lazy"/>
         }
        </div>
        <div className="news-slider-text">
        <div className="news-title">
            <h2 className='geo-font-bold'>
             {props.title}
            </h2>
        </div>
        <div className="news-text" dangerouslySetInnerHTML={{ __html: props.text }} />  
        </div>
    </Link>
  )
}

export default PartnersItem