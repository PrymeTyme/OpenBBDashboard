// @ts-nocheck
import React, { useState } from "react";
import Loading from "./Loading";
import TableHeader from "./TableHeader";
const SubTickerTable = ({
  data,
  id,
  setTicker,
  onRowClick,
  handleSort,
  table,
}) => {
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
    <tr>
      <td colspan="7" className="hiddenRow">
        <div className="accordion collapse" id={id}>
          <div className="tbodyDiv">
            <table
              className="table table-dark table-striped"
              style={{ tableLayout: "fixed" }}
            >
              <colgroup>
                <col style={{ width: "13%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "16%" }} />
              </colgroup>
              <TableHeader
                handleSort={handleSort}
                setPerformanceTimeframe={setPerformanceTimeframe}
                setVolatilityTimeframe={setVolatilityTimeframe}
                table={table}
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
                    <tr key={i} className="text-end">
                      <td className="text-start">{item.Ticker}</td>
                      <td>{item.Price.toFixed(2)}</td>
                      <td className={handleSetColor(item.Change)}>
                        {handleTextAlign((item.Change * 100).toFixed(2))}%
                      </td>
                      <td>{numberFormatter(item.Volume)}</td>
                      <td
                        className={handleSetColor(item[performanceTimeframe])}
                      >
                        {handleTextAlign(
                          (item[performanceTimeframe] * 100).toFixed(2)
                        )}
                        %
                      </td>
                      <td>{item[volatilityTimeframe]}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default SubTickerTable;
