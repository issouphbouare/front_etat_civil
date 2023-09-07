import { Division } from "./division";

export class Coordination {
    id: number;
    nom: string;
    divisions: Division[]; // Suppose que vous avez également une classe Image définie

    constructor(id: number,  nom: string, divisions: Division[]) {
        this.id = id;
        this.nom = nom;
        this.divisions = divisions;
        
    }
}
