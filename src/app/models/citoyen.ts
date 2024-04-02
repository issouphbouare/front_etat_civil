import { Adresse } from "./adresse";
import { Vqf } from "./vqf";

export class Citoyen {
    id: number;
    niciv: string;
    nom: string;
    prenom: string;
    telephone: number;
    genre: string;
    profession: string;
    situationMatrimoniale: string;
    dateNaissance: Date;
    portrait: string; 

    prenomPere: string;
    professionPere: string;

    prenomMere: string;
    nomMere: string;
    professionMere: string;
    
    lieuNaissance: Vqf;
    adresse : Vqf
    rue: string;
    porte: string;
    autre: string;



    constructor(
    id: number,
    niciv: string,
    nom: string,
    prenom: string,
    telephone: number,
    genre: string,
    profession: string,
    situationMatrimoniale: string,
    dateNaissance: Date,
    portrait: string,

    prenomPere: string,
    professionPere: string,

    prenomMere: string,
    nomMere: string,
    professionMere: string,
    
    lieuNaissance: Vqf,
    adresse : Vqf,
    rue: string,
    porte: string,
    autre: string,


        ) {
        this.id = id;
        this.niciv = niciv;
        this.prenom = prenom;
        this.nom=nom;
        this.telephone = telephone;
        this.genre=genre;
        this.profession = profession;
        this.situationMatrimoniale=situationMatrimoniale;
        this.dateNaissance = dateNaissance;
        this.portrait = portrait;

        this.prenomPere = prenomPere;
        this.professionPere = professionPere;

        this.prenomMere = prenomMere;
        this.nomMere = nomMere;
        this.professionMere = professionMere;
        

        this.lieuNaissance = lieuNaissance;
        this.adresse = adresse;
        this.rue=rue;
        this.porte=porte;
        this.autre=autre;
        
    }
}



