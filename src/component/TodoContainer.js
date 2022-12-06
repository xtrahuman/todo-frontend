/* eslint-disable */
import React from 'react';
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
      category:{}
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }


  getPageDetails = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL_PROD}/categories/${id}/tasks`)
      .then(response => response.json())
      .then(data =>{ 
        // console.log(data, 'todo data')
        this.setState({...this.state, todos: data })});
  }

  getCategoryDetails = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL_PROD}/categories/${id}`)
      .then(response => response.json())
      .then(data =>{ 
        // console.log(data, 'category data')
        this.setState({...this.state, category: data })});
  }


  render() {
    // console.log(this.state.category, 'checker name')
    return (
      <div className="container">
        <Category getTodoDetails={this.getPageDetails} getCategoryDetails={this.getCategoryDetails} />
        <div className="inner">
          <Header categoryName={this.state.category.name} />
      <Routes>
        <Route path="/" element={<h2 className='text-align-center'>welcome, create a category to start your todo list</h2>} />
        <Route path="categories/:id/todos" element={<CategoryTodos todos={this.state.todos} getTodoDetails={this.getPageDetails} getCategoryDetails={this.getCategoryDetails} />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
        </div>
      </div>
    );
  }
}

export default TodoContainer;
/* eslint-disable */