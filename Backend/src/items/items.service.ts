// Data Model Interfaces
import { BaseItem, Item } from "./item.interface";

// In-Memory Store
let items: Item[] = [
  {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png",
  },
  {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
  },
  {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png",
  },
];

let id = items.length;

const generateId = () => {
  id += 1;
  return id;
};

// Service Methods
export const findAll = async (): Promise<Item[]> => Object.values(items);

export const find = async (id: number): Promise<Item | undefined> => {
  const item = items.find((eachItem: Item) => eachItem.id === id);
  return item;
};

export const create = async (newItem: BaseItem): Promise<Item> => {
  const id = generateId();
  const item = { id, ...newItem };
  items.push(item);
  return item;
};

export const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | string | undefined> => {
  let item;
  items = items.map((eachItem: Item) => {
    if (eachItem.id === id) {
      item = { ...eachItem, ...itemUpdate };
      return item;
    }
    return eachItem;
  });
  return item;
};

export const remove = async (id: number): Promise<void> => {
  items = items.filter((eachItem: Item) => eachItem.id !== id);
};
