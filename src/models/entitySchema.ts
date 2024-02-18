export interface EntitySchema<T> {
  tableName: string
  tableAlias?: string
  primaryKey: string
  columns: ColumnSchema<T>[]
  data?: T
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
