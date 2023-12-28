class GroceryList {
    name: string;
    items: string[];
    users: string[];

    constructor(name: string, items: string[] = [], users: string[] = []) {
        this.name = name;
        this.items = items;
        this.users = users;
    }

    addItem(item: string) {
        this.items.push(item);
    }

    addItems(items: string[]) {
        this.items = this.items.concat(items);
    }

    removeItem(item: string) {
        const index = this.items.indexOf(item);
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