// @ts-nocheck
import React, { useState } from "react";

import Loading from "./Loading";

import TableHeader from "./TableHeader";
import SubTickerTable from "./SubTickerTable";

const TickerTable = ({ data, subData, setTicker, onRowClick, handleSort }) => {
  const [activeRow, setActiveRow] = useState(null);
  const [performanceTimeframe, setPerformanceTimeframe] = useState("PerfW");
  const [volatilityTimeframe, setVolatilityTimeframe] = useState("VolatilityW");

  const handleRowClick = (rowValue, i) => {
    setTicker(rowValue);
    if (activeRow === i) {
      setActiveRow(null);
    } else {
      setActiveRow(i);
    }
    onRowClick(i);
  };

  const numberFormatter = (number) => {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    const numberToDisplay = formatter.format(number);
    return numberToDisplay;
  };

  const handleSetColor = (change) => {
    if (change >= 0) {
      return "text-success";
    }
    return "text-danger";
  };

  const handleTextAlign = (change) => {
    if (change >= 0) {
      return "+" + change;
    }
    return <span>&nbsp;{change}</span>; // hacky solution
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <div>
      <div className="card scroll cardScroll container-table-height">
        <table className="table table-dark table-hover">
          <TableHeader
            handleSort={handleSort}
            setPerformanceTimeframe={setPerformanceTimeframe}
            setVolatilityTimeframe={setVolatilityTimeframe}
            table={"ETF"}
          />

          <tbody>
            {isEmpty(data) ? (
              <tr>
                <td colSpan={7}>
                  <Loading />
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <React.Fragment key={i}>
                  <tr
                    id={i}
                    data-bs-toggle="collapse"
                    data-bs-target={`#a${i}`}
                    className={`accordion-toggle cardH${
                      activeRow === i ? "accordion-button cardH" : ""
                    }`}
                    onClick={() => handleRowClick(item.Ticker, i)}
                  >
                    <td className="text-start ">{item.Ticker}</td>
                    <td>{item.Price.toFixed(2)}</td>
                    <td className={handleSetColor(item.Change)}>
                      {handleTextAlign((item.Change * 100).toFixed(2))}%
                    </td>
                    <td>{numberFormatter(item.Volume)}</td>
                    <td className={handleSetColor(item[performanceTimeframe])}>
                      {handleTextAlign(
                        (item[performanceTimeframe] * 100).toFixed(2)
                      )}
                      %
                    </td>
                    <td>{item[volatilityTimeframe]}</td>
                    <td>
                      <span
                        className={`fa-solid ${
                          activeRow === i ? "fa-chevron-up" : "fa-chevron-down"
                        }`}
                        style={{ color: "white" }}
                      ></span>
                    </td>
                  </tr>
                  <tr
                    className={` accordion-collapse collapse ${
                      activeRow === i ? "show" : ""
                    }`}
                    id={`a${i}`}
                  >
                    <td colSpan={7} className="sub-table">
                      <SubTickerTable
                        data={subData}
                        id={`a${i}`}
                        handleSort={handleSort}
                        table={"HOLDINGS"}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TickerTable;
