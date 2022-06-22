import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TodoDetails() {
    const [todo, setTodo] = useState({});

    const router = useRouter();
    const { id } = router.query;

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
                <p>{todo.title}</p>
            </div>
        </div>
    );
}
