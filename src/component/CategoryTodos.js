/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import {
  useLocation,
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
    const router = this.props.router
    const id = router.params.id
    console.log(id,'id of params')
    this.props.getTodoDetails(id)


  }


  updateData = (changedTodo, category_id, id) => {
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
      }).then(() => this.props.getTodoDetails(category_id))
      .catch(e => {
      console.log(e);
      });
  }



  handleChange = (id) => {

    const router = this.props.router
    const category_id = router.params.id
    const allTodos = this.props.todos
    allTodos.forEach((todo,index) => {
      if ((todo.id === id) && (index > 0 && allTodos[index-1].completed || index==0) ) {
       const changedTodo = {
          ...todo, completed: !todo.completed,
        };

        this.updateData(changedTodo, category_id, id)
      }
    })

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
      todos: this.props.todos.map(todo => {
        if (todo.id === id) {
          todo.name = updatedTitle
        }
        return todo
      }),
    })
  }

  render() {
    console.log(this.state)
    const router = this.props.router
    const category_id = router.params.id
    return (
        <>
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList
            todos={this.props.todos}
            handleChangeProps={this.handleChange}
            category_id = {category_id}
            deleteTodoProps={this.delTodo}
            setUpdate={this.setUpdate}
            updateData = {this.updateData}
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