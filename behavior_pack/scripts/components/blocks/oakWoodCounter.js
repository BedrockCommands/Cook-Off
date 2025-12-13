import { world } from "@minecraft/server";
import { Vector } from "../../utils/vector";
import { ComponentManager } from "../componentManager";
import { setBlockState } from "../../utils/general";
const axisOffsetMap = {
    "north": new Vector(-1, 0, 0),
    "south": new Vector(1, 0, 0),
    "east": new Vector(0, 0, 1),
    "west": new Vector(0, 0, -1)
};
const RelativePositionStateName = "bcc.cook:relative_position";
var FacingDirection;
(function (FacingDirection) {
    FacingDirection["North"] = "north";
    FacingDirection["South"] = "south";
    FacingDirection["East"] = "east";
    FacingDirection["West"] = "west";
})(FacingDirection || (FacingDirection = {}));
ComponentManager.registerBlockComponent("bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */, {
    onPlace: (event) => {
        const block = event.block;
        updateDisplay(block);
    },
    onPlayerBreak: (event) => {
        const block = event.block;
        const blockLocation = Vector.from(block.location);
        const blockPermutation = event.brokenBlockPermutation;
        const dimension = event.dimension;
        const facingDirection = blockPermutation.getState("minecraft:cardinal_direction");
        console.warn(facingDirection);
        const axisOffset = axisOffsetMap[facingDirection];
        updateNeighbors(dimension, blockLocation, axisOffset, 0);
    }
});
function updateDisplay(block) {
    const facingDirection = block.permutation.getState("minecraft:cardinal_direction");
    const axisOffset = axisOffsetMap[facingDirection];
    const dimension = block.dimension;
    const blockLocation = Vector.from(block.location);
    if (block.typeId === "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */)
        setRelativePosition(block, axisOffset);
    updateNeighbors(dimension, blockLocation, axisOffset, 0);
}
function updateNeighbors(dimension, blockLocation, axisOffset, direction) {
    if (direction === 0) {
        const leftBlockLocation = blockLocation.subtract(axisOffset);
        const leftBlock = dimension.getBlock(leftBlockLocation);
        const rightBlockLocation = blockLocation.add(axisOffset);
        const rightBlock = dimension.getBlock(rightBlockLocation);
        if (leftBlock && leftBlock.typeId === "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */) {
            setRelativePosition(leftBlock, axisOffset);
            updateNeighbors(dimension, leftBlockLocation, axisOffset, -1);
        }
        if (rightBlock && rightBlock.typeId === "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */) {
            setRelativePosition(rightBlock, axisOffset);
            updateNeighbors(dimension, rightBlockLocation, axisOffset, 1);
        }
    }
    if (direction === -1) {
        const leftBlockLocation = blockLocation.subtract(axisOffset);
        const leftBlock = dimension.getBlock(leftBlockLocation);
        if (leftBlock && leftBlock.typeId === "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */) {
            setRelativePosition(leftBlock, axisOffset);
            updateNeighbors(dimension, leftBlockLocation, axisOffset, -1);
        }
    }
    if (direction == 1) {
        const rightBlockLocation = blockLocation.add(axisOffset);
        const rightBlock = dimension.getBlock(rightBlockLocation);
        if (rightBlock && rightBlock.typeId === "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */) {
            setRelativePosition(rightBlock, axisOffset);
            updateNeighbors(dimension, rightBlockLocation, axisOffset, 1);
        }
    }
}
function setRelativePosition(block, axisOffset) {
    const blockLocation = Vector.from(block.location);
    const dimension = block.dimension;
    const leftBlock = dimension.getBlock(blockLocation.subtract(axisOffset));
    const rightBlock = dimension.getBlock(blockLocation.add(axisOffset));
    if (leftBlock === undefined || rightBlock === undefined)
        return;
    if (leftBlock.typeId === "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */ && rightBlock.typeId !== "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */)
        setBlockState(block, RelativePositionStateName, "right");
    else if (leftBlock.typeId === "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */ && rightBlock.typeId === "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */)
        setBlockState(block, RelativePositionStateName, "middle");
    else if (leftBlock.typeId !== "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */ && rightBlock.typeId === "bcc.cook:oak_wood_counter" /* BlockId.oakWoodCounter */)
        setBlockState(block, RelativePositionStateName, "left");
    else
        setBlockState(block, RelativePositionStateName, "middle"); // No neighboring oak wood counters to connect with.
    world.sendMessage("left:" + leftBlock.typeId);
    world.sendMessage("right:" + rightBlock.typeId);
}
