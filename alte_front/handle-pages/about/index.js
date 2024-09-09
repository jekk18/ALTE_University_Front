import React from 'react'
import Breadcrumb from '@/components/BreadCrumb/Breadcrumb'
import TextAttachedFile from '@/components/TextPageComponents/TextAttachedFIle/TextAttachedFile'
import TextImgElement from '@/components/TextPageComponents/TextImgElement/TextImgElement'
import TextPageBanner from '@/components/TextPageComponents/TextPageBanner/TextPageBanner'
import TextPageSlider from '@/components/TextPageComponents/TextPageSlider/TextPageSlider'
 

const About = () => {
  const dataBrItems = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'About Us',
        url: '/about'
    } 
]
const textSliderData = [
  {
    img: '/img/text-slider-item2.png',
    fancyLink: 'https://www.youtube.com/watch?v=wAmbDCJocJM&ab_channel=andactioncreativeagency',
    id: 1,
    fancyLinkId: 1
  },
  {
    img: '/img/text-slider-item.png',
    fancyLink: '/img/text-slider-item.png',
    id: 2,
    fancyLinkId: 2
  },
  {
    img: '/img/text-slider-item3.png',
    fancyLink: '/img/text-slider-item3.png',
    id: 3,
    fancyLinkId: 2
  },
  {
    img: '/img/text-slider-item.png',
    fancyLink: 'https://www.youtube.com/watch?v=wAmbDCJocJM&ab_channel=andactioncreativeagency',
    id: 4,
    fancyLinkId: 1
  },
  {
    img: '/img/text-slider-item2.png',
    fancyLink: '/img/text-slider-item2.png',
    id: 5,
    fancyLinkId: 2
  },
]
const fileData = [
  {
    title: 'The rule of development and implementation of educational programs',
    url: '#'
  },
  {
    title: 'Formation of educational programs, learning outcomes, and additional aspects',
    url: '#'
  },
  {
    title: ' Program',
    url: '#'
  },
  {
    title: ' Methodological aspects of educational program formation (with appendices)',
    url: '#'
  },
  {
    title: 'The rule of development and implementation of educational programs',
    url: '#'
  },
  {
    title: 'Formation of educational programs, learning outcomes, and additional aspects',
    url: '#'
  },
  {
    title: ' Program',
    url: '#'
  },
  {
    title: ' Methodological aspects of educational program formation (with appendices)',
    url: '#'
  },
]
 
  return (
   <>
      <Breadcrumb BrItems={dataBrItems}/>
      <TextImgElement title="About Us" />
      <TextPageSlider textSliderData={textSliderData} />
      <TextAttachedFile fileData={fileData} itemNumber={4} />
      <TextPageBanner />
   </>
  )
}

export default About