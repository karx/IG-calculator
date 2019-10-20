import React from "react";
import NavBar from "./Cards/NavBar";
import InstagramApp from './views/InstagramApp/InstagramApp';
import ErrorNotFound from './views/ErrorNotFound';

import { BrowserRouter as Router, Route, Link, Redirect, Switch  } from "react-router-dom";
import "./App.css";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("Starting app");
    }

    render() {
        return (
        <div className="container-fluid">
            <div>
                <NavBar />
                <br />
                <br />
                <br />
                <Router>
                    {/* <DefualtRoute component={App} /> */}
                        <Redirect from="/" to="/instagram" />
                        <Route path="/:username" component={InstagramApp} />
                        {/* <Route path="*" component={ErrorNotFound} /> */}
                </Router>
            </div>
            <div className="footer">
                <div className="copyright">
                    <p>It's in house and on the house. Copyright &copy;<a href="http://viragram.me">Viragram Media</a></p>
                </div>
                <div className="logo-div center">
                <a href="https://viragram.me" class="center-a"> <img className="navbar-brand text-center brand-logo" src="small.png" alt=""/> </a>

                </div>

            </div>
        </div>
        );
    }
}
