import { Coordination } from "./coordination";
import { Militant } from "./militant";

export class Division {
    id: number;
    nom: string;
    coordination: Coordination;
    militants: Militant[]; // Suppose que vous avez également une classe Image définie

    constructor(id: number,  nom: string, coordination: Coordination, militants: Militant[]) {
        this.id = id;
        this.nom = nom;
        this.coordination = coordination;
        this.militants = militants;
        
    }
}
