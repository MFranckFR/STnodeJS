// Ecrire une fonction qui permet de vérfier si element appartient à tab.
const tab = [1,3,6,8,9];
const elt = 9;

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
console.log(`${elt} appartient à ${tab} ? ${tab.includes(elt)?'oui':'non'}`);
console.log(`${elt} appartient à ${tab} ? ${fctInclude1(tab, elt)?'oui':'non'}`);
console.log(`${elt} appartient à ${tab} ? ${fctInclude2(tab, elt)?'oui':'non'}`);
