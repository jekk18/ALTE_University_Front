import Link from 'next/link'
import Image from 'next/image'
import React, { Fragment, useMemo } from 'react'
import YoutubeIcons from '../Icons/YoutubeIcons'
import { useRouter } from 'next/router'
import moment from 'moment'

const GalleryItem = (props) => {

  const { locale } = useRouter();

  const momentDate = useMemo(() => { return moment(props.date, 'DD/MM/YYYY hh:mm') }, [props.date, locale]); 

  let thumbnailUrl = '' 

  if (!props.imgData[0]?.file && props.imgData[0]?.video_link) {
    const videoIdMatch = props.imgData[0]?.video_link.match(/(?:[?&]|\b)v=([^&#]+)/);
    if (!videoIdMatch) {
      console.error('Video Id is not defined')
    }
    const videoId = videoIdMatch[1] || 'nx_2KIwYEWA';
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
  }
 
  return (
   <Fragment>
    {
      props?.redirectGallery && props?.redirectGallery.length > 0 ?
      <Link href={props?.redirectGallery} className='gallery-item' target='blank' style={{ pointerEvents: props.slug ? 'initial' : 'none' }}>
      <div className="gallery-item-box">
        <div className="gall-img-box">
          {props.imgData[0]?.file ?
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.imgData[0].file}`} alt={props.imgData[0].name} loading="lazy"/>
            : !props.imgData[0]?.file && props.imgData[0]?.video_link ?
            <img src={thumbnailUrl} alt="default" loading="lazy"/>
            :
            <img src="/img/defaultNews.png" alt="default" loading="lazy"/>
          }

          <h4 className='gallery-date'>{momentDate?.format('MMMM D, YYYY')}</h4>

          {
            props.imgData[0]?.video_link && (
              <YoutubeIcons />
            )
          }
        </div>
      </div>
      <div className="text">
        {props.title}
      </div>
    </Link>
      :
      <Link href={props.slug ? props.slug[0]?.slug : '#'} className='gallery-item' style={{ pointerEvents: props.slug ? 'initial' : 'none' }}>
      <div className="gallery-item-box">
        <div className="gall-img-box">
          {props.imgData[0]?.file ?
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.imgData[0].file}`} alt={props.imgData[0].name} loading="lazy"/>
            : !props.imgData[0]?.file && props.imgData[0]?.video_link ?
            <img src={thumbnailUrl} alt="default" loading="lazy"/>
            :
            <img src="/img/defaultNews.png" alt="default" loading="lazy"/>
          }

          <h4 className='gallery-date'>{momentDate?.format('MMMM D, YYYY')}</h4>

          {
            props.imgData[0]?.video_link && (
              <YoutubeIcons />
            )
          }
        </div>
      </div>
      <div className="text">
        {props.title}
      </div>
    </Link>
    }
   </Fragment>
  )
}

export default GalleryItem