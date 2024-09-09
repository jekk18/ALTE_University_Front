import React from 'react'; 
 

const SwiperItem = (props) => {   
  return (
    <a href={props.redirect_link ? props.redirect_link : ''} className="main-slider-item" style={{pointerEvents: props.redirect_link? 'initial' : 'none'}} target="blank"> 
    <div className="main-slider-item">
        <div className="main-slider-text">
          <h1 className="geo-font-bold">
            {props.title}
          </h1>
        </div> 
        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.imgData[0]?.file}`} alt={props.imgData[0]?.name} className={props.class} loading="lazy"/> 
        <div className="main-slider-bg"></div>
      </div>
      </a>
  )
}

export default SwiperItem