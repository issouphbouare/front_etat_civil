import { Avancement } from "./avancement";
export class FileDB {
    id: string;
    name: string;
    type: string;
    data: string; // Supposons que vous stockez l'image en tant que chaîne Base64
    avancement: Avancement; // Suppose qu'Actualite est une autre classe définie

    constructor(id: string, name: string, type: string, data: string, avancement: Avancement) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.data = data;
        this.avancement = avancement;
    }
}
