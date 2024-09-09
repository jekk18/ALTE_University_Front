import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import FilterItem from "@/components/Faq/FilterItem";
import FilterArrow from "@/components/Icons/FilterArrow";
import FilterIcon from "@/components/Icons/FilterIcon";
import SearcIcon from "@/components/Icons/SearcIcon";
import Pagination from "@/components/Pagination/Pagination";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader/Loader";
import { directoryTypes } from "@/core/directories/constants";
import { getDirectories } from "@/core/directories/requests";
import { getSearchResults, getSectionPosts } from "@/core/sections/requests";
import CheckboxIcon from "@/components/Icons/CheckboxIcon";
import { useTranslations } from "@/core/Translations/context";

const List = (props) => {
  const translations = useTranslations();
  const router = useRouter();
  const [filterBox, setFilterBox] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalPostItem, setTotalPostItem] = useState();
  const [perPagePostItem, setPerPagePostItem] = useState();
  const [searchData, setSearchData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [directories, setDirectories] = useState([]);
  const [tpPage, setTpPage] = useState(0);
  const [keyword, setKeyword] = useState(router.query.keyword);
  // const [selectedTopics, setSelectedTopics] = useState(router.query.directories ?? []); 
  const [selectedTopics, setSelectedTopics] = useState(Array.isArray(router.query.directories) ? router.query.directories : router.query.directories ? [router.query.directories] : []);
  const [count, setCount] = useState(0);
  const [countLength, setCoutLength] = useState()

  const { locale } = router;

  const handlePageChange = (page) => {
    router.push({ query: { ...router.query, page }, pathname: `/${locale}${router.asPath?.split('?')[0]}` }, undefined, {
      shallow: true,
      locale: false,
    });
  };

  const breadcrumb = [
    { title: "Home", url: "en/" },
    { title: "Search", url: "en/search" },
  ];

  const handleCheck = (value, isAdd) => {
    setCoutLength(isAdd);
    if (isAdd) {
      setCount(count + 1);
      const itemsArray = [...selectedTopics, value];
      setSelectedTopics(itemsArray);
    } else {
      setCount(count - 1);
      let result = selectedTopics.filter((el) => el !== value);
      setSelectedTopics(result);
    }
  }

  const getFilter = useCallback(() => {
    const query = {
      keyword: keyword,
      directories: selectedTopics ?? undefined,
      page: router.query.page,
    };

    return query;
  }, [keyword, selectedTopics, router.query.page])



  const fetchDirectories = useCallback(() => {
    getDirectories(directoryTypes.topics).then(
      (response) => {
        setHasMore(!!response.directories.next_page_url)
        // setTpPage(response?.directories.current_page)
        setDirectories([...response?.directories?.data])
      }
    )
  }, [directoryTypes.topics]);

  useEffect(() => {
    fetchDirectories();
  }, [locale])


  const fetchData = async () => {
    setLoader(true)
    try {
      const query = getFilter();
      const posts = await getSearchResults(
        query.page ?? 1,
        query,
      );
      setSearchData(posts.posts.data);
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
      directories: selectedTopics ?? undefined,
      page: router.query.page,
    };

    router.push({ query: { ...router.query, ...query }, pathname: `/${locale}${router.asPath?.split('?')[0]}` }, undefined, {
      shallow: true,
      locale: false
    });
  };

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">
          {breadcrumb?.map((item, index) => {
            return (
              <div className="br-item" key={index}>
                <span>/</span>
                <Link href={item.url}>{item.title}</Link>
              </div>
            );
          })}
        </div>
      </div>
      <section style={{ position: "relative" }}>
        <div className="search-section section-padding-1">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title={"Search"} />
            </div>
            <div className="faq-search">
              <form onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
                <div className="faq-search-value">
                  <input type="text" placeholder={translations?.search_by_keyword} value={keyword} onChange={(e) => setKeyword(e.target.value)} min={3} />
                  <div className="faq-search-icon" onClick={handleFilter}>
                    <SearcIcon />
                    <h4>{translations?.search}</h4>
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
                      <h3>{translations?.category_filter} </h3>
                      <div
                        className={`filter-arrow ${filterBox ? "filter-arrow-rotate" : ""
                          }`}
                      >
                        <FilterArrow />
                      </div>
                    </div>
                    <div className="all-result">
                      {translations?.all} <span>({totalPostItem ? totalPostItem : 0})</span>
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
                          value={item.id} selected={!!selectedTopics.find(x => x == item.id)}
                          check={handleCheck} />
                      ))}
                    </ul>
                  </div>
                </div>
              </form>
              {loader && <Loader />}
              {!loader && <div className="search-results">
                {
                  searchData?.map((item, index) => {
                    const slug = item?.slugs?.filter((x) => x.locale === locale);
                    return (
                      <div className="s-resultItem" key={index}>
                        <Link className="geo-font-bold-caps" href={slug[0]?.slug}>{item.title}</Link>
                        <span className="geo-font-bold-caps" >{item?.section?.title}</span>
                        <div className="search-desc geo-font-medium" dangerouslySetInnerHTML={{ __html: item?.description }} />
                      </div>
                    )
                  })
                }
              </div>}
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
      {props?.components}
    </>
  );
};

export default List;
