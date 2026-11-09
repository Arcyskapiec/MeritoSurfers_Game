export class ObstacleData {
    // WSZYSTKIE RODZAJE PRZESZKÓD
    static obstacle_types = [
        new ObstacleData("obs1", "low", 1, 0.1, true),
        new ObstacleData("obs2", "low", 1, 0.1, true),
        new ObstacleData("obs3", "low", 1, 0.1, true),
        new ObstacleData("obs4", "low", 1, 0.1, true),
        new ObstacleData("obs5", "low", 1, 0.1, true)
    ];
    level; // gdzie postać oberwie efektem przeszkody. low - można nad tym przeskoczyć, high - można się pod tym prześlizgnąć, full - nie ma bata
    width; // ile linii zajmuje
    length; // jak "długie" jest
    name;
    solid;
    //private img;
    constructor(name, level, width, length, solid) {
        this.width = width;
        this.length = length;
        this.name = name;
        this.solid = solid;
        this.level = level;
    }
    static findByName(name) {
        return ObstacleData.obstacle_types.find((obstacle_type) => (obstacle_type.name === name));
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
