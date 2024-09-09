import React from "react";
import GalleryItem from "./GalleryItem";
import { useRouter } from "next/router";

const Gallery = (props) => {
  const router = useRouter(); 
  const { locale } = router; 
  
   
  return (
    <div className="gallery-container">
      <div className="text1" />
      <div className="gallery-box">
        {props.galleryData?.map((item, index) => {
          if (item.published === 1 && item.active === 1) {
            let allLanguage = locale;
            if(item?.additional?.shared_locale && item?.additional?.shared_locale?.gallery){
              allLanguage = item?.additional.shared_locale.gallery;
            }
            return (
              <GalleryItem
                imgData={item.files.filter(
                  (x) => x.locale === allLanguage
                )}
                slug={item.slugs.filter(
                  (x) => x.locale === locale
                )}
                redirectGallery={item.locale_additional?.gallery_link}
                text={item.description}
                title={item.title}
                date={item.additional.date}
                key={index} 
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Gallery;
