import { Image } from "./Image";
export class Actualite {
    id: number;
    date: Date;
    titre: string;
    contenu: string;
    images: Image[]; // Suppose que vous avez également une classe Image définie

    constructor(id: number, date: Date, titre: string, contenu: string, images: Image[]) {
        this.id = id;
        this.date = date;
        this.titre = titre;
        this.contenu = contenu;
        this.images = images;
    }
}
