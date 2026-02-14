# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributors:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit




scoreboard players add @s statDisplay 1
scoreboard players set @s [scores={statDisplay=4..}] statDisplay 1
titleraw @s [scores={statDisplay=1}] actionbar {"rawtext":[{"text":" \n    "},{"score":{"name":"*","objective":"wins"}},{"text":"   "},{"score":{"name":"*","objective":"gamesPlayed"}},{"text":"   "},{"score":{"name":"*","objective":"cardsPlayed"}},{"text":"   \n\n   §g "},{"score":{"name":"*","objective":"points"}},{"text":"   §a "},{"score":{"name":"*","objective":"h"}},{"text":"h "},{"score":{"name":"*","objective":"m"}},{"text":"m   \n "}]}
titleraw @s [scores={statDisplay=2}] actionbar {"rawtext":[{"text":" \n    §e§lWins§r §f"},{"score":{"name":"*","objective":"wins"}},{"text":"   \n\n    §l§bGames Played§r §f"},{"score":{"name":"*","objective":"gamesPlayed"}},{"text":"   \n\n    §l§fCards Played§r §f"},{"score":{"name":"*","objective":"cardsPlayed"}},{"text":"   \n\n    §l§gPoints§r §f"},{"score":{"name":"*","objective":"points"}},{"text":"   \n\n    §l§3Time Played§r §a"},{"score":{"name":"*","objective":"h"}},{"text":"h "},{"score":{"name":"*","objective":"m"}},{"text":"m   \n "}]}
titleraw @s [scores={statDisplay=3}] actionbar {"rawtext":[{"text":" "}]}
