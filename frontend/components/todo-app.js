import React from 'react';
import FetchApi from '../fetch-api';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import ToDo from './ToDo'
import Completed from './Completed'

const ENTER_KEY_CODE = 13;

export default class TodoApp extends React.Component {
	state = { todos: [], newText: '' };

	componentDidMount() {
		this.getTodos();
	}

	getTodos = () => {
		return FetchApi
			.get('/todo')
			.then(todos => {
				this.setState({ todos })
			})
			.catch(() => alert('There was an error getting todos'));
	};

	createTodo = () => {
		FetchApi
			.post('/todo', { text: this.state.newText })
			.then((newTodo) => {
				const newTodos = Array.from(this.state.todos);
				newTodos.push(newTodo);
				this.setState({ todos: newTodos, newText: '' });
			})
			.catch((err) => alert(`There was an error creating the todo ${err}`));
	};

	handleDeleteRequest = (id) => {
		FetchApi
			.delete(`/todo/${id}`)
			.then(() => {
				this.getTodos()
			})
			.catch(() => alert('Error removing todo'));
	};

	markComplete = (id) => {
		FetchApi
			.put(`/todo/${id}`)
			.then(() => {
				this.getTodos()
			})
			.catch(() => alert('Error updating todo'))
	}


	handleChange = e => {
		this.setState({ newText: e.target.value });
	};

	handleKeyDown = e => {
		if (e.keyCode !== ENTER_KEY_CODE) return;
		this.createTodo();
	};

	render() {
		const { todos, newText } = this.state
		const pending = todos.filter(todo => !todo.completed)
		const completed = todos.filter(todo => todo.completed)
		return (
			<Box display="flex">
				<Box style={{ width: '45%'}}>
					<Typography variant="h2">To Dos</Typography>
					<Typography>{pending.length} Left</Typography>
					<TextField
						id="standard-basic"
						label="New ToDo"
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
						placeholder="What needs to be done?"
						value={newText}
					/>
					<List>
						{pending.map(todo => (
							<ToDo 
								key={todo.id}
								todo={todo}
								handleDeleteRequest={this.handleDeleteRequest}
								markComplete={this.markComplete}
							/>
						))}
					</List>
				</Box>
				<Box style={{ width: '45%'}}>
					<Typography variant="h2">Completed</Typography>
					<Typography>{completed.length} Finished!</Typography>
					<List>
						{completed.map(todo => (
							<Completed
								key={todo.id}
								todo={todo}
								handleDeleteRequest={this.handleDeleteRequest}
							/>
						))}
					</List>
				</Box>
			</Box>
		);
	}
}
