import React,{Component} from 'react'
import { Card } from 'semantic-ui-react'
import Card1 from "./card";
import Card2 from "./card1";
import Req1 from "./req1";
// import ReactDOM from "react-dom";
import { Form, TextArea, Button } from 'semantic-ui-react';
class data extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          desc:'',
          loading:true
        }
      }
      render(){
          return(
            <div id="content">
        <h1>Add Patient:</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const desc = this.desc.value
          this.setState({loading:false})
          console.log(desc)
          // this.props.createPatient( desc)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="desc"
              type="text"
              ref={(input) => { this.desc = input }}
              className="form-control"
              placeholder="Enter details of the patient"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Patient</button>
        </form>
        <p>&nbsp;</p>
        <h1>Available Data:<br/></h1>
        { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Card.Group>
                <Card fluid
                  href='/a'
                  header='0x0024587h028jn729'
                  description={this.desc.value}
                />
                </Card.Group>
              }
        <Card1/>
        <Card2 />
        <h1>Requests for Address1:</h1>
        <Req1/>
        <h1>Create new request:</h1>
        <textarea placeholder="Enter name"></textarea><br/>
        <button>Create Request</button><br/><br/>
            
        
        
      </div>
          )
         
      }
    }
 
export default data;