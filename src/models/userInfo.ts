export default class UserInfo {
    Nickname: string = ""
    Email: string = ""
    ShoppingViewMode: ShoppingViewMode = ShoppingViewMode.Full
    SmartSearchEnabled: boolean = true
    
    constructor(name: string = "", email: string = "") {
        this.Nickname = name;
        this.Email = email;
    }

    displayShoppingViewMode(): string {
        return ShoppingViewMode[this.ShoppingViewMode];
    }

    static fromObject(obj: any) : UserInfo {
        var userInfo = new UserInfo()
        userInfo.Nickname = obj.Nickname
        userInfo.Email = obj.Email
        userInfo.ShoppingViewMode = obj.ShoppingViewMode
        userInfo.SmartSearchEnabled = obj.SmartSearchEnabled

        if (userInfo.ShoppingViewMode == null) {
            userInfo.ShoppingViewMode = ShoppingViewMode.Full
        }

        if (userInfo.SmartSearchEnabled == null) {
            userInfo.SmartSearchEnabled = true
        }

        return userInfo
    }
}

export enum ShoppingViewMode {
    Full,
    Half
}