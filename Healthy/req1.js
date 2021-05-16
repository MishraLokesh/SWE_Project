import React from 'react'
import { Card ,Button} from 'semantic-ui-react'

const CardExampleLinkCard = () => (
    <Card.Group>
  <Card fluid
    href='#card-example-link-card'
    header='Request1'
    description='Requested by: ABC Inc.'
  />
    <Button>Accept</Button><Button>Reject</Button>
    <Card fluid
    href='#card-example-link-card'
    header='Request2'
    description='Requested by: XYZ Inc.'
  />
    <Button>Accept</Button><Button>Reject</Button>
  </Card.Group>
)

export default CardExampleLinkCard
