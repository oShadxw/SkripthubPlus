import { createSyntax, allSyntax } from './syntax.js';

const start = document.getElementById('start');
const search_bar = document.getElementById('search-bar');

let timer;
let lastResult;

search_bar.addEventListener('keyup', function() {
    clearTimeout(timer);

    timer = setTimeout(() => {
        if (lastResult === search_bar.value) return;
        lastResult = search_bar.value;
        while (start.lastElementChild) {
            start.removeChild(start.lastElementChild);
        }

        listsPost('start', search_bar.value);
    }, 500);
});

async function fetchPosts() {

    try {
        const response = await fetch('https://skripthub.net/api/v1/addonsyntaxlist/');
    
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

saveSyntax();
async function saveSyntax() {
    console.log(`loading syntax!`);
    fetchPosts()
        .then((posts) => {
            if (!posts) return;
            
            for (const post of posts) {
                createSyntax(post);
            }
        })
    console.log(`finished loading all syntax!`);
}

function listsPost(postContainerElementID, search) {
    const postContainerElement = document.getElementById(postContainerElementID);
    console.log(`fetching information with filter: ${search}`);
    if (!postContainerElement) {
        return;
    }

    let sorted = allSyntax;
    if (!search != null) {
        sorted = allSyntax.filter((s) => {
            return s.syntax.pattern.toLowerCase().includes(search.toLowerCase());
        })
    }
    
    sorted.forEach((x, i) => {
        postElement(x);
    })
}

// remaking later
function postElement(post) {

    const a = create('a', 'bg-slate-800 ml-24 mr-24 mb-10 rounded-xl shadow-xl', null);
    a.setAttribute('id', post.syntax.id);
    const div1 = create('div', 'ml-4', null);
    const div2 = create('div', 'flex float-right mr-7', null);
    const h1 = create('h1', 'leading-6 text-3xl mt-2 text-blue-600 font-medium', post.addon.name);
    const type = create('p', 'text-white mb-5 ml-2', post.syntax.type);
    const code = create('code', 'bg-black ml-5 flex mr-5 rounded-md pb-5 pt-2 pl-2 pr-2', post.syntax.pattern);
    const desc = create('p', 'mt-8 ml-7 text-white', post.syntax.description);
    const button = create('button', 'mt-4 ml-3', "show more information");

    const anchor = document.getElementById('start');

    anchor.appendChild(a);
    a.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(h1);
    div1.appendChild(type);
    // temporary 
    ["tuske", "skquery", "skrayfall"].forEach((x, i) => {
        if (post.addon.name.toLowerCase().includes(x)) {
            const warning = create('p', 'text-orange-500 ml-5 underline underline-offset-4 mb-1', "⚠ Outdated Addon");
        a.appendChild(warning);
        }
    });
    a.appendChild(code);
    a.appendChild(desc);
    a.appendChild(button);
}

function create(element, c, text) {
    const el = document.createElement(element);
    if (c != null) el.setAttribute('class', c);
    if (text != null) el.innerHTML = text;
    return el;
}