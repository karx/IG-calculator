import React from "react";
import NavBar from "./Cards/NavBar";
import InstagramApp from './views/InstagramApp/InstagramApp';
import ErrorNotFound from './views/ErrorNotFound';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import "./App.css";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("Starting app");
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container-first">
                    <NavBar />
                    <div className="plz-center">
                        <h3 className="down-text"> <i> The portal is under maintenance. </i></h3>
                        <iframe src="https://giphy.com/embed/Sk3KytuxDQJQ4" width="480" height="480" frameBorder="0" class="giphy-embed center" ></iframe>
                        <h3> Something new is coming up here! Excited?</h3>
                        <h4> In the meantime, keep calm and stay safe</h4>

                    </div>
                    <br />
                    <br />
                </div>
                <div className="footer">
                    <div className="copyright">
                        <p>It's in house and on the house. Copyright &copy;<a href="http://viragram.me">Viragram Media</a></p>
                    </div>
                    <div className="logo-div center">
                        <a href="https://viragram.me" class="center-a"> <img className="navbar-brand text-center brand-logo" src="viragram-logo-new.png" alt="" /> </a>

                    </div>

                </div>
            </div>
        );
    }
}
