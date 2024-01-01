import { ref } from "vue";
import { attachEvent } from "./firebaseConfig";
import GroceryList from "./models/groceryList";

export const groceryLists = ref<Array<[string, GroceryList]>>([])

export function getAUsersLists(email: string)
{ 
    return groceryLists.value.filter(([key, gl]) => gl.containsUser(email)); 
}

export function getList(key: string)
{ 
    var list = groceryLists.value.find(([k, gl]) => k === key);
    if(list === undefined) return new GroceryList();
    
    return GroceryList.fromObject(list[1]);  
}

export function getAllPeopleOnList(listKey: string): string[] {
    var list = getList(listKey);
    return list ? list.Users ?? [] : [];
}

export function getAUsersFriendsHistory(email: string) {    
    var usersLists = getAUsersLists(email);
    let history = usersLists.flatMap(([, list]) => list.Users); // this gets all the users in the lists
   
    // remove duplicates and the user that asked for the list
    let recommended: string[] = [];
    for (let user of history) {
        if (user !== email && !recommended.includes(user)) {
            recommended.push(user);
        }
    }

    return recommended;
}

const listener = attachEvent("GroceryLists", (snapshot) => {
    var updatedGroceryLists: Array<[string, GroceryList]> = []

    for (let key in snapshot) {
        var gl = GroceryList.fromObject(snapshot[key])
        updatedGroceryLists.push([key, gl])
    }

    groceryLists.value = updatedGroceryLists
});