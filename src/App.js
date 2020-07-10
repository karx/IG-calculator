import React from "react";
import NavBar from "./Cards/NavBar";
import InstagramApp from './views/InstagramApp/InstagramApp';
import TagApp from './views/TagApp/TagApp';
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
            <div className="container-first">
                <NavBar />
              
                <Router>
                        <Route exact path="/" component={InstagramApp} />
                        <Route exact path="/:username" component={InstagramApp} />
                        <Route exact path="/tag/" component={TagApp} />
                        <Route path="/tag/:username" component={TagApp} />

                        {/* <Route path="*" component={ErrorNotFound} /> */}
                </Router>
            </div>
            <div className="footer">
                <div className="copyright">
                    <p>Instagram Search tool. Copyright &copy;<a href="http://ruskmedia.com">Rusk Media</a></p> <p>Whats up Tanmay</p>
                </div>
                <div className="logo-div center">
                    <a href="https://ruskmedia.com" class="center-a"> <img className="navbar-brand text-center brand-logo" src="/recharge_footer.png" alt=""/> </a>
                </div>

            </div>
        </div>
        );
    }
}
