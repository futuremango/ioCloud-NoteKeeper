import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About<span> Dear Diary</span></h1>
        <p className="about-subtitle">
          A place where your thoughts find structure or maybe closure...
        </p>

        <div className="about-section">
          <h2>What is <span> Dear Diary</span></h2>
          <p>
            It is is your personal space to write, save, and manage your notes or thoughts. This site is Built with <strong>ReactJS</strong>, <strong>Node.js</strong>, and
            <strong> MongoDB</strong>, it’s designed to bring calm to your workflow.
          </p>
        </div>

        <div className="about-section">
          <h2>Why I Created It</h2>
          <p>
            I had a vision not just to create something that shows my skills, but to build something meaningful for myself too. It’s not about being fancy or cool; it’s something personal. A digital reflection of growth, where every note is
            a step toward progress and peace.
          </p>
        </div>

        <div className="about-section">
          <h2>About the Creator</h2>
          <p>
            Hi, I’m <strong>The Romysa Siddiqui</strong> a passionate web developer and lifelong learner.
            I believe technology becomes beautiful when it serves people with
            simplicity and intention. My dream is to use my skills to create
            projects that bring benefit, purpose, and peace.
          </p>
        </div>

        <div className="about-footer">
          <p>
            Built with passion, consistency, and Striving to create with purpose, improve with patience, and grow with gratitude..
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
