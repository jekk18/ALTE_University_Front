import React from 'react'
import EventsLoader from "@/components/EventsLoader/EventsLoader";

const index = (props) => {
  return (
    <EventsLoader data={props.componentData} page={props.page} itemNumber={4} loader={true} isPost={props.isPost} />
  )
}

export default index