import React from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;

export default class TodoInput extends React.Component {
	state = { text: '' };
	static propTypes = {
		onTodoEntered: PropTypes.func.isRequired,
	};

	componentDidMount() {
		ReactDOM.findDOMNode(this).focus();
	}

	commitChanges = () => {
		this.props.onTodoEntered(this.state.text);
		this.setState({text: ''});
	};

	handleChange = e => {
		this.setState({text: e.target.value});
	};

	handleKeyDown = e => {
		if (e.keyCode !== ENTER_KEY_CODE) return;
		this.commitChanges();
	};

	render() {
		return (
			<input
				onChange={this.handleChange}
				onKeyDown={this.handleKeyDown}
				placeholder="What needs to be done?"
				value={this.state.text}
			/>
		);
	}
}
