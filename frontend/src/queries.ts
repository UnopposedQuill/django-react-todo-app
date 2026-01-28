import { gql, type TypedDocumentNode } from '@apollo/client';
import type { GetTasksQueryResult, CreateTaskMutationVariables, CreateTaskMutationResult } from './types.ts';

// 1. Typed Query: Get all tasks
export const GET_TASKS: TypedDocumentNode<GetTasksQueryResult> = gql`
  query GetTasks {
    allTasks {
      id
      title
      completed
    }
  }
`;

// 2. Typed Mutation: Create a new task
export const CREATE_TASK: TypedDocumentNode<
    CreateTaskMutationResult,
    CreateTaskMutationVariables
> = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      task {
        id
        title
        completed
      }
    }
  }
`;