import React from 'react'
import Breadcrumb from '@/components/BreadCrumb/Breadcrumb'
import NewsSlider from '@/components/NewsSlider/NewsSlider'
import TextImgElement from '@/components/TextPageComponents/TextImgElement/TextImgElement'
import TextPageSlider from '@/components/TextPageComponents/TextPageSlider/TextPageSlider'
import NewsLoader from '@/components/NewsLoader/NewsLoader'
import EventsLoader from '@/components/EventsLoader/EventsLoader'
import SchoolSLider from '@/components/SchoolSLider/SchoolSLider'
import Programs from '@/components/Programs/Programs'
import Personnel from '@/components/PersonnelComponent/Personnel'
import { useTranslations } from "@/core/Translations/context";

const SchoolPage = () => {
  const translations = useTranslations();

  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <TextImgElement title="hummanities and social sciences" addTitle="Schools" color="#C09A21" />
      <Programs programsData={programsData} title={translations.programs} />
      <TextPageSlider textSliderData={textSliderData} />
      <Personnel personnelData={personnelData} title="Personnel" itemNumber={4} />
      <NewsLoader newsSlidetData={newsSlidetData} title="Related News" itemNumber={3} />
      <EventsLoader eventsData={eventsData} itemNumber={4} title="Related Events" loader={true} />
      <SchoolSLider schoolSliderData={schoolSliderData} color="#945BA2" />
    </>
  )
}

export default SchoolPage