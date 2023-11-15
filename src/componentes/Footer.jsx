import React from "react";
import { AiFillGithub } from "react-icons/ai";
import "../styles/Footer.css";

export const Footer = () => {
  return (
    <footer>
      <h4>Made with love, React, Node, Express and MySQL.</h4>
      <h4>Developed and designed by Caio Melo.</h4>
      <div className="footer-div">
        <span>Find me on: </span>
        <a href="https://github.com/caiomelotec?tab=repositories">
          <AiFillGithub size={30} color="black" />
        </a>
      </div>
    </footer>
  );
};
