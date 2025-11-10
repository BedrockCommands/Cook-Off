// SPDX-License-Identifier: MIT
// Copyright (c) @jeanmajid & Contributors
// Contributors: @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
import { ComponentManager } from "../componentManager";
ComponentManager.registerItemComponent("bcc.cook:stats_viewer" /* ItemId.statsViewer */, {
    onUse: ({ source }) => {
        // TODO: call some function
        source.runCommand("say hello from jeanmajid");
    },
});
