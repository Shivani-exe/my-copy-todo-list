import React from 'react';
import TodoList from './todoList';

export default function CompletedTodos({todos, ...props}) {
  const filteredTodos = todos && todos.filter(todo => todo.completed);
  return <TodoList todos={filteredTodos} {...props} />;
}
