import Item from './item'

export default class GroceryList {
    Name: string = ""
    Items: Item[] = []
    ItemHistory: { [itemName: string] : number } = {}
    Users: string[] = []

    addItem(newItem: Item) {
        var existingItem: Item = null
        console.log(newItem)
        for (var item of this.Items) {
            console.log(item)
            if (newItem.ItemName.toLowerCase() === item.ItemName.toLowerCase()) {
                existingItem = item
                break
            }
        }

        if (existingItem == null) {
            this.Items.push(newItem)
        }
        else {
            existingItem.Quantity += newItem.Quantity
        }
    }

    removeItem(itemName: string) {
        const index = this.Items.map(function(item) { return item.ItemName; }).indexOf(itemName)
        if (index !== -1) {
        this.Items.splice(index, 1)
        }
    }

    addUser(user: string) {
        if (this.Users.indexOf(user) == -1) {
            this.Users.push(user)
        }
    }

    removeUser(user: string) {
        const index = this.Users.indexOf(user)
        if (index !== -1) {
            this.Users.splice(index, 1)
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

        if (gl.Users == null) {
            gl.Users = []
        }

        if (gl.ItemHistory == null) {
            gl.ItemHistory = {}
        }

        for (var i = 0; i < gl.Items.length; i++) {
            var item = gl.Items[i]
            if (item.Quantity == null) {
                item.Quantity = 1
            }
        }

        return gl
    }
}
