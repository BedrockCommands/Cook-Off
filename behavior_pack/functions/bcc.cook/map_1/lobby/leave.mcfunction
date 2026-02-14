# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributors:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




## Update Location Tag
tag @s remove bcc.cook:map_1.lobby

## Get Map1 Lobby Player Count
scoreboard players set .Map1.PlayerCount bcc.cook:var 0
execute as @a [tag=bcc.cook:map_1.lobby] run scoreboard players add .Map1.PlayerCount bcc.cook:var 1

## Teleport Back to Hub
tp @s 0 0 0 facing 0 0 2

## Inform the Player via Chat Message
tellraw @s {"rawtext":[{"text":"§l§a§o- §r§7§oyou have been teleported back to hub."}]}

## Play Teleportation SFX
execute as @s at @s run playsound beacon.deactivate @s ~~~ 10000