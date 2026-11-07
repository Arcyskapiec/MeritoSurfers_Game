export class ObstacleData{
    // WSZYSTKIE RODZAJE PRZESZKÓD
    public static obstacle_types: ObstacleData[] = [
        new ObstacleData("obs1", 1, 0.1, true),
        new ObstacleData("obs2", 1, 0.1, true),
        new ObstacleData("obs3", 1, 0.1, true),
        new ObstacleData("obs4", 1, 0.1, true),
        new ObstacleData("obs5", 1, 0.1, true)
    ];

    private width: number; // ile linii zajmuje
    private length: number; // jak "długie" jest
    private name: string;
    private solid: boolean;
    //private img;

    constructor(name: string, width: number, length: number, solid: boolean){
        this.width = width;
        this.length = length;
        this.name = name;
        this.solid = solid;
    }

    public static findByName(name: string): ObstacleData{
        return this.obstacle_types.find((obstacle_type) => (obstacle_type.name === name)) as ObstacleData
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