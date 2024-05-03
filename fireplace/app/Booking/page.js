"use client";

import React, { useState, useReducer } from "react";
import useSWR from "swr";
import "./styles.css";

const initState = {
  data: {
    name: "",
    postcode: "",
    address: "",
    city: "",
    number: "",
    email: "",
  },
  errorStatus: false,
};

let empty = {
  data: {
    name: false,
    postcode: false,
    address: false,
    city: false,
    number: false,
    email: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_FORM_DATA":
      let newState = { ...state };
      const keyName = action.payload.name;
      const newValue = action.payload.value;

      newState.data[keyName] = newValue;

      return newState;
      break;
    default:
      return state;
      break;
  }
}

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Booking() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [error, setError] = useState("");
  const [userPostCode, setUserPostcode] = useState(false);
  const [userIsBritain, setIsBritain] = useState(true);
  const [userPhoneLength, setPhoneLength] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { data: postCodeData, err } = useSWR(
    userPostCode
      ? `https://api.postcodes.io/postcodes/${initState.data.postcode}`
      : null,
    fetcher
  );

  if (postCodeData) {
    if (postCodeData.status === 404) {
      console.log("No country found");
    } else {
      setIsBritain(false);
      const country = postCodeData.result.country;
      if (
        country !== "England" &&
        country !== "Wales" &&
        country !== "Scotland"
      ) {
        setIsBritain(false);
      } else {
        setIsBritain(true);
      }
    }
    setUserPostcode(false);
  }

  const handleInputChange = (event) => {
    setIsFormSubmitted(false);
    dispatch({
      type: "ADD_FORM_DATA",
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  };

  const handleSubmit = (event) => {
    setIsBritain(true);
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setIsFormSubmitted(true);

    const emptyFields = Object.entries(state.data).filter(
      ([key, value]) => value.trim() === ""
    );

    emptyFields.forEach(([key]) => (empty.data[key] = true));

    if (!empty.data.postcode) {
      setUserPostcode(true);
    }
    if (emptyFields.length > 0) {
      setError("Error all fields are required - some missing.");
      return;
    } else {
      empty = {
        data: {
          name: false,
          postcode: false,
          address: false,
          city: false,
          number: false,
          email: false,
        },
      };
    }

    if (
      state.data.number.length > 14 ||
      state.data.number.length < 9 ||
      state.data.number.length < 0
    ) {
      setPhoneLength(true);
    } else {
      setPhoneLength(false);
    }

    console.log(
      `Name: ${state.data.name}\nPostcode: ${state.data.postcode}\nAddress: ${state.data.address}\nCity: ${state.data.city}\nNumber: ${state.data.number}\nEmail: ${state.data.email}`
    );
    setError("");
  };

  return (
    <div className="bookingForm">
      <div className="title">
        <h2>Design Booking</h2>
      </div>

      <div className="fullForm">
        <form onSubmit={handleSubmit}>
          <h3>Personal Information:</h3>

          <div className="formSection">
            <label htmlFor="name">Full Name</label>
            <div className={empty.data.name ? "star" : "noStar"}>
              Please fill in Name *
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={state.data.name}
              onChange={handleInputChange}
            ></input>
            <label htmlFor="postcode">Postcode</label>
            <div className={userIsBritain ? "noStar" : "invalid"}>
              Country not valid, please use UK address.
            </div>
            <div className={empty.data.postcode ? "star" : "noStar"}>
              Please fill in Post Code*
            </div>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={state.data.postcode}
              onChange={handleInputChange}
            ></input>
            <label htmlFor="address">House/Flat Number and Street Name</label>
            <div className={empty.data.address ? "star" : "noStar"}>
              Please fill in Address *
            </div>
            <input
              type="text"
              id="address"
              name="address"
              value={state.data.address}
              onChange={handleInputChange}
            ></input>
            <label htmlFor="city">City</label>
            <div className={empty.data.city ? "star" : "noStar"}>
              Please fill in City *
            </div>
            <input
              type="text"
              id="city"
              name="city"
              value={state.data.city}
              onChange={handleInputChange}
            ></input>
          </div>

          <h3>Contact Information:</h3>

          <div className="formSection">
            <label htmlFor="number">Phone Number</label>
            <div className={userPhoneLength ? "numberInvalid" : "noStar"}>
              Phone Number needs to be between 9 - 14 digits long *
            </div>
            <div className={empty.data.number ? "star" : "noStar"}>
              Please fill in Phone Number *
            </div>
            <input
              type="tel"
              id="number"
              name="number"
              value={state.data.number}
              onChange={handleInputChange}
            ></input>
            <label htmlFor="email">Email Address</label>
            <div className={empty.data.email ? "star" : "noStar"}>
              Please fill in Email Address *
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={state.data.email}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="errorHandler">{error}</div>
          <div className="btn">
            <button type="submit">Request Design Consultation</button>

            {isLoading && <div className="loadingComplete">Loading...</div>}
            {!isLoading && error && (
              <div className="loadingComplete">Form Error!</div>
            )}
            {!isLoading && isFormSubmitted && userIsBritain && !error && (
              <div className="loadingComplete">
                <p>Form Submitted!</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
