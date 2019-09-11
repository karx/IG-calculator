import "./InstagramApp.css";
import React from "react";
import { FetchData } from "./Instagram.js";
import ProfileCardv2 from "./Cards/ProfileCardv2";
import FeaturesTable from "./Components/FeaturesTable";
import LikeCommentBC from "./Components/LikeCommentBC";
import MediasTypesPC from "./Components/MediasTypesPC";
import EngagementsCalander from "./Components/EngagementsCalander";
import LikeCommentEngagementBLC from "./Components/LikeCommentEngagementBLC";
import CloudWords from "./Components/CloudWords";
import MediasTable from "./Components/MediasTable";
import MentionsTable from "./Components/MentionsTable";
import HashtagsTable from "./Components/HashtagsTable";
import TopPostEmbed from "./Components/TopPostEmbed";
// const queryString = require('query-string');


export default class InstagramApp extends React.Component {
  

  constructor(props) {
    super(props);
    console.log("Pops" + props);
    console.log(props);
    this.state = {
      isLoading: true,
      username: props.match ? props.match.params.username : 'instagram'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.usernametextInput = React.createRef();
  }

  handleInputChange(event) {
    console.log(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // this.setState({
    //   [name]: value
    // });
  }


  updateWithUsername(username) {
    this.setState({isLoading: true});
    this.setState({username: username})
    FetchData(String(username)).then(x => {
      console.log(x);
      this.setState({ isLoading: false,Result: x });
    });
  }

  handleClick(event) {
    try {
      this.props.history.push('/'+ this.usernametextInput.current.value);
      this.updateWithUsername(this.usernametextInput.current.value);
    } catch(error) {
      console.log(error);
    }
  }

  queryParametersIfName() {
    // console.log(window.location.search);
    // console.log(window.location.search);
    // //=> '?foo=bar'
    // var parsed;
    // try {
    //   // parsed = queryString.parse(window.location.search);
    //   // console.log(parsed.username);
    //   this.setState({username: parsed.username});
    //   return parsed.username;  
    // } catch (error) {
    //   console.error(error);
    // }
    return null;
    
  }

  componentDidMount() {
    var toFetchUsername = this.state.username;
    toFetchUsername = toFetchUsername ? toFetchUsername : "instagram";
    console.log(toFetchUsername);
    return FetchData(toFetchUsername).then(x => {
      console.log(x);
      this.setState({ isLoading: false, Result: x }, function() {});
      // console.log("WOW")
    });
  }

  render() {
    if (this.state.isLoading) {
      // if (true) {
      // if (false) {
      return (
        <div className="h-100 container-fluid text-center align-content-center">
          {/* <br /> */}
          {/* <h1 className="text-left">Loading</h1> */}
          <img
            className="img-fluid mx-auto align-self-center loading-image"
            alt="loading"
            src="./loading.png"
          />
        </div>
      );
    }

    return (
        <div className="container">
        <div className="row">
          <div className="col">
            <div
              // className="card igs-card card-2 border-0"
              // style={{
              //   backgroundColor: "unset",
              //   backdropFilter: "saturate(80%) blur(4px)"
              // }}
            >
              <div className="card-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text border-0"
                      style={{
                        backgroundColor: "unset",
                        color: "#000"
                      }}
                    >
                      @
                    </span>
                  </div>
                  <input
                    name="username"
                    type="text"
                    placeholder={this.state.username?this.state.username:"username"}
                    className="form-control"
                    
                    // onChange={this.handleInputChange}
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#000",
                      color: "#000",
                      border: "none",
                      borderRadius: "0",
                      borderBottom: "#000 solid 1px"
                    }}
                    ref={this.usernametextInput}
                    
                  />
                  <div className="input-group-append">
                    <button
                      onClick={this.handleClick}
                      className="btn btn-outline-dark"
                      type="button"
                    >
                      Fetch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-xl-4 col-xxl-5 col-lg-4">
            <ProfileCardv2
              bio={this.state.Result.Account.biography}
              fullname={this.state.Result.Account.full_name}
              picture={this.state.Result.Account.profile_pic_url_hd}
            />
          </div>
          <div className="col-xl-8 col-xxl-7 col-lg-8">
            <FeaturesTable data={this.state.Result} />
          </div>
        </div>
        <br />
        <div className="row ">
          <div className="col-md-6 mb-4">
            <h4>Like & Comment through time</h4>
            <LikeCommentBC data={this.state.Result} />
          </div>
          <div className="col-md-6 mb-4">
            <h4>Like,Comment, Engagement through time</h4>
            <LikeCommentEngagementBLC data={this.state.Result} />
          </div>
          <div className="col-md-12 mb-4">
            <h4 className="Righteous">Engagement Calander</h4>
            <EngagementsCalander data={this.state.Result} />
          </div>
          <div className="col-md-6 mb-4">
            <h4 className="Righteous">Media Types (Last 50 posts )</h4>
            <MediasTypesPC data={this.state.Result} />
          </div>
          <div className="col-md-6 mb-4 align-self-center">
            <h4 className="Righteous">Top Words</h4>
            <CloudWords data={this.state.Result} />
          </div>
          <div className="col-md-6 mb-4 align-self-center">
            <h4 className="Righteous">Top 5 Mentions</h4>
            <MentionsTable data={this.state.Result.Medias} />
          </div>
          <div className="col-md-6 mb-4 align-self-center">
            <h4 className="Righteous">Top 5 Hashtags</h4>
            <HashtagsTable data={this.state.Result.Medias} />
          </div>
          <div className="col-md-12 mb-4 align-self-center">
            <h4 className="Righteous">Top Post</h4>
            <TopPostEmbed data={this.state.Result} />
          </div>
          <div className="col-md-8 mb-4 align-self-center" />
          <div className="col-md-12">
            <h4>Last 12 Post</h4>
            <MediasTable data={this.state.Result.Medias} />
          </div>
        </div>
        </div>
    );
  }
}

