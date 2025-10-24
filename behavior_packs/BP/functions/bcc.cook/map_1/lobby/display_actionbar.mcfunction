# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributers:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# Get Player Count
scoreboard players set .Map1.PlayerCount bcc.cook:var 0
execute as @a [tag=bcc.cook:map_1.lobby] run scoreboard players add .Map1.PlayerCount bcc.cook:var 1


# Display Actionbar

## Enough Players - Green Color
execute if score .Map1.PlayerCount bcc.cook:var matches 1..4 run titleraw @a [tag=bcc.cook:map_1.lobby] actionbar {"rawtext":[{"text":" \n    §a"},{"score":{"name":".Map1.PlayerCount","objective":"bcc.cook:var"}},{"text":"§f/4   \n\n    "},{"score":{"name":"*","objective":"bcc.cook:map_1.wins"}},{"text":"/"},{"score":{"name":"*","objective":"bcc.cook:map_1.games_played"}},{"text":"   "},{"score":{"name":"*","objective":"bcc.cook:map_1.time_played"}},{"text":"   \n "}]}

## Too Many Players - Red Color
execute if score .Map1.PlayerCount bcc.cook:var matches 5.. run titleraw @a [tag=bcc.cook:map_1.lobby] actionbar {"rawtext":[{"text":" \n    §c"},{"score":{"name":".Map1.PlayerCount","objective":"bcc.cook:var"}},{"text":"§f/4   \n\n    "},{"score":{"name":"*","objective":"bcc.cook:map_1.wins"}},{"text":"/"},{"score":{"name":"*","objective":"bcc.cook:map_1.games_played"}},{"text":"   "},{"score":{"name":"*","objective":"bcc.cook:map_1.time_played"}},{"text":"   \n "}]}