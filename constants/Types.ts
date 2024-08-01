export type Household = {
  id: string;
  name: string;
  ownerId: string;
  memberIds: string[];
  chores?: Chore[];
  lists?: List[];
}

export type User = {
  id: string;
  name: string;
  color: string;
}

export type Chore = {
  id: string;
  owner: string;
  frequency: number;
  dueDate: Date;
  name: string;
  notes: string;
}

export type List = {
  id: string;
  name: string;
  items: ListItem[];
}

export type ListItem = {
  id: string;
  item: string;
  quantity: number;
}