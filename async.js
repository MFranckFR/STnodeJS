var fs = require('fs');
var mod = require('./mesModules');

// lecture du fichier salutations.txt
// puis sa lecture dans la console de façon asynchrone.

cb_readFileSync = ((err, result)=>err ? console.error(err) : console.log("LOG!"));

var content = fs.readFileSync('salutations.txt', cb_readFileSync);
console.log(content.toString());
console.log('FIN DE FICIER');

//Ex2
console.log('=====\Ex2 - Creation de 3 fichier dans un repertoire');

try{
    mod.createFilesIntoDir('./monDossier', ['fichier1.txt', 'fichier2.txt', 'fichier3.txt']);
} catch (error){
    console.error(error);
} finally{
    console.log("Fin Exercice 2");
}