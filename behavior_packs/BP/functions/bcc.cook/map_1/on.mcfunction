# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributers:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# Staging Initiation: CountDown1 --> CountDown2
execute if score .1s bcc.cook:events matches 0 if score .Map1.Started bcc.cook:var matches 1 run function bcc.cook/map_1/staging_initiation/1
execute if score .1s bcc.cook:events matches 0 if score .Map1.Started bcc.cook:var matches 2 run scoreboard players add .Map1.CountDown2 bcc.cook:var 1


# Display Actionbar
execute if score .Map1.Started bcc.cook:var matches 2 run titleraw @a[tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n    "},{"score":{"name":".Map1.CountDown2","objective":"bcc.cook:var"}},{"text":"   \n "}]}


# Confine Spectating Area to MAP1 Premises
#execute as @a[tag=bcc.cook:map_1.playing,m=!a] run function bcc.cook/map_1/spectating


# End MAP1 Game if No Players Inside (In Case Host Logs Out)
execute unless entity @a[tag=bcc.cook:map_1.playing] run function bcc.cook/map_1/end_game/0


# End MAP1 Game When Time is Over
execute if score .Map1.CountDown2 bcc.cook:var matches 10.. run function bcc.cook/map_1/end_game/1