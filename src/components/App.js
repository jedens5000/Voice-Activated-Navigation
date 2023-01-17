import React, { useState } from "react";
import HomePage from "./Home";
import AboutUs from "./AboutUs";
import Menu from "./Menu";
import WineList from "./WineList";
import Reviews from "./Reviews";
import Gallery from "./Gallery";
import ContactPage from "./Contact";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


function App() {
  const commands = [
    {
      command: ["Go to * page", "Go to *", "Go to * list", "Open * page", "Open *", "Show me the * page", "Show me the *", "Show me the * list", "Show me *", "Take me to the * page", "Take me to the *", "Take me to the * list", "Take me to *", "Take me *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");
  const pages = ["home", "homepage", "the homepage", "to the homepage", "home page", "the home page", "about us", "the about us", "the about us page", "menu", "the menu", "the menu page", "wine", "wine list", "the wine list", "reviews", "the reviews", "the reviews page", "gallery", "the gallery", "the gallery page", "contact", "contact page", "the contact page"];
  const urls = {
    home: "/",
    "homepage": "/",
    "home page": "/",
    "the homepage": "/",
    "the home page": "/",
    "to the homepage": "/",
    "about us": "/aboutus",
    "the about us": "/aboutus",
    "the about us page": "/aboutus",
    menu: "/menu",
    "the menu": "/menu",
    "the menu page": "/menu",
    wine: "/winelist",
    "wine list": "/winelist",
    "the wine list": "/winelist",
    reviews: "/reviews",
    "the reviews": "/reviews",
    "the reviews page": "/reviews",
    gallery: "/gallery",
    "the gallery": "/gallery",
    "the gallery page": "/gallery",
    contact: "/contact",
    "contact page": "/contact",
    "the contact page": "/contact",
    "to the contact page": "/contact",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let redirect = "";

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Redirect to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/winelist">Wine List</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={HomePage} />       
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/menu" component={Menu} />
        <Route path="/winelist" component={WineList} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/contact" component={ContactPage} />

        {redirect}
      </BrowserRouter>

      <p id="transcript">Click the button to use Voice Navigation:</p>
       <p>{transcript}</p>
      <button onClick={SpeechRecognition.startListening}>Click to Speak</button>
      <p>Try saying "Go to Gallery", "Open the Contact page", or "Show me the Wine List"</p>
    </div>
  );
}

export default App;
