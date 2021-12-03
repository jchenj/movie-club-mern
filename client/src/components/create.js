import React, { Component } from "react";
// This will require to npm to install axios;
import axios from "axios";

export default class Create extends Component {
    // This is the construcor that stores the data
    constructor(props) {
        super(props);

        this.onChangeFilmTitle = this.onChangeFilmTitle.bind(this);
        this.onChangeFilmDirector = this.onChangeFilmDirector.bind(this);
        this.onChangeFilmLength = this.onChangeFilmLength.bind(this);
        this.onChangeFilmYear = this.onChangeFilmYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            film_title: "",
            film_director: "",
            film_length: "",
            film_year: "",
        };
    }

    // Methods to update state properties
    onChangeFilmTitle(e) {
        this.setState({
            film_title: e.target_value,
        });
    }

    onChangeFilmDirector(e) {
        this.setState({
            film_director: e.target_value,
        });
    }

    onChangeFilmLength(e) {
        this.setState({
            film_length: e.target_value,
        });
    }

    onChangeFilmYear(e) {
        this.setState({
            film_year: e.target_value,
        });
    }

// Function to handle the submission
    onSubmit(e) {
        e.preventDefault();

        // When post request sent to create url, axios will add a new record (new film) to the database
        const newfilm = {
            film_title = this.state.film_title,
            film_director = this.state.film_director,
            film_length = this.state.film_length,
            film_year = this.state.film_year
        };

        axios 
          .post("http://localhost:5000/record/add", newfilm)
          .then((res) => console.log(res.data));

        // Empty state after posting data to the database
        this.setState({
            film_title: "",
            film_director: "",
            film_length: "",
            film_year: "",
        });
    }

// section to display the form that takes input from the user
render() {
    return (
        <div style={{ marginTop: 20 }}>
            <h3>Create New Record</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title: </label>
                    <input 
                      type="text"
                      className="form-control"
                      value={this.state.film_title}
                      onChange={this.onChangeFilmTitle}
                    />
                </div>
                <div className="form-group">
                    <label>Director: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.film_director}
                      onChange={this.onChangeFilmDirector}
                    />
                </div>
                <div className="form-group">
                    <label>Length (mins): </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.film_length}
                      onChange={this.onChangeFilmLength}
                    />
                </div>
                <div className="form-group">
                    <label>Year: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.film_year}
                      onChange={this.onChangeFilmYear}
                    />
                </div>
            </form>
        </div>
    );
}
} 