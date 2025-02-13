import { expect } from '@playwright/test';

export class TodoPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.newTodoInput = page.getByPlaceholder('What needs to be done?');
      this.todoItems = page.getByTestId('todo-item');
      this.todoCount = page.getByTestId('todo-count');
      this.toggleAll = page.getByLabel('Mark all as complete');
      this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    }
  
    async goto() {
      await this.page.goto('https://demo.playwright.dev/todomvc');
    }
  
    async addTodo(todoText) {
      await this.newTodoInput.fill(todoText);
      await this.newTodoInput.press('Enter');
    }
  
    async createTodos(todos) {
      for (const todo of todos) {
        await this.addTodo(todo);
      }
    }
  
    async markAllCompleted() {
      await this.toggleAll.check();
    }
  
    async unmarkAllCompleted() {
      await this.toggleAll.uncheck();
    }
  
    async clearCompleted() {
      await this.clearCompletedButton.click();
    }
  
    async verifyTodoCount(count) {
      await expect(this.todoCount).toHaveText(`${count} items left`);
    }
  
    async verifyTodos(expectedTodos) {
      await expect(this.todoItems).toHaveText(expectedTodos);
    }
  }
  