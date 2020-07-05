import React from 'react';
import url from '../helpers/api';
import UserPreview from './UserPreview';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  withRouter
} from "react-router-dom";



class SignInPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {message:"",signup:false, username:"", password:"", email:""};

    this.submit = this.submit.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
  }

  submit(e){
    e.preventDefault();
    if(this.state.signup){
      fetch(url + 'users/register', {method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(this.state)})
        .then(res => res.json())
        .then(data => {
          if(data.hasOwnProperty("msg")){
            this.setState({message:data.msg});
          }
          else{
            this.props.setUser(data);
          }
        })
        .catch(err => {
          this.setState({message:"Error creating account..."});
          console.log(err);
        });
    }
    else{
      fetch(url + 'auth', {method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(this.state)})
        .then(res => res.json())
        .then(data => {
          if(data.hasOwnProperty("msg")){
            this.setState({message:data.msg});
          }
          else{
            this.props.setUser(data);
          }
        })
        .catch(err => {
          this.setState({message:"Error logging in..."});
          console.log(err);
        });
    }
  }
  changeUsername(event){
    this.setState({username: event.target.value});
  }
  changePassword(event){
    this.setState({password: event.target.value});
  }
  changeEmail(event){
    this.setState({email: event.target.value});
  }

  render(){
    if(this.state.signup){
      // create an account
      return (
        <div className="SignInPage" style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"stretch"}}>
          <h2 style={{padding:"10px"}}>Create Account</h2>
          {this.state.message&&<p className="errorMessage">{this.state.message}</p>}
          <form onSubmit={this.submit} style={{display:"flex",flexDirection:"column",alignItems:"stretch"}}>
            <label>Username</label>
            <input type="text" id="username" name="username" onChange={this.changeUsername}/>
            <label>Email</label>
            <input type="text" id="email" name="email" onChange={this.changeEmail}/>
            <label>Password</label>
            <input type="password" id="password" name="password" onChange={this.changePassword}/>
            <input type="submit" value="Submit" />
          </form>
          <button onClick={()=>this.setState({signup:false})}>Already have an account?</button>
        </div>
      );
    }
    // sign in
    return (
      <div className="SignInPage" style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"stretch"}}>
        <h2 style={{padding:"10px"}}>Sign In</h2>
        {this.state.message&&<p className="errorMessage">{this.state.message}</p>}
        <form onSubmit={this.submit} style={{display:"flex",flexDirection:"column",alignItems:"stretch"}}>
          <label>Username or Email</label>
          <input type="text" id="username" name="username" onChange={this.changeUsername}/>
          <label>Password</label>
          <input type="password" id="password" name="password" onChange={this.changePassword}/>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={()=>this.setState({signup:true})}>Need an account?</button>
      </div>
    );
  }
}




class AccountPage extends React.Component {
  constructor(props){
    super(props);
    var path = window.location.pathname;
    var generator = path.substr(path.lastIndexOf('/')+1);
    this.state = {genName:generator};

    this.setUser = this.setUser.bind(this);
  }

  setUser(user){
    this.props.history.push("/");
    this.props.setUser(user);
  }

  render(){
    return (
      <div className="AccountPage" style={{width:"calc(100% - 20px)",maxWidth:"400px",margin:"auto"}}>
        <SignInPage setUser={this.setUser}/>
      </div>
    );
  }
}

export default withRouter(AccountPage);
