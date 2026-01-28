
/**
 * This interface mirrors the TaskType from the Django Graphene schema
 */
export interface Task {
    id: string;
    title: string;
    completed: boolean;
    created_at?: string; // Optional if you don't fetch it immediately
}

/**
 * This type matches the structure of the data returned by GET_TASKS query
 */
export interface GetTasksQueryResult {
    allTasks: Task[];
}

/**
 * This type matches the variables for the CREATE_TASK mutation
 */
export interface CreateTaskMutationVariables {
    title: string;
}

/**
 * This type matches the result of the CREATE_TASK mutation
 */
export interface CreateTaskMutationResult {
    createTask: {
        task: Task;
    };
}