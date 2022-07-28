import React, { Component } from 'react';
import './App.css';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "tsparticles";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";


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



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "register",
      signedIn: false,
      user: {
        id: "",
        name: "",
        email:"",
        entries: 0,
        joined: new Date()
      }
    };
  }

  loadUser = data => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
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

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input})
    fetch("https://sleepy-thicket-82949.herokuapp.com/imageurl", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        input: this.state.input})
    }).then(res => res.json()).then(res => {
        this.displayFaceBox(this.calculateFaceLocation(res))
      }).catch(err => console.log(err))
}

  onRouteChange = route => {
    if(route === "signout") {
      this.setState({signedIn: false});
    }
    else if(route === "home")
      this.setState({signedIn: true});

    this.setState({route: route});
  }

  render() {
    const { signedIn, box, input, route, imageUrl} = this.state;
    const { name, entries } = this.state.user; 
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
      />
          <div>
            <h1 className='sega title'>Proposo AI</h1> 
            <Logo />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={input} />
        </div>
      </div>
    )
  }
    
}  


export default App;
