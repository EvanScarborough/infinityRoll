import React from 'react';

function Tag(props) {
  return(
    <div className="Tag" onClick={props.onClick} style={{backgroundColor:props.color}}>
      {props.name}
    </div>
  );
}

export default Tag;
