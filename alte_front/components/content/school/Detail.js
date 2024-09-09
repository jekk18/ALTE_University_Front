import React, { useEffect, useState, } from "react";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import TextImgElement from "@/components/TextPageComponents/TextImgElement/TextImgElement";
import Programs from "@/components/Programs/Programs";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import axios from "axios";
import { getSchoolProgram } from "@/core/sections/requests";
import { useTranslations } from "@/core/Translations/context";

const Detail = (props) => {
  const translations = useTranslations();
  const router = useRouter();
  const { locale } = router;
  const [loader, setLoader] = useState(false);

  const [programsData, setProgramsData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const programsData = await getSchoolProgram(props?.page?.id);
        setProgramsData(programsData);
      } catch (error) {
        console.error("Error fetching section posts:", error);
      }
      setLoader(false);
    };
    fetchData();
  }, [locale]); 
  
  return (
    <>
      <Breadcrumb BrItems={props.breadcrumb} />
      <TextImgElement
        page={props.page}
        components={props.components}
        addTitle={translations?.school}
        active={props?.page?.active}
      />
      {loader && <Loader />}
      {!loader && <Programs programsData={programsData} title={translations?.programs} color={props?.page?.additional?.color} />}

      {props.components}
    </>
  );
};

export default Detail;