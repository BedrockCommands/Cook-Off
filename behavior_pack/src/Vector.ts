// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { Vector3 } from "@minecraft/server";

export default class Vector implements Vector3 {
    constructor(public x: number, public y: number, public z: number) { }

    above() {
        return this.add(Vector.up);
    }

    below() {
        return this.add(Vector.down);
    }

    /**
     * 
     * @param oV Other vector to add
     */
    add(oV: Vector): Vector {
        return new Vector(this.x + oV.x, this.y + oV.y, this.z + oV.z);
    }

    /**
     * 
     * @param oV Other vector to subtract
     */
    subtract(oV: Vector): Vector {
        return new Vector(this.x - oV.x, this.y - oV.y, this.z - oV.z);
    }
    
    toString() {
        return `${this.x} ${this.y} ${this.z}`;
    }

    static from(v3: Vector3) {
        return new Vector(v3.x, v3.y, v3.z);
    }

    static up = new Vector(0, 1, 0);
    static down = new Vector(0, -1, 0);
}