import Item from './item'

export default class GroceryList {
    Name: string = "";
    Items: Item[] = [];
    Users: string[] = [];

    addItem(item: Item) {
        this.Items.push(item);
    }

    addItems(items: Item[]) {
        this.Items = this.Items.concat(items);
    }

    removeItem(itemName: string) {
        const index = this.Items.map(function(item) { return item.ItemName; }).indexOf(itemName);
        if (index !== -1) {
        this.Items.splice(index, 1);
        }
    }

    addUser(user: string) {
        this.Users.push(user);
    }

    removeUser(user: string) {
        const index = this.Users.indexOf(user);
        if (index !== -1) {
            this.Users.splice(index, 1);
        }
    }

    static fromObject(obj: any) {
        var gl = obj as GroceryList
        if (gl.Items == null) {
            gl.Items = []
        }

        return gl
    }
}
