import { isExternalModuleNameRelative } from "typescript";

export default class Item {
    ItemName: string = ""
    Quantity: int = 1
    AdderName: string = ""

    constructor(itemName: string, adderName: string, quantity: int = 1) {
        this.ItemName = itemName
        this.AdderName = adderName
        this.Quantity = quantity
    }
}
