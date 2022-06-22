import Todo from './Todo';

export default function TodoList({ todos, onDeleteTodo }) {
    return (
        <>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    deleteTodo={onDeleteTodo}
                />
            ))}
        </>
    );
}
