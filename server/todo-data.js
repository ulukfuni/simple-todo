let todosCreated = 1;
let todos = [{
	id: 1,
	text: 'Finish coding exercise',
	completed: false,
}];

const getTodoIndex = (id) => {
	return todos.findIndex(todo => todo.id.toString() === id.toString());
}

export default class TodoData {
	static create(todo) {
		return new Promise((resolve) => {
			todo.id = ++todosCreated;
			todo.completed = false
			todos.push(todo);
			resolve(todo);
		});
	}

	static findAll() {
		return new Promise((resolve) => resolve(todos));
	}

	static delete(id) {
		return new Promise((resolve, reject) => {
			const todoIndex = getTodoIndex(id);
			if (todoIndex < 0 || todoIndex >= todos.length) return reject();
			todos.splice(todoIndex, 1);
			resolve();
		})
	}

	static update(id) {
		return new Promise((resolve, reject) => {
			const todoIndex = getTodoIndex(id);
			if (todoIndex < 0 || todoIndex >= todos.length) return reject();
			const newTodos = [ ...todos ]
			newTodos[todoIndex] = {
				...newTodos[todoIndex],
				completed: !newTodos[todoIndex].completed
			};
			resolve();
		})
	}
}
