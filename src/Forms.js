import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card'

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: {},
            cityGoog: '',
            map: '',
            error: '',
            weather: {},
            movieList: ''
        };

    }
    handleChange = (event) => {
        this.setState({
            cityGoog: event.target.value,
        })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.getLocationMap(event);

    };
    getWeather = async () => {
        try {
            const wAPI = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_KEY}&${this.state.city.lat}&${this.state.city.lon}`
            const wResponse = await axios.get(wAPI);
            this.setState({
                weather: wResponse.data[0]
            })
        }
        catch (error) {
            this.setState({
                error: `${error}. Could not find city. Try again.`
            })
        }
    }
    getMovies = async () => {
        const movies = `${server}/movies?searchQuery=${this.state.cityGoog}`
        try {
            const movieData = await axios.get(`${movies}`);
            const movieList = movieData.data[0];
            this.setState({ movieList: movieList, });
        } catch (error) {
            console.log(error);
            this.setState({ error: `${error}. The server could not find any movies. Please try again.`, })
        }
    }

getLocationMap = async (event) => {
    // event.preventDefault();
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.cityGoog}&format=json`
    try {
        const response = await axios.get(API)
        let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.city.lat},${this.state.city.lon}&zoom=14&size=250x250`
        this.setState({
            city: response.data[0],
            map: mapURL,
            error: ''
        })
    }
    catch (error) {
        this.setState({
            error: `${error} Oops! We could not find ${this.state.cityGoog}. Try again`
        })

    }



};
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
                        <Card.Img variant="top" src={this.state.map} />
                        <Card.Body>
                            <Card.Title>{this.state.city.display_name}</Card.Title>
                            <Card.Text>
                                Latitude: {this.state.city.lat}
                                <br />
                                Longitude: {this.state.city.lon}
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>


                </>
                : null

            }

        </div>
    )
}
}
export default Forms;