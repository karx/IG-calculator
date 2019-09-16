import React from "react";

function MediasTable(props) {
  return (
    <div className="card">
      <div className="card-body p-0">
<div className="table-responsive">
    <table className="table table-padded recent-order-list-table table-responsive-fix-big">
        <thead>
            <tr>
                <th>Post Image</th>
                <th>Date</th>
                <th>Caption</th>
                <th>Link</th>
                <th>Likes</th>
                <th>Comment</th>
            </tr>
        </thead>
        <tbody>
      {props.data.edges.slice(0, 12).map((post, i) => (
            <tr>
                <td><a href={"https://www.instagram.com/p/" + post.node.shortcode}><img
                      alt="instagram"
                      className="rounded-circle mx-auto"
                      style={{ height: "64px", width: "64px" }}
                      src={post.node.thumbnail_resources[1].src}
                    /></a>
                </td>
                <td className="text-muted">{new Date(
                    Number(post.node.taken_at_timestamp + "000")
                    ).toLocaleDateString()}
                </td>
                <td><span
              data-toggle="tooltip"
              data-placement="top"
              title={
                post.node.edge_media_to_caption.edges[0]
                  ? post.node.edge_media_to_caption.edges[0].node.text
                  : "no caption"
              }
            >
              {post.node.edge_media_to_caption.edges[0]
                ? post.node.edge_media_to_caption.edges[0].node.text.slice(
                    0,
                    20
                  ) + "..."
                : "no caption"}
            </span></td>
                <td><a
              href={"https://www.instagram.com/p/" + post.node.shortcode}
              className="text-primary"
            >View Post</a>
            </td>
                <td><span className="text-pale-sky">{post.node.edge_media_preview_like.count}</span></td>
                <td><span className="text-pale-sky">{post.node.edge_media_to_comment.count}</span>
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
export default MediasTable;



