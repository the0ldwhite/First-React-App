//7451f69f2173af8a84cb335ffbe808fb
//api.openweathermap.org/data/2.5/weather?q=London 
//"http://api.openweathermap.org/data/2.5/forecast?APPID=7451f69f2173af8a84cb335ffbe808fb&q=chengdu"

import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Temp from './Temperature' 
import './App.css'
import {WiDaySunny} from 'weather-icons-react';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLocation       : '',
      currentLocationDataWx : {},
      fieldCity             : '',
      loading               : false,
      tempHigh              : 0,
      tempLow               : 0,
    }

    this.handleChangeFieldCity  = this.handleChangeFieldCity.bind(this)
    this.handleCitySubmit       = this.handleCitySubmit.bind(this)
  }


  ///////////////////////////////////////////////////////////////////////////////////
  // Lifecycle //////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
 
  componentWillMount() {
    console.log("I'm will be born!")
    
    
    
  
    // Set state on component will mount for 
    // us to be able to experiment with
    // we'll push it into a couple of component 
    // to understand the difference between props and state

    // use handleChangeCity to set location to chengdu
     
    // fake data with the most basic high/low values
    // this.handleChangeCityData({
    //   tempHigh: 7,
    //   tempLow: 0
    // })
  }

  
  componentDidMount() {
    console.log("I'm born!")
    console.log(this.state)
  }

  componentWillUnmount() {
    console.log('I will die')
  }

  
  ///////////////////////////////////////////////////////////////////////////////////
  // Methods ////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  handleChangeCity(newCity) {// 'chengdu'
    this.setState({ 
      currentLocation:newCity 
    })
    console.log('the city has been changed to ', newCity)
  }

  handleCurrentCityClear() {
    this.handleChangeCity('')
  }

  handleChangeCityData(cityData) {
    this.setState({ currentLocationDataWx: cityData })
    console.log('data has been updated',this.state)
  }

  handleChangeFieldCity(ev){
    console.log(ev)
    this.setState({fieldCity: ev.target.value})
    
  }
  getForcastData(city){
    this.setState({loading: true})
    const url      =   'http://api.openweathermap.org/data/2.5/forecast'
    const options  =  {
      q     : city,
      APPID : '7451f69f2173af8a84cb335ffbe808fb',
      unit  : 'metric'
    }
    
    axios.get(url,
      {params: options}
      
    )
    .then(response => this.setState({currentLocationDataWx: response, 
                                    loading: false,err:false,
                                    tempHigh: response.data.list[0].main.temp_max-273,
                                    tempLow: response.data.list[0].main.temp_min-273,
    
    }, console.log(response.data.list)))
    .catch(err => this.setState({
      loading:false,
      err: true
    }))
    
  }
  handleCitySubmit(ev){
    console.log(this.state.fieldCity)
    
    this.getForcastData(this.state.fieldCity)
    console.log(this.state)
    

    
  }
  ///////////////////////////////////////////////////////////////////////////////////
  // Renderer ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////


  // the render method is required.  
  // It should return JSX. i.e. <div>sample code</div>
  render() {

    // the name on out Material Toolbar
    let nameOfCity = ''

    // Assign the Location if its set in state
    // otherwise it should be select Location
    if (this.state.currentLocation) {
      // if we already have a city, use it
      nameOfCity = this.state.currentLocation
    } else {
      // no city.  use 'Select Location' as the app title
      nameOfCity = 'Select Location'
    }

    // get temperature for high/low for the state 
    // const tempHigh = this.state.currentLocationDataWx.tempHigh
    // const tempLow  = this.state.currentLocationDataWx.tempLow

    // Render the toolbar and Temp components
    if(this.state.loading=== true){
      return <CircularProgress />
    }
    else{
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {nameOfCity}
            </Typography>
          </Toolbar>
        </AppBar>
        <input
            id="new-todo"
            onChange={this.handleChangeFieldCity}
            value={this.state.fieldCity}
          />
        <button onClick={this.handleCitySubmit}>Submit</button>
        <TextField
          id="standard-name"
          label="Name"
          
          value={this.state.fieldCity}
          onChange={this.handleChangeFieldCity}
          margin="normal"
        />


        <Temp value={this.state.tempHigh} unit='c' />
        <Temp value={this.state.tempLow} unit='c' />
        <WiDaySunny size={100} color='red' />

      </div>
    );
    }
  }
}

export default App;
