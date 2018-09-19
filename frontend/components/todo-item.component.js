import React from 'react';
import * as PropTypes from 'prop-types';

export default class TodoItem extends React.Component {
	static propTypes = {
		onRequestDelete: PropTypes.func.isRequired,
		todo: PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			text: PropTypes.string.isRequired,
		})
	};

	render () {
		const { todo } = this.props;
		return (
			<li>
				<div className="view">
					<label>{todo.text}</label>
					<button onClick={() => this.props.onRequestDelete(todo.id)}>Remove Todo</button>
				</div>
			</li>
		);
	}
}
