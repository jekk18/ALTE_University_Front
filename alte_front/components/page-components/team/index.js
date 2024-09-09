import Personnel from '@/components/PersonnelComponent/Personnel'
import React from 'react'

const index = (props) => {
  return (
    <Personnel data={props.componentData} page={props.page} isPost={props.isPost} itemNumber={4} class={"hide-person"} />
  )
}

export default index