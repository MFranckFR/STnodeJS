const math = require('lodash');
const mod = require('./mesModules');
const os = require('os');
fs = require('fs');

const http = require('http');
const { resolveSoa } = require('dns');
const url = require('url');
const querystring = require('querystring');
const { isNull } = require('lodash');


var outputs = [];

tab = [1,5,3];
carre = (x => x * x)
_output = math.map(tab, carre);
outputs.push(_output);

// mod();
// mod('direBonjour');
//mod.salut();

// Ex 3 - info technique sur l'hote
// Utiliser le module os pour afficher :
// L'architecture de votre machine
// Le nombre de CPU
// Le hostname
// Et la charge moyenne

_output = `Archi:${os.arch()}`;
outputs.push(_output);

_output = `CPU:${os.cpus()[0].model}`;
outputs.push(_output);

_output = `Archi:${os.arch()}`;
outputs.push(_output);

_output = `Hostname:${os.hostname()}`;
outputs.push(_output);

_output = `Charge moyenne:${os.loadavg()}`;
outputs.push(_output);

// Ex 5 - calcul d'une operations arithmetique passé en parametre


// Ex4 - Serveur http
var server = http.createServer(function(req, res){
    // https://nodejs.org/api/querystring.html
    var params = querystring.parse(url.parse(req.url).query);
    var page = url.parse(req.url).pathname;
    console.log(`log:${page}`);
    console.log(`nb parametres:${ params ? typeof(params) : Object.keys(params).length }`);
    console.log(params);


    // Probleme de CSS non chargé:
    // probleme d'entete HTTP pour les css
    // On a le warning suivant dans la console

    // La feuille de style http://localhost:8080/css/main.css 
    // n’a pas été chargée car son type MIME, « text/html », 
    // n’est pas « text/css ».
    // réponse : https://teamtreehouse.com/community/cant-get-the-css-to-load-in-the-nodejs-server
    // en lien avec https://teamtreehouse.com/community/cant-get-css-files-to-load-or-javascript-to-work-in-nodejs-server

    //CSS
    if (req.url.indexOf(".css") !== -1){
        // security breach : include file
        var file = fs.readFileSync(`./${req.url}`, {'encoding' : 'utf8'});
        res.writeHead(200, {'Content-Type' : 'text/css'});
        res.write(file);
        res.end();

    // ~ index.html page
    } else {
        //res.writeHead(200);
        res.writeHead(200, {'Content-Type' : "text/html"});

        //res.end('Salut a toi !');
        var page_head = './pages/header.html', title="Calculator";

        // Entete de page
        var html = mod.tpl_page(mod.read_file(page_head), {title:'Calculator'});
        res.write(html, "utf8");

        //res.write(`Salut, vous avez demandé la page: ${page}`);
        outputs.push(`Salut, vous avez demandé la page: ${page}`);

        // Résultats des exercices précédents
        outputs.forEach(o=>res.write(`<p>${o}</p>\n`));

        // Ex4 - calcul literal
        var page_calcul = './pages/calcul.html';
        var calcul = '0 + 0', resultat = 0;
        if(params.calcul != undefined){
            calcul = mod.calc_filter(params.calcul);
            resultat = mod.calc_lit(params.calcul);
        }
        var html = mod.tpl_page(mod.read_file(page_calcul), {'calcul':calcul, 'resultat':resultat});
        res.write(html);

        // footer
        var page_footer = "pages/footer.html";
        res.write(mod.read_file(page_footer));
        res.end();
    }
});

server.listen(8080);


// output
//outputs.forEach(o=>console.log(o));
