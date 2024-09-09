import EventsLoader from "@/components/EventsLoader/EventsLoader";
import React from "react";


const index = (props) => {
  return <EventsLoader data={props.componentData} page={props.page} isPost={props.isPost} itemNumber={4} loader={true} class={'events-item'} />
};

export default index;
