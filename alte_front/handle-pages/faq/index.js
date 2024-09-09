import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import FaqResultItem from "@/components/Faq/FaqResultItem";
import CheckboxIcon from "@/components/Icons/CheckboxIcon";
import FilterArrow from "@/components/Icons/FilterArrow";
import FilterIcon from "@/components/Icons/FilterIcon";
import SearcIcon from "@/components/Icons/SearcIcon";
import Pagination from "@/components/Pagination/Pagination";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import FilterItem from "@/components/Faq/FilterItem";
import { useTranslations } from "@/core/Translations/context";

const index = ({ currentPage, totalPages, props }) => {
  const translations = useTranslations();
  const [filterBox, setFilterBox] = useState(false);
  const [fIntemIndex, setFItemIndex] = useState(-1);

  const router = useRouter();
  const handlePageChange = (page) => {
    router.push(`/news/?page=${page}`);
  };

  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <section>
        <div className="section-padding-1 questions-section">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title="FAQ's" />
            </div>
            <div className="faq-search">
              <form>
                <div className="faq-search-value">
                  <input type="text" placeholder={translations?.search_by_keyword} />
                  <div className="faq-search-icon">
                    <SearcIcon />
                    <h4>{translations?.search} </h4>
                  </div>
                </div>
                <div className="faq-filter-select-box">
                  <div className="faq-filter-select">
                    <div
                      className="category-filter"
                      onClick={() => {
                        setFilterBox(!filterBox);
                      }}
                    >
                      <FilterIcon />
                      <h3>{translations?.category_filter}</h3>
                      <div
                        className={`filter-arrow ${filterBox ? "filter-arrow-rotate" : ""
                          }`}
                      >
                        <FilterArrow />
                      </div>
                    </div>
                    <div className="all-result">
                      {translations?.all} <span>(5)</span>
                    </div>
                  </div>
                  <div
                    className={
                      filterBox
                        ? "faq-select-item-box faq-select-item-box-open"
                        : "faq-select-item-box"
                    }
                  >
                    <ul>
                      {filterItemsData.map((item, index) => (
                        <FilterItem key={index} title={item.title} />
                      ))}
                    </ul>
                  </div>
                </div>
              </form>
            </div>
            <div className="faq-result-list">
              {filterResultData.map((item, index) => (
                <div key={index}>
                  <FaqResultItem
                    key={item.id}
                    title={item.title}
                    title2={item.title2}
                    desc={item.description}
                  />
                </div>
              ))}
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
