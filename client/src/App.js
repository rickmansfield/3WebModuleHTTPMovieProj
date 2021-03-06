import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import AddMovieForm from './components/AddMovieForm';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    console.log('App.js ln:25 id', id);
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      // console.log('App.js ln:30 deleteMovie res', res);
      // console.log('App.js ln:31 deleteMovie res', res.data);
      setMovies(movies.filter(movie => movie.id !== id));
      // console.log('App.js ln:33 deleteMovie movies state:', movies);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const addToFavorites = (movie) => {

  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png" /> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            {/* 1 First, we need to be able to navigate to the edit movie component. In App.js, add in the `<EditMovieForm> `component to the supplied edit route. Remember it MUST go before edit/:id Route to work*/}
            {/* <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies}/>
            </Route> */}
            {/* notice the method above is more "correct" becuase the next method that i actually use doesn't "need" the props passed. They don't do anything...but this method might help in other situations where render is needed to get props passed in.  */}
            <Route path='/movies/add' render={props =><AddMovieForm {...props} setMovies={setMovies} />}>
            </Route>

            <Route path="/movies/edit/:id" render={props => <EditMovieForm {...props} setMovies={setMovies} />}>
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie}/>
            </Route>



            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

