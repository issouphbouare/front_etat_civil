import { Vqf } from "./vqf";

export class Commune {
    id: number;
    code: string;
    nom: string;
    autre: string;
    vqfs: Vqf[]; // Suppose que vous avez également une classe Image définie

    constructor(id: number,  code: string, nom: string, autre: string, vqfs: Vqf[]) {
        this.id = id;
        this.code = code;
        this.nom = nom;
        this.autre = autre;
        this.vqfs = vqfs;
        
    }
}
