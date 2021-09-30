import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Hello World!</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

let funcStyle = 'color:blue';
let funcId = 0;
// 함수형 컴포넌트
function FuncComp(props) {
  // let numberState = useState(props.initNumber);
  // let number = numberState[0];
  // let setNumber = numberState[1];

  let [number, setNumber] = useState(props.initNumber);

  // let dateState = useState(new Date().toString());
  // let _date = dateState[0];
  // let setDate = dateState[1];

  let [_date, setDate] = useState(new Date().toString());

  // side effect
  useEffect(() => {
    console.log('%cfunc => useEffect (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    document.title = number + ' : ' + _date;
  });

  console.log('%cfunc => render' + (++funcId), funcStyle);
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      />
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      />
    </div>
  );
}

// 클래스형 컴포넌트
let classStyle = 'color:red';
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  }
  componentWillMount() {
    console.log('%cclass = > componentWillMount', classStyle);
  }
  componentDidMount() {
    console.log('%cclass = > componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('%cclass => componentWillUpdate', classStyle);
  }
  componentDidUpdate(nextProps, nextState) {
    console.log('%cclass => componentDidUpdate', classStyle);
  }
  render() {
    console.log('%cclass => render', classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        />
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        />
      </div>
    );
  }
}

export default App;
