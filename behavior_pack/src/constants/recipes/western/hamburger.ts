import { ItemId } from "../../itemId.js";

export const hamburgerRecipe = {
    name: "bcc.cook:hamburger",
    ingredients: [
        { item: ItemId.burgerBun, quantity: 2 },
        { item: ItemId.cookedBeefPatty, quantity: 1 },
        { item: ItemId.lettuceLeaf, quantity: 1 },
        { item: ItemId.tomatoSlice, quantity: 1 },
    ],
    duration: 1,
};
