// @ts-nocheck
import React, { useEffect, useState, useCallback } from "react";
import TableHeaderItems from "./TableHeaderItems";

const TableHeader = ({
  handleSort,
  setPerformanceTimeframe,
  setVolatilityTimeframe,
  table,
}) => {
  const [timeframeP, setTimeframeP] = useState("PerfW");
  const [timeframeV, setTimeframeV] = useState("VolatilityW");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Weekly");
  const [selectedTimeframeV, setSelectedTimeframeV] = useState("Weekly");

  const headerItems = [
    { label: "Ticker", field: "Ticker" },
    { label: "Price", field: "Price" },
    { label: "Change", field: "Change" },
    { label: "Volume", field: "Volume" },
    { label: "Performance", field: timeframeP },
    { label: "Volatility", field: timeframeV },
  ];

  const buildHeader = (array) => {
    if (array.length > 0) {
      return array.map((item) => (
        <TableHeaderItems
          key={item.field}
          item={item.label}
          itemF={item.field}
          handleSort={handleSort}
          setTimeframeP={setTimeframeP}
          setPerformanceTimeframe={setPerformanceTimeframe}
          setTimeframeV={setTimeframeV}
          setVolatilityTimeframe={setVolatilityTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
          setSelectedTimeframeV={setSelectedTimeframeV}
          selectedTimeframe={selectedTimeframe}
          selectedTimeframeV={selectedTimeframeV}
          table={table}
        />
      ));
    } else {
      return [];
    }
  };

  return (
    <thead className=" header">
      <tr className="ms-0 text-end">
        {buildHeader(headerItems)} <th></th>
      </tr>
    </thead>
  );
};

export default TableHeader;
