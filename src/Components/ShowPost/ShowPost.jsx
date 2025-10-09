import React from "react";
import "./ShowPostSyles.css";
import img from "../../assets/download (2).jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const ShowPost = () => {
  return (
    <>
   
    <section className="details_post">
      <motion.div initial={{opacity:0}} animate={{ opacity: 1 }} transition={{duration: 1}}    className="myPost">
        <h2 className="post_title">
          <Link>makink this the first true generator on the internet</Link>
        </h2>
        <div className="post_author">
            <div className="post_author_avatar">
              <img src={img} alt="" />
            </div>
            <div className="post_author_info">
              <ul>
                <li>
                  <h5>by : khaled hamdy</h5>
                </li>
                <li>
                  <small>Jun 08,2022-22:47</small>
                </li>
              </ul>
            </div>
          </div>
        <div className="post_thumbail">
          <img src={img} alt="" />
        </div>
        <div className="post_info">

          <p className="post_body">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam omnis fuga voluptatem, voluptate neque quaerat molestias nisi earum, nemo, ad dolor! Ipsum inventore illo nisi placeat, officiis quibusdam magni est. Repellat exercitationem qui recusandae eveniet earum harum molestias voluptatibus, ullam natus fugit quis blanditiis excepturi facere vitae nobis fugiat, deserunt autem non doloremque enim ipsum minus, quia dicta? Temporibus, rem. Reprehenderit cupiditate labore quas nihil. Sunt possimus illo debitis temporibus dolorum fugit itaque, corrupti nihil vel consectetur animi neque, reiciendis alias quia et numquam tenetur praesentium! Laudantium commodi nostrum ex exercitationem labore incidunt saepe at omnis eum, quas veritatis repellat?
          </p>
          
        </div>
      </motion.div>
    </section>

    
    </>
   
  );
};

export default ShowPost;
