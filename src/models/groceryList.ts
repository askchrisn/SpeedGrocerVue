import Item from './item'

class GroceryList {
    name: string;
    items: Item[];
    users: string[];

    constructor(name: string, items: Item[] = [], users: string[] = []) {
        this.name = name;
        this.items = items;
        this.users = users;
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    addItems(items: Item[]) {
        this.items = this.items.concat(items);
    }

    removeItem(itemName: string) {
        const index = this.items.map(function(item) { return item.name; }).indexOf(itemName);
        if (index !== -1) {
        this.items.splice(index, 1);
        }
    }

    addUser(user: string) {
        this.users.push(user);
    }

    removeUser(user: string) {
        const index = this.users.indexOf(user);
        if (index !== -1) {
        this.users.splice(index, 1);
        }
    }
}

export default GroceryList;