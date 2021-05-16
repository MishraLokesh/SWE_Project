import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Healthhub from '../../ethereum/healthhub';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class HealthHubShow extends Component {
  static async getInitialProps(props) {
    const healthhub = Healthhub(props.query.address);

    // const summary = await healthhub.methods.getSummary().call();

    return {
      address: props.query.address,
      // minimumContribution: summary[0],
      // balance: summary[1],
      // requestsCount: summary[2],
      // approversCount: summary[3],
      // manager: summary[4]
    };
  }

  renderCards() {
    const {
      description
    } = this.props;

    const items = [
      {//doubt
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: description,
        meta: 'Description',
        description:
          'Patient details'
      },

    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Patient Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/healthhub/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default HealthHubShow;
