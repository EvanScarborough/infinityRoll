import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserPreview from './UserPreview.js';

const BOXSIZE = 240;
const BOXSIZESTR = BOXSIZE + "px";

class GenListing extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const name = this.props.info.name.replace(/_/g,' ');
    return (
      <div className="GenListing fadeInUp" style={{width:BOXSIZESTR,height:BOXSIZESTR,maxWidth:"calc(50vw - 20px)",maxHeight:"calc(50vw - 20px)",overflow:"hidden",margin:"10px",display:"flex",flexDirection:"column",alignItems:"stretch"}}>
        <div className="genListBackground" style={{backgroundImage:'url('+this.props.info.background+')',height:"50%",/*marginBottom:"-25px",*/display:"flex",alignItems:"center",justifyContent:"center"}}>
          <h3 style={{marginBottom:"5px"}}>{name}</h3>
        </div>
        {/*<button className="genListButton" style={{alignSelf:"center"}}></button>*/}
        <p style={{padding:"6px",flexGrow:"0"}}>{this.props.info.description}</p>
        <Link to={'/gen/'+this.props.info.name} style={{marginTop:"auto"}}>View Page</Link>
      </div>
    );
  }
}


class GenList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let itemcomps = this.props.items.map((val,ind) => {return(<GenListing key={ind} info={val}/>);});

    return (
      <div className="GeneSection" style={{width:"100%"}}>
        <h2 className="GenSectionTitle" style={{marginLeft:"20px"}}>{this.props.title}</h2>
        <div className="GenList" style={{width:"100%",display:"flex",flexWrap:"wrap"}}>
          {itemcomps}
        </div>
      </div>
    );
  }
}


export default GenList;
