import React from 'react'
import { Card } from 'semantic-ui-react'
const CardExampleLinkCard = () => (

    <Card.Group>
  <Card fluid
    href='/a'
    header='Address1'
    description='Name: John Doe Age:19 Symptoms: Fever'
  />
  </Card.Group>
)

export default CardExampleLinkCard
