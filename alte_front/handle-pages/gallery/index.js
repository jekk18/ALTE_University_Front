import { useRouter } from "next/router";
import axios from "axios";
import Fancybox from "@/components/Fancybox/Fancybox";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import gallery1 from "../../assets/img/gallery-1.png";
import gallery2 from "../../assets/img/gallery-2.png";
import gallery3 from "../../assets/img/gallery-3.png";
import Gallery from "@/components/Gallery/Gallery";
import Pagination from "@/components/Pagination/Pagination";

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
const galleryText = [
  {
    galleryText: `The aim of Alte University School of Humanities and Social Sciences is to give the student, on the one hand, broad and in-depth theoretical knowledge and, on the other hand, unique, practical skills that will help and assist each of them in achieving professional success. The main priority of the School of Humanities and Social Sciences is to train competitive and qualified staff based on the demands of the labor market. The best teachers in the school, modern and innovative teaching methods, and employment-oriented approaches will mold our students into distinguished, innovative, highly qualified professionals who will be competitive in both the Georgian and international employment markets.`,
  },
];

const GalleryPage = ({ posts, currentPage, totalPages }) => {
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
            <div className="section-title-box">
              <SectionTitle title="Photo / Video Gallery" />
            </div>
          </div>
          <div className="container">
            <Gallery galleryData={galleryData} galleryText={galleryText} />
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

export default GalleryPage;
