import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const EditMovieForm = (props) => {
	// console.log('Here are EditMovieForm props: ', props)
	const { push } = useHistory();//7 Redirect the user to the currently edited movie's individual info page. also see handleSubmit below

	//2 Next, we need to grab the id being passed into the component through the url. Use the `useParams` hook to get the id value.
	const { id } = useParams();

	//5 Don't forget to make sure that your server data and your local state are in sync! Make any changes the edit route needed to give the edit form access to App's `setMovies` method.

	// 6A see below for 6B 
	//const { setMovies } = props; 
	// this is another option. YOu can destucture like this and NOT have to use props below. look at the handleSubmit carefully and make sure the setMovies is plural too. 


	const [movie, setMovie] = useState({
		title: "",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});

	//3. We need to be able to load in the current movie's attributes into our local form state. When `EditMovieForm` mount, retrieve our current id's movie from the api and save the data returned to local state. Hence a useEffect and GET req, like on didMount here and add the ${id}
	useEffect(() => {
		axios.get(`http://localhost:5001/api/movies/${id}`)
			.then(res => {
				setMovie(res.data);
			})
			.catch(err => {
				console.log(err.response);
			})
	}, []);

	const handleChange = (e) => {
		setMovie({
			...movie,
			[e.target.name]: e.target.value
		});
	}
	//4. At this point, nothing happens when the edit form is submitted. Add in the api call needed to update the server with our updated movie data.
	const handleSubmit = (e) => {
		e.preventDefault();
		axios.put(`http://localhost:5001/api/movies/${id}`, movie)
			.then(res => {
				props.setMovies(res.data);//6b Now that we have access to `setMovies`, make sure the updated list of movies is saved to our global state.Notice that rather than use props here we could have used destructuring above in the form const { setMovies } = props;
				console.log('EditMovieForm.js ln:48 res.data', res.data);//I can see from this console.lot we're all set. pun intended. 
				push(`/movies/${id}`);//7 Redirect the user to the currently edited movie's individual info page.
			})
			.catch(err => {
				console.log('Error:', err);
			})
	}

	const { title, director, genre, metascore, description } = movie;

	return (
		<div className="col">
			<div className="modal-content">
				<form onSubmit={handleSubmit}>
					<div className="modal-header">
						<h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label>Title</label>
							<input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Director</label>
							<input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Genre</label>
							<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Metascore</label>
							<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
						</div>
						<div className="form-group">
							<label>Description</label>
							<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
						</div>

					</div>
					<div className="modal-footer">
						<input type="submit" className="btn btn-info" value="Save" />
						<Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
					</div>
				</form>
			</div>
		</div>);
}

export default EditMovieForm;