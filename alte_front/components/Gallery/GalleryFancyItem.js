import React from "react";
import YoutubeIcons from "../Icons/YoutubeIcons";

const GalleryFancyItem = (props) => {
  let thumbnailUrl = props?.file;  

  if (!props?.file && props?.videoUrl) {
    const videoIdMatch = props.videoUrl.match(/(?:[?&]|\b)v=([^&#]+)/);
    if (!videoIdMatch) {
      console.error('Video Id is not defined')
    }
    const videoId = videoIdMatch[1] || 'nx_2KIwYEWA';
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
  }

  return (
    <a
      href={`${props?.videoUrl ? props.videoUrl : process.env.NEXT_PUBLIC_IMAGE_URL}${props.file}`}
      className='gallery-item'
      data-fancybox="gallery"
    >
      <div className="gallery-item-box">
        <div className="gall-img-box">
          {
            props?.file ? ( 
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.file}`}
                alt={props.alt}
              />
            ) :  
              (
                <img
                  src={thumbnailUrl}
                  alt={props.alt}
                />
              )
               
          }
          {props.videoUrl && <YoutubeIcons />}
        </div>
      </div>
    </a>
  );
};

export default GalleryFancyItem;
