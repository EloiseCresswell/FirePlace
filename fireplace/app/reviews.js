"use client";

import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ReviewsBox() {
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: reviewData, error } = useSWR(
    review
      ? `https://seal-app-336e8.ondigitalocean.app/reviews?country=${review}`
      : null,
    fetcher
  );

  const handleClick = (country) => {
    setReview(country);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="reviewContainer">
      <div className="reviewIntro">
        <h2>Trusted.</h2>
        <br />
        <hr />
        <br />
        <p>
          We've got thousands of happy customers all over the UK. Choose your
          country to see the latest review:
        </p>
      </div>
      <div className="reviewBtns">
        <button onClick={() => handleClick("england")}>England</button>
        <button onClick={() => handleClick("wales")}>Wales</button>
        <button onClick={() => handleClick("scotland1")}>Scotlandd</button>
      </div>

      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <div>Review not found!</div>}
      {!isLoading && reviewData && (
        <>
          <div className="reviewActive">
            <p>{reviewData.text}</p>
          </div>
          <div className="reviewUser">
            <p>
              {reviewData.author} {review ? "-" : ""} {reviewData.location}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
