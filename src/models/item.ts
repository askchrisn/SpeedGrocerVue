import { isExternalModuleNameRelative } from "typescript";

export default class Item {
    ItemName: string = "";
    AdderName: string = "";

    constructor(itemName: string, adderName: string) {
        this.ItemName = itemName
        this.AdderName = adderName
    }
}
