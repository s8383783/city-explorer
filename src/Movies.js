import React from 'react';
import Card from 'react-bootstrap/Card';


class Movies extends React.Component {
    render() {
        return (
            
            
            this.props.xMovie ?
                <>
                    {this.props.xMovie.map((movie, idx) => {
                        return (
                            <Card key= {idx} style={{ width: '18rem' }}>
                                {/* <Card.Img variant="top" src={movie.image} /> */}
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        {movie.overview}
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
export default Movies;