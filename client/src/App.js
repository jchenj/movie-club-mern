import React from "react";

// Use Route to define different routes of app
import { Route } from "react-router-dom";

// Import components needed
import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";

const App = () => {
    return (
        <div>
            <Navbar />
            <Route exact path="/">
                <RecordList />
            </Route>
            <Route path="/edit/:id" component={Edit} />
            <Route path="/create">
                <Create />
            </Route>
        </div>
    );
};

export default App;