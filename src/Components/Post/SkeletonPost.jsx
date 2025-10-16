import React from "react";
import "./SkeletonPost.css";

const SkeletonPost = () => {
  return (
    <div className="col-12 col-md-4 col-lg-3 col-xl-3 post card skeleton_post">
      <div className="post_thumbail skeleton_block"></div>
      <div className="post_info">
        <div className="top_container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="categroy_button skeleton_block" style={{ width: "30%" }}></div>
          <div className="dropdown_placeholder skeleton_block" style={{ width: "15%" }}></div>
        </div>
        <h2 className="post_title skeleton_block" style={{ width: "80%", height: "1.5rem" }}></h2>
        <p className="post_body skeleton_block" style={{ width: "100%", height: "4rem", marginTop: "0.5rem" }}></p>
        <div className="post_author" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
          <div className="post_author_avatar skeleton_block" style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}></div>
          <div className="post_author_info" style={{ flex: 1 }}>
            <div className="skeleton_block" style={{ width: "50%", height: "1rem", marginBottom: "0.3rem" }}></div>
            <div className="skeleton_block" style={{ width: "30%", height: "1rem" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPost;
