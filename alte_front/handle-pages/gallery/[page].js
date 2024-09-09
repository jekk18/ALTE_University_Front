import { useRouter } from "next/router";
import axios from "axios";
import Fancybox from "@/components/Fancybox/Fancybox";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import gallery1 from "../../assets/img/gallery-1.png";
import gallery2 from "../../assets/img/gallery-2.png";
import gallery3 from "../../assets/img/gallery-3.png"; 
import Pagination from "@/components/Pagination/Pagination";
import GalleryFancy from "@/components/Gallery/GalleryFancy";

const dataBrItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Schools",
    url: "/school",
  },
  {
    title: "Gallery",
    url: "/gallery",
  },
];
const galleryData = [
  {
    imgUrl: gallery1,
    videoUrl: "#",
    url: "#",
    date: "Nov 13, 2022",
    text: "Meeting With Levan Berdzenishvili",
  },
  {
    imgUrl: gallery2,
    url: "#",
    date: "Nov 12, 2022",
    text: "Memorandum Of Understanding Signed Between Alte University And Kvareli Euroclub",
  },
  {
    imgUrl: gallery3,
    videoUrl: "#",
    url: "#",
    date: "Nov 13, 2022",
    text: "Meeting With Levan Berdzenishvili",
  },
  {
    imgUrl: gallery3,
    url: "#",
    date: "Nov 13, 2022",
    text: "A Memorandum Of Understanding Was Signed Between Alte University And The American Technology Company Lineate",
  },
  {
    imgUrl: gallery1,
    videoUrl: "#",
    url: "#",
    date: "Nov 13, 2022",
    text: "Meeting With Levan Berdzenishvili",
  },
  {
    imgUrl: gallery2,
    url: "#",
    date: "Nov 13, 2022",
    text: "Meeting With Levan Berdzenishvili",
  },
  {
    imgUrl: gallery1,
    videoUrl: "#",
    url: "#",
    date: "Nov 13, 2022",
    text: "Meeting With Levan Berdzenishvili",
  },
  {
    imgUrl: gallery2,
    videoUrl: "#",
    url: "#",
    date: "Nov 13, 2022",
    text: "Meeting With Levan Berdzenishvili",
  },
  {
    imgUrl: gallery3,
    url: "#",
    date: "Nov 13, 2022",
    text: "A Memorandum Of Understanding Was Signed Between Alte University And The American Technology Company Lineate",
  },
];
 

const GalleryDetailPage = ({ posts, currentPage, totalPages }) => {
  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`/gallery/?page=${page}`);
  };

  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <section>
        <div className="gallery-cont section-padding-1"> 
          <div className="container">
            <h2 className="event-detail-time course-detail-time">
            Nov 12, 2022 
            </h2>
            <div className="section-title-box section-title-box-non-border">
              <SectionTitle title="Memorandum of Understanding signed between Alte University and Kvareli Euroclub" />
            </div>
          </div>
          <div className="container">
            <Fancybox >
              <GalleryFancy galleryData={galleryData}  />
            </Fancybox>
            
          </div>
          <div className="container">
            <div className="pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

 
export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const limit = 4;
  const response = await axios.get(
    `http://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
  );
  const posts = response.data;

  // Fetch the total number of posts for pagination calculation
  const totalResponse = await axios.get(
    `http://jsonplaceholder.typicode.com/users`
  );
  const totalPosts = totalResponse.data;
  const totalPages = Math.ceil(totalPosts.length / limit);

  return {
    props: {
      posts,
      currentPage: Number(page),
      totalPages,
    },
  };
}

export default GalleryDetailPage;
