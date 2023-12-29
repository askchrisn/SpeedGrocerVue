export default class UserInfo {
    Nickname: string = "";
    Email: string = "";

    constructor(name: string, email: string) {
        this.Nickname = name;
        this.Email = email;
    }
}
