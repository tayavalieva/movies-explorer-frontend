import "./AboutProject.css";
import React from "react";

const AboutProject = React.forwardRef((_props, ref) => (
  <section ref={ref} className="about-project" id="about-project">
    <h2 className="about-project__title">About Project</h2>
    <ul className="about-project__table">
      <li className="about-project__table-cell">
        <h3 className="about-project__content-title">
          My final project included 5 stages
        </h3>
        <p className="about-project__content">
          Planning, backend development, layout creation, frontend functionality
          on React, final revisions.
        </p>
      </li>
      <li className="about-project__table-cell">
        <h3 className="about-project__content-title">
          It took 5 weeks to complete the project.
        </h3>
        <p className="about-project__content">
          Every stage had soft and hard deadlines to keep.
        </p>
      </li>
    </ul>
    <div className="about-project__timeline">
      <div className="about-project__timeline-filled about-project__timeline-20">
        <p className="about-project__timeline-label">1 week</p>
      </div>
      <p className="about-project__timeline-label">4 weeks</p>
    </div>
    <div className="about-project__timeline-caption">
      <div className="about-project__timeline-20">
        <p className="about-project__timeline-caption-text">Backend</p>
      </div>
      <p className="about-project__timeline-caption-text">Frontend</p>
    </div>
  </section>
));

export default AboutProject;
