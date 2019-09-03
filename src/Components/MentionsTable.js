import React from "react";

function MentionsTable(props) {
  //Finde Mention
  var mentions = [];
  props.data.edges.forEach(x => {
    var edges = x.node.edge_media_to_caption.edges;
    if (edges.length > 0 && edges[0].node.text !== "") {
      var caption = edges[0].node.text;
      caption.split(" ").forEach(word => {
        if (word[0] === "@" && word.indexOf("@") === word.lastIndexOf("@"))
          mentions.push(word);
      });
    }
  });

  mentions = mentions.sort();
  var countedmentions = [];
  var current = null;
  var cnt = 0;
  for (var i = 0; i < mentions.length; i++) {
    if (mentions[i] !== current) {
      if (cnt > 0) {
        countedmentions.push({
          username: current,
          count: cnt
        });
      }
      current = mentions[i];
      cnt = 1;
    } else {
      cnt++;
    }
  }
  if (cnt > 0) {
    countedmentions.push({
      username: current.trim(),
      count: cnt
    });
  }
  countedmentions.sort((a, b) => (a.count < b.count ? 1 : -1));

  // var userid = fetch("https://instagram.com/" + props.username)
  //   .then(res => {
  //     const data = res.body.split('"id":"')[1].split('",')[0];
  //     return data;
  //   })
  //   .catch(err => {
  //     if (err) {
  //       return err.message;
  //     }
  //   });
  // var userprofilepic = fetch(
  //   "https://i.instagram.com/api/v1/users/" + userid + "/info/"
  // )
  //   .then(account => account.json())
  //   .then(accountJson => {
  //     return accountJson.user.profile_pic_url;
  //   });
  return (
    <div className="card" >
      <div className="card-body">
      <div class="table-responsive">        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Count</th>
              <th scope="col">Link</th>
            </tr>
          </thead>
          <tbody>
            {countedmentions.splice(0, 5).map((mention, i) => (
              <tr key={i}>
                <th scope="row">{mention.username}</th>
                <td>{mention.count}</td>
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.instagram.com/" +
                      mention.username.slice(1, mention.username.length)
                    }
                    className="btn btn-outline-info btn-block"
                  >
                    View Profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
export default MentionsTable;