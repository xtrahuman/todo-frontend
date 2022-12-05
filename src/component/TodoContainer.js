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

  componentDidMount() {

    // fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")



    // // fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    // fetch(`http://127.0.0.1:3100/categories/${id}/tasks`)
    //   .then(response => response.json())
    //   .then(data =>{ 
    //     console.log(data, 'todo data')
    //     this.setState({ todos: data })});
    //   console.log(this.state.todos,'check')

      // const temp = localStorage.getItem("todos")
      // const loadedTodos = JSON.parse(temp)
      // console.log(loadedTodos)
      // if (loadedTodos) {
      //   this.setState({
      //     todos: loadedTodos
      //   })
      // }


  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }

  // componentDidMount() {
  //   const temp = localStorage.getItem("todos")
  //   const loadedTodos = JSON.parse(temp)
  //   console.log(loadedTodos)
  //   if (loadedTodos) {
  //     this.setState({
  //       todos: loadedTodos
  //     })
  //   }
  // }

  getPageDetails = (id) => {
    // fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    fetch(`http://127.0.0.1:3100/categories/${id}/tasks`)
      .then(response => response.json())
      .then(data =>{ 
        console.log(data, 'todo data')
        this.setState({ todos: data })});
  }

  handleChange = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo, completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  delTodo = (id) => {
    this.setState({
      todos: [
        ...this.state.todos.filter((todo) => todo.id !== id),
      ],
    });
  };

  addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      name: title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.name = updatedTitle
        }
        return todo
      }),
    })
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