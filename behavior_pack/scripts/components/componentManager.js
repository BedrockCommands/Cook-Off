// SPDX-License-Identifier: MIT
// Copyright (c) @jeanmajid & Contributors
// Contributors: @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { system } from "@minecraft/server";
export class ComponentManager {
    static blockComponents = [];
    static itemComponents = [];
    static finalize() {
        system.beforeEvents.startup.subscribe(({ blockComponentRegistry, itemComponentRegistry }) => {
            for (const { blockId, component } of ComponentManager.blockComponents) {
                blockComponentRegistry.registerCustomComponent(blockId, component);
            }
            for (const { itemId, component } of ComponentManager.itemComponents) {
                itemComponentRegistry.registerCustomComponent(itemId, component);
            }
        });
    }
    static registerBlockComponent(blockId, component) {
        this.blockComponents.push({ blockId, component });
    }
    static registerItemComponent(itemId, component) {
        this.itemComponents.push({ itemId, component });
    }
}
