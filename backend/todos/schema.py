import graphene
from graphene_django import DjangoObjectType
from .models import Task

# 1. Define GraphQL Type for Task model
class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ("id", "title", "completed", "created_at")


# 2. Define Queries
class Query(graphene.ObjectType):
    all_tasks = graphene.List(TaskType)

    def resolve_all_tasks(root, info):
        return Task.objects.all()


# 3. Define Mutations
class CreateTask(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)

    task = graphene.Field(TaskType)

    def mutate(self, info, title):
        task = Task.objects.create(title=title)
        return CreateTask(task=task)


class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()


# 4. Combine into Schema
schema = graphene.Schema(query=Query, mutation=Mutation)
