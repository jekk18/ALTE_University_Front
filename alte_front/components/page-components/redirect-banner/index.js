import TabsBanner from '@/components/TabsBanner/TabsBanner'
import React from 'react'
 

const index = (props) => {   
  return (
    <TabsBanner data={props?.componentData} defaultImg={props?.componentData?.component?.files?.filter((x)=> x.locale===props?.componentData?.component?.translation?.locale)}/> 
  )
}

export default index;