import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import About from "./About";
import { Button } from "antd";
import Layout from "../components/Layout";

function Home() {
  return (
  <>
      <Navbar />
      <Header />
      <About />
      <section className="py-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Services</h2>
        <p className="text-center text-gray-700">Explore our wide range of health services tailored for you.</p>
      </section>
      <section className="py-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Doctors</h2>
        <p className="text-center text-gray-700">Meet our experienced doctors who are here to help you.</p>
      </section>
      <section className="py-8 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Login / Registration</h2>
        <Button type="primary" className="mr-2">Login</Button>
        <Button type="default">Register</Button>
      </section>
    </>
  );
}

export default Home;
