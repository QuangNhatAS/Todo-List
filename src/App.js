import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/tick.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      currentFilter: 'All',
      todoItems: [
        { title: 'Nguyen Thanh Dat', isComplete: true },
        { title: 'Giao duc gioi tinh', isComplete: false },
        { title: '5 dieu bac ho day', isComplete: false },
      ],
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showActive = this.showActive.bind(this);
    this.showComplete = this.showComplete.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
  }

  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }

  onKeyUp(event) {
    let text = event.target.value;
    if (event.keyCode === 13) {
      // enter key

      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems,
        ],
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value,
    });
  }
  showAll() {
    this.setState({
      currentFilter: 'All',
    });
  }
  showActive() {
    this.setState({
      currentFilter: 'Active',
    });
  }
  showComplete() {
    this.setState({
      currentFilter: 'Complete',
    });
  }
  clearComplete() {
    let todoItem = this.state.todoItems.filter((item) => {
      return item.isComplete === false;
    });
    this.setState({
      todoItems: todoItem,
    });
  }

  render() {
    const { todoItems, newItem, currentFilter } = this.state;
    let countActive = 0;
    let classClearComplete = '';
    for (var item of this.state.todoItems) {
      if (item.isComplete) countActive++;
    }
    if (countActive === 0) {
      classClearComplete = 'clearComplete';
    }
    if (todoItems.length) {
      return (
        <div className='App'>
          <div className='Header'>
            <img src={tick} width='32' height='32' />
            <input
              type='text'
              placeholder='Add a new item'
              value={newItem}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
            />
          </div>
          {todoItems.length &&
            currentFilter === 'All' &&
            todoItems.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                onClick={this.onItemClicked(item)}
              />
            ))}

          {todoItems.length &&
            currentFilter === 'Complete' &&
            todoItems.map((item, index) => {
              if (item.isComplete)
                return (
                  <TodoItem
                    key={index}
                    item={item}
                    onClick={this.onItemClicked(item)}
                  />
                );
            })}
          {todoItems.length &&
            currentFilter === 'Active' &&
            todoItems.map((item, index) => {
              if (item.isComplete === false)
                return (
                  <TodoItem
                    key={index}
                    item={item}
                    onClick={this.onItemClicked(item)}
                  />
                );
            })}
          <div className='Footer'>
            <div>{todoItems.length} item left </div>
            <div>
              <button onClick={this.showAll}>All</button>
              <button onClick={this.showActive}>Active</button>
              <button onClick={this.showComplete}>Completed</button>
            </div>
            <div class={classClearComplete}>
              <button onClick={this.clearComplete}>Clear Completed</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='App'>
          <div className='Header'>
            <img src={tick} width='32' height='32' />
            <input
              type='text'
              placeholder='Add a new item'
              value={newItem}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
            />
          </div>
        </div>
      );
    }
  }
}

export default App;
