import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import AccountList from "./AccountList";
import NewAccountModal from "./NewAccountModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    accounts: []
  };

  componentDidMount() {
    this.resetState();
  }

  getAccounts = () => {
    axios.get(API_URL).then(res => this.setState({ accounts: res.data }));
  };

  resetState = () => {
    this.getAccounts();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <AccountList
              accounts={this.state.accounts}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewAccountModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;