export default class UserInfo {
    Nickname: string = ""
    Email: string = ""
    ShoppingViewMode: ShoppingViewMode = ShoppingViewMode.Full
    SmartSearchEnabled: boolean = true
    DarkMode: boolean = false
    AutoCapitalize: boolean = true
    
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
        userInfo.DarkMode = obj.DarkMode
        userInfo.AutoCapitalize = obj.AutoCapitalize

        if (userInfo.ShoppingViewMode == null) {
            userInfo.ShoppingViewMode = ShoppingViewMode.Full
        }

        return userInfo
    }
}

export enum ShoppingViewMode {
    Full,
    Split
}