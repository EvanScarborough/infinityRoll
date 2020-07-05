import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import UserIcon from './UserIcon.js';

class UserPreview extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let link = '/users/' + this.props.user.username;
    return (
      <Link to={link} className="UserPreview" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <UserIcon />
        <p style={{margin:"0 6px"}}>{this.props.user.username}</p>
      </Link>
    );
  }
}


export default UserPreview;
