import React from 'react';
import './TodoItem.css';
import { Link } from 'react-router-dom';

class TodoCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  // componentWillUnmount() {
  //   console.log('Cleaning up...');
  // }

  updateData = (changedCategory, category_id) => {
    const options = {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(changedCategory),
      };

      fetch(`${process.env.REACT_APP_BACKEND_URL_PROD}/categories/${category_id}`, options)
      .then(data => {
      if (!data.ok) {
        throw Error(data.status);
       }
       return data.json();
      }).then(() => this.props.getCategories())
      // .catch(e => {
      // console.log(e);
      // });
  }

  handleEditing = () => {
    this.setState({
      editing: true,
    });
  };

  handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      this.setState({ editing: false });
      const {id} = this.props.category;
      this.updateData(this.props.category, id)
    }
  };

  render() {
    const viewMode = {};
    const editMode = {};

    if (this.state.editing) {
      viewMode.display = 'none';
    } else {
      editMode.display = 'none';
    }


    const {id, name } = this.props.category;

    return (
      <li className="item">
        <div onDoubleClick={this.handleEditing}>
          <button onClick={() => this.props.deleteTodoProps(id)}>Delete</button>
          <Link to={`/categories/${id}/todos`} 
           onClick={() => {
            this.props.getTodoDetails(id)
            this.props.getCategoryDetails(id)
          }
          }
            >
            <span>{name}</span></Link>
        </div>
        <input
          type="text"
          style={editMode}
          className="textInput"
          value={name}
          onChange={(e) => {
            this.props.setUpdate(e.target.value, id);
          }}
          onKeyDown={this.handleUpdatedDone}
        />
      </li>
    );
  }
}

export default TodoCategory;
