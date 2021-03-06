import React, { useState, useEffect } from "react";

function App() {
  let [funcShow, setFuncShow] = useState(true);
  let [classShow, setClassShow] = useState(true);
  return (
    <div className="container">
      <h1>Hello World!</h1>
      <input type="button" value="remove_func" onClick={() => {
        setFuncShow(false);
      }} />
      <input type="button" value="remove_camp" onClick={() => {
        setClassShow(false);
      }} />
      {funcShow ? <FuncComp initNumber={2} /> : null}
      {classShow ? <ClassComp initNumber={2} /> : null}
    </div>
  );
}

let funcStyle = 'color:blue';
let funcId = 0;
// 함수형 컴포넌트
function FuncComp(props) {
  let [number, setNumber] = useState(props.initNumber);
  let [_date, setDate] = useState(new Date().toString());

  useEffect(() => {
    console.log('%cfunc => useEffect (componentDidMount)' + (++funcId), funcStyle);
    document.title = [];
    return function () {
      console.log('%cfunc => useEffect return (componentWillUnMount)' + (++funcId), funcStyle);
    }
    // 1회만 실행 그 이후엔 실행 x
  }, []);

  // side effect
  useEffect(() => {
    console.log('%cfunc => useEffect number (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    document.title = number;
    // clean up 할때 사용
    return function () {
      console.log('%cfunc => useEffect number return (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    }
    // 상태가 바뀌었을 때만
  }, [number]);

  useEffect(() => {
    console.log('%cfunc => useEffect _date (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    document.title = _date;
    return function () {
      console.log('%cfunc => useEffect _date return (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    }
    // 상태가 바뀌었을 때만
  }, [_date]);

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
    console.log('%cclass => componentWillMount', classStyle);
  }
  componentDidMount() {
    console.log('%cclass => componentDidMount', classStyle);
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
  componentWillUnmount() {
    console.log('%cclass => componentWillUnMount', classStyle);
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
