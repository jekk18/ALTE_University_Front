import NewsSlider from '@/components/NewsSlider/NewsSlider'
import React from 'react'

const index = (props) => { 
  return (
    <NewsSlider data={props.componentData} page={props.page} isPost={props.isPost} />
  )
}

export default index