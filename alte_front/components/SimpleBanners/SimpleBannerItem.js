import React from 'react';
import Link from 'next/link'; 
import SimpleBannersIcon from '../Icons/SimpleBannersIcon';

const SimpleBannerItem = (props) => {
  return (
    <a href={props.link} className="banners-item" target='blank'>
    <div className="banner-icon">
      <SimpleBannersIcon class="icon_01" color={props.color}/> 
    </div>
    <div className="banner-text">
      <h2 className="geo-font-bold-caps">{props.title}</h2>
    </div>
  </a>
  )
}

export default SimpleBannerItem