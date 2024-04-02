import { Commune } from "./commune";

export class Cercle {
    id: number;
    code: string;
    nom: string;
    autre: string;
    communes: Commune[]; // Suppose que vous avez également une classe Image définie

    constructor(id: number,  code: string, nom: string, autre: string, communes: Commune[]) {
        this.id = id;
        this.code = code;
        this.nom = nom;
        this.autre = autre;
        this.communes = communes;
        
    }
}
