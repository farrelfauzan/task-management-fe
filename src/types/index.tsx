export type TaskT = {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

type Column = {
  name: string;
  items: TaskT[];
};

export type Columns = {
  [key: string]: Column;
};
