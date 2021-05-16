import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Healthhub from '../ethereum/healthhub';

class RequestRow extends Component {
  onApprove = async () => {
    const healthhub = Healthhub(this.props.address);

    // const accounts = await web3.eth.getAccounts();
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request } = this.props;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
