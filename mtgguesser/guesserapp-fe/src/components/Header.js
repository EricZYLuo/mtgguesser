import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="https://1000logos.net/wp-content/uploads/2022/10/Magic-The-Gathering-logo-768x499.png"
          width="300"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
        />
        <hr />
        <h5>
          <i>A silly App:</i>
        </h5>
        <h1>MTGGuesser!</h1>
      </div>
    );
  }
}

export default Header;