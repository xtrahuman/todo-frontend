import React from 'react';
import TodoItem from './TodoItem';
/* eslint-disable */
class TodosList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            category_id = {this.props.category_id}
            updateData = {this.props.updateData}
            handleChangeProps={this.props.handleChangeProps}
            deleteTodoProps={this.props.deleteTodoProps}
            setUpdate={this.props.setUpdate}
          />
        ))}
      </ul>
    );
  }
}

export default TodosList;
/* eslint-disable */