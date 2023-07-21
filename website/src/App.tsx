// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState, useLayoutEffect } from "react";
import Loading from "./components/Loading";
import "./components/custom.css";
import TradingViewWidget from "./components/TradingViewWidget";
import TickerTable from "./components/TickerTable";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";

const App = () => {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#373A45";
  });

  const [data, setData] = useState({});
  const [subData, setSubData] = useState({});
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [ticker, setTicker] = useState("SPY");
  const [formatedData, setFormatedData] = useState([]);
  const [formatedSubData, setFormatedSubData] = useState([]);
  const [news, setNews] = useState([]);
  const [overview, setOverview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOverviewLoading, setIsOverviewLoading] = useState(true);

  const dataToArray = (data) => {
    const dataArray = Object.keys(data.Price).map((key) => ({
      Price: data.Price[key],
      Change: data.Change[key],
      Volume: data.Volume[key],
      VolatilityM: data["Volatility M"][key],
      VolatilityW: data["Volatility W"][key],
      PerfYTD: data["Perf YTD"][key],
      PerfY: data["Perf Year"][key],
      PerfH: data["Perf Half"][key],
      PerfQ: data["Perf Quart"][key],
      PerfM: data["Perf Month"][key],
      PerfW: data["Perf Week"][key],
      Ticker: data["Ticker\n\n"][key],
      isActive: data?.isActive[key],
    }));
    return dataArray;
  };

  useEffect(() => {
    fetchETF();
    fetchNews();
    fetchOverview();
  }, []);

  useEffect(() => {
    axios.post("http://localhost:5000/setTicker", { ticker: ticker });
    if (isButtonClicked) {
      fetchSubData();
      fetchNews();
      fetchOverview();
    }
  }, [ticker]);

  const formatData = (obj) => {
    let newObj = Object.assign({}, obj, {
      isActive: {},
    });

    let length = Object.keys(obj.Price).length;

    for (let i = 0; i < length; i++) {
      newObj.isActive[i] = false;
    }

    return newObj;
  };
  const handleRowClick = (rowIndex) => {
    setData((prevData) => {
      const newData = { ...prevData };
      newData.isActive[rowIndex] = !newData.isActive[rowIndex];
      return newData;
    });
  };

  const handleSort = (sortBy, order, data) => {
    if (data === "ETF") {
      setFormatedData((prevData) => {
        const sortedData = [...prevData].sort((a, b) => {
          if (order === "asc") {
            return a[sortBy] - b[sortBy];
          } else if (order === "desc") {
            return b[sortBy] - a[sortBy];
          }
        });
        return sortedData;
      });
    } else {
      setFormatedSubData((prevData) => {
        const sortedData = [...prevData].sort((a, b) => {
          if (order === "asc") {
            return a[sortBy] - b[sortBy];
          } else if (order === "desc") {
            return b[sortBy] - a[sortBy];
          }
        });
        return sortedData;
      });
    }
  };
  const MAX_RETRIES = 2; // Maximum number of retries

  const fetchETF = () => {
    let retryCount = 0; // Retry counter

    const fetchData = () => {
      setData({}); // make the loading screen appear also when click fethc button
      axios
        .get("/etf-sectors")
        .then((response) => {
          let format = formatData(response.data);
          setData(format);
          let formatedData = dataToArray(format);
          setFormatedData(formatedData);
          setButtonClicked(true); // set to true better then toggle !buttonclicked
        })
        .catch((error) => {
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.error("error fetching ETF , retrying..");
            fetchData();
          } else {
            console.error("Max retries exceeded. unabvle to fetch etf", error);
          }
        });
    };
    fetchData();
  };

  const fetchSubData = () => {
    let retryCount = 0;

    const fetchData = () => {
      setSubData({}); // make the loading screen appear also when click fethc button
      setFormatedSubData([]);
      axios
        .get("/etf-holdings")
        .then((response) => {
          let format = formatData(response.data);
          console.log(subData);
          setSubData(format);
          let formatedSubData = dataToArray(format);
          setFormatedSubData(formatedSubData);
          setButtonClicked(true); // set to true better then toggle !buttonclicked
        })
        .catch((error) => {
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.error("error fetching SubData , retrying..");
            fetchData();
          } else {
            console.error(
              "Max retries exceeded. unabvle to fetch subData",
              error
            );
          }
        });
    };
    fetchData();
  };

  const fetchNews = () => {
    let retryCount = 0;

    const fetchData = () => {
      setIsLoading(true);
      axios
        .get("/news")
        .then((response) => {
          setNews(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.error("error fetching News , retrying..");
            fetchData();
          } else {
            console.error("Max retries exceeded. unabvle to fetch news", error);
          }
        });
    };
    fetchData();
  };

  const fetchOverview = () => {
    let retryCount = 0;
    const fetchData = () => {
      setOverview({});
      setIsOverviewLoading(true); ////// invokes isLoading to true .. also for news etc? need a proper handling of loading
      axios
        .get("/overview")
        .then((response) => {
          setOverview(response.data);
          setIsOverviewLoading(false);
        })
        .catch((error) => {
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.error("error fetching Overview , retrying..");
            fetchData();
          } else {
            console.error(
              "Max retries exceeded. unabvle to fetch overview",
              error,
              setIsOverviewLoading(false)
            );
          }
        });
    };
    fetchData();
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const Section = ({ label, value }) => (
    <div className="d-flex justify-content-between">
      <div>{label}:</div>
      <div>
        <span>{value}</span>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row mt-1 ms-1 me-1 ">
          <div className="col-md-6 neg-margin">
            <TradingViewWidget ticker={ticker} />
            <div className="row mt-1 ms-0 ">
              <div className="col neg-margin" style={{ width: "100%" }}>
                {isLoading ? (
                  <Loading />
                ) : (
                  <Carousel data={news} ticker={ticker} />
                )}
              </div>
            </div>
          </div>
          <div className="col pos-margin" style={{ overflow: "auto" }}>
            <TickerTable
              data={formatedData}
              subData={formatedSubData}
              setTicker={setTicker}
              onRowClick={handleRowClick}
              handleSort={handleSort}
              className="w-100"
            />

            <div className="row mt-1  mb-5">
              <div
                className={
                  isLoading
                    ? "col sub-pos-margin"
                    : "col sub-pos-margin d-flex "
                }
              >
                {isOverviewLoading && isEmpty(overview) ? (
                  <div style={{ width: "930px" }}>
                    <Loading />
                  </div>
                ) : (
                  Object.keys(overview).map((key) => (
                    <div
                      key={key}
                      className="text-white card bottom-panel"
                      style={{ width: "100%" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">Summary of {key}: </h5>

                        <div className="d-flex justify-content-between">
                          <div>Assets:</div>
                          <div>
                            <span>{overview[key]["Assets"]}</span>
                          </div>
                        </div>

                        <div className="d-flex flex-column">
                          {" "}
                          {/* Container for sections */}
                          <Section
                            label="Expense Ratio"
                            value={overview[key]["Expense Ratio"]}
                          />
                          <Section
                            label="Shares Out"
                            value={overview[key]["Shares Out"]}
                          />
                          <Section
                            label="Dividend(ttm)"
                            value={overview[key]["Dividend (ttm)"]}
                          />
                          <Section
                            label="Dividend Yield"
                            value={overview[key]["Dividend Yield"]}
                          />
                          <Section
                            label="Dividend Date"
                            value={overview[key]["Ex-Dividend Date"]}
                          />
                          <Section label="Beta" value={overview[key]["Beta"]} />
                          <hr />
                          <p
                            className=" d-flex justify-content-between sum"
                            data-bs-toggle="collapse"
                            data-bs-target={"#sum"}
                          >
                            TA Summary:
                            <span>
                              <div
                                className=" fa-solid fa-chevron-down"
                                style={{ color: "white" }}
                              ></div>
                            </span>
                          </p>
                          <p className="collapse " id="sum">
                            {overview[key]["TA Summary"]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
