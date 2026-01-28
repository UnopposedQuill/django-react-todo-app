import { useQuery, useMutation } from '@apollo/client/react';
import { GET_TASKS, CREATE_TASK } from './queries.ts';

import type { Task, GetTasksQueryResult, CreateTaskMutationVariables, CreateTaskMutationResult} from './types.js';
import './App.css';

function TaskList() {
    // useQuery is now type-safe. `data` will be of type `GetTasksQueryResult | undefined`
    const { loading, error, data } = useQuery<GetTasksQueryResult>(GET_TASKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    // Data is now guaranteed to have the shape defined in GetTasksQueryResult
    return (
        <ul>
            {data?.allTasks.map((task: Task) => (
                <li key={task.id}>
                    {task.title} - {task.completed ? '✓' : '○'}
                </li>
            ))}
        </ul>
    );
}

function AddTask() {
    // useMutation is type-safe for variables and result
    const [createTask, { loading }] = useMutation<CreateTaskMutationResult, CreateTaskMutationVariables>(CREATE_TASK, {
        refetchQueries: [{ query: GET_TASKS }]
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const title = formData.get('taskTitle') as string;

        if (title.trim()) {
            try {
                await createTask({ variables: { title } });
                form.reset(); // Clear the form
            } catch (err) {
                console.error('Error creating task:', err);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="taskTitle"
                placeholder="New task..."
                disabled={loading}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
}

function App() {
    return (
        <div className="App">
            <h1>Todo App (TypeScript)</h1>
            <AddTask />
            <TaskList />
        </div>
    );
}

export default App;