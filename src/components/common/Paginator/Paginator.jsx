import React, {useState} from 'react';
import s from "./Paginator.module.css";


const Paginator = ({totalItemsCount, pageSize, onPageChanged, currentPage = 1, portionSize = 10}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)

  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumbret = portionNumber * portionSize
  // console.log(totalItemsCount, pageSize, onPageChanged, currentPage, portionSize )

  return (
    <div className={s.paginator}>
      {portionNumber > 1 &&
        <button onClick={() => {
          setPortionNumber(portionNumber - 1)
        }}>Prev</button>}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumbret)
        .map(p => {
          return <span
            onClick={() => {
              onPageChanged(p)
            }}
            className={(currentPage === p ? s.selectedPage : '') + ' ' + s.pageNumber}
          >{p}</span>
        })}
      {portionCount > portionNumber &&
        <button onClick={() => {
          setPortionNumber(portionNumber + 1)
        }}>Next</button>}
    </div>
  );
};

export default Paginator;