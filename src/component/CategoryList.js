import React from 'react';
import TodoCategory from './TodoCategory';
/* eslint-disable */
class CategoryList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.categories.map((category) => (
          <TodoCategory
            getCategoryDetails={this.getCategoryDetails}
            key={category.id}
            category={category}
            getCategories= {this.props.getCategories}
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