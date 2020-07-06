import React from 'react';
import url from '../helpers/api';
import GenList from './GenList';
import NewGeneratorForm from './NewGeneratorForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  withRouter
} from "react-router-dom";

class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {items:[],newGen:false};

    this.newGenerator = this.newGenerator.bind(this);
    this.addGenerator = this.addGenerator.bind(this);
  }

  newGenerator(){
    this.setState({newGen:true});
  }

  addGenerator(gen){
    this.props.history.push("/gen/"+gen);
    this.setState({newGen:false});
  }

  componentDidMount(){
    console.log(url + "lists/main");
    fetch(url + "lists/main")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({items:data});
      })
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="MainPage" style={{width:"100%"}}>
        <div style={{width:"100%"}}>
          <button onClick={this.newGenerator}>Create New Generator</button>
        </div>
        {this.state.items.map((val,ind) => <GenList key={ind} title={val.name} items={val.generators} />)}
        {this.state.newGen && <NewGeneratorForm submit={this.addGenerator} tags={this.props.tags} user={this.props.user} token={this.props.token} />}
      </div>
    );
  }
}




// let item = {
//   contributors: [],
//   upvotes: [],
//   downvotes: [],
//   _id: "5ee67e4dd7ee6f8700b0901a",
//   name: "NAMES_MALE_WITH_SPECIAL_THING",
//   tags: [
//     {
//       _id: "5ee67e4dd7ee6f8700b0901b",
//       name: "Name",
//       color: "#41aebf"
//     },
//     {
//       _id: "5ee67e4dd7ee6f8700b0901c",
//       name: "Word",
//       color: "#1da875"
//     }
//   ],
//   description: "List of common masculine names.List of common masculine names.List of common masculine names.",
//   example: "John",
//   background: "https://infinityrollimg.s3.us-east-2.amazonaws.com/DEFAULT_BACKGROUND.png",
//   owner: {
//     username: "jimbles"
//   },
//   __v: 0
// };



export default withRouter(MainPage);
