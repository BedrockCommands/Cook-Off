// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit
export default class Vector {
    x;
    y;
    z;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    clone() {
        return new Vector(this.x, this.y, this.z);
    }
    above() {
        return this.add(Vector.up);
    }
    below() {
        return this.add(Vector.down);
    }
    getCenter() {
        let centered = this.clone();
        centered.x = Math.floor(centered.x) + 0.5;
        centered.y = Math.floor(centered.y) + 0.5;
        centered.z = Math.floor(centered.z) + 0.5;
        return centered;
    }
    /**
     *
     * @param oV Other vector to add
     */
    add(oV) {
        return new Vector(this.x + oV.x, this.y + oV.y, this.z + oV.z);
    }
    distanceTo(oV) {
        return Math.sqrt((this.x - oV.x) ** 2 +
            (this.y - oV.y) ** 2 +
            (this.z - oV.z) ** 2);
    }
    /**
     *
     * @param oV Other vector to subtract
     */
    subtract(oV) {
        return new Vector(this.x - oV.x, this.y - oV.y, this.z - oV.z);
    }
    toString() {
        return `${this.x} ${this.y} ${this.z}`;
    }
    static from(v3) {
        return new Vector(v3.x, v3.y, v3.z);
    }
    static up = new Vector(0, 1, 0);
    static down = new Vector(0, -1, 0);
    static zero = new Vector(0, 0, 0);
}
