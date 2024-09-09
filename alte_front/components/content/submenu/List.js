import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SubmenuPage from "@/components/Submenu/SubmenuPage";
import React from "react";

const List = (props) => {
 
  return (
    <>
      <Breadcrumb BrItems={props?.breadcrumb} />
      <SubmenuPage data={props?.page} active={props?.page?.active} />
      {props?.components}
    </>
  );
};

export default List;
