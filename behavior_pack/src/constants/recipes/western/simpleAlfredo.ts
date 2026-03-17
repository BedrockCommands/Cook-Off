import { ItemId } from "../../itemId.js";

export const simpleAlfredoRecipe = {
    name: "bcc.cook:simple_alfredo",
    ingredients: [
        { item: ItemId.milk, quantity: 1 },
        { item: ItemId.cheeseSlice, quantity: 1 },
        { item: ItemId.cookedNoodles, quantity: 1 },
    ],
    duration: 1,
};
