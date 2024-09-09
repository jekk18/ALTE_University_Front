import React, { useEffect, useState } from "react";
import SelectIcon from "../Icons/SelectIcon";
import FilterItem from "../Faq/FilterItem";
import PFilterItem from "../Faq/PFilterItem";
import InfiniteScroll from "react-infinite-scroll-component";


const SelectBox = (props) => {
  const [show, setShow] = useState(false)
  const [theArray, setTheArray] = useState(props.value);
  const [count, setCount] = useState(0);
  const [countLength, setCoutLength] = useState()
  const [value, setValue] = useState('');

  const handleCheck = (value, open) => {
    setValue(value)
    setCoutLength(open);
    if (open) {
      if (props.multi) {
        setCount(count + 1);
        const itemsArray = [...theArray, value];
        setTheArray(itemsArray);
      }
      else {
        setCount(1);
        const itemsArray = [value];
        setTheArray(itemsArray);
      }
    } else {
      setCount(count - 1);
      let result = theArray.filter((el) => el !== value);
      setTheArray(result);
    }
  }

  useEffect(() => {
    props.handleFullFilterArray(theArray, value, countLength)
  }, [theArray])

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
            props.selectData.find(option => option.value == val)?.title).join(', ')} </h2>
        <SelectIcon />
      </div>
      <ul>

        <InfiniteScroll
          dataLength={props.selectData?.length ?? 0} //This is important field to render the next data
          next={() => { }}
          hasMore={false}
          loader={
            <p style={{ textAlign: 'center' }}>
              <b>Loading...</b>
            </p>
          }
          height={300}
        >
          {props.selectData.map((item, index) => (
            <PFilterItem
              key={index}
              title={item.title}
              value={item.value}
              selected={!!theArray.find(x => x == item.value)}
              class="publication-filter-i"
              check={handleCheck}
              clear={props.clear}
            />
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
};

export default SelectBox;
