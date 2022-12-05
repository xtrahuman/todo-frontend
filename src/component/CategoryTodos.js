/* eslint-disable */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

class CategoryTodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    // this.getPageDetails()
    const router = this.props.router
    const id = router.params.id
    console.log(id,'id of params')
    this.props.getTodoDetails(id)
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

  componentWillUnmount() {
    // clearInterval(this.timerID);

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

  handleChange = (id) => {

    const router = this.props.router
    const category_id = router.params.id

    this.props.todos.forEach((todo) => {
      if (todo.id === id) {
       const changedTodo = {
          ...todo, completed: !todo.completed,
        };

        const options = {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(changedTodo),
          };
    
          fetch(`http://127.0.0.1:3100/categories/${category_id}/tasks/${id}`, options)
          .then(data => {
          if (!data.ok) {
            throw Error(data.status);
           }
           return data.json();
          }).then(() => this.props.getTodoDetails(id))
          .catch(e => {
          console.log(e);
          });
      }
      // return todo;
    })

    // console.log(newTodo, "checking new todo")

  };

  delTodo = (id) => {

    const router = this.props.router
    const category_id = router.params.id

    const options = {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      }
      };

      fetch(`http://127.0.0.1:3100/categories/${category_id}/tasks/${id}`, options)
      .then(data => {
      if (!data.ok) {
        throw Error(data.status);
       }
      //  return data.json();
      }).then(() => this.props.getTodoDetails(category_id))
      .catch(e => {
      console.log(e);
      });
  };

  addTodoItem = (title) => {
    const router = this.props.router
    const id = router.params.id
    const newTodo = {
      name: title,
      completed: false,
    };

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
      };

      fetch(`http://127.0.0.1:3100/categories/${id}/tasks`, options)
      .then(data => {
      if (!data.ok) {
        throw Error(data.status);
       }
       return data.json();
      }).then(() => this.props.getTodoDetails(id))
      .catch(e => {
      console.log(e);
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
    console.log(this.state)
    return (
        <>
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList
            todos={this.props.todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.delTodo}
            setUpdate={this.setUpdate}
          />
        </>
    );
  }
}


InputTodo.propTypes = {
  addTodoProps: PropTypes.func.isRequired,
};

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
};

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    // const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        router={{ location, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter(CategoryTodos);
/* eslint-disable */