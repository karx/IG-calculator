import React from "react";
import { FetchData, fetchTagWiseData } from "../../Instagram.js";
import ProfileCardv2 from "../../Cards/ProfileCardv2";
import ProfileSearchCard from "../../Cards/ProfileSearchCard";
import ProfileSearchTable from "../../Cards/ProfileSearchTable";

import FeaturesTable from "../../Components/FeaturesTable";
import LikeCommentBC from "../../Components/LikeCommentBC";
import MediasTypesPC from "../../Components/MediasTypesPC";
import EngagementsCalander from "../../Components/EngagementsCalander";
import LikeCommentEngagementBLC from "../../Components/LikeCommentEngagementBLC";
import CloudWords from "../../Components/CloudWords";
import MediasTable from "../../Components/MediasTable";
import MentionsTable from "../../Components/MentionsTable";
import HashtagsTable from "../../Components/HashtagsTable";
import TopPostEmbed from "../../Components/TopPostEmbed";

export default class TagApp extends React.Component {
  constructor(props) {
    super(props);
    console.log("Pops" + props);
    console.log(props);
    this.state = {
      isLoading: true,
      tag: props.match ? props.match.params.tag : "instagram"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tagtextInput = React.createRef();
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

  updateWithtag(tag) {
    this.setState({ isLoading: true });
    this.setState({ tag: tag });
    fetchTagWiseData(String(tag)).then(x => {
      console.log(':P');
      console.log(x);
      if (x.length > 0) {
        this.setState(
          {
            isLoading: false,
            isReady: true,
            Result: x,
            isPrivate: false,
            notFound: false
          },
          function() {}
        );
      } else {
        this.setState(
          {
            isLoading: false,
            isPrivate: false,
            notFound: true,
            isReady: false
          }
        )
      }
    });
  }

  handleClick(event) {
    try {
      this.props.history.push("/tag/" + this.tagtextInput.current.value);
      this.updateWithtag(this.tagtextInput.current.value);
    } catch (error) {
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
    //   // console.log(parsed.tag);
    //   this.setState({tag: parsed.tag});
    //   return parsed.tag;
    // } catch (error) {
    //   console.error(error);
    // }
    return null;
  }

  componentDidMount() {
    var toFetchtag = this.state.tag;
    toFetchtag = toFetchtag ? toFetchtag : "football";
    console.log(toFetchtag);
    this.updateWithtag(toFetchtag);
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
            src="/loading.png"
          />
        </div>
      );
    }
    if (this.state.isReady) {
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
                        Tag: 
                      </span>
                    </div>
                    <input
                      name="tag"
                      type="text"
                      placeholder={
                        this.state.tag ? this.state.tag : "tag"
                      }
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
                      ref={this.tagtextInput}
                      onKeyPress={event => {
                        if (event.key === "Enter") {
                          this.handleClick();
                        }
                      }}
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
          < ProfileSearchTable data={this.state.Result}></ProfileSearchTable>
          {/* {this.state.Result.map( (eachProfile) => {
            
            return <div className="row">
                    <div className="col-xl-12 col-xxl-12 col-lg-12">
                      <ProfileSearchCard
                        bio={eachProfile.biography}
                        fullname={eachProfile.full_name}
                        picture={eachProfile.profile_pic_url_hd}
                      />
                    </div>
            
                    </div>
        
          })} */}
          
        </div>
      );
    }

    if (this.state.isPrivate) {
      return (
        <div className="h-100 container-fluid text-center align-content-center">
          {/* <br /> */}
          <h1 className="text-center">This profile is private.</h1>
          <img
            className="img-fluid mx-auto align-self-center"
            alt="private-account"
            src="/private.png"
          />
        </div>
      )
    }
    if (this.state.notFound) {
      return (
        <div className="h-100 container-fluid text-center align-content-center">
          {/* <br /> */}
          <h1 className="text-center">Profile Not found</h1>
          <img
            className="img-fluid mx-auto align-self-center"
            alt="no-account"
            src="/no-account.png"
          />
        </div>
      )
    }
  }
}
