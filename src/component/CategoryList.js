import React from 'react';
import TodoCategory from './TodoCategory';
/* eslint-disable */
class CategoryList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.categories.map((category) => (
          <TodoCategory
            key={category.id}
            category={category}
            getTodoDetails={this.props.getTodoDetails}
            handleChangeProps={this.props.handleChangeProps}
            deleteTodoProps={this.props.deleteTodoProps}
            setUpdate={this.props.setUpdate}
          />
        ))}
      </ul>
    );
  }
}

export default CategoryList;
/* eslint-disable */