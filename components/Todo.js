import Link from 'next/link';

export default function Todo({ id, title, deleteTodo }) {
    return (
        <div key={id} className="mt-1 bg-white px-4 py-2">
            <Link href={{ pathname: '/todos/[id]', query: { id: id } }}>
                <a className="hover:underline">{title}</a>
            </Link>
            <div className="flex gap-3 mt-2">
                <Link href="/">
                    <a className="text-sm text-indigo-500 hover:text-indigo-600 hover:underline">
                        Edit
                    </a>
                </Link>
                <a
                    onClick={() => deleteTodo(id)}
                    className="text-sm text-red-500 hover:text-red-600 hover:underline cursor-pointer"
                >
                    Delete
                </a>
            </div>
        </div>
    );
}
