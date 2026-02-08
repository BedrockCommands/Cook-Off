# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributors:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




# Increment Score Every Second
scoreboard players add .Map1.CountDown bcc.cook:var 1


# Countdown 10..4
execute if score .Map1.CountDown bcc.cook:var matches 1 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in ■■■■■■■■■■ §f10§r   \n "}]}
execute if score .Map1.CountDown bcc.cook:var matches 2 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in ■■■■■■■■■§7■ §f9§r   \n "}]}
execute if score .Map1.CountDown bcc.cook:var matches 3 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in ■■■■■■■■§7■■ §f8§r   \n "}]}
execute if score .Map1.CountDown bcc.cook:var matches 4 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in ■■■■■■■§7■■■ §f7§r   \n "}]}
execute if score .Map1.CountDown bcc.cook:var matches 5 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in ■■■■■■§7■■■■ §f6§r   \n "}]}
execute if score .Map1.CountDown bcc.cook:var matches 6 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in ■■■■■§7■■■■■ §f5§r   \n "}]}
execute if score .Map1.CountDown bcc.cook:var matches 7 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in ■■■■§7■■■■■■ §f4§r   \n "}]}

## 3
execute if score .Map1.CountDown bcc.cook:var matches 8..11 as @a [tag=bcc.cook:map_1.playing] at @s run playsound note.pling @s ~~~ 10000
execute if score .Map1.CountDown bcc.cook:var matches 8 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in §c■■■§7■■■■■■■ §c3§r   \n "}]}
execute if score .Map1.CountDown bcc.cook:var matches 8 run title @a [tag=bcc.cook:map_1.playing] title §c§l■ ■ ■

## 2
execute if score .Map1.CountDown bcc.cook:var matches 9 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in §c■■§7■■■■■■■■ §c2§r   \n "}]}
execute if score .Map1.CountDown bcc.cook:var matches 9 run title @a [tag=bcc.cook:map_1.playing] title §6§l■ ■  


## 1
execute if score .Map1.CountDown bcc.cook:var matches 10 run titleraw @a [tag=bcc.cook:map_1.playing] actionbar {"rawtext":[{"text":" \n   §☆§e§lGame Starts in §c■§7■■■■■■■■■ §c1§r   \n "}]}
execute if score .Map1.CountDown bcc.cook:var matches 10 run title @a [tag=bcc.cook:map_1.playing] title §e§l■    


## Go!
execute if score .Map1.CountDown bcc.cook:var matches 11 run title @a [tag=bcc.cook:map_1.playing] title §a§lGO!
execute if score .Map1.CountDown bcc.cook:var matches 11 run scoreboard players set .Map1.Started bcc.cook:var 2
#execute if score .Map1.CountDown bcc.cook:var matches 11 run replaceitem entity @a [tag=bcc.cook:map_1.playing] slot.hotbar 8 bcc.cook:vote_cancel 1 0 {"minecraft:item_lock":{"mode":"lock_in_slot"}}