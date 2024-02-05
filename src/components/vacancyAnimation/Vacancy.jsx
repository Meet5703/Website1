/* eslint-disable no-unused-vars */
import React from "react";
import "./Vacancy.css"; // Import the CSS file for styling
import PropTypes from "prop-types";
const Vacancy = ({ title1 }) => {
  return (
    <div className="vacancy-container mt-4 md:mt-6 space-x-8">
      <pre className="animated-text text-xl md:text-3xl">{title1}</pre>
    </div>
  );
};

Vacancy.propTypes = {
  title1: PropTypes.string
};

export default Vacancy;
