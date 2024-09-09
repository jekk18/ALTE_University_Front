import React from "react";
import EventComponent from "@/components/page-components/event/index";
import FaqComponent from "@/components/page-components/faq/index";
import FilesComponent from "@/components/page-components/files/index";
import GraphicBannerComponent from "@/components/page-components/graphic-banner/index";
import HomeEventComponent from "@/components/page-components/home-event/index";
import MultiMEdiaComponent from "@/components/page-components/multimedia-slider/index";
import NewsLoaderComponent from "@/components/page-components/news-loader/index";
import NewsSliderComponent from "@/components/page-components/news-slider/index";
import PostLoaderComponent from "@/components/page-components/post-loader/index";
import PublicationComponent from "@/components/page-components/publication/index";
import RedirectBannerComponent from "@/components/page-components/redirect-banner/index";
import SchoolSliderComponent from "@/components/page-components/school-slider/index";
import RegularBannerComponent from "@/components/page-components/regular-banner/index";
import TeamComponent from "@/components/page-components/team/index";
import StatisticBannerComponent from "@/components/page-components/statistic-banner/index";

const getPageComponents = (componentables, page, isPost) => {
  const componentMapping = {
    "event": EventComponent,
    "faq": FaqComponent,
    "files": FilesComponent,
    "graphic-banner": GraphicBannerComponent,
    "home-event": HomeEventComponent,
    "multimedia-slider": MultiMEdiaComponent,
    "news-loader": NewsLoaderComponent,
    "news-slider": NewsSliderComponent,
    "post-loader": PostLoaderComponent,
    "publication": PublicationComponent,
    "redirect-banner": RedirectBannerComponent,
    "school-slider": SchoolSliderComponent,
    "regular-banner": RegularBannerComponent,
    "team": TeamComponent,
    "statistic-banner": StatisticBannerComponent,
  };

  componentables?.sort((a, b) => a.sort - b.sort);

  return (
    <>
      {componentables?.length > 0 &&
        componentables.map((item, index) => {
          const Component = componentMapping[item?.component?.type_name];
          return (
            <React.Fragment key={index}>
              {Component ? <Component componentData={item} page={page} isPost={isPost} /> : null}
            </React.Fragment>
          );
        })}
    </>
  );
};

export default getPageComponents;