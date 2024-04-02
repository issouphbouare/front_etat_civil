import { Adresse } from "./adresse";
import { Citoyen } from "./citoyen";

export class Vqf {
    id: number;
    code: string;
    nom: string;

    constructor(id: number,  code: string, nom: string) {
        this.id = id;
        this.code = code;
        this.nom = nom;
        
    }
}
