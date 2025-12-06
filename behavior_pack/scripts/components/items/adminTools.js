// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { ActionFormData } from "@minecraft/server-ui";
import { ComponentManager } from "../componentManager";
export class AdminToolRegistry {
    static registeredTools = {};
    static registerTool(name, tool) {
        if (this.registeredTools[name])
            return;
        this.registeredTools[name] = tool;
    }
    static getTools() {
        return Object.entries(AdminToolRegistry.registeredTools).map(x => {
            return { name: x[0], tool: x[1] };
        });
    }
    static getTool(name) {
        return this.registeredTools[name];
    }
}
ComponentManager.registerItemComponent("bcc.cook:admin_tools" /* ItemId.adminTools */, {
    onUse(event) {
        const player = event.source;
        const form = new ActionFormData()
            .title("Admin Tools")
            .body("Select a tool from the list below.");
        const adminTools = AdminToolRegistry.getTools();
        for (const tool of adminTools) {
            form.button(tool.name);
        }
        form.show(player).then((response) => {
            if (response.selection === undefined)
                return;
            const tool = adminTools[response.selection];
            tool.tool(player);
        });
    }
});
