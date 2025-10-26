# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributers:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# If MAP1 Game is NOT in Progress --> MAP1 Started = False
execute unless entity @a [tag=bcc.cook:map_1.playing] run scoreboard players set .Map1.Started bcc.cook:var 0


# Get MAP1 Lobby Player Count
scoreboard players set .Map1.PlayerCount bcc.cook:var 0
execute as @a [tag=bcc.cook:map_1.lobby] run scoreboard players add .Map1.PlayerCount bcc.cook:var 1


# Error 1: If MAP1 Game is in Progress
execute if score .Map1.Started bcc.cook:var matches 1..2 run tellraw @a [tag=bcc.cook:map_1.lobby] {"rawtext":[{"text":"§l§g- §r§cgame is in progress, please wait for it to end to start a new game, or join a different map lobby."}]}
execute if score .Map1.Started bcc.cook:var matches 1..2 run playsound note.bass @a [tag=bcc.cook:map_1.lobby]


# Error 2: If MAP1 Game is NOT in Progress AND Lobby Player Count > 4
execute if score .Map1.Started bcc.cook:var matches 0 if score .Map1.PlayerCount bcc.cook:var matches 5.. run tellraw @a [tag=bcc.cook:map_1.lobby] {"rawtext":[{"text":"§l§g- §r§cyou cannot start the game with more than 4 players."}]}
execute if score .Map1.Started bcc.cook:var matches 0 if score .Map1.PlayerCount bcc.cook:var matches 5.. run playsound note.bass @a [tag=bcc.cook:map_1.lobby]


# Initiate Game: If MAP1 Game is NOT in Progress AND Lobby Player Count = 1..4
execute if score .Map1.Started bcc.cook:var matches 0 if score .Map1.PlayerCount bcc.cook:var matches 1..4 run function bcc.cook/map_1/staging_initiation/0