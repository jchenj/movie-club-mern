import React, { Component } from "react";
// Will require to npm install axios
import axios from 'axios';
import { withRouter } from "react-router";

class Edit extends Component {
    // Constructor that stores data
    constructor(props) {
        super(props);

        this.onChangeFilmTitle = this.onChangeFilmTitle.bind(this);
        this.onChangeFilmDirector = this.onChangeFilmDirector.bind(this);
        this.onChangeFilmLength = this.onChangeFilmLength.bind(this);
        this.onChangeFilmYear = this.onChangeFilmYear.bind(this);

        this.state = {
            film_title: "",
            film_director: "",
            film_length: "",
            film_year: "",
            records: [],
        };
    }
    // Get record based on id from db
    componentDidMount() {
        axios
          .get("http://localhost:5000/record" + this.props.match.params.id)
          .then((response) => {
              this.setState({
                  film_title: response.data.film_title,
                  film_director: response.data.film_director,
                  film_length: response.data.film_length,
                  film_year: response.data.film_year,
              });
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    // Methods to update state properties
    onChangeFilmTitle(e) {
        this.setState({
            film_title: e.target.value,
        });
    }

    onChangeFilmDirector(e) {
        this.setState({
            film_director: e.target.value,
        });
    }

    onChangeFilmLength(e) {
        this.setState({
            film_length: e.target.value,
        });
    }

    onChangeFilmYear(e) {
        this.setState({
            film_year: e.target.value,
        });
    }

    // Function to handle the submissions
    onSubmit(e) {
        e.preventDefault();
        const newEditedFilm = {
            film_title: this.state.film_title,
            film_director: this.state.film_director,
            film_length: this.state.film_length,
            film_year: this.state.film_year,
        };
        console.log(newEditedFilm);

        // Send a post request to update data in the db
        axios  
          .post(
              "http://localhost:5000/update" + this.props.match.params.id,
              newEditedFilm
          )
          .then((res) => console.log(res.data));

        this.props.history.push("/");
    }

    // Section to display the update form that takes input from user to update the data
    render() {
        return (
            <div>
                <h3 align="center">Update Record</h3>
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
                        <label>Length: </label>
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
                    <br/>

                    <div className="form-group">
                        <input
                          type="submit"
                          value="Update Record"
                          className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

// Can get access to the history object's properties and closest <Route>'s match via the withRouter higher-order component. Makes it easier to edit records. 
export default withRouter(Edit);