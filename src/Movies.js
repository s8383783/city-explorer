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
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>

                                        Overview : {movie.overview}

                                        Votes: {movie.vote_count}

                                       Popularity: {movie.popularity}

                                       Release date: {movie.released_on}
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