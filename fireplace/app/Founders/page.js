import "./styles.css";
import { AllFoundCards } from "./data";

export default function Founders() {
  return (
    <>
      <div className="foundersHero">
        <h1>
          Meet the artisans
          <br />
          behind our
          <br />
          masterpieces!
          <br />
          <br />
          Mike and Mandy
        </h1>
        <img className="foundersImg" src="./imgs/founder-mike-and-mandy.png" />
      </div>
      <FoundCards />
    </>
  );
}

function FoundCards() {
  return (
    <div className="found-card-container">
      <FoundCard />
    </div>
  );
}

function FoundCard() {
  const listOfFoundCards = AllFoundCards.map((foundCardData) => (
    <div className="foundCard" key={foundCardData.title}>
      <h4>{foundCardData.title}</h4>
      <p className="card-text">{foundCardData.text}</p>
      <img
        className="cardsimgs"
        src={foundCardData.img}
        alt={foundCardData.alt}
      />
    </div>
  ));

  return listOfFoundCards;
}
