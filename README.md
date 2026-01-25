# django-react-todo-app
Application with a todo implementation meant as a refresher on both Python+ReactJS

It uses a Django backend with GraphQL and a ReactJS frontend using a ViteJS server.
The connection between them is performed via an Apollo client.
# Getting started

1. Start the Django server
```
cd backend
python manage.py runserver
#Run on http://localhost:8000
```

2. Start the Vite frontend server
```
cd frontend
bun run dev
# Vite typically runs on http://localhost:5173
```
