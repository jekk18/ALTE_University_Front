import NewsLoader from '@/components/NewsLoader/NewsLoader'
import React from 'react'

const index = (props) => {
  return (
    <NewsLoader data={props?.componentData} page={props?.page} isPost={props?.isPost} itemNumber={3} />
  )
}

export default index