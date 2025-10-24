# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributers:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# Initialise Scores
# Kill/Summon Entities
# Fill/Clear Blocks
# Stop/Play Music


# Staging Initiation: Next Phase
# function bcc.cook/map_1/staging_initiation/1
# Use for any looping actions such as assigning random hard-coded spot to each player from lobby


# Update Location Tags
tag @a [tag=bcc.cook:map_1.lobby] add bcc.cook:map_1.playing
tag @a [tag=bcc.cook:map_1.lobby] remove bcc.cook:map_1.lobby


# Teleport Players to Map
tp @a[tag=bcc.cook:map_1.playing] 200 0 200 facing 200 0 198


# Chat Messages
tellraw @a [tag=bcc.cook:map_1.playing] {"rawtext":[{"text":"§6[ §e! §6] §9Need help? join our discord\n§bbedrockcommands.org/join"}]}


# MAP1 Game is in Progress = True
scoreboard players set .Map1.Started bcc.cook:var 1