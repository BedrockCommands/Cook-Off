# SPDX-License-Identifier: MIT
# Copyright (c) @zheaEvyline & Contributors
# Contributers:
# See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

### Item Crate Mechanic ###

### Making the armor stand invisible and also not showing what they are holding, also a visual particle to show where the player should click ###
playanimation @e[tag="bcc.cook:InvisNoHand"] animation.creeper.swelling i 180
effect @e[tag="bcc.cook:InvisNoHand"] invisibility 1 1 true
execute if entity @e[tag="bcc.cook:InvisNoHand"] run scoreboard players add time bcc.cook:InvisNoHandParticle 1
execute if score time bcc.cook:InvisNoHandParticle matches 10.. run execute as @e[tag="bcc.cook:InvisNoHand"] at @s run particle minecraft:endrod ~~1.5~
execute if score time bcc.cook:InvisNoHandParticle matches 10.. run scoreboard players set time bcc.cook:InvisNoHandParticle 0

### The way to summon an item crate armor stand above the crates. ###
### Use an endermite spawn egg with the name ItemCrate and place it above the crates location which right now is oak planks ###
execute as @e[type=endermite,name=ItemCrate] at @s run structure load ItemCrate ~~~
execute as @e[type=endermite,name=ItemCrate] at @s run kill @s

### Here's where you add the items for each crate. you simply name the armor stand with one of the names on the list below and it'll put the item in the armor -
### stand's hand for the players to click on and get the item. ###
execute as @e[tag="bcc.cook:InvisNoHand",name=BurgerBuns] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=BurgerBuns] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=Lettuce] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=Lettuce] at @s run replaceitem entity @s slot.weapon.mainhand 0 wheat 1
execute as @e[tag="bcc.cook:InvisNoHand",name=Vinegar] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=Vinegar] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=TapiocaPearls] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=TapiocaPearls] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=Celery] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=Celery] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=CheeseSlice] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=CheeseSlice] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=Garlic] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=Garlic] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=RawChicken] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=RawChicken] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=DriedNoodle] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=DriedNoodle] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=Carrot] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=Carrot] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=RawBeef] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=RawBeef] at @s run replaceitem entity @s slot.weapon.mainhand 0 beef 1
execute as @e[tag="bcc.cook:InvisNoHand",name=SoySauce] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=SoySauce] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=Rice] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=Rice] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand",name=RawMeatballs] at @s if block ~~-1~ oak_planks run tp @s ~~-1~
execute as @e[tag="bcc.cook:InvisNoHand",name=RawMeatballs] at @s run replaceitem entity @s slot.weapon.mainhand 0 bread 1
execute as @e[tag="bcc.cook:InvisNoHand"] at @s run tp @s ~~~

### LIST OF ITEMS ###
# BurgerBuns - Bread
# Lettuce - Wheat
# Vinegar - Apple
# TapiocaPearls - Sugar
# Celery - Sugar Cane
# CheeseSlice - Milk Bucket
# Garlic - Wheat
# RawChicken - Chicken
# DriedNoodle - Wheat
# Carrot - Carrot
# RawBeef - Beef
# SoySauce - Wheat
# Rice - Wheat
# RawMeatballs - Beef
########################