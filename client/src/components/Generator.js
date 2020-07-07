import React from 'react';
import url from '../helpers/api';
import UserPreview from './UserPreview';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";



class GenInfo extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const name = this.props.info.name.replace(/_/g,' ');
    const numOthers = this.props.info.contributors.length;
    return(
      <div className="GenInfo" style={{}}>
        <div className="genInfoBackground" style={{backgroundImage:"url("+this.props.info.background+")"}}>
          <h2 className="generatorTitle">{name}</h2>
          <div style={{display:"flex",alignItems:"center"}}>
            <p style={{marginRight:"6px"}}>by</p>
            <UserPreview user={this.props.info.owner} />
            {numOthers>0 && <p>with help from {numOthers} others</p>}
          </div>
        </div>
        <p className="generatorDescr">{this.props.info.description}</p>
      </div>
    );
  }
}


class GenOutput extends React.Component {
  constructor(props){
    super(props);
    this.state = {results:[]};
    this.generate = this.generate.bind(this);
  }
  generate(){
    fetch(url + "gen/" + this.props.generator)
      .then(res => res.json())
      .then(data => {
        let results = this.state.results;
        results.unshift(data);
        this.setState({results:results});
      })
      .catch(err => console.log(err));
  }
  render(){
    return(
      <div className="GenOutput" style={{display:"flex",alignItems:"stretch",flexDirection:"column"}}>
        <button onClick={this.generate} style={{alignSelf:"center"}}>Generate</button>
        <div className="genOutputArea" style={{height:"100%",overflow:"auto"}}>
          {this.state.results.map((val,ind)=>
            <p key={ind} className="genResult">{val}</p>
          )}
        </div>
      </div>
    );
  }
}



class AddItemPopup extends React.Component{
  constructor(props){
    super(props);

    this.state = {itemText:"",multiplicity:1,generator:this.props.generator};

    this.submit = this.submit.bind(this);
    this.changeItemText = this.changeItemText.bind(this);
    this.changeMultiplicity = this.changeMultiplicity.bind(this);
  }
  changeItemText(event){
    this.setState({itemText: event.target.value});
  }
  changeMultiplicity(event){
    this.setState({multiplicity: event.target.value});
  }
  submit(e){
    e.preventDefault();
    console.log(this.props.token);
    fetch(url + 'items/add', {method:'post',headers:{'Content-Type':'application/json','x-auth-token':this.props.token},body:JSON.stringify(this.state)})
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.props.submit(data);
      })
      .catch(err => {
        this.props.submit();
        console.log(err);
      });
  }
  render(){
    return(
      <div className="popupBackground" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div className="AddItemPopup" style={{display:"flex",flexDirection:"column",width:"calc(100vw - 20px)",maxWidth:"500px",height:"calc(100vh - 150px)",maxHeight:"500px"}}>
          <h2 style={{padding:"10px"}}>Add Item</h2>
          <form onSubmit={this.submit} style={{display:"flex",height:"100%",flexDirection:"column",alignItems:"stretch"}}>
            <label>Item Text</label>
            <textarea id="item" name="item" onChange={this.changeItemText} style={{flex:"1",resize:"none"}}></textarea>
            <div style={{display:"flex",alignItems:"center"}}>
              <label style={{marginRight:"10px"}}>Multiplicity</label>
              <input type="number" id="multiplicity" name="multiplicity" step="1" value="1" onChange={this.changeMultiplicity}/>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <button className="closeButton" onClick={()=>this.props.submit()} style={{backgroundColor:"white",justifySelf:"right"}}>
          Cancel
        </button>
      </div>
    );
  }
}



const genItemHeight = 40;
const gihstr = genItemHeight + "px";

class GenItem extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="GenItem" style={{height:gihstr,display:"flex",alignItems:"center"}}>
        <p className="itemNumber">{this.props.num}</p>
        <p>{this.props.item.value}</p>
      </div>
    );
  }
}


class GenItemList extends React.Component {
  constructor(props){
    super(props);

    this.state = {expanded:false,addItem:false};

    this.addItem = this.addItem.bind(this);
  }
  addItem(item){
    this.props.addItem(item);
    this.setState({addItem:false});
  }
  render(){
    const itemcount = this.props.items.length;
    return(
      <div className="GenItemList" style={{}}>
        <button className="genItemListHeader" onClick={()=>this.setState({expanded:!this.state.expanded})} style={{width:"calc(100% - 12px)"}}>
          {itemcount} Items {this.state.expanded?'(Hide)':'(Show)'}
        </button>
        {this.state.expanded && <div className="itemList" style={{display:"flex",flexDirection:"column",alignItems:"stretch"}}>
          <button className="addItemButton" onClick={()=>this.setState({addItem:true})} style={{height:gihstr}}>
            Add Item
          </button>
          {this.props.items.map((item,index) => <GenItem key={index} num={index+1} item={item} />)}
        </div>}
        {this.state.addItem && <AddItemPopup submit={this.addItem} generator={this.props.generator} user={this.props.user} token={this.props.token}/>}
      </div>
    );
  }
}




class Generator extends React.Component {
  constructor(props){
    super(props);
    this.state = {gen:{},exists:true,loaded:false}

    this.addItem = this.addItem.bind(this);
  }

  componentDidMount(){
    if(!this.state.loaded) {
      // load the list info
      fetch(url + 'lists/' + this.props.name)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(!data){
            this.setState({loaded:true,exists:false});
          }
          else{
            // load all the items
            fetch(url + 'items/' + this.props.name)
              .then(res => res.json())
              .then(items => {
                data.items = items;
                this.setState({loaded:true,gen:data});
              })
              .catch(err => this.setState({loaded:true,exists:false}));
          }
        })
        .catch(err => {
          this.setState({loaded:true,exists:false});
        });
    }
  }

  addItem(item){
    let ng = this.state.gen;
    ng.items.push(item);
    this.setState({gen:ng});
  }

  render(){
    if(!this.state.loaded){
      return (<p>...</p>);
    }
    if(!this.state.exists){
      return (<p>No generator with that name...</p>);
    }
    return (
      <div className="Generator" style={{display:"flex",flexDirection:"column"}}>
        <GenInfo info={this.state.gen} />
        <GenOutput generator={this.state.gen.name}/>
        <GenItemList items={this.state.gen.items} generator={this.state.gen.name} addItem={this.addItem} user={this.props.user} token={this.props.token} />
      </div>
    );
  }
}




class GeneratorPage extends React.Component {
  constructor(props){
    super(props);
    var path = window.location.pathname;
    var generator = path.substr(path.lastIndexOf('/')+1);
    this.state = {genName:generator};
  }

  render(){
    return (
      <div className="GeneratorPage" style={{width:"100%"}}>
        <Generator name={this.state.genName} user={this.props.user} token={this.props.token} />
      </div>
    );
  }
}

export default GeneratorPage;
