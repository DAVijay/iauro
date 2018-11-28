import React, {Component} from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../component/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
            description:( 
                <Link route={`/campaigns/${address}`}>
                    <a>View campaigns</a>
                </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }


    render() {
       // console.log(this.props.campaigns);
        return (
            <Layout>
            <div>
                <h3>Open campaigns</h3>
                
                <Link route="/campaigns/new"> 
                    <a>
                        <Button
                            floated="right"
                            content="Create Campaign"
                            icon= "add circle"
                            primary={true}
                        />
                    </a>
                </Link>    
                {this.renderCampaigns()}
            </div>
            </Layout>
        );
    }
}

export default CampaignIndex;