import React from 'react';
import * as PropTypes from 'prop-types';
import TodoItem from './todo-item.component';

export default class TodoList extends React.Component {
	static propTypes = {
		todos: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		})).isRequired,
		onRequestDelete: PropTypes.func.isRequired,
	};

	render () {
		return (
			<ul>
				{this.props.todos.map(todo => (
					<TodoItem
						onRequestDelete={this.props.onRequestDelete}
						todo={todo}
						key={todo.id}
					/>
				))}
			</ul>
		);
	}
}
