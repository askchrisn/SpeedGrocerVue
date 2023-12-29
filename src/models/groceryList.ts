import Item from './item'
import User from './user'

export default class GroceryList {
    Name: string = "";
    Items: Item[] = [];
    ItemHistory: { [itemName: string] : number } = {}
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

    containsUser(user: string) : boolean {
        for (var email of this.Users) {
            if (user === email) {
                return true;
            }
        }

        return false;
    }

    static fromObject(obj: any) : GroceryList {
        var gl = new GroceryList()
        gl.Name = obj.Name
        gl.Items = obj.Items
        gl.ItemHistory = obj.ItemHistory
        gl.Users = obj.Users

        if (gl.Items == null) {
            gl.Items = []
        }

        if (gl.ItemHistory == null) {
            gl.ItemHistory = {}
        }

        return gl
    }
}
