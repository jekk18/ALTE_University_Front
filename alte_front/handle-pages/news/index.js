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
 
const dataBrItems = [
    {
      title: "Home",
      url: "/",
    }, 
    {
      title: "News",
      url: "/News",
    },
];
const newsSlidetData = [
    {
      img: news1,
      title: "A new school of information technology (IT) has been added to the list of schools...",
      text: "A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and Georgian-language computer...",
      month: "Nov",
      day: 15,
      year: 2020,
      link: 'news/1'
    },
    {
      img: news2,
      title: " Alte university became a member of harvard business school (hbs)...",
      text: '  Alte University has become a member of the "Microeconomicsand Competitiveness Partner Network" of the HarvardBusiness School (HBS) Institute for Strategy andCompetitiveness.",month: "Nov"',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
        img: news2,
        title: " Alte university became a member of harvard business school (hbs)...",
        text: '  Alte University has become a member of the "Microeconomicsand Competitiveness Partner Network" of the HarvardBusiness School (HBS) Institute for Strategy andCompetitiveness.",month: "Nov"',
        month: "Nov",
        day: 15,
        year: 2020,
        link: '#'
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
                    <SectionTitle title="News" /> 
                </div>
                
                {/* {description && <div className="text1">text</div>} */} 
               <div className="text1">text</div> 

                <div className="news-box_01"> 
                     {
                        newsSlidetData.map((item, index) => {
                            return (
                                <NewsLoaderItem imgUrl={item.img} link={item.link} text={item.text} title={item.text} month={item.month} day={item.day} year={item.year} key={index} /> 
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