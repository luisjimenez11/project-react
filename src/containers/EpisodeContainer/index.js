import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getEpisodes } from '../../redux/episodes/thunks'
import { addFavoriteEpisode } from '../../redux/users'

import './style.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const EpisodeContainer = props => {
  const {
    getEpisodes,
    addFavoriteEpisode,
    loanding,
    episodes,
    error,
    user
  } = props

  useEffect(() => {
    (episodes.length === 0 && getEpisodes())
  }, [])

  const episodesNotFavorites = episodes.filter(item => {
    return !user.favoriteEpisodes.includes(item.id);
  })

  const episodesFavorites = episodes.filter(item => {
    return user.favoriteEpisodes.includes(item.id);
  })

  
  return(
    <div className="Episodes">
      <Container>
        {error}
        {loanding && (
          <div>Loanding</div>
        )}
        {!loanding &&(
          <>
            <Row>
            {episodesFavorites.map((episode, index) =>(
              <Col md={4} key={index}>
                <Card bg="primary" text="white" style={{ marginBottom:'20px', marginTop:'20px'}}>
                  <Card.Body>
                    <Card.Title>{`${episode.id} ${episode.name}`}</Card.Title>
                    <Card.Text>{episode.air_date}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {episodesNotFavorites.map((episode, index) =>(
              <Col md={4} key={index}>
                <Card style={{ marginBottom:'20px', marginTop:'20px'}}>
                  <Card.Body>
                    <Card.Title>{`${episode.id} ${episode.name}`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{episode.air_date}</Card.Subtitle>
                    <Button onClick={ () => addFavoriteEpisode(episode.id)} variant="primary">Añadir a Favoritos</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  const {
    loading,
    entities,
    error
  } = state.episodes

  const {
    users,
    loggedIn
  } = state.users
  
  return {
    loading,
    episodes: entities,
    error,
    user: users[loggedIn]
  }
}

const mapDispatchToProps = {
  getEpisodes,
  addFavoriteEpisode
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeContainer);

