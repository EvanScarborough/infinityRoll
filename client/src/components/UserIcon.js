import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class UserIcon extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let size = this.props.size;
    if(!size) size = "30px"
    return (
      <div className="UserIcon" style={{width:size,height:size,backgroundColor:'blue'}}>

      </div>
    );
  }
}

export default UserIcon;
