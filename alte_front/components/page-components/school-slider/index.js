import SchoolSLider from '@/components/SchoolSLider/SchoolSLider'
import React from 'react'

const index = (props) => {

  return (
    <SchoolSLider data={props.componentData} page={props.page} isPost={props.isPost} color="#C09A21" />
  )
}

export default index;