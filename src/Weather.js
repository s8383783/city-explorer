import React from 'react';
import Card from 'react-bootstrap/Card'


class Weather extends React.Component {
    render() {
        return (
            this.props.xWeather ?
            <>
                {this.props.xWeather.map((day, idx) => {
                    return (

                        <Card key = {idx} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={this.props.imageURL} />
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text>
                                     Low of  {day.low_temp}, high of {day.high_temp} with {day.weather.description} date: {day.datetime}
                                </Card.Text>
                            </Card.Body>
                        </Card>


                    )

                }
                )
                }
            </>
            : null
        )
    }
}
export default Weather;