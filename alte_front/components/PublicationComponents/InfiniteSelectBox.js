import React, { useCallback, useEffect, useMemo, useState } from "react";
import SelectIcon from "../Icons/SelectIcon";
import PFilterItem from "../Faq/PFilterItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { getDirectories } from "@/core/directories/requests";
import { useRouter } from "next/router";


const InfiniteSelectBox = (props) => {
  const [show, setShow] = useState(false)
  const passValue = useMemo(() => {
    if (!props.value) return [];
    if (Array.isArray(props.value))
      return props.value;
    return [props.value]
  }, [])
  const [theArray, setTheArray] = useState(passValue);
  const [count, setCount] = useState(0);
  const [countLength, setCoutLength] = useState()
  const [value, setValue] = useState('');
  const [directories, setDirectories] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const { directoryType } = props;
  const {locale} = useRouter();

  const handleCheck = (value, checkCountLength) => {
    setValue(value)
    setCoutLength(checkCountLength);
    if (checkCountLength) {
      setCount(count + 1);
      const itemsArray = [...theArray, value];
      setTheArray(itemsArray);
    } else {
      setCount(count - 1);
      let result = theArray.filter((el) => el != value);
      setTheArray(result);
    }
  }

  useEffect(() => {
    props.handleFullFilterArray(theArray, value, countLength)
  }, [theArray])

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      getDirectories(directoryType, page + 1).then(
        (response) => {

          if (ignore) {
            return;
          }
          setHasMore(!!response.directories.next_page_url)
          setPage(response?.directories.current_page)
          setDirectories((topics) => [...(topics ?? []), ...response.directories.data])
        }
      )
    }
    startFetching();

    return () => {
      ignore = true;
    };

  }, [locale])

  const fetchDirectories = useCallback(() => {
    getDirectories(directoryType, page + 1).then(
      (response) => {
        setHasMore(!!response.directories.next_page_url)
        setPage(response?.directories.current_page)
        setDirectories((topics) => [...(topics ?? []), ...response.directories.data])
      }
    )
  }, [directoryType, page])

  useEffect(() => {
    if (!props.clear) {
      setTheArray([])
    }
  }, [props.clear])

 

  return (
    <div className={`select-01  ${show && 'select-01-show'}`}>
      <div className={`select-title ${show && 'select-title-show'}`} onClick={() => {
        setShow(!show);
      }}>
        <h2> {theArray.length <= 0 ? props.title :
          theArray.map(val =>
            directories.find(option => option.id == parseInt(val))?.title).join(', ')}  </h2>
        <SelectIcon />
      </div>
      <ul>
        <InfiniteScroll
          dataLength={directories?.length ?? 0} //This is important field to render the next data
          next={fetchDirectories}
          hasMore={hasMore}
          loader={
            <p style={{ textAlign: 'center' }}>
              <b>Loading...</b>
            </p>
          }
          height={300}
        >
          {directories.map((item, index) => (
            <PFilterItem
              key={index}
              title={item.title}
              value={item.id}
              class="publication-filter-i"
              selected={!!theArray.find(x => x == item.id)}
              check={handleCheck}
              clear={props.clear}
            />
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
};

export default InfiniteSelectBox;
