// Ecrire une fonction qui permet de vérfier si element appartient à tab.
const tab = [1,3,6,8,9];
const elt = 5;
fctInclude = ((list,elt)=>list.some((e=>e==elt)))

console.log(`${elt} appartient à ${tab} ? ${tab.includes(elt)?'oui':'non'}`);
console.log(`${elt} appartient à ${tab} ? ${fctInclude(tab, elt)?'oui':'non'}`);


