// SPDX-License-Identifier: MIT
// Copyright (c) @jeanmajid & Contributors
// Contributors: @jeanmajid
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { ComponentManager } from "./componentManager";

import "./blocks/fryingPan.js";
import "./blocks/storageCrate.js";
import "./blocks/trashBin.js";
import "./blocks/stove.js";
import "./blocks/oven.js";
import "./blocks/cutting_board.js";
import "./blocks/sink.js";

import "./items/cancelGame.js";
import "./items/exitLobby.js";
import "./items/mapSelector.js";
import "./items/statsViewer.js";

import "./items/adminTools.js";
import "./items/adminTools/getBlockData.js";
import "./items/adminTools/getItemBlockData.js";

ComponentManager.finalize();
