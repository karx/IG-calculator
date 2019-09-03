import React from "react";
// import "./ProfileCard.css";

function FeatureCard(props) {
  return (
    <div className="col-md-6 col-sm-12">
      <div class="card">
          <div class="card-body">
              <div class="stat-widget-two">
                  <div class="media">
                      <div class="media-body">
                          <h2 class="mt-0 mb-1 text-danger">{props.value}</h2><span class="">{props.title}</span>
                      </div>
                      <img class="ml-3" src={props.icon} alt="" />
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
