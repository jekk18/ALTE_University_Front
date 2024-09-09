import React from 'react'
import GalleryFancyItem from './GalleryFancyItem';

  
  const GalleryFancy = (props) => {   
    return (
      <div className="gallery-container"> 
        <div className="gallery-box">
          {Array.isArray(props.galleryData) && props.galleryData.length > 0 ? (
            props.galleryData.map((item) => (
              <GalleryFancyItem
                key={item.id}
                file={item.file} 
                alt={item.alt} 
                videoUrl={item.video_link} 
              />
            ))
          ) : (
            // <GalleryFancyItem
            //   file="/img/defaultNews.png"
            //   alt="Default Image"
            // />
            ""
          )}
        </div>
      </div>
    );
  };  
export default GalleryFancy