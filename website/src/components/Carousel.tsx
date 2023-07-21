// @ts-nocheck

import React, { useState, useEffect, useRef } from "react";

const Carousel = ({ data, ticker }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      // Initialize the carousel and start auto sliding
      new window.bootstrap.Carousel(carousel, {
        interval: 5000, // Set the interval for auto sliding in milliseconds
      });
    }
  }, []);
  const isEmpty = (arr) => {
    if (Array.isArray(arr) && arr.length) {
      return true;
    } else {
      return false;
    }
  };
  const renderCards = (array) => {
    const rows = [];
    let cols = [];

    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (!item) continue;
      cols.push(
        <div className="col-3 " key={i}>
          <div
            className="card h-100  text-white bg-dark cardH "
            style={{ width: "12rem" }}
            data-bs-toggle="collapse"
            data-bs-target={`#test-block${i}`}
            aria-expanded="false"
            aria-controls="test-block"
          >
            <img
              className="card-img-top"
              src={array[i].urlToImage}
              alt="Card image cap"
              style={{ objectFit: "cover", height: "70px" }}
            />
            <div className="card-body cardH ">
              <h6 className="card-title">{array[i].title}</h6>
              <p className="card-text collapse" id={`test-block${i}`}>
                {array[i].description}
              </p>
              <a
                href={array[i].url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                {array[i].source.name}
              </a>
            </div>
          </div>
        </div>
      );

      if (cols.length > 0 && (cols.length === 3 || i === array.length - 1)) {
        rows.push(
          <div className="row justify-content-center" key={i}>
            {cols}
          </div>
        );
        cols = [];
      }
    }

    return rows;
  };
  return (
    <div className="card  bottom-panel text-white mb-1 ">
      <div className="card-body">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title">News for {ticker}: </h5>
            </div>
            <div className="col-md-15">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
                ref={carouselRef}
              >
                <div className="carousel-inner ">
                  <div className="carousel-item active">
                    {renderCards(data.slice(0, 3))}
                  </div>
                  {data.slice(3).reduce((result, item, index) => {
                    if (index % 3 === 0) {
                      result.push(
                        <div className="carousel-item" key={index}>
                          {renderCards(data.slice(index + 3, index + 6))}
                        </div>
                      );
                    }
                    return result;
                  }, [])}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
