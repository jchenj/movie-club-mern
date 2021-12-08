import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.film_title}</td>
        <td>{props.record.film_director}</td>
        <td>{props.record.film_length}</td>
        <td>{props.record.film_year}</td>
        <td>
            <Link to={"/edit/" + props.record._id}>Edit</Link>
            <a 
              href="/"
              onClick={() => {
                props.deleteRecord(props.record._id);
              }}
            >
                Delete
            </a>
        </td>
    </tr>
);

export default class RecordList extends Component {
    // Constructor to store data retrieved from db
    constructor(props) {
        super(props);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.state = { records: [] };
    }
    
    // Get data from db
    componentDidMount() {
        axios 
          .get("http://localhost:5000/record/")
          .then((response) => {
              this.setState({ records : response.data });
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    // Method to delete record based on the method
    deleteRecord(id) {
        axios.delete("http://localhost:5000/" + id).then((response) => {
            console.log(response.data);
        });

        this.setState({
            record: this.state.records.filter((el) => el._id !== id),
        });
    }

    // Map out the users on the table
    recordList() {
        return this.state.records.map((currentrecord) => {
            return (
                <Record
                    record={currentrecord}
                    deleteRecord={this.deleteRecord}
                    key={currentrecord._id}
                />
            );
        });
    }

    // Display the table with records of individuals
    render() {
        return (
            <div>
                <h3>Movie List</h3>
                <table className="table table-striped" style={{ marginTop : 20 }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Length</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>{this.recordList()}</tbody>
                </table>
            </div>
        );
    }
}