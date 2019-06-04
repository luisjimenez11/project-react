import React from 'react'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { closeSesion } from '../../redux/users/thunks'


const Navbar = ({name, closeSesion}) => {
  console.log(name)
  return(
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink exact to="/" className='nav-item nav-link'>Episodios</NavLink>
          <NavLink exact to="/characters/" className="nav-item nav-link">Personajes</NavLink>
          <NavLink exact to="/episodecommon/" className="nav-item nav-link">Episodios en comun</NavLink>
        </div>
      </div>

        <span className="navbar-text">
          {name}
        </span>
        <button onClick={closeSesion} className="btn btn-primary btn-sm">Cerrar Sesion</button>
    </div>
  </nav>
)}

const mapStateToProps = state => {

  const {
    loggedIn,
    users
  } = state.users
  
  return {
    name: users[loggedIn].name
  }
}

const mapDispatchToProps = {
  closeSesion
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);