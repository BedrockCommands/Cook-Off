# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributors:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# Reset Statistics for All Tracked Players
scoreboard players reset * bcc.cook:games_played
scoreboard players reset * bcc.cook:map_1.games_played

scoreboard players reset * bcc.cook:time_played
scoreboard players reset * bcc.cook:map_1.time_played

scoreboard players reset * bcc.cook:wins
scoreboard players reset * bcc.cook:map_1.wins

scoreboard players reset * bcc.cook:points

scoreboard players reset * bcc.cook:skill
scoreboard players reset * bcc.cook:skill.list


# Initialise Score for Online Players
scoreboard players add @a bcc.cook:games_played 0
scoreboard players add @a bcc.cook:map_1.games_played 0

scoreboard players add @a bcc.cook:time_played 0
scoreboard players add @a bcc.cook:map_1.time_played 0

scoreboard players add @a bcc.cook:wins 0
scoreboard players add @a bcc.cook:map_1.wins 0

scoreboard players add @a bcc.cook:points 0

scoreboard players add @a bcc.cook:skill 0
scoreboard players add @a bcc.cook:skill.list 0


# World Timer & Synchronized Events
scoreboard players reset * bcc.cook:events
scoreboard players reset * bcc.cook:ticks


# Math
scoreboard players reset * bcc.cook:var


# Define Values
scoreboard players set .20t bcc.cook:ticks 20
scoreboard players set .10s bcc.cook:ticks 200
scoreboard players set .250s bcc.cook:ticks 5000
