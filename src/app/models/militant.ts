export class Militant {
    id: number;
    telephone: number;
    matricule: string;
    prenom: string;
    nom: string;
    poste: string;
    section: string;
    comite: string;
    subdivision: string; 
    division: string;
    motDePasse: string;
    genre: string;


    constructor(id: number,
        telephone: number,
        matricule: string,
        prenom: string,
        nom: string,
        poste: string,
        section: string,
        comite: string,
        subdivision: string,
        division: string, 
        motDePasse: string,
        genre: string,
        ) {
        this.id = id;
        this.telephone = telephone;
        this.matricule = matricule;
        this.prenom = prenom;
        this.nom=nom;
        this.poste = poste;
        this.section=section;
        this.comite = comite;
        this.subdivision=subdivision;
        this.division = division;
        this.motDePasse = motDePasse;
        this.genre = genre;
        
    }
}

