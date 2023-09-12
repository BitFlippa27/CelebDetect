import React, { Component } from 'react';
import './App.css';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "tsparticles";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Spinner from './components/Spinner/Spinner';
import { particlesOptions } from './components/utils/particles';


const particlesInit = async (main) => {
      await loadFull(main);
    };

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  celebrities: {},
  route: "register",
  signedIn: false,
  user: {
    id: "",
    name: "",
    email:"",
    entries: 0,
    joined: new Date()
  },
  isLoading: false
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    this.setState({ isLoading: false});
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

  calculateFaceLocations = data => {
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    const allBoundigBoxes = data.outputs[0].data.regions.map(region => {
      return  {
        leftCol: region.region_info.bounding_box.left_col * width,
        topRow: region.region_info.bounding_box.top_row * height,
        rightCol: width - (region.region_info.bounding_box.right_col * width),
        bottomRow: height - (region.region_info.bounding_box.bottom_row * height)
      }
    });

    const celebrityName1 = data.rawData.outputs[0].data.regions[0].data.concepts[0].name;
    const celebrityName2 = data.rawData.outputs[0].data.regions[0].data.concepts[1].name;
    const celebrityName3 = data.rawData.outputs[0].data.regions[0].data.concepts[2].name;



    const capitalizedNames = this.capitalizeName(celebrityName1, celebrityName2, celebrityName3);
    this.displayResult(capitalizedNames);

    alert(`The AI detected ${capitalizedNames.result1} with a probability of ${Number(data.rawData.outputs[0].data.regions[0].data.concepts[0].value) * 100}%
    or ${capitalizedNames.result2} with a probability of ${Number(data.rawData.outputs[0].data.regions[0].data.concepts[1].value)* 100} % 
    or ${capitalizedNames.result3} with a probability of ${Number(data.rawData.outputs[0].data.regions[0].data.concepts[2].value) * 100} % `);
    
    return allBoundigBoxes;
  }

  capitalizeName = (celebrityName1, celebrityName2, celebrityName3) => {
    const array = celebrityName1.split(" ");
    const array2 = celebrityName2.split(" ");
    const array3 = celebrityName3.split(" ");


    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
      array2[i] = array2[i].charAt(0).toUpperCase() + array2[i].slice(1);
      array3[i] = array3[i].charAt(0).toUpperCase() + array3[i].slice(1);
    }
    const result1 = array.join(" ");
    const result2 = array2.join(" ");
    const result3 = array3.join(" ");

    return {
      result1: result1,
      result2: result2,
      result3: result3,
    };
  }


  displayFaceBox = allBoxes => {
    this.setState({boxes: allBoxes});
  }

  displayResult = (celebrities) => {
    this.setState({celebrities: celebrities});
  }

  onInputChange = event => {
    this.setState({boxes: []});
    this.setState({ input: event.target.value });
  }

checkFileExtension = () => {
  const png = /.png$/;
  const jpg = /.jpg$/
  const jpeg = /.jpeg$/
  
  if(png.test(this.state.input))
    return true
  if(jpg.test(this.state.input))
    return true  
  if(jpeg.test(this.state.input))
    return true
} 

  onPictureSubmit = () => {
    this.setState({ isLoading: true});

    if(!this.state.input) {
      alert("Please paste an URL");
      return
    }
    if(!this.checkFileExtension()) {
      alert("File not supported. Try .jpeg, .jpg or .png");
      return
    }

    this.setState({ imageUrl: this.state.input});
    fetch("https://proposoai-api.onrender.com/imageurl", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        input: this.state.input})
    }).then(res => res.json()).then(res => {
        this.displayFaceBox(this.calculateFaceLocations(res));
      }).catch(err => console.log(err))
      this.setState({ isLoading: false});
}

  onRouteChange = route => {
    if(route === "signout") {
      this.setState(initialState);
    }
    else if(route === "home")
      this.setState({signedIn: true});

    this.setState({route: route});
  }

  render() {
    const { signedIn, box, input, route, imageUrl,celebrities, boxes, isLoading} = this.state;
    const { name, entries } = this.state.user; 
    return (
        <div className="App">
          <Particles
            className="particles"
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
        />
            {isLoading ? (<Spinner />) : (
              <div>
                <h1 className='sega title'>CelebDetect</h1> 
                <Logo />
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onPictureSubmit={this.onPictureSubmit}/>
                <FaceRecognition boxes={boxes} imageUrl={input} />
              </div>
            )}
        </div>
    )
  }  
}  

export default App;
