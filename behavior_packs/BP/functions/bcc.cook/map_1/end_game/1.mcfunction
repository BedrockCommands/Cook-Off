# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributers:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# Send Players Back to Lobby 
tp @a [tag=bcc.cook:map_1.playing] 100 0 100 facing 102 0 100
clear @a [tag=bcc.cook:map_1.playing]
gamemode a @a [tag=bcc.cook:map_1.playing,m=!a]
effect @a [tag=bcc.cook:map_1.playing] weakness infinite 255 true


# MAP1 Game is in Progres = False
scoreboard players set .Map1.Started bcc.cook:var 0


# Update Player Location Tags
tag @a [tag=bcc.cook:map_1.playing] add bcc.cook:map_1.lobby
tag @a [tag=bcc.cook:map_1.playing] remove bcc.cook:map_1.playing


# Reset Scores
scoreboard players set .Map1.CountDown bcc.cook:var 0
scoreboard players set .Map1.CountDown2 bcc.cook:var 0