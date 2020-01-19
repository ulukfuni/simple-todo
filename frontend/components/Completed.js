import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const Compeleted = ({ todo, handleDeleteRequest }) => (
	<ListItem key={todo.id} alignItems="flex-start">
		<ListItemAvatar>
			<Avatar>
				<CheckCircleIcon />
			</Avatar>
		</ListItemAvatar>
		<ListItemText
			primary={todo.text}
			secondary={
				<Button variant="contained" onClick={() => handleDeleteRequest(todo.id)}>
					<DeleteIcon />
				</Button>
			}
		/>
	</ListItem>
)

Compeleted.propTypes = {
	todo: PropTypes.shape({
    id: PropTypes.number,
		text: PropTypes.string,
		completed: PropTypes.bool
  }),
	handleDeleteRequest: PropTypes.func
}

export default Compeleted