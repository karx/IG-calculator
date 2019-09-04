import React from "react";
// import "./ProfileCard.css";

function FeatureCard(props) {
  return (
    <div className="col-md-6 col-sm-12">
      <div className="card">
          <div className="card-body">
              <div className="stat-widget-two">
                  <div className="media">
                      <div className="media-body">
                          <h2 className="mt-0 mb-1 text-danger">{props.value}</h2><span>{props.title}</span>
                      </div>
                      <img className="ml-3" src={props.icon} alt="" />
                  </div>
              </div>
          </div>
        </div>
      {/* <img
        alt={props.icon}
        className="mx-autop-1"
        src={props.icon}
        style={{
          // backgroundColor: "#fff",
          width: "64px",
          height: "64px"
        }}
      />
      <p className="Righteous lead text-center">{props.title}</p>
      <h4 className="text-center">{props.value}</h4> */}
    </div>
  );
}
export default FeatureCard;
