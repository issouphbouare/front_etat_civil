import { Document } from "./document";
export class FileDB {
    id: string;
    name: string;
    type: string;
    data: string; // Supposons que vous stockez l'image en tant que chaîne Base64
    document: Document; // Suppose qu'Actualite est une autre classe définie

    constructor(id: string, name: string, type: string, data: string, document: Document) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.data = data;
        this.document = document;
    }
}
