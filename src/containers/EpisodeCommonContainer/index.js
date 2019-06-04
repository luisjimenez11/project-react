import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getEpisodes } from '../../redux/episodes/thunks'
import { addFavoriteEpisode } from '../../redux/users'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const EpisodeCommonContainer = props => {
  const {
    getEpisodes,
    loanding,
    episodes,
    error,
    users,
    loggedIn
  } = props

  let favoritecommon = [];
  useEffect(() => {
    (episodes.length === 0 && getEpisodes())
  }, [])

  for(const idEpisodeFavorite in users[loggedIn].favoriteEpisodes){
    const data = {
      idEpisode: null,
      nameEpisode: '',
      users: []
    }
    data.idEpisode = users[loggedIn].favoriteEpisodes[idEpisodeFavorite]
    for(const idUser in users){
      if(idUser !== loggedIn){
        if(users[idUser].favoriteEpisodes.includes(data.idEpisode)){
          data.users.push(users[idUser].name)
        }
      }
    }
    if(data.users.length > 0){
      episodes.forEach(function(episode) {
        if(episode.id === data.idEpisode){
          data.name = episode.name 
        }
      });      
      favoritecommon.push(data)
    }
  }

  return(
    <div className="Episodes">
      <Container>
        {error}
        {loanding && (
          <div>Loanding</div>
        )}
        {!loanding &&(
          <Row>
          {favoritecommon.map((episode, index) =>(
            <Col md={4} key={index}>
              <Card bg="primary" text="white" style={{ marginBottom:'20px', marginTop:'20px'}}>
                <Card.Body>
                  <Card.Title>{episode.name}</Card.Title>
                  <Card.Text>{episode.users.map((user, index) => <li key={index}>{user}</li>) }</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
          </Row>
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
    users,
    loggedIn
  }
}

const mapDispatchToProps = {
  getEpisodes,
  addFavoriteEpisode
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeCommonContainer);

