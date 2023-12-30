import Item from './item'

export default class GroceryList {
    Name: string = ""
    Items: Item[] = []
    ItemHistory: { [itemName: string] : number } = {}
    Users: string[] = []

    addItem(newItem: Item) {
        var existingItem: Item = null
        for (var item of this.Items) {
            if (newItem.ItemName.toLowerCase() === item.ItemName.toLowerCase()) {
                existingItem = item
                break
            }
        }

        if (existingItem == null) {
            this.Items.push(newItem)
            this.updateItemHistory(newItem.ItemName, 1)
        }
        else {
            existingItem.Quantity += newItem.Quantity
        }
    }

    removeItem(itemName: string, decrementItemHistory: bool = false) {
        const index = this.Items.map(function(item) { return item.ItemName; }).indexOf(itemName)
        if (index !== -1) {
            this.Items.splice(index, 1)

            if (decrementItemHistory ) {
                this.updateItemHistory(itemName, -1)
            }
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

    hasItem(itemName: string) {
        for (var item of this.Items) {
            if (item.ItemName.toLowerCase() === itemName.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    getItemHistoryByFrequency() {
        // Create an array of items and their corresponding counts
        const itemsWithCounts: { name: string; count: number }[] = Object.entries(
          this.ItemHistory
        ).map(([name, count]) => ({ name, count }));
    
        // Sort the array based on the count in descending order
        itemsWithCounts.sort((a, b) => b.count - a.count);
    
        // Extract and return only the item names in the final list
        const sortedItemNames: string[] = itemsWithCounts.map((item) => item.name);
    
        return sortedItemNames;
    }

    private updateItemHistory(itemName: string, value: int) {
        if (!itemName in this.ItemHistory || isNaN(this.ItemHistory[itemName])) {
            this.ItemHistory[itemName] = 0
        }

        if (this.ItemHistory[itemName] + value >= 0) {
            this.ItemHistory[itemName] += value
        }
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
