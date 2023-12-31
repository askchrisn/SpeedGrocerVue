export default class Store {
    Name: string = ""
    Location: string = ""
    Aisles: string[] = []
    ItemLocations: { [itemName: string] : string } = {}

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