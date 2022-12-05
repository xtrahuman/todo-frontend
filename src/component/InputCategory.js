import React, { Component } from 'react';
/* eslint-disable */
class InputCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.title.trim()) {
      this.props.addCategory(this.state.title);
      this.setState({
        title: '',
      });
    } else {
      alert('Please write item');
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
  <input
    type="text"
    className="input-text"
    placeholder="create category..."
    value={this.state.title}
    name="title"
    onChange={this.onChange}
  />
  <button className="input-submit">Create</button>
</form>
    );
  }
}
export default InputCategory;
/* eslint-disable */