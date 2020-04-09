import React, { Component } from 'react';
import './TodoItem.css';
import PropTypes from 'prop-types';
import checkImg from '../img/check.png';
import checkCompleteImg from '../img/check-complete.jpg';

class TodoItem extends Component {
  render() {
    const { item } = this.props;
    let className = 'TodoItem';
    if (item.isComplete) {
      className += ' TodoItem-complete';
    }
    let url = checkImg;
    if (item.isComplete) {
      url = checkCompleteImg;
    }
    return (
      <div className={className}>
        <img onClick={this.props.onClick} src={url} width='32' height='32' />
        <p>{item.title}</p>
      </div>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default TodoItem;
