import { ComponentManager } from "../componentManager";
const RelativePositionStateName = "bcc.cook:relative_position";
var RelativePostion;
(function (RelativePostion) {
    RelativePostion["Top"] = "top";
    RelativePostion["Bottom"] = "bottom";
})(RelativePostion || (RelativePostion = {}));
ComponentManager.registerBlockComponent("bcc.cook:fridge" /* BlockId.fridge */, {
    beforeOnPlayerPlace: (event) => {
        const block = event.block;
        const otherBlock = getOtherFridgeBlock(block);
        if (otherBlock === undefined)
            return;
        if (!otherBlock.isAir && !otherBlock.isLiquid)
            event.cancel = true;
    },
    onPlace: (event) => {
        const block = event.block;
        const relativePosition = getRelativePosition(block.permutation);
        const otherBlock = getOtherFridgeBlock(block, relativePosition);
        if (otherBlock === undefined)
            return;
        const otherRelativePositon = getOtherRelativePosition(relativePosition);
        otherBlock.setPermutation(block.permutation.withState(RelativePositionStateName, otherRelativePositon));
    },
    onPlayerBreak: (event) => {
        const block = event.block;
        const permutation = event.brokenBlockPermutation;
        const relativePosition = getRelativePosition(permutation);
        const otherBlock = getOtherFridgeBlock(block, relativePosition);
        if (otherBlock === undefined)
            return;
        otherBlock.setType("minecraft:air");
    }
});
function getOtherFridgeBlock(fridgeBlock, relativePosition) {
    if (relativePosition === undefined)
        relativePosition = getRelativePosition(fridgeBlock.permutation);
    const otherBlock = relativePosition === RelativePostion.Top ? fridgeBlock.below() : fridgeBlock.above();
    return otherBlock;
}
function getRelativePosition(fridgeBlockPermutation) {
    return fridgeBlockPermutation.getState(RelativePositionStateName);
}
function getOtherRelativePosition(relativePosition) {
    if (relativePosition === RelativePostion.Top)
        return RelativePostion.Bottom;
    return RelativePostion.Top;
}
