import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import FaqResultItem from "@/components/Faq/FaqResultItem";
import FilterArrow from "@/components/Icons/FilterArrow";
import FilterIcon from "@/components/Icons/FilterIcon";
import SearcIcon from "@/components/Icons/SearcIcon";
import Pagination from "@/components/Pagination/Pagination";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import FilterItem from "@/components/Faq/FilterItem";
import Loader from "@/components/Loader/Loader";
import { directoryTypes } from "@/core/directories/constants";
import { getDirectories } from "@/core/directories/requests";
import { getSectionPosts } from "@/core/sections/requests";
import { useDebounce } from "@/helpers/use-debounce";
import { useTranslations } from "@/core/Translations/context";

const List = (props) => {

  const translations = useTranslations();
  const [filterBox, setFilterBox] = useState(false);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalPostItem, setTotalPostItem] = useState();
  const [perPagePostItem, setPerPagePostItem] = useState();
  const [loader, setLoader] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [directories, setDirectories] = useState([]);
  const [tpPage, setTpPage] = useState(0);

  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword);
  const [selectedCategory, setSelectedCategory] = useState(Array.isArray(router.query.types) ? router.query.types : router.query.types ? [router.query.types] : []);
  const [countLength, setCoutLength] = useState()

  const [ResultData, setResultData] = useState([]);

  const { locale } = router;

  const debouncedCategory = useDebounce(selectedCategory, 500)

  useEffect(() => {
    handleFilter();
  }, [debouncedCategory])

  const handlePageChange = (page) => {
    router.push({ query: { ...router.query, page }, pathname: `/${locale}${router.asPath?.split('?')[0]}` }, undefined, {
      shallow: true,
      locale: false,
    });
  };
  const handleCheck = (value, isAdd) => {
    setCoutLength(isAdd);
    if (isAdd) {
      setCount(count + 1);
      const itemsArray = [...selectedCategory, value];
      setSelectedCategory(itemsArray);
    } else {
      setCount(count - 1);
      let result = selectedCategory.filter((el) => el != value);
      setSelectedCategory(result);
    }
  }

  const getFilter = useCallback(() => {
    const query = {
      keyword: keyword,
      types: selectedCategory ?? undefined,
      page: router.query.page,
    };
    return query;
  }, [keyword, selectedCategory, router.query.page])


  const fetchDirectories = useCallback(() => {
    getDirectories(directoryTypes.faq_category).then(
      (response) => {
        setHasMore(!!response.directories.next_page_url)
        // setTpPage(response?.directories.current_page)
        setDirectories([...response?.directories?.data])
      }
    )
  }, [tpPage]);

  useEffect(() => {
    fetchDirectories();
  }, [locale])


  const fetchData = async () => {
    setLoader(true)
    try {
      const query = getFilter();
      const posts = await getSectionPosts(
        props.page.id,
        query.page ?? 1,
        query,
      );
      setResultData(posts.posts.data);
      setCurrentPage(posts.posts.current_page);
      setTotalPages(posts.posts.last_page);
      setTotalPostItem(posts.posts.total);
      setPerPagePostItem(posts.posts.per_page);
    } catch (error) {
      console.error("Error fetching section posts:", error);
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchData();
  }, [props.page.id, router.query, locale]);

  const handleFilter = (e) => {
    e?.preventDefault();
    const query = {
      keyword: keyword,
      types: selectedCategory ?? undefined,
      page: router.query.page,
    };

    router.push({ query: { ...router.query, ...query }, pathname: `/${locale}${router.asPath?.split('?')[0]}` }, undefined, {
      shallow: true,
      locale: false
    });
  };
  return (
    <>
      <Breadcrumb BrItems={props.breadcrumb} />
      <section>
        <div className="section-padding-1 questions-section">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title={props.page.title} />
            </div>
            <div className="faq-search">
              <form onSubmit={handleFilter}>
                <div className="faq-search-value">
                  <input type="text" placeholder={translations.search_by_keyword} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                  <div className="faq-search-icon" onClick={handleFilter}>
                    <SearcIcon />
                    <h4>{translations.search} </h4>
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
                      <h3>{translations.category_filter} </h3>
                      <div
                        className={`filter-arrow ${filterBox ? "filter-arrow-rotate" : ""
                          }`}
                      >
                        <FilterArrow />
                      </div>
                    </div>
                    <div className="all-result">
                      {translations.all} <span>({totalPostItem ? totalPostItem : ''})</span>
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
                      {directories?.map((item, index) => (
                        <FilterItem key={index} title={item.title}
                          value={item.id} selected={!!selectedCategory.find(x => x == item.id)}
                          check={handleCheck} />
                      ))}
                    </ul>
                  </div>
                </div>
              </form>
            </div>
            <div className="faq-result-list" >
              {loader && <Loader />}
              {!loader && ResultData.map((item, index) => {
                if (item.published === 1 && item.active === 1) {
                  return (
                    <div key={index}>
                      <FaqResultItem
                        key={item.id}
                        title={item.title}
                        desc={item.text}
                        directories={item?.directories}
                      />
                    </div>
                  )
                }
              }
              )}
            </div>
          </div>
          {totalPostItem > perPagePostItem ? (
            <div className="container">
              <div className="pagination pagination-2">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
      {props.components}
    </>
  );
};


export default List;
