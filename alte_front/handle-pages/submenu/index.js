import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SubmenuPage from "@/components/Submenu/SubmenuPage";
import React from "react";

const Submenu = () => {
  const subMenuData = [
    {
      title: "Submenu",
    },
    {
      items: [
        {
          title: "University At a glance",
          url: "#",
          color: "#7B5B91",
        },
        {
          title: "Mission and Vision",
          url: "#",
        },
        {
          title: "Managing Board/Leadership & Governance",
          url: "#",
        },
        {
          title: "Advisory Board",
          url: "#",
          color: "#C09A21",
        },
        {
          title: "Our Partners",
          url: "#",
          color: "#DF9163",
        },
        {
          title: "Photo Gallery",
          url: "#",
        },
        {
          title: "Video Gallery",
          url: "#",
        },
      ],
    },
  ];
  const dataBrItems = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "About Us",
      url: "/about",
    },
    {
      title: "School",
      url: "about/school",
    },
  ];

  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <SubmenuPage data={subMenuData} />
    </>
  );
};

export default Submenu;
