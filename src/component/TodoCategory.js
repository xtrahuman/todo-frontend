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

  componentWillUnmount() {
    console.log('Cleaning up...');
  }

  handleEditing = () => {
    this.setState({
      editing: true,
    });
  };

  handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      this.setState({ editing: false });
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

    const completedStyle = {
      fontStyle: 'italic',
      color: '#595959',
      opacity: 0.4,
      textDecoration: 'line-through',
    };
    const {id, name } = this.props.category;
    // const router = this.props.router
    // const idParams = router.params.id
    // console.log(idParams ,'id of params')
    // const { completed, id, name } = this.props.category;
    return (
      <li className="item">
        <div onDoubleClick={this.handleEditing}>
          {/* <input
            type="checkbox"
            className="checkbox"
            checked={completed}
            onChange={() => this.props.handleChangeProps(id)}
          /> */}
          <button onClick={() => this.props.deleteTodoProps(id)}>Delete</button>

          <Link to={`/categories/${id}/todos`} onClick={() => this.props.getTodoDetails(id)}><span>{name}</span></Link>
          {/* <span style={completed ? completedStyle : null}>{title}</span> */}
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
