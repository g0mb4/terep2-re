//@ts-check

import { readFile, writeFile } from 'node:fs/promises';

/** @type {string} */
const codigos = await readFile("reasm/maincode.asm","utf8");


/** @type {string[][]} */
const funcs = [];

/** @type {string[]} */
let atual = [];

for(let l of codigos.split("\n")){
    if(l.match(/^[fF]\w+:/)){
        funcs.push(atual);
        atual = [];
    }
    atual.push(l);
}
funcs.push(atual);
atual = [];

const renames = {};

function entrancia(func, mark){
    var f = funcs.find(x => x[0].startsWith(func));
    if(!f){
        console.log("func not found somehow");
        return;
    }

    for(let l of f){
        const lm = l.match(/ *call +(\w+)+/i);
        if(!lm){
            continue;
        }

        renames[lm[1]] = mark;
        entrancia(lm[1], mark);
    }
}

entrancia("FUN_timer_5680", "PHYS");


const subs = codigos.replaceAll(/FUN_1000_\w{4}/g,function(m){
    var mark = renames[m];
    if(!mark){
        return m;
    }
    return m.replace("1000", mark);
})

debugger;

await writeFile("reasm/renomeadas.asm", subs);

debugger;