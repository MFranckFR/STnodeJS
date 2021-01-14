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


