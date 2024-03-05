// MainContent.js
import React from 'react';
// import SearchBar from './SearchBar';
import MyList from './MyList';
import Search from './Search';
import Add from './Add';
import './MainContent.css';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isAdd: 1};
  }

  handleClickOne(){
    this.setState({isAdd:1});
  }

  handleClickTwo(){
    this.setState({isAdd:2});
  }

  handleClickThree(){
    this.setState({isAdd:3});
  }

  render(){
    let maincontent;
    if(this.state.isAdd === 1){
      maincontent = (
          <div className="MyListpage">
          <MyList />
        </div>
      );
    } else if (this.state.isAdd === 2) {
      maincontent = (
        <div className="Serchpage">
        <Search />
      </div>
      );
    } else {
      maincontent = (
        <div className="Addpage">
        <Add />
      </div>
      );
    }
  

  return (
    <div className="maincontent">
      <div className="maincontentBar">
          <div 
            className={`toMylist ${this.state.isAdd === 1 ? 'selected' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={()=>{this.handleClickOne()}}>
              <p>MyList</p>
          </div>
          <div
            className={`toSearch ${this.state.isAdd === 2 ? 'selected' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={()=>{this.handleClickTwo()}}>
               <p>検索して作品登録</p>
           </div>
           <div
            className= {`toAdd ${this.state.isAdd === 3 ? 'selected' : ''}`}

            style={{ cursor: 'pointer' }}
            onClick={()=>{this.handleClickThree()}}>
               <p>入力して作品登録</p>
           </div>
      </div>
                  {maincontent}
    </div>
  );
  }
}


export default MainContent;
