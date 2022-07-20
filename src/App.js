import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "tsparticles";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";


//console.log(Clarifai);
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

const particlesInit = async (main) => {
      await loadFull(main);
    };

const app = new Clarifai.App({
  apiKey: '2fa81f0840ad467ba9df30d0494e228f'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      signedIn: false
    };
  }

  calculateFaceLocation = data => {
    const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - (boundingBox.right_col * width),
      bottomRow: height - (boundingBox.bottom_row * height)
    }
  }

  displayFaceBox = box => {
    this.setState({box: box});

    console.log(box)
  }

  onInputChange = event => {
   this.setState({ input: event.target.value });
   console.log(this.state)
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(res => {
        this.displayFaceBox(this.calculateFaceLocation(res))
        console.log(res.outputs[0].data.regions[0].region_info.bounding_box);
      }).catch(err => console.log(err));
      
  }

  onRouteChange = route => {
    if(route === "signout")
      this.setState({signedIn: false});
    else if(route === "home")
      this.setState({signedIn: true});

    this.setState({route: route});
  }

  render() {
    const { signedIn, box, input, route, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
      />
        <Navigation onRouteChange={this.onRouteChange} signedIn={signedIn} />
        {route === "home" ? 
          <div> 
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={input} />
        </div>
        : 
          (
            this.state.route === "signin" ?
              <SignIn onRouteChange={this.onRouteChange} /> 
            : 
              <Register onRouteChange={this.onRouteChange} />
          )
          
        }
      </div>
    )
  }
    
}  


export default App;
