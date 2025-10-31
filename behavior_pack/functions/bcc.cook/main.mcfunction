# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributers:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# On Player Join
scoreboard players add @a bcc.cook:joined 0
execute as @a[scores={bcc.cook:joined=0}] run function bcc.cook/hub/on_join
scoreboard players reset * bcc.cook:joined
scoreboard players set @a bcc.cook:joined 1


# Display Actionbar for Each Map
execute if entity @a [tag=bcc.cook:map_1.lobby] run function bcc.cook/map_1/lobby/display_actionbar


# World Timer & Synchronized Events
scoreboard players add .Timer bcc.cook:ticks 1
scoreboard players operation * bcc.cook:events = .Timer bcc.cook:ticks

## Run Maps
scoreboard players operation .1s bcc.cook:events %= .20t bcc.cook:ticks
execute if score .Map1.Started bcc.cook:var matches 1..2 run function bcc.cook/map_1/on
#execute if score .Map2.Started bcc.cook:var matches 1..2 run function bcc.cook/map_2/on

## Refresh Scoreboard List
scoreboard players operation .RefreshScoreboardList bcc.cook:events %= .10s bcc.cook:ticks
execute if score .RefreshScoreboardList bcc.cook:events matches 0 run function bcc.cook/scoreboard/objectives/refresh_list

## Hub Music
scoreboard players operation .ReplayHubMusic bcc.cook:events %= .250s bcc.cook:ticks
execute if score .ReplayHubMusic bcc.cook:events matches 0 run function bcc.cook/hub/replay_music