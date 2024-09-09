import React from 'react' 
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from '@/components/Pagination/Pagination';
import Breadcrumb from '@/components/BreadCrumb/Breadcrumb'
import NewsLoaderItem from '@/components/NewsLoader/NewsLoaderItem';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import news1 from "../../assets/img/news1.png"
import news2 from "../../assets/img/news2.png"
import news3 from "../../assets/img/news3.png"
import PartnersItem from '@/components/Partners/PartnersItem';
 
const dataBrItems = [
    {
      title: "Home",
      url: "/",
    }, 
    {
      title: "Partners",
      url: "/Partners",
    },
];
 
const  partnersData = [
    {
      img: news1,
      title: "CISCO",
      text: "Media Lab was opened by the Ambassador of the Netherlands Maaike van Koldam,", 
    },
    {
      img: news2,
      title: " Alte university became a member of harvard business school (hbs)...",
      text: '  Alte University has become a member of the "Microeconomicsand Competitiveness Partner Network" of the HarvardBusiness School (HBS) Institute for Strategy andCompetitiveness.",month: "Nov"',
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
    },
    {
        img: news2,
        title: " Alte university became a member of harvard business school (hbs)...",
        text: '  Alte University has become a member of the "Microeconomicsand Competitiveness Partner Network" of the HarvardBusiness School (HBS) Institute for Strategy andCompetitiveness.",month: "Nov"',
    }  
];


const NewsPage = ({ currentPage, totalPages }) => {
    const router = useRouter();
    const handlePageChange = (page) => {
        router.push(`/news/?page=${page}`);
      };

  return (
     <>
     <Breadcrumb BrItems={dataBrItems }/>
     <section>
         <div className="news-container section-padding-1">
            <div className="container">
                <div className="section-title-box">
                    <SectionTitle title="International cooperation and partners" /> 
                </div>
                
                {/* {description && <div className="text1">text</div>} */} 
               <div className="text1">text</div> 

                <div className="news-box_01 partners-box-1"> 
                     {
                        partnersData.map((item, index) => {
                            return (
                                <PartnersItem imgUrl={item.img} link={'#'} title={item.title} text={item.text} key={index}/>
                            )
                        })
                     }
                </div> 
            </div>
            <div className="container">
                <div className="pagination pagination-2">
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
  )
}

export async function getServerSideProps({ query }) {
    const page = query.page || 1;
    const limit = 4;
    const response = await axios.get(
      `http://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
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

export default NewsPage