import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import Footer from "../components/Layout/Footer";
import BestDeals from "../components/Home/BestDeals";
import Events from "./Event";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      {/* <Events /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
