
import React from 'react';
import MainContent from './MainContent';
import Reading from './Reading';
import WannaRead from './WannaRead';

import './MyList.css'; // MyList.cssをインポート

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isWannaRead: false};
  }

  handleClick(){
    this.setState({isWannaRead:true});
  }

  handleClickBack(){
    this.setState({isWannaRead:false});
  }

  render(){
    let list;
    if(this.state.isWannaRead){
      list = (
        <WannaRead />
      );
    } else {
      list = (
        <Reading />
      )
    }

  return (
    <div className="MyListAll">
     <div className="kirikae">
      <div className="toReading"
        style={{ cursor: 'pointer' }}
        onClick={()=>{this.handleClickBack()}}>
          <button>読んでる</button>
      </div>
      <div className="toWannaRead"
         style={{ cursor: 'pointer' }}
         onClick={()=>{this.handleClick()}}>
          <button>読みたい</button>
      </div>
     </div>

     <div className="listContent">{list}</div>    
    </div>       
  );
}
}

export default MyList;
