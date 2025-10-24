# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributers:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# Standard
clear @s [tag=!bcc.cook:admin]
gamemode a @s [tag=!bcc.cook:admin]
tp @s [tag=!bcc.cook:admin] 0 0 0 facing 0 0 2
effect @s weakness infinite 255 true


# Initialise Scores
scoreboard players add @s bcc.cook:games_played 0
scoreboard players add @s bcc.cook:map_1.games_played 0

scoreboard players add @s bcc.cook:time_played 0
scoreboard players add @s bcc.cook:map_1.time_played 0

scoreboard players add @s bcc.cook:wins 0
scoreboard players add @s bcc.cook:map_1.wins 0

scoreboard players add @s bcc.cook:points 0

scoreboard players add @s bcc.cook:skill 0
scoreboard players add @s bcc.cook:skill.list 0


# Reset Tags
tag @s remove bcc.cook:map_1.lobby
tag @s remove bcc.cook:map_1.playing
