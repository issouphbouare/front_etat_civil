import { Cercle } from "./cercle";

export class Region {
    id: number;
    code: string;
    nom: string;
    autre: string;
    cercles: Cercle[]; // Suppose que vous avez également une classe Image définie

    constructor(id: number,  code: string, nom: string, autre: string, cercles: Cercle[]) {
        this.id = id;
        this.code = code;
        this.nom = nom;
        this.autre = autre;
        this.cercles = cercles;
        
    }
}
