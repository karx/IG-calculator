import React from "react";
import NavBar from "./Cards/NavBar";
import FootBar from "./Cards/FootBar";
import InstagramApp from './views/InstagramApp/InstagramApp';
import { hotjar } from 'react-hotjar';

import { BrowserRouter as Router, Route, Link, Redirect, Switch  } from "react-router-dom";


hotjar.initialize(1477844, 6);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("Starting app");
    }

    render() {
        return (
        <div className="container-fluid">
                <NavBar />
                <br />
                <br />
                <br />
                <Router>
                    {/* <DefualtRoute component={App} /> */}
                        <Redirect from="/" to="/instagram" />
                        <Route path="/:username" component={InstagramApp} />
                </Router>
            <FootBar />       
        </div>
        );
    }
}
