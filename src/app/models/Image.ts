import { Actualite } from "./actualite";

export class Image {
    id: number;
    name: string;
    type: string;
    image: string; // Supposons que vous stockez l'image en tant que chaîne Base64

    actualite: Actualite; // Suppose qu'Actualite est une autre classe définie

    constructor(id: number, name: string, type: string, image: string, actualite: Actualite) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.image = image;
        this.actualite = actualite;
    }
}

