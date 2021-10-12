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
            map: ''
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
    getLocationMap = async (event) => {
        // event.preventDefault();
        const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.cityGoog}&format=json`
        const response = await axios.get(API)
        let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.city.lat},${this.state.city.lon}&zoom=14&size=250x250`
        this.setState({
            city: response.data[0],
            map: mapURL
        })



    }
    render() {
        return (
            <div id = "form2" >
                
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

                {this.state.city ?
                    <>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={this.state.map} />
                            <Card.Body>
                                <Card.Title>{this.state.city.display_name}</Card.Title>
                                <Card.Text>
                                Latitude: {this.state.city.lat}
                                <br/>
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