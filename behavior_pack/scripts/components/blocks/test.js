import { ComponentManager } from "../componentManager";
class TestCustomComponent {
    beforeOnPlayerPlace = (event) => {
        this.test();
    };
    test = () => {
        console.warn("WTF");
    };
}
ComponentManager.registerBlockComponent("bcc.cook:test", new TestCustomComponent());
