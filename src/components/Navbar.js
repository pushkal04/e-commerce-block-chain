import React, { Component } from 'react';
//import Web3 from 'web3'
import './App.css';

class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://pushkals-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blockchain e - commerce
          </a>
          <ul className="nav mx-5">
              {/* <li className="nav-item">
            <button onClick={this.props.load}>Connect</button>
            </li> */}
            <li className="nav-item ">
              <small className="text-white"><span className="account">{this.props.account}</span></small>
            </li>
            
          </ul>
        </nav>
    );
  }
}

export default Navbar;
