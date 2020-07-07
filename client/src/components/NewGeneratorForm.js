import React from 'react';
import url from '../helpers/api';
import UserPreview from './UserPreview';
import Tag from './Tag';


class NewGeneratorForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {msg:"",name:"",description:"",example:"",tags:[]};

    this.submit = this.submit.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeExample = this.changeExample.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
  }
  changeTitle(event){
    this.setState({name: event.target.value});
  }
  changeDescription(event){
    this.setState({description: event.target.value});
  }
  changeExample(event){
    this.setState({example: event.target.value});
  }
  toggleTag(id){
    if(this.state.tags.indexOf(id) >= 0){
      let tags = this.state.tags;
      tags.splice(tags.indexOf(id),1);
      this.setState({tags:tags});
    }
    else{
      let tags = this.state.tags;
      tags.push(id);
      this.setState({tags:tags});
    }
  }
  submit(e){
    console.log(JSON.stringify(this.state));
    e.preventDefault();
    fetch(url + 'lists/add', {method:'post',headers:{'Content-Type':'application/json','x-auth-token':this.props.token},body:JSON.stringify(this.state)})
      .then(res => res.json())
      .then(data => {
        if(data.hasOwnProperty('msg')){
          this.setState({msg:data.msg});
        }
        else if(data.hasOwnProperty('err')){
          console.log(data.err);
        }
        else{
          this.props.submit(data.name);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render(){
    return(
      <div className="popupBackground" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div className="NewGeneratorForm" style={{display:"flex",flexDirection:"column",width:"calc(100vw - 20px)",maxWidth:"500px",height:"calc(100vh - 150px)",maxHeight:"500px"}}>
          <h2 style={{padding:"10px"}}>New Generator</h2>
          {this.state.msg&&<p className="errorMessage">{this.state.msg}</p>}
          <form onSubmit={this.submit} style={{display:"flex",height:"100%",flexDirection:"column",alignItems:"stretch"}}>
            <label>Title</label>
            <input type="text" id="title" name="title" style={{textTransform:"uppercase"}} onChange={this.changeTitle}/>
            <label>Description</label>
            <textarea id="description" name="description" onChange={this.changeDescription} style={{flex:"1",resize:"none"}}></textarea>
            <label>Example</label>
            <input type="text" id="example" name="example" onChange={this.changeExample}/>
            <label>Tags</label>
            <div style={{display:"flex",width:"100%",overflow:"auto",paddingBottom:"20px",height:"40px",minHeight:"40px"}}>
              {this.props.tags.map((val,ind)=><Tag key={ind} name={val.name} onClick={()=>this.toggleTag(val._id)} color={(this.state.tags.indexOf(val._id)>=0)?val.color:"#ddd"} />)}
            </div>
            <input type="submit" value="Next" />
          </form>
        </div>
        <button className="closeButton" onClick={()=>this.props.submit()} style={{backgroundColor:"white",justifySelf:"right"}}>
          Cancel
        </button>
      </div>
    );
  }
}



export default NewGeneratorForm;
