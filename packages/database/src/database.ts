
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './types'


//for local database
const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: "postgres://postgres:changeme@localhost:5432/test1",
    max: 10,
  })
})

export const db = new Kysely<Database>({
  dialect,
})
