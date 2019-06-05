import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoItem from './components/TodoItem';

export default class App extends React.Component {
  constructor() {
    super();

// initial state of app (made up on keys and values)
    this.state = {
      // first time these key/values are written
      todoInput: "",
      todos: [
        { id: 0, title: "Take out the trash", done: false },
        { id: 1, title: "Cook dinner", done: false }
       ]
    }
  }

  addNewToDo() {
    let todos = this.state.todos;

// adding the new todo at the start of the list
    todos.unshift({
      id: todos.length,
      title: this.state.todoInput,
      done: false
    });


// setstate refreshes the data on the screen
    this.setState({
      todos: todos,
      todoInput: ""
    });
  }

  toggleDone (item) {
  // the current todos is the current state of the todos
    let todos = this.state.todos;
  // returns an array of the same length with different data
    todos = todos.map((todo) => {
      if (todo.id === item.id) {
        // the !variable means opposite of current bool value
        todo.done = !todo.done
      }
      return todo;
    })

    this.setState({todos});
  }

  removeTodo (item) {
    // the current todos is the current state of the todos
    let todos = this.state.todos;

    //filtering the todos by checking id match and adding to array or not.
    todos = todos.filter((todo) => todo.id !== item.id);
    this.setState({todos});
  }


  render() {
    // if in ios put statusbar if not, dont put anything.
    const statusbar = (Platform.OS == 'ios') ? <View style ={styles.statusbar}></View> : <View></View>;
    return (
      // inline components need < if they have a prop as well they have prop={value} eg, <View style={styles.container}>
      // if component is created outside the return then it only needs {} eg {statusbar}
      <View style={styles.container}>
      {statusbar}
      {/* this calls the component which is exported from the headerfile and adds the text to the props.title. */}
      <Header title="Todo app"/>
      {/* this calls the component which is exported from the inputbar file. the component props are filled in here.
        You can see in the inputbar file where these are mentioned.
         */}
      <InputBar todoInput={this.state.todoInput} textChange={todoInput => this.setState({ todoInput })}
                addNewToDo={ () => this.addNewToDo() }

        />

      <FlatList
        data={this.state.todos}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ ({item, index}) => {
          return (
            <TodoItem todoItem={item} toggleDone={() => this.toggleDone(item)} removeTodo={() => this.removeTodo(item)} />
          )
        }}
      />
      </View>
    );
  }
}

// stylesheet.create{} put the styles in.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusbar: {
    backgroundColor: '#FF5733',
    height: 20
  }
});
