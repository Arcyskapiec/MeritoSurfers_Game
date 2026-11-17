import { Player } from "./player.js";
export class ObstacleData {
    // WSZYSTKIE RODZAJE PRZESZKÓD
    static obstacle_types = [
        new ObstacleData("obs1", "low", 1, 0.1, true, "death"),
        new ObstacleData("obs2", "low", 1, 0.1, true, "death"),
        new ObstacleData("obs3", "low", 1, 0.1, true, "death"),
        new ObstacleData("obs4", "low", 1, 0.1, true, "death"),
        new ObstacleData("obs5", "low", 1, 0.1, true, "death")
    ];
    level; // gdzie postać oberwie efektem przeszkody. low - można nad tym przeskoczyć, high - można się pod tym prześlizgnąć, full - nie ma bata
    width; // ile linii zajmuje
    length; // jak "długie" jest
    name;
    solid;
    effect;
    //private img;
    constructor(name, level, width, length, solid, effect) {
        this.width = width;
        this.length = length;
        this.name = name;
        this.solid = solid;
        this.level = level;
        this.effect = effect;
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
    getLevel() {
        return this.level;
    }
    activateEffect() {
        switch (this.effect) {
            case "death":
                Player.death();
                break;
            case "slow":
                //DO ZROBIENIA
                break;
            default:
                break;
        }
    }
}
