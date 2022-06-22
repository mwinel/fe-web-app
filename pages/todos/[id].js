import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TodoDetails() {
    const [todo, setTodo] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
    });
    const [errors, setErrors] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateTodo = (id) => {
        const { title } = formData;
        if (!title) {
            setErrors(true);
            return;
        }
        const todos = JSON.parse(localStorage.getItem('todos'));
        const newTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.title = title;
                setTodo(todo);
            }
            return todo;
        });
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateTodo(todo.id);
    };

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        const todo = todos.find((t) => t.id === Number(id));
        setTodo(todo);
    }, []);

    return (
        <div className="py-8">
            <div className="max-w-full px-4 mx-auto lg:max-w-2xl">
                <h2 className="mb-4 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    TODO {id}
                </h2>
                <a
                    className="text-sm mb-2 text-indigo-500 hover:text-indigo-700 hover:underline cursor-pointer"
                    onClick={() => setToggleEdit(!toggleEdit)}
                >
                    Toogle Edit
                </a>
                {toggleEdit && (
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mt-1 flex gap-2">
                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-4 border-indigo-500"
                                    placeholder={todo ? todo.title : ''}
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2 border border-indigo-500 bg-indigo-600 font-bold text-white hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <span>Edit Todo</span>
                            </button>
                        </div>
                        {errors && (
                            <small className="text-red-500">
                                Todo item is required.
                            </small>
                        )}
                    </form>
                )}
                {todo && <p>{todo.title}</p>}
            </div>
        </div>
    );
}
