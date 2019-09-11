import React from "react";
import NavBar from "./Cards/NavBar";
import InstagramApp from './InstagramApp';

import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("Starting app");
    }

    render() {
        return (
        <div className="container-fluid">
            <div className="container">
                <NavBar />
                <br />
                <br />
                <br />
                <Router>
                    {/* <DefualtRoute component={App} /> */}
                    <Redirect from="/" to="/instagram" />
                    <Route path="/:username" component={InstagramApp} />
                </Router>
            </div>
            <div class="footer">
                <div class="copyright">
                    <p>It's in house and on the house. Copyright &copy;<a href="http://viragram.me">Viragram Media</a></p>
                </div>
            </div>
        </div>
        );
    }
}
