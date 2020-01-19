import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const Todo = ({ todo, handleDeleteRequest, markComplete }) => (
	<ListItem key={todo.id} alignItems="flex-start">
		<ListItemAvatar>
			<Avatar>
				<RadioButtonUncheckedIcon />
			</Avatar>
		</ListItemAvatar>
		<ListItemText
			primary={todo.text}
			secondary={
				<React.Fragment>
					<Button variant="contained" onClick={() => handleDeleteRequest(todo.id)}>
						<DeleteIcon />
					</Button>
					<Checkbox
						checked={todo.completed}
						onChange={() => markComplete(todo.id)}
						value="primary"
						inputProps={{ 'aria-label': 'todo checkbox' }}
					/>
				</React.Fragment>
			}
		/>
	</ListItem>
)

Todo.propTypes = {
	todo: PropTypes.shape({
    id: PropTypes.number,
		text: PropTypes.string,
		completed: PropTypes.bool
  }),
	handleDeleteRequest: PropTypes.func,
	markComplete: PropTypes.func,
}

export default Todo