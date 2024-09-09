import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import FilterItem from "@/components/Faq/FilterItem";
import FilterArrow from "@/components/Icons/FilterArrow";
import FilterIcon from "@/components/Icons/FilterIcon";
import SearcIcon from "@/components/Icons/SearcIcon";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import PublicationItem from "@/components/PublicationComponents/PublicationItem";
import SelectBox from "@/components/PublicationComponents/SelectBox";
import ClearIcon from "@/components/Icons/ClearIcon";
import { getSectionPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader";
import InfiniteSelectBox from "@/components/PublicationComponents/InfiniteSelectBox";
import { directoryTypes } from "@/core/directories/constants";
import { useTranslations } from "@/core/Translations/context";
import moment from "moment/moment";

const startingYear = 2010;

const List = (props) => {

  const translations = useTranslations();
  const [filterBox, setFilterBox] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalPostItem, setTotalPostItem] = useState();
  const [perPagePostItem, setPerPagePostItem] = useState();


  const [clear, setClear] = useState(true);
  const [publicationData, setPublicationData] = useState([]);
  const [loader, setLoader] = useState(true);

  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword);
  const [selectedYear, setSelectedYear] = useState(router.query.year);
  const [selectedTopics, setSelectedTopics] = useState(router.query.topics ?? []);
  const [selectedTypes, setSelectedTypes] = useState(router.query.types ?? []);
  const { locale } = router;

  const getFilter = useCallback(() => {
    const query = {
      keyword: keyword,
      topics: selectedTopics ?? undefined,
      types: selectedTypes ?? undefined,
      year: selectedYear,
      page: router.query.page,
    };

    return query;
  }, [selectedYear, keyword, selectedTopics, selectedTypes, router.query.page])

  const handlePageChange = (page) => {
    router.push({ query: { ...router.query, page }, pathname: `/${locale}${router.asPath?.split('?')[0]}` }, undefined, {
      shallow: true,
      locale: false,
    });
  };

  const yearSelect = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = Array(currentYear - startingYear + 2).fill(0).map((v, i) => currentYear + 1 - i)

    return years.map(year => ({ title: year.toString(), value: year }))

  }, []);

  const fetchData = async () => {
    setLoader(true)
    try {
      const query = getFilter();
      const posts = await getSectionPosts(
        props.page.id,
        query.page ?? 1,
        query,
      );
      setPublicationData(posts.posts.data);
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
      year: selectedYear,
      topics: selectedTopics ?? undefined,
      types: selectedTypes ?? undefined,
      page: router.query.page,
    };

    router.push({ query: { ...router.query, ...query }, pathname: `/${locale}${router.asPath?.split('?')[0]}` }, undefined, {
      shallow: true,
      locale: false,
    });
  };

  const handleClearArray = (e) => {
    e.preventDefault();
    setClear(false);
    setKeyword('')
    setSelectedTopics([])
    setSelectedTypes([])
    setSelectedYear(undefined)
  };

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setClear(true);
    }, 300);
  }, [clear]);



  return (
    <>
      <Breadcrumb BrItems={props.breadcrumb} />
      <section>
        <div className="publication-section section-padding-1">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title={props.page.title} />
            </div>
            <div className="faq-search publication-search">
              <form onSubmit={handleFilter}>
                <div className="faq-search-value">
                  <input type="text" placeholder={translations?.search_by_keyword} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                  <div className="faq-search-icon" onClick={handleFilter}>
                    <SearcIcon />
                    <h4>{translations?.search} </h4>
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
                      <h3>{translations?.category_filter} </h3>
                      <div
                        className={`filter-arrow ${filterBox ? "filter-arrow-rotate" : ""
                          }`}
                      >
                        <FilterArrow />
                      </div>
                    </div>
                    <div className="all-result">
                      {translations?.all} <span>({totalPostItem ? totalPostItem : ''})</span>
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
                      <SelectBox
                        selectData={yearSelect}
                        key={"filter-year"}
                        title={'Year'}
                        multi={false}
                        handleFullFilterArray={(arr, value, countBool) => {
                          setSelectedYear(arr[0])
                        }}
                        value={selectedYear ? [selectedYear] : []}
                        clear={clear}
                      />
                      <InfiniteSelectBox
                        directoryType={directoryTypes.topics}
                        key={"filter-topic"}
                        title={'Topic'}
                        handleFullFilterArray={(arr, value, countBool) => {
                          setSelectedTopics(arr)
                        }}
                        value={selectedTopics}
                        clear={clear}
                      />
                      <InfiniteSelectBox
                        directoryType={directoryTypes.publication_types}
                        key={"filter-type"}
                        title={'Type'}
                        value={selectedTypes}
                        handleFullFilterArray={(arr, value, countBool) => {
                          setSelectedTypes(arr)
                        }}
                        clear={clear}
                      />
                      <div className="submit-buttons">
                        <button
                          className="submit-search-btn"
                          onClick={handleFilter}
                        >
                          <SearcIcon />
                          {translations?.filter}
                        </button>
                        <button
                          className="submit-clear-btn"
                          onClick={handleClearArray}
                        >
                          <ClearIcon />
                          {translations?.clear}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="publication-search-results">
              {loader && <Loader />}
              {!loader && publicationData?.map((item) => {
                if (item.published === 1 && item.active === 1) {
                  let allLanguage = locale;
                  if (item?.additional?.shared_locale && item?.additional?.shared_locale?.cover) {
                    allLanguage = item?.additional.shared_locale.cover;
                  }
                  return (
                    <PublicationItem
                      imgData={item?.files?.filter(
                        (x) => x?.locale === allLanguage
                      )}
                      slug={item?.slugs?.filter(
                        (x) => x.locale === locale
                      )}
                      title={item?.title}
                      year={item?.year}
                      type={item?.type}
                      topics={item?.directories}
                      key={item.id}
                    />
                  );
                }
              })}
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
          ) : (
            ""
          )}
        </div>
      </section>
      {props.components}
    </>
  );
};

export default List;
