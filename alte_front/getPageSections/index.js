import ContactPage from "@/components/content/contact/Detail";
import CoursePage from "@/components/content/course/Detail";
import EventDetailPage from "@/components/content/event/Detail";
import EventListPage from "@/components/content/event/List";
import FAQPage from "@/components/content/faq/List";
import GeneralListPage from "@/components/content/general-list/List";
import GeneralDetailPage from "@/components/content/general-list/Detail";
import HomePage from "@/components/content/home/List";
import NewsDetailPage from "@/components/content/news/Detail";
import NewsListPage from "@/components/content/news/List";
import GalleryDetailPage from "@/components/content/photo-video-gallery/Detail";
import GalleryListPage from "@/components/content/photo-video-gallery/List";
import PublicationDetailPage from "@/components/content/publication/Detail";
import PublicationListPage from "@/components/content/publication/List";
import ProgramDetailPage from "@/components/content/programs/Detail";
import RequestInformationDetailPage from "@/components/content/request-information/Detail";
import SchoolDetailPage from "@/components/content/school/Detail";
import SearchListPage from "@/components/content/search/List";
import SubmenuListPage from "@/components/content/submenu/List";
import TeamDetailPage from "@/components/content/team/Detail";
import TeamListPage from "@/components/content/team/List";
import TextDetailPage from "@/components/content/text/Detail";



const pageComponents = [
  { typeName: "home", listPage: HomePage },
  { typeName: "contact", detailPage: ContactPage, listPage: GeneralListPage },
  { typeName: "course", detailPage: CoursePage, listPage: GeneralListPage },
  { typeName: "event", detailPage: EventDetailPage, listPage: EventListPage },
  { typeName: "faq", detailPage: GeneralDetailPage, listPage: FAQPage },
  { typeName: "general-list", detailPage: GeneralDetailPage, listPage: GeneralListPage },
  { typeName: "news", detailPage: NewsDetailPage, listPage: NewsListPage },
  { typeName: "photo-video-gallery", detailPage: GalleryDetailPage, listPage: GalleryListPage },
  { typeName: "publication", detailPage: PublicationDetailPage, listPage: PublicationListPage },
  { typeName: "program", detailPage: ProgramDetailPage, listPage: GeneralListPage },
  { typeName: "request-information", detailPage: RequestInformationDetailPage, listPage: GeneralListPage },
  { typeName: "school", detailPage: SchoolDetailPage, listPage: GeneralListPage },
  { typeName: "search", detailPage: GeneralDetailPage, listPage: SearchListPage },
  { typeName: "submenu", detailPage: SubmenuListPage, listPage: SubmenuListPage },
  { typeName: "team", detailPage: TeamDetailPage, listPage: TeamListPage },
  { typeName: "text", detailPage: TextDetailPage, listPage: GeneralListPage },
];


function getPageSections(typeName, isDetail) { 
  if (isDetail === undefined) isDetail = true;
  const pageComponent = pageComponents.find((item) => item.typeName === typeName);
  if (pageComponent) {
    const { listPage, detailPage } = pageComponent;
    const SelectedComponent = isDetail ? (detailPage || listPage) : listPage;
    return (props) => <SelectedComponent {...props} />;
  }
  return (props) => <HomePage {...props} />;
}

export default getPageSections;
