export class ObstacleData {
    // WSZYSTKIE RODZAJE PRZESZKÓD
    static obstacle_types = [
        new ObstacleData("obs1", 1, 0.1, true),
        new ObstacleData("obs2", 1, 0.1, true),
        new ObstacleData("obs3", 1, 0.1, true),
        new ObstacleData("obs4", 1, 0.1, true),
        new ObstacleData("obs5", 1, 0.1, true)
    ];
    width; // ile linii zajmuje
    length; // jak "długie" jest
    name;
    solid;
    //private img;
    constructor(name, width, length, solid) {
        this.width = width;
        this.length = length;
        this.name = name;
        this.solid = solid;
    }
    static findByName(name) {
        return this.obstacle_types.find((obstacle_type) => (obstacle_type.name === name));
    }
    getLength() {
        return this.length;
    }
    isSolid() {
        return this.solid;
    }
    static getRandomObstacleType() {
        let i = Math.floor(Math.random() * ObstacleData.obstacle_types.length);
        return ObstacleData.obstacle_types[i];
    }
}
