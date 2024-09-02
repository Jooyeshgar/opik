import { Cell } from "@tanstack/react-table";

export type Updater<T> = T | ((old: T) => T);
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;

export type DropdownOption<TDataType> = {
  value: TDataType;
  label: string;
  description?: string;
};

export enum COLUMN_TYPE {
  string = "string",
  number = "number",
  list = "list",
  time = "time",
  dictionary = "dictionary",
  numberDictionary = "numberDictionary",
}

export type ColumnData<T> = {
  id: string;
  label: string;
  disabled?: boolean;
  accessorFn?: (row: T) => string;
  size?: number;
  type?: COLUMN_TYPE;
  customMeta?: object;
  iconType?: COLUMN_TYPE;
  cell?: Cell<T, unknown>;
  verticalAlignment?: CELL_VERTICAL_ALIGNMENT;
};

export enum ROW_HEIGHT {
  small = "small",
  medium = "medium",
  large = "large",
}

export enum CELL_VERTICAL_ALIGNMENT {
  start = "start",
  center = "center",
  end = "end",
}