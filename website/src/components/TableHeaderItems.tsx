// @ts-nocheck
import React, { useState, useEffect } from "react";

const TableHeaderItems = ({
  item,
  handleSort,
  itemF,
  setTimeframeP,
  setPerformanceTimeframe,
  setTimeframeV,
  setVolatilityTimeframe,
  setSelectedTimeframe,
  setSelectedTimeframeV,
  selectedTimeframe,
  selectedTimeframeV,
  table,
}) => {
  const [sortOrder, setSortOrder] = useState(false);

  const handleTimeframeClickP = (timeframe) => {
    setTimeframeP(timeframe.field);
    setPerformanceTimeframe(timeframe.field);
    setSelectedTimeframe(timeframe.label);
  };

  const handleTimeframeClickV = (timeframe) => {
    setTimeframeV(timeframe.field);
    setVolatilityTimeframe(timeframe.field);
    setSelectedTimeframeV(timeframe.label);
  };

  const performanceTimeframe = [
    { label: "Weekly", field: "PerfW" },
    { label: "Monthly", field: "PerfM" },
    { label: "Quarterly", field: "PerfQ" },
    { label: "Half Year", field: "PerfH" },
    { label: "Year", field: "PerfY" },
    { label: "Year to Date", field: "PerfYTD" },
  ];

  const volatilityTimeframe = [
    { label: "Weekly", field: "VolatilityW" },
    { label: "Monthly", field: "VolatilityM" },
  ];

  const handleSortClicked = (itemF) => {
    console.log(itemF);
    console.log(sortOrder);
    if (table === "ETF") {
      setSortOrder(!sortOrder);
      if (sortOrder) {
        handleSort(itemF, "asc", "ETF");
      } else {
        handleSort(itemF, "desc", "ETF");
      }
    } else {
      setSortOrder(!sortOrder);
      if (sortOrder) {
        handleSort(itemF, "asc", "HOLDINGS");
      } else {
        handleSort(itemF, "desc", "HOLDINGS");
      }
    }
  };

  const DropdownItems = ({ array, handleTimeframeClick }) => {
    return (
      <>
        {array.map((item, i) => (
          <li>
            <a
              key={i}
              className="dropdown-item"
              onClick={() => {
                handleTimeframeClick(item);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </>
    );
  };

  if (["Performance", "Volatility"].includes(item)) {
    return (
      <th className="text-start to-hover text-color-test ">
        <p role="button" onClick={() => handleSortClicked(itemF, table)}>
          {item}
          <i className="fa-solid fa-sort fa-2xs ms-0 p-1 align-middle"></i>
        </p>

        <p>
          <div className="dropdown text-color-test">
            <small type="button" id="dropdownMenuButton1" aria-expanded="false">
              {item === "Performance" ? selectedTimeframe : selectedTimeframeV}
              <i className="fa-solid fa-chevron-down fa-2xs ms-1 "></i>
            </small>
            <ul
              className="dropdown-menu dropdown-menu-dark text-color-test"
              aria-labelledby="dropdownMenuButton1"
            >
              {item === "Performance" ? (
                <DropdownItems
                  array={performanceTimeframe}
                  handleTimeframeClick={handleTimeframeClickP}
                  setSelectedTimeframe={setPerformanceTimeframe}
                />
              ) : (
                <DropdownItems
                  array={volatilityTimeframe}
                  handleTimeframeClick={handleTimeframeClickV}
                />
              )}
            </ul>
          </div>
        </p>
      </th>
    );
  }
  return (
    <th
      className="text-start align-top text-color-test"
      role="button"
      onClick={() => handleSortClicked(itemF, table)}
    >
      {item} <i className="fa-solid fa-sort fa-2xs ms-0 align-middle"></i>
    </th>
  );
};

export default TableHeaderItems;
