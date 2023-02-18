import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <section className="ft-main flex-row">
          <div className="ft-main-item flex-column">
            <img src={logo} alt="Trailmates Logo" className="ft-logo" />
          </div>

          <div className="ft-main-item flex-column footer-middle">
            <h2 className="ft-catchphrase">"Your backpacking companion."</h2>
            <p>Copyright @ Trailmates 2023</p>
          </div>

          <div className="ft-main-item flex-column footer-links">
            <Link to="/">Utforsk</Link>
            <Link to="/minereiser">Mine Reiser</Link>
            <Link to="/favoritter">Favoritter</Link>
            <Link to="/profile">Profil</Link>
          </div>
        </section>
      </footer>
    );
  }
}

export default Footer;
