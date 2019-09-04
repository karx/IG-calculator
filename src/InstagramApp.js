import React from "react";
import NavBar from "./Cards/NavBar";
import App from './App';

import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";

export default class InstagramApp extends React.Component {
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
                    <Route path="/:username" component={App} />
                </Router>
            </div>
            <div class="footer">
                <div class="copyright">
                    <p>Copyright &copy; Powered by <a href="http://viragram.me">Viragram</a>. Developed by <a href="https://artiosys.com">Artiosys Ventures</a> 2019</p>
                </div>
            </div>
        </div>
        );
    }
}
