import React from 'react';
import TodoList from './todo-list.component';
import TodoInput from './todo-input.component';
import FetchApi from '../fetch-api';

export default class TodoApp extends React.Component {
	state = { todos: [] };

	componentDidMount() {
		FetchApi
			.get('/todo')
			.then(todos => this.setState({ todos }))
			.catch(() => alert('There was an error getting todos'));
	}

	handleTodoEntered = todoText => {
		FetchApi
			.post('/todo', { text: todoText })
			.then((newTodo) => {
				const newTodos = Array.from(this.state.todos);
				newTodos.push(newTodo);
				this.setState({ todos: newTodos });
			})
			.catch(() => alert('There was an error creating the todo'));
	};

	handleDeleteRequest = (id) => {
		FetchApi
			.delete(`/todo/${id}`)
			.then(() => {
				const newTodos = Array.from(this.state.todos);
				const todoIndex = newTodos.findIndex(todo => todo.id.toString() === id.toString());
				newTodos.splice(todoIndex, 1);
				this.setState({ todos: newTodos });
			})
			.catch(() => alert('Error removing todo'));
	};

	render() {
		return (
			<div>
				<h1>todos</h1>
				<TodoInput onTodoEntered={this.handleTodoEntered} />
				<TodoList onRequestDelete={this.handleDeleteRequest} todos={this.state.todos} />
			</div>
		);
	}
}
