import "./AboutMe.css";
import React from "react";

const AboutMe = React.forwardRef((_props, ref) => (
  <section ref={ref} className="about-me" id="aboutme">
    <h2 className="about-me__title">About me</h2>
    <div className="about-me__flex-container">
      <div className="about-me__text">
        <h3 className="about-me__content-title">Taya Valieva</h3>
        <p className="about-me__content-subtitle">Web Developer</p>
        <p className="about-me__content">
          Web developer with a customer-facing experience and a proven ability
          to deliver high quality results under strict deadlines in both
          self-starting and cross-functional collaborative environments.
        </p>
        <nav className="about-me__socials">
          <a
            href="https://www.facebook.com/taya.valieva/"
            target="_blank"
            className="about-me__socials-link"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://github.com/tayavalieva"
            target="_blank"
            className="about-me__socials-link"
            rel="noreferrer"
          >
            Github
          </a>
        </nav>
      </div>
      <div className="about-me__photo"></div>
    </div>
  </section>
));

export default AboutMe;
