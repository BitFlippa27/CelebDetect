import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "tsparticles";

const particlesOptions = 
    {
      background: {
        color: {
          value: "linear-gradient(89deg, #FF5EDF  0%, #04C8DE 100% )"
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 100,
        },
        opacity: {
          value: 0.2,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }


const App = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
      />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*
        <FaceRecognition />
        */}
      </div>
    );
}  


export default App;
