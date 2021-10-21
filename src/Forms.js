import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Weather from './Weather'
import Movies from './Movies';

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: {},
            cityGoog: '',
            citymap: '',
            error: '',
            weather: [],
            movies: []
        };

    }
    handleChange = (event) => {
        this.setState({
            cityGoog: event.target.value,
        })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.getLocationMap();


    };
    getLocationMap = async () => {
        try {
            const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.cityGoog}&format=json`
            const response = await axios.get(API)
            this.setState({
                city: response.data[0],
                map: '',
                error: ''
            })
            this.getWeather();
            this.getMovies();
            this.getMap();
        }
        catch (error) {
            this.setState({
                error: `${error} Oops! We could not find ${this.state.cityGoog}. Try again`
            })

        }

        
    
    };

    getWeather = async () => {
        
        const wAPI = `${process.env.REACT_APP_SERVER}weather?lat=${this.state.city.lat}&lon=${this.state.city.lon}`;
        try {
            const wResponse = await axios.get(wAPI);
            console.log(process.env.REACT_APP_SERVER);
            this.setState({
                weather: wResponse.data
            })

        }
        catch (error) {
            this.setState({
                error: `${error}. Could not find city. Try again.`
            })
        }
    }

    getMovies = async () => {
        const mAPI = `${process.env.REACT_APP_SERVER}movie?query=${this.state.cityGoog}`
        try {
            const mResponse = await axios.get(mAPI);
            console.log(mResponse);
            this.setState({
                movies: mResponse.data.results
            })
            console.log(this.state.movies);
        }
        
        catch (error) {
            this.setState({
                error: `${error}. Could not find city. Try again.`
            })
        }
        
    }

getMap = () => {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.city.lat},${this.state.city.lon}&zoom=10&size=400x400&format=png&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`;

    this.setState({citymap: mapURL});

}
    render() {
        return (
            <div id="form2" >

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Enter City</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" placeholder="Enter city"
                        />
                        <Button variant="primary" type="submit">
                            Explore!
                        </Button>

                    </Form.Group>

                </Form>
                {this.state.error ?
                    <>
                        <h2> {this.state.error} </h2>
                    </>
                    : null
                }

                {this.state.city ?
                    <>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src= {this.state.citymap}/>
                            <Card.Body>
                                <Card.Title>{this.state.city.display_name}</Card.Title>
                                <Card.Text>
                                    Latitude: {this.state.city.lat}
                                    <br />
                                    Longitude: {this.state.city.lon}
                                </Card.Text>
                                
                            </Card.Body>
                        </Card>

                        <Weather
                        xWeather = {this.state.weather}
                         />

                        <Movies
                        xMovie = {this.state.movies} />


                    </>
                    : null

                }

            </div>
        )
    }
}
export default Forms;