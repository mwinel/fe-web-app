import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
    });
    const [errors, setErrors] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddTodo = () => {
        const { title } = formData;
        if (!title) {
            setErrors(true);
            return;
        }
        const newTodos = [
            ...todos,
            { id: todos.length + 1, title, completed: false },
        ];
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setFormData({ title: '' });
        setTodos(newTodos);
    };

    const handleDeleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(newTodos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTodo();
    };

    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem('todos')) || []);
    }, []);

    return (
        <div className="py-8">
            <div className="max-w-full px-4 mx-auto lg:max-w-2xl">
                <h2 className="mb-4 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    TODO App
                </h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mt-1 flex gap-2">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-4 border-indigo-500"
                                placeholder="Todo 1"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 border border-indigo-500 bg-indigo-600 font-bold text-white hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <span>Add Todo</span>
                        </button>
                    </div>
                    {errors && (
                        <small className="text-red-500">
                            Todo item is required.
                        </small>
                    )}
                </form>
                {!todos.length ? (
                    <p>You do not have any todos.</p>
                ) : (
                    <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
                )}
            </div>
        </div>
    );
}
