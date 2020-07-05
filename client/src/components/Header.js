import React from 'react';
import SvgLogo from '../assets/Logo.js';
import helpers from '../helpers/helpers.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class MenuButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {open:false};

    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen(){
    this.setState({open:!this.state.open});
  }

  render(){
    return (
      <div className="MenuArea" style={{position:"fixed",zIndex:"10",top:"0px",left:(this.state.open)?"calc(100vw - 370px)":"calc(100vw - 70px)",display:"flex"}}>
        <div className="MenuButton" onClick={this.toggleOpen} style={{height:"50px",width:"50px",margin:"10px"}}>

        </div>
        <div className="Menu" style={{height:"100vh",width:"300px",display:"flex",flexDirection:"column",alignItems:"stretch"}}>
          <Link to={(this.props.user.username)?('/users/'+this.props.user.username):('/account')} className="abutton">{this.props.user.username?this.props.user.username:"Sign In"}</Link>
          {this.props.user.username&&<button>Sign Out</button>}
          <button onClick={()=>{helpers.randomizeColors();}}>Randomize Colors</button>
        </div>
      </div>
    );
  }
}



function Header(props) {
  return (
    <div className="Header" style={{width:"100%",height:"70px",display:"flex",flexDirection:"row",alignItems:"center"}}>
      <MenuButton user={props.user}/>
      <div style={{width:"10px"}}></div>
      <Link to="/" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <SvgLogo width="50px"/>
        <h1 className="title" style={{marginLeft:"10px"}}>infinityRoll</h1>
      </Link>
    </div>
  );
}

export default Header;
