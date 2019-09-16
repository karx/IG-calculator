import React from "react";
import InstagramEmbed from "react-instagram-embed";

function TopPostEmbed(props) {
  var Followers = props.data.Account.edge_followed_by.count;
  var Engagements = props.data.Medias.edges.map(x => {
    return {
      shortcode: x.node.shortcode,
      engagement:
        ((x.node.edge_media_preview_like.count +
          x.node.edge_media_to_comment.count) /
          Followers) *
        100
    };
  });
  Engagements.sort((a, b) => (a.engagement < b.engagement ? 1 : -1));

  return (  
    <React.Fragment>
      <div className="row">
      <div className="col-md-4 col-sm-12">
        <InstagramEmbed
        className=""
        url={"https://www.instagram.com/p/" + Engagements[0].shortcode}
        // maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        injectScript />
      </div>
      <div className="col-md-4 col-sm-12">
        <InstagramEmbed
        className=""
        url={"https://www.instagram.com/p/" + Engagements[1].shortcode}
        // maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        injectScript />
      </div>
      <div className="col-md-4 col-sm-12">
        <InstagramEmbed
        className=""
        url={"https://www.instagram.com/p/" + Engagements[2].shortcode}
        // maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        injectScript />
      </div>
      </div>
    </React.Fragment>
  );
}
export default TopPostEmbed;
