export class ObstacleData{
    // WSZYSTKIE RODZAJE PRZESZKÓD
    public static obstacle_types: ObstacleData[] = [
        new ObstacleData("obs1", "low", 1, 0.1, true),
        new ObstacleData("obs2", "low", 1, 0.1, true),
        new ObstacleData("obs3", "low", 1, 0.1, true),
        new ObstacleData("obs4", "low", 1, 0.1, true),
        new ObstacleData("obs5", "low", 1, 0.1, true)
    ];

    private level: string; // gdzie postać oberwie efektem przeszkody. low - można nad tym przeskoczyć, high - można się pod tym prześlizgnąć, full - nie ma bata
    private width: number; // ile linii zajmuje
    private length: number; // jak "długie" jest
    private name: string;
    private solid: boolean;
   
    //private img;

    constructor(name: string, level: string, width: number, length: number, solid: boolean){
        this.width = width;
        this.length = length;
        this.name = name;
        this.solid = solid;
        this.level = level;
    }

    public static findByName(name: string): ObstacleData{
        return ObstacleData.obstacle_types.find((obstacle_type) => (obstacle_type.name === name)) as ObstacleData
    }

    public getLength(): number{
        return this.length
    }

    public isSolid(): boolean{
        return this.solid
    }

    public static getRandomObstacleType(): ObstacleData{
        let i: number = Math.floor(Math.random() * ObstacleData.obstacle_types.length)
        return ObstacleData.obstacle_types[i]
    }
}