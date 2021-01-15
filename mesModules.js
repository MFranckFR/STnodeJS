const { builtinModules } = require("module");
const fs = require('fs');
const path = require('path');
const { isNull } = require("lodash");

var direBonjour = function(){console.log('Bonjour')};
var direSalut = function(){console.log('Salut!')};

// module.exports = direBonjour;

// exports.direSalut = function(){console.log('Salut!')};




// Ecrire un programme NodeJS qui permet de creer un repertoire
// monDossier et trois fichiers file1.txt, file2.txt et
// file3.txt qui seront situes dans monDossier
// Utiliser a la fois des fonctions synchrones et des fonctions
// asynchrones

function _mkdir(dir_path){
    fs.mkdir(dir_path,{recursive:true}, (err) => {
        if (err) throw err;
        console.log(`Création du Repertoire ${dir_path}`);
        });
}

function _touch_files(filenames){
    filenames.forEach(function(fn){
        var file_path = path.join(dir_path, fn);
        fs.writeFile(file_path, `fichier:${file_path}`, (err) => {
            if (err) throw err;
            console.log(`Fichier ${file_path} créé`);
            });
        });
}

function createFilesIntoDir(dir_path, filenames=[]){
    if(fs.access(dir_path, fs.constants.F_OK, (err)=>{
        console.log(`Le répertoire ${dir_path} n'existe pas, donc on le créé.`);
        })){
        //_mkdir(dir_path);
        //_touch_files(filenames);
    } else {
        console.log("Le répertoire existe dejà. Aucune création.");
    }
}

/**
 * Calcul le resultat d'une expression litérale.
 * @param {String} expression Un calcul litéral: 1 + 3 + 5
 * @return {Float} Résultat du calcul.
 */
function calc_lit(expression){
    var calcul_f = '', result = 0;
    try{
        calcul_f = isNaN(expression) ? calc_filter(expression) : expression;
        result =  eval(calcul_f);
        if(result == undefined){
            result = 0;
        }
        //console.log(`calc_lit:${expression}, calcul_f:${calcul_f}`);
    }catch(err){
        console.error(`calc_lit:${expression}, calcul_f:${calcul_f}`);
    }
    return result;
}

/**
 * Filtre les caractères qui ne sont pas des chiffres ou des operateurs.
 * @param {string} calcul Chaine avec des chiffres et operateurs 
 * @return {string} Renvoie la chaine filtrée.
 */
function calc_filter(calcul){
    var str = '', elts = [];
    if (typeof(calcul) == 'string'){
        elts = calcul.match(/[0-9+*\-\/]/gi);
    }
    return  isNull(elts) ? '' : elts.join('');
}
// console.log(`calc_filter(a) = ${calc_filter('a')}`);


function read_file(file_path){
    return fs.readFileSync(file_path).toString();
}
/**
 * Remplace toutes les mots {{UN_MOT}} par sa valeur.
 * @param {String} tpl_str Chaine template
 */
function tpl_page(tpl_str, dict={}){
    var regex = new RegExp();
    for(const [key, value] of Object.entries(dict)){
        regex = new RegExp('{{' + key + '}}', 'gi')
        tpl_str = tpl_str.replaceAll(regex, value);
    }
    return tpl_str;
}

var dict = {title:'TITRE'};
var str = "blah:{{title}}, bloo:{{title}}";
//console.log(`tpl_page:${tpl_page(str, dict)}`);

module.exports = {
    salut:direSalut,
    createFilesIntoDir:createFilesIntoDir,
    calc_lit:calc_lit,
    tpl_page:tpl_page,
    read_file:read_file,
    calc_filter:calc_filter
}


/*
{recursive:true, mod:0o77}, err=>{if(err){
        throw err;
    } else {
        console.log(`Creation du répertoire: ${dir_path}`);
    }
    
    }

*/