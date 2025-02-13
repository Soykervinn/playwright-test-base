// tests/todo.spec.js
import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/web-app-1/TodoPage';

const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

test.describe('Todo App - New Todo', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should allow me to add todo items', async () => {
    await todoPage.createTodos([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await todoPage.verifyTodos([TODO_ITEMS[0], TODO_ITEMS[1]]);
  });

  test('should clear text input field when an item is added', async () => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    await expect(todoPage.newTodoInput).toBeEmpty();
  });

  test('should append new items to the bottom of the list', async () => {
    await todoPage.createTodos(TODO_ITEMS);
    await todoPage.verifyTodos(TODO_ITEMS);
  });
});

test.describe('Mark all as completed', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.createTodos(TODO_ITEMS);
  });

  test('should allow me to mark all items as completed', async () => {
    await todoPage.markAllCompleted();
    await expect(todoPage.todoItems).toHaveClass(['completed', 'completed', 'completed']);
  });

  test('should allow me to clear the complete state of all items', async () => {
    await todoPage.markAllCompleted();
    await todoPage.unmarkAllCompleted();
    await expect(todoPage.todoItems).toHaveClass(['', '', '']);
  });

  test('complete all checkbox should update state when items are completed / cleared', async () => {
    await todoPage.markAllCompleted();
    await expect(todoPage.toggleAll).toBeChecked();
    await todoPage.todoItems.nth(0).getByRole('checkbox').uncheck();
    await expect(todoPage.toggleAll).not.toBeChecked();
    await todoPage.todoItems.nth(0).getByRole('checkbox').check();
    await expect(todoPage.toggleAll).toBeChecked();
  });
});

test.describe('Clear completed button', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.createTodos(TODO_ITEMS);
  });

  test('should remove completed items when clicked', async () => {
    await todoPage.todoItems.nth(1).getByRole('checkbox').check();
    await todoPage.clearCompleted();
    await todoPage.verifyTodos([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should be hidden when there are no items that are completed', async () => {
    await todoPage.todoItems.nth(0).getByRole('checkbox').check();
    await todoPage.clearCompleted();
    await expect(todoPage.clearCompletedButton).toBeHidden();
  });
});