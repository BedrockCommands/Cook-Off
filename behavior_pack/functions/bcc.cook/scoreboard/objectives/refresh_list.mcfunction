# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributors:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# Calculate Skill (Points/GamesPlayed)
execute as @a run scoreboard players operation @s bcc.cook:skill = @s bcc.cook:points
execute as @a run scoreboard players operation @s bcc.cook:skill /= @s bcc.cook:games_played


# Refresh Scoreboard List
scoreboard players reset * bcc.cook:skill.list
execute as @a run scoreboard players operation @s bcc.cook:skill.list = @s bcc.cook:skill