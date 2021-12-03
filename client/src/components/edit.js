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

    // TODO: continue here w/ methods to update state properties


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
            </form>
        </div>
    );
}