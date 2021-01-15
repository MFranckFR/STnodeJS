const fs = require('fs');

// lecture du fichier salutations.txt
// puis sa lecture dans la console.

var content = fs.readFileSync('salutations.txt');
console.log(content.toString());
console.log('FIN DE FICIER');


//Ex2
console.log('=====\Ex2 - Creation de 3 fichier dans un repertoire');
//-- version damien
var file = ["file1.txt", "file2.txt", "file3.txt"];if (fs.existsSync('monDossier')) {
    console.error('dossier existe deja');
}
else {
    for (let i = 0; i < file.length; i++) {
        fsPath.writeFileSync('monDossier /' + file[i], 'contenu fichier');
    }
}

