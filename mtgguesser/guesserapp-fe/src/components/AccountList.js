import React, { Component } from "react";
import { Table } from "reactstrap";
import NewAccountModal from "./NewAccountModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class AccountList extends Component {
  render() {
    const accounts = this.props.accounts;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Name</th>
            
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!accounts || accounts.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            accounts.map(account => (
              <tr key={account.pk}>
                <td>{account.name}</td>
                <td align="center">
                  <NewAccountModal
                    create={false}
                    account={account}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={account.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default AccountList;