
import { FileDB } from "./file-db";
export class Document {
    id: number;
    date: Date;
    titre: string;
    categorie: string;
    type: string;
    description: string;
    fileDbs: FileDB[]; // Suppose que vous avez également une classe Image définie

    constructor(id: number, date: Date, titre: string, categorie: string, type: string, description: string, fileDbs: FileDB[]) {
        this.id = id;
        this.date = date;
        this.titre = titre;
        this.categorie = categorie;
        this.type=type;
        this.description = description;
        this.fileDbs = fileDbs;
        
    }
}


