/* eslint-disable */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Category from './Category';
import NotMatch from './NotMatch';
import CategoryTodos from './CategoryTodos';

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }


  getPageDetails = (id) => {
    fetch(`http://127.0.0.1:3100/categories/${id}/tasks`)
      .then(response => response.json())
      .then(data =>{ 
        console.log(data, 'todo data')
        this.setState({ todos: data })});
  }


  render() {
    return (
      <div className="container">
        <Category getTodoDetails={this.getPageDetails}/>
        <div className="inner">
          <Header />
      <Routes>
        <Route path="/" element={<h2>welcome, create a category to start your todo list</h2>} />
        <Route path="categories/:id/todos" element={<CategoryTodos todos={this.state.todos} getTodoDetails={this.getPageDetails} />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
        </div>
      </div>
    );
  }
}

export default TodoContainer;
/* eslint-disable */