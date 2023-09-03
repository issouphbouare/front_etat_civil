
import { FileDB } from "./file-db";
export class Avancement {
    id: number;
    date: Date;
    titre: string;
    type: string;
    description: string;
    fileDbs: FileDB[]; // Suppose que vous avez également une classe Image définie

    constructor(id: number, date: Date, titre: string,type: string, description: string, fileDbs: FileDB[]) {
        this.id = id;
        this.date = date;
        this.titre = titre;
        this.type=type;
        this.description = description;
        this.fileDbs = fileDbs;
        
    }
}


