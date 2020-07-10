import React from "react";
import "./ProfileSearchTable.css";

function ProfileSearchTable(props) {
  console.log(props);
  const results = props.data;

  return (
    <div className="container">
      <table className="st-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Bio</th>
            <th>Category</th>
            <th>Relevance</th>
            <th align="center">FC</th>
          </tr>
        </thead>
        <tbody>
          {results.map((profile) => (
            <tr key={profile.id}>
              <td>
                <img
                  src={profile.profile_pic_url_hd}
                  className="rounded-circle img-size-profile"
                  alt=""
                />
              </td>
              <td className="name-of-profile mt-4"><a href={'../' + profile.username}>{profile.full_name} </a> </td>
              <td className="profileBio">{profile.biography}</td>
              <td className="profileCategory">{profile.business_category_name}</td>
              <td>{profile.relevenceScoreOfTag}</td>
              <td className="profileFollowCount">{profile.edge_followed_by.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProfileSearchTable;
