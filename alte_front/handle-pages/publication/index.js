import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import FilterItem from "@/components/Faq/FilterItem";
import FilterArrow from "@/components/Icons/FilterArrow";
import FilterIcon from "@/components/Icons/FilterIcon";
import SearcIcon from "@/components/Icons/SearcIcon";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination/Pagination";
import PublicationItem from "@/components/PublicationComponents/PublicationItem";
import PublicImg from '../../assets/img/publication-1.png'
import PublicImg2 from '../../assets/img/publication-2.png'
import SelectBox from "@/components/PublicationComponents/SelectBox";
import ClearIcon from "@/components/Icons/ClearIcon";
import { useTranslations } from "@/core/Translations/context";

const index = ({ props, currentPage, totalPages }) => {
  const translations = useTranslations();
  const [filterBox, setFilterBox] = useState(false);
  const [fullArray, setFullArray] = useState([]);
  const [count, setCount] = useState(0);
  const [clear, setClear] = useState(true);

  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`/news/?page=${page}`);
  };


  const handleSetArray = (arr, value, countBool) => {
    let result = [];
    if (countBool) {
      setCount(count + 1);
      arr.map((item) => result = [...fullArray, item]);
      setFullArray(result)
    } else {
      setCount(count - 1);
      result = fullArray.filter((el) => el !== value);
      setFullArray(result)
    }
  }

  const handleShowArray = (e) => {
    e.preventDefault();
    // post function
  }

  const handleClearArray = (e) => {
    e.preventDefault();
    setFullArray([]);
    setClear(false);
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setClear(true);
    }, 300);
  }, [clear])

  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <section>
        <div className="publication-section section-padding-1">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title="Publication" />
            </div>
            <div className="faq-search publication-search">
              <form>
                <div className="faq-search-value">
                  <input type="text" placeholder={translations.search_by_keyword} />
                  <div className="faq-search-icon">
                    <SearcIcon />
                    <h4>{translations.search} </h4>
                  </div>
                </div>
                <div className="faq-filter-select-box publication-filter-select-boxes publication-filter-select-boxes-1">
                  <div className="faq-filter-select">
                    <div
                      className="category-filter"
                      onClick={() => {
                        setFilterBox(!filterBox);
                      }}
                    >
                      <FilterIcon />
                      <h3>{translations.category_filter}</h3>
                      <div
                        className={`filter-arrow ${filterBox ? "filter-arrow-rotate" : ""
                          }`}
                      >
                        <FilterArrow />
                      </div>
                    </div>
                    <div className="all-result">
                      {translations.all} <span>(5)</span>
                    </div>
                  </div>
                  <div
                    className={
                      filterBox
                        ? "faq-select-item-box faq-select-item-box-open publication-select-item-box-open"
                        : "faq-select-item-box"
                    }
                  >
                    <div className="filter-selects-box-01">
                      <SelectBox selectData={selectData} handleFullFilterArray={handleSetArray} clear={clear} />
                      <SelectBox selectData={selectData2} handleFullFilterArray={handleSetArray} clear={clear} />
                      <SelectBox selectData={selectData3} handleFullFilterArray={handleSetArray} clear={clear} />
                      <div className="submit-buttons">
                        <button className="submit-search-btn" onClick={handleShowArray}>
                          <SearcIcon />
                          Filter
                        </button>
                        <button className="submit-clear-btn" onClick={handleClearArray}>
                          <ClearIcon />
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="publication-search-results">
              {
                publicationData.map((item, index) => {
                  return <PublicationItem img={item.img} title={item.title} year={item.year} type={item.type} topics={item.topics} key={item.id} />
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
  );
};

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

export default index;
