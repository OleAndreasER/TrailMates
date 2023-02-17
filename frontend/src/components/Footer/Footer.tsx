import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
    <footer>
    <section className="ft-main">
        <div className="ft-main-item">
        <img src={logo} alt="Trailmates Logo" className="ft-logo" />
      </div>

      <div className="ft-main-item">
        <h2 className="ft-catchphrase">"Your backpacking companion."</h2>
      </div>

      <div className="ft-main-item">
        <ul className="local-links">
          <li><Link to="/utforsk">Utforsk</Link></li>
          <li><Link to="/minereiser">Mine Reiser</Link></li>
          <li><Link to="/favoritter">Favoritter</Link></li>
          <li><Link to="/profil">Profil</Link></li>
        </ul>
      </div>
    </section>

    <section className="ft-social">
      <ul className="ft-social-list">
        <li><Link to="#">Facebook<i className="fab fa-facebook"></i></Link></li>
        <li><Link to="#">GitHub<i className="fab fa-facebook"></i></Link></li>
        <li><Link to="#">Instagram<i className="fab fa-facebook"></i></Link></li>
      </ul>
    </section>

    <section className="ft-legal">
      <ul className="ft-legal-list">
        <li><Link to="/termsandconditions">Terms &amp; Conditions</Link></li>
        <li><Link to="/privacypolicy">Privacy Policy</Link></li>
        <li>&copy; 2023 PU-Gruppe 72</li>
      </ul>
    </section>
    </footer>
    );
  }
}

export default Footer;
