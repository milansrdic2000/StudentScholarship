export interface EntitySchema<T> {
  tableName: string
  tableAlias?: string
  primaryKey: string | string[]

  columns: ColumnSchema<T>[]
  filter?: Partial<T>

  insertQuery?: string

  joinKey?: string | string[]
  joinType?: string
}

export interface ColumnSchema<T> {
  name: keyof T
  getter?: string
  alias?: string
  type?: string
  required?: boolean
  primaryKey?: boolean
  autoIncrement?: boolean
  foreignKey?: boolean
}
