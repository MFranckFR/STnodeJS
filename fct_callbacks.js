const { promises } = require("fs");

// Ex1 - Ecrire une fonction qui permet de vérfier si element appartient à tab.
var tab = [1,3,6,8,9];
var elt = 5, elt2 = 9;

fctInclude1 = ((list,elt)=>list.some((e=>e==elt)))

function fctInclude2(list, elt){
   let i = 0, m = false;
   while(i < list.length){
        if (list[i] == elt) {
            m = true;
        };
        i++;
   }
   return m;
}

// callback 
// Une fonction de callback est une fonction qui est transmise comme argument 
// à une autre fonction, puis exécutée lorsque l'autre fonction est terminée.// une fonction de rappel ou « callback » en anglais est une fonction qui va pouvoir être 
// rappelée (« called back ») à un certain moment et / ou si certaines conditions sont réunies. 
// Nous utilisons les callbacks pour nous assurer que le code est exécuté uniquement 
// après la fin d'une opération asynchrone.// Cette fonction lit l'objet Data, ici un tableau et un element de maniere asynchrone// En d'autres termes, le programme n'attends pas la fin de la fonction 
// Et lorsque cette fonction termine sa tache, elle appelle la fonction Callback// Une fonction CallBack prend deux parametres// un parametre err qui reste vide si la fonction a bien ete executee,
// un parametre result qui contient le resultat si la fonction n'a pas detecter d'erreurs
// sinon il contient le contenu du message d'erreur
var data = { tableau: tab, filtre: elt };

function searchElement(data, callback) {
    let i = 0, m = false;
    while(i < data.tableau.length){
         if (data.tableau[i] == data.filtre) {
             m = true;
             return callback(null, {pos:i,elt:data.filtre});
         };
         i++;
    }
    return callback('Element ' + data.filtre + ' non retrouve dans tableau');
};

function callback1(err, result) {
    if (err) {
        console.error("erreur :" + err);
        return false;
    } else {
        console.log(result.elt + " existe a la position " + result.pos); // portée de la variable !
        return true;
    }
}

// test
console.log(`${elt} appartient à ${tab} ? ${tab.includes(elt)?'oui':'non'}`);
console.log(`${elt} appartient à ${tab} ? ${fctInclude1(tab, elt)?'oui':'non'}`);
console.log(`${elt} appartient à ${tab} ? ${fctInclude2(tab, elt)?'oui':'non'}`);
console.log(`${elt} appartient à ${tab} ? ${searchElement({tableau:tab, filtre:elt}, callback1)?'oui':'non'}`);
console.log(`${elt2} appartient à ${tab} ? ${searchElement({tableau:tab, filtre:elt2}, callback1)?'oui':'non'}`);

// Ex2 -
// En utilisant les fonctions callback, ecrire une fonction qui permet de
// determiner le nombre d'occurrence d'une sous-chaıne de caractere ch
// dans une chaıne de caractere str.
// ch = ab
// str = abbbaaaabaaabb
// la fonction retourne 3.
// avec callback
function count_occur(s, ss){
    const m = s.match(new RegExp(ss, 'gi'));
    return m ? m.length : 0;
}

function cb_count_occur(data, cb){
    const n = count_occur(data.s, data.ss);
    if (n == 0) {
        cb(`Il y a 0 occurance de ${data.ss} dans ${data.s}!`);
    }else {
        cb(null, {s:data.s, ss:data.ss, n:n});
    }
}

function callback2(err, result) {
    if (err) {
        console.error(`Erreur: ${err}`);
        return false;
    } else {
        console.log(`Nous avons ${result.n} fois la sous-chaine ${result.s} dans la chaine ${result.ss}`); // portée de la variable !
        return true;
    }
}

// test
chaine = "abbbaaaabaaabb"; souschaine = 'ab';
console.log(`Le mot '${chaine}' contient la sous-chaine '${souschaine}' ${count_occur(chaine, souschaine)} fois.`)
cb_count_occur({s:chaine, ss:souschaine}, callback2);

chaine = "abbbaaaabaaabb"; souschaine = 'caca';
console.log(`Le mot '${chaine}' contient la sous-chaine '${souschaine}' ${count_occur(chaine, souschaine)} fois.`)
cb_count_occur({s:chaine, ss:souschaine}, callback2);


// Occurence dans une liste
count = (list, val) => list.reduce((acc, elt) => (elt === val ? acc + 1 : acc), 0);

// test
tab = [1,3,4,1,4,5,4,4,8,3], elt = 4;
console.log(`Dans la list [${tab}] il apparait '${elt}' x ${count(tab, elt)}`);

// =================== Notes Damien
// Les promesses

// declaration de la promesse puis utilisation
//promesse().then().catch();
// new Promise((resolv, reject) {})


// PROMESSES// un objet JavaScript utilise souvent pour realiser des traitements
// sur un resultat suite a une operation asynchrone
// disposant d'une premiere methode then() permettant de traiter
// le resultat une fois l'operation accomplie
// disposant d'une deuxieme methode catch() qui sera executee
// en cas d'echec de l'operation
// compose de deux parties : declaration et utilisationvar test = true;

// async / await
console.log("=============\nLes PROMESSES\n=============");

var promesse = new Promise((resolve, reject) => {
    if (test)
        resolve();
     else
        reject();
});

promesse.then(() => console.log("test reussi")).catch(() => console.log("erreur")); // ouvar test = true;

var promesse = () => {
    return new Promise((resolve, reject) => {
        if (test)
            resolve();
         else
            reject();

    });
};

promesse().then(() => console.log("test reussi")).catch(() => console.log("erreur")); // Une promesse peut recevoir des parametres et retourner un resultat

var division = (a, b) => {
    return new Promise((resolve, reject) => {
        if (b != 0)
            resolve(a / b);
         else
            reject("erreur : division par zero");

    });
};
// affiche resultat : 5
division(10, 2).then((res) => console.log("resultat : " + res)).catch((error) => console.log(error)); // affiche erreur : division par zero
division(5, 0).then((res) => console.log("resultat : " + res)).catch((error) => console.log(error));
console.log("fin");
// =================== /Notes Damien

// transformation d'une fonction en promesse
somme = (a,b) => a + b;
var p_somme = async (a,b) => a + b;
p_somme(12,8).then(result=>console.log(result));

// promesse et temporisation
var a_somme = (a,b) => {
    return new Promise((resolve) => {
        setTimeout(()=>{resolve(a + b)}, 200);
    })
}
var sommeCarre = async(a,b) =>{
    let s = await a_somme(a,b).then(result=>result);
    let result = Math.pow(s, 2);
    return result;
}

// =================== Notes Damien
// ASYNC / AWAIT// Pour transformer la fonction somme() en promesse, on ajoute le
// mot clé async
var somme = async (a, b) => a + b ;// affiche 5
somme(2, 3).then(result => console.log(result));// Considerons la promesse somme() qui attend 2 secondes pour retourner un resultat
var somme = (a, b) => {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(a + b) }, 2000);
    });
};// On veut implementer une promesse sommeCarre() qui utilise la promesse somme()
// Solution, utiliser await pour attendre la fin de la premiere promesse
var sommeCarre = async (a, b) => {
    let s = await somme(a, b).then(result => result);
    let result = Math.pow(s, 2);
    return result;
};// affiche 25
sommeCarre(2, 3).then(result => console.log(result));

// =================== /Notes Damien