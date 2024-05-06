import { db } from './database'
import { Todo, TodoUpdate, NewTodo } from './types'

export async function findTodos(criteria: Partial<Todo>) {
  let query = db.selectFrom('todo')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.title) {
    query = query.where('title', '=', criteria.title)
  }

  if (criteria.completed) {
    query = query.where('completed', '=', criteria.completed)
  }

  return await query.selectAll().execute()
}

export async function findTodosByTodoId(todoId: number) {
  return await db.selectFrom('todo')
    .where('id', '=', todoId)
    .selectAll()
    .execute()
}

export async function createTodo(todo: NewTodo) {
  return await db.insertInto('todo')
    .values(todo)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function updateTodo(id: number, updateWith: Partial<TodoUpdate>) {
  await db.updateTable('todo').set(updateWith).where('id', '=', id).execute()
}

export async function deleteTodo(id: number) {
  return await db.deleteFrom('todo').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}