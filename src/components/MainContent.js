// MainContent.js
import React from 'react';
// import SearchBar from './SearchBar';
import MyList from './MyList';
import Add from './Add';
import './MainContent.css';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isAdd: false};
  }

  handleClick(){
    this.setState({isAdd:true});
  }

  handleClickBack(){
    this.setState({isAdd:false});
  }

  render(){
    let maincontent;
    if(this.state.isAdd){
      maincontent = (
        <div className="Addpage">
          <Add />
        </div>
      );
    } else {
      maincontent = (
        <div className="MyListpage">
        <MyList />
      </div>
      );
    }
  

  return (
    <div className="main">
      <div className="navibar">
        <div className="navibarContents">
          <div 
            className="toMylist"
            style={{ cursor: 'pointer' }}
            nClick={()=>{this.handleClickBack()}}>
              <p>MyList</p>
              {/* <hr className="toMyListhr" color="black" size="10" width="100"></hr> */}
          </div>
          <div
            className="toAdd"
            style={{ cursor: 'pointer' }}
            onClick={()=>{this.handleClick()}}>
              <p>作品登録</p>
           </div>
        </div>
                  {maincontent}
       </div>
    </div>
  );
  }
}


export default MainContent;
