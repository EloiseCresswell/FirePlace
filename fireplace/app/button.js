"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ToggleButton() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  if (!isToggled) {
  }
  return (
    <div className={isToggled ? "dropDownBox2" : "dropDownBox1"}>
      <img
        className="menuBtn"
        src={
          isToggled
            ? "./imgs/menu-close-button.png"
            : "./imgs/menu-open-button.png"
        }
        onClick={handleToggle}
        alt="Toggle Button"
      />
      {isToggled ? (
        <div>
          <Link className="links" href="/" onClick={handleToggle}>
            Home
          </Link>
          <br />
          <Link className="links" href="/Founders" onClick={handleToggle}>
            Founders
          </Link>
          <br />
          <Link className="links" href="/Booking" onClick={handleToggle}>
            Book Consultation
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
