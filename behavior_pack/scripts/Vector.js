export default class Vector {
    x;
    y;
    z;
    constructor(_x, _y, _z) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }
    above() {
        return this.add(Vector.up);
    }
    below() {
        return this.add(Vector.down);
    }
    add(oV) {
        return new Vector(this.x + oV.x, this.y + oV.y, this.z + oV.z);
    }
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
}
