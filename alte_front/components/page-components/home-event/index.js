import Events from '@/components/Events/Events'
import React from 'react'

const index = (props) => {
  return (
    <Events data={props.componentData} page={props.page} isPost={props.isPost} class={'events-item first-event-item'} />
  )
}

export default index