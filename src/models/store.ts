import Item from './item'

export default class Store {
    Name: string = ""
    Location: string = ""
    Aisles: string[] = []
    ItemLocations: { [itemName: string] : string } = {}

    getAisle(item: Item) {
        if (item.ItemName.toLowerCase() in this.ItemLocations) {
            return this.ItemLocations[item.ItemName]
        }

        return ""
    }

    rememberItem(item: Item, aisle: string) {
        this.ItemLocations[item.ItemName.toLowerCase()] = aisle
    }

    generateAisles() {
        this.Aisles = [
            "Dairy",
            "Deli",
            "Meat",
            "Produce",
            "Bakery",
            "Aisle 1",
            "Aisle 2",
            "Aisle 3",
            "Aisle 4",
            "Aisle 5",
            "Aisle 6",
            "Aisle 7",
            "Aisle 8",
            "Aisle 9",
            "Aisle 10",
            "Aisle 11",
            "Aisle 12",
            "Aisle 13",
            "Aisle 14",
            "Aisle 15",
            "Aisle 16",
            "Aisle 17",
            "Aisle 18",
            "Aisle 19",
            "Aisle 20",
            "Checkout"
        ]
    }

    static fromObject(obj: any) : Store {
        var store = new Store()
        store.Name = obj.Name
        store.Location = obj.Location
        store.Aisles = obj.Aisles
        store.ItemLocations = obj.ItemLocations

        if (store.Aisles == null) {
            store.Aisles = []
        }

        if (store.ItemLocations == null) {
            store.ItemLocations = {}
        }

        return store
    }
}