# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributors:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




## Update Location Tag
tag @s add bcc.cook:map_1.lobby

## Get Map1 Lobby Player Count
scoreboard players set .Map1.PlayerCount bcc.cook:var 0
execute as @a [tag=bcc.cook:map_1.lobby] run scoreboard players add .Map1.PlayerCount bcc.cook:var 1

## Inform Other Players via Chat Message
tellraw @a [tag=bcc.cook:map_1.lobby] {"rawtext":[{"text":"§o§a§l- §r§o§7"},{"selector":"@s"},{"text":" has joined the MAP1 lobby ["},{"score":{"name":".Map1.PlayerCount","objective":"bcc.cook:var"}},{"text":"/4]"}]}

## Clear Any Items From Hub
clear @s

## Teleport to Map1 Lobby
tp @s 100 0 100 facing 102 0 100

## Play Teleportation SFX
execute as @s at @s run playsound beacon.power @s ~~~ 10000