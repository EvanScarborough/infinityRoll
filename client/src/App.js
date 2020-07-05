import React from 'react';
import './App.css';
import url from './helpers/api'
import Header from './components/Header';
import MainPage from './components/MainPage';
import GeneratorPage from './components/Generator';
import AccountPage from './components/Account';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {token:"",user:{},tags:[]};

    this.setUser = this.setUser.bind(this);
  }

  setUser(user){
    this.setState(user);
    // save the user info
    localStorage.setItem('info', JSON.stringify(user));
  }

  componentDidMount(){
    // check for user info saved locally
    var userStr = localStorage.getItem('info');
    if(userStr){
      var user = JSON.parse(userStr);
      this.setState(user);
    }
    fetch(url + 'tags')
      .then(res => res.json())
      .then(data => {
        this.setState({tags:data});
      })
      .catch(err => console.log(err));
  }

  render(){
    console.log(this.state.user);
    return (
      <Router>
        <div className="App" style={{width:"100vw",height:"100vh"}}>
          <Header user={this.state.user}/>
          <Switch>
            <Route exact path="/">
              <MainPage tags={this.state.tags} user={this.state.user} token={this.state.token} />
            </Route>
            <Route path="/account">
              <AccountPage setUser={this.setUser}/>
            </Route>
            <Route path="/gen">
              <GeneratorPage user={this.state.user} token={this.state.token} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
