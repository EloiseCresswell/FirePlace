import "./page.css";
import ReviewsBox from "./reviews.js";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ReviewsBox />
      <Cards />
    </>
  );
}

function HeroSection() {
  return (
    <div className="heroSection">
      <img
        className="heroImg"
        src="./imgs/hero-mobile.jpg"
        alt="Fireplace Palace"
      />
      <div className="titleSpace">
        <div className="heroTitle">
          <p className="title1">Discover the Perfect Fireplace...</p>
          <p className="title2">
            <Link className="bookingBtn" href="/Booking">
              <button>Book Consultation</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div className="card-container">
      <p className="card-title">How it works.</p>
      <hr />
      <div className="cards">
        <EveryCard />
      </div>
    </div>
  );
}

function EveryCard() {
  const listOfCards = AllCards.map((cardData) => (
    <div className="card" key={cardData.title}>
      <img className="cardsimgs" src={cardData.img} alt={cardData.alt} />
      <h4>{cardData.title}</h4>
      <p className="card-text">{cardData.text}</p>
    </div>
  ));

  return listOfCards;
}

const AllCards = [
  {
    img: "./imgs/how-it-works.jpg",
    alt: "Card 1 image",
    title: "Hello there",
    text: "Call us and book in a 'Design Consultation' on a date and time to suit you.",
  },
  {
    img: "./imgs/how-it-works-2.jpg",
    alt: "Card 2 image",
    title: "Hello there",
    text: "Call us and book in a 'Design Consultation' on a date and time to suit you.",
  },
  {
    img: "./imgs/how-it-works-3.jpg",
    alt: "Card 3 image",
    title: "Hello there",
    text: "Call us and book in a 'Design Consultation' on a date and time to suit you.",
  },
];
