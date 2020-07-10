import React from "react";
import "./ProfileSearchCard.css";

function ProfileSearchCard(props) {
  return (
    <div className="search-result" >
      <div className="search-body">
        
        <div className="profile-image">
            <img src={props.picture} className="rounded-circle" alt="" />
        </div>
        <div className="profile-name">
            {props.fullname.replace(/[^a-zA-Z ]/g, "")}
        </div>
        <div className="profile-engagement">
            423
        </div>
        <div className="profile-score">
            10
        </div>
        
      </div>
    </div>

    
  );
}
export default ProfileSearchCard;