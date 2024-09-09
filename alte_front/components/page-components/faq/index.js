import Faq from "@/components/Faq/Faq";
import React from "react";

const index = (props) => {
  return <Faq data={props.componentData} page={props.page} isPost={props.isPost} />;
};

export default index;
