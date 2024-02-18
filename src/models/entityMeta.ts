export interface EntityMeta<T> {
  tableName: string
  primaryKey: string
  columns: ColumnMeta<T>[]
  data?: T
}

export interface ColumnMeta<T> {
  name: keyof T
  alias?: string
  type?: string
  required?: boolean
  primaryKey?: boolean
  autoIncrement?: boolean
  foreignKey?: boolean
}
