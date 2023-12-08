interface Administrateur {
    nom : string,
    email : string ,
    ip : string ,
    dt_connexion : Date ,
    login : string,
    password : string
}


interface UtilisateurAnonyme{
    nom ?:string,
    ip : string
}
   

type UtilisateurAnonymeTypeIp = Pick<Administrateur,"ip">;
type UtilisateurAnonymeTypeNom =  Partial<Pick<Administrateur,"nom">>;

type UtilisateurAnonymeComplete = UtilisateurAnonymeTypeIp & UtilisateurAnonymeTypeNom;

const utilisateurAnonyme : UtilisateurAnonymeComplete = {
    nom : "toto",
    ip : "0.0.0.0"
}

console.log(utilisateurAnonyme);



