import React from "react";
import "./ProfileCardv2.css";

function ProfileCard(props) {
  return (
    <div
      className="card" >
      <div class="card-body">
        <div class="text-center">
            <img src={props.picture} class="rounded-circle" alt="" width="320" />
            <h4 class="mt-4">{props.fullname.replace(/[^a-zA-Z ]/g, "")}</h4>
            <p>{props.bio}</p>

        </div>
      </div>
    </div>

    
  );
}
export default ProfileCard;