import React from "react";
import "./FotterSyles.css";
const Fotter = () => {
  return (
    <section className="fotter">
      <div className="social_links">
        <ul>
          <li data-aos="fade-right">
            <a href="">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </li>
           <li data-aos="fade-right">
            <a href="">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </li>
           <li data-aos="fade-right">
            <a href="">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
           <li data-aos="fade-right">
            <a href="">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
           <li data-aos="fade-right">
            <a href="">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="row details ">
        <div className="col-12 col-md-4 col-lg-3  col-xl-3 column">
          <div className="category">
            <h1 className="title">Category</h1>
            <ul className="list-items">
              <li>
                <a href="">
                 Business
                </a>
              </li>
              <li>
                <a href="">
                 investment
                </a>
              </li>
              <li>
                <a href="">
                 Entertainment
                </a>
              </li>
              <li>
                <a href="">
                  Weather
                </a>
              </li>
              <li>
                <a href="">
                  Sports
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3  col-xl-3 column">
          <div className="support">
            <h1 className="title">Support</h1>
            <ul className="list-items">
              <li>
                <a href="">
                 online support
                </a>
              </li>
              <li>
                <a href="">
                 call numbers
                </a>
              </li>
              <li>
                <a href="">
                 emails
                </a>
              </li>
              <li>
                <a href="">
                  social supports
                </a>
              </li>
              <li>
                <a href="">
                  location
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3  col-xl-3 column">
          <div className="blog">
            <h1 className="title">Blog</h1>
            <ul className="list-items">
              <li>
                <a href="">
                 saftey
                </a>
              </li>
              <li>
                <a href="">
                 repair
                </a>
              </li>
              <li>
                <a href="">
                 recent
                </a>
              </li>
              <li>
                <a href="">
                  popular
                </a>
              </li>
              <li>
                <a href="">
                  categories
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3  col-xl-3 column">
          <div className="permalinks">
            <h1 className="title">Permalinks</h1>
            <ul className="list-items">
              <li>
                <a href="">
                 home
                </a>
              </li>
              <li>
                <a href="">
                 blog
                </a>
              </li>
              <li>
                <a href="">
                 about
                </a>
              </li>
              <li>
                <a href="">
                  services
                </a>
              </li>
              <li>
                <a href="">
                  contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>all rights reserved &copy; copyright khaled hamdy</p>
      </div>
    </section>
  );
};

export default Fotter;
