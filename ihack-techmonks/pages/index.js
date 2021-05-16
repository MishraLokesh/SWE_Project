import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class HealthHubIndex extends Component {
  static async getInitialProps() {
    const healthhubs = await factory.methods.getDeployedContracts().call();

    return { healthhubs };
  }

  renderHealthhubs() {
    const items = this.props.healthhubs.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/healthhub/${address}`}>
            <a>View Patient Data</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Patient Data:</h3>

          <Link route="/healthhub/new">
            <a>
              <Button
                floated="right"
                content="Create Request"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderHealthhubs()}
        </div>
      </Layout>
    );
  }
}

export default HealthhubIndex;
