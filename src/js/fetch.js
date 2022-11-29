var testing = document.getElementById('start');
let syntax = [];

testing.addEventListener('click', function() {
    listsPost('testing', null);
})

async function test2(search) {
    const thing = document.getElementById('start');
    while (thing.lastElementChild) {
        thing.removeChild(thing.lastElementChild);
    }

    listsPost('testing', search);
}

let timer;
var search_bar = document.getElementById('search-bar');
search_bar.addEventListener('keyup', function() {
    clearTimeout(timer);

    timer = setTimeout(() => {
        if (lastResult === search_bar.value) return;
        lastResult = search_bar.value;
        const thing = document.getElementById('start');
        while (thing.lastElementChild) {
            thing.removeChild(thing.lastElementChild);
        }

        listsPost('testing', search_bar.value);
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
                syntax.push({
                    "addon": post.addon.name,
                    "pattern": post.syntax_pattern,
                    "description": post.description,
                    "type": post.syntax_type
                });
            }
        })
    console.log(`finished loading all syntax!`);
}

let lastResult;
function listsPost(postContainerElementID, search) {
    const postContainerElement = document.getElementById(postContainerElementID);
    console.log(`fetching information with filter: ${search}`);
    if (!postContainerElement) {
        return;
    }

    let sorted = syntax;
    if (!search != null) {
        sorted = syntax.filter((s) => {
            return s.pattern.toLowerCase().includes(search.toLowerCase());
        })
    }
    
    sorted.forEach((x, i) => {
        postElement(x);
    })
}

function postElement(post) {
    // new
    const a = create('a', 'bg-gray-400 ml-24 mr-24 rounded-xl', null);
    const div1 = create('div', 'ml-4', null);
    const div2 = create('div', 'flex float-right mr-7', null);
    // svg1
    const h1 = create('h1', 'leading-6 text-3xl mt-2 text-blue-600 font-medium', post.addon);
    const type = create('p', 'text-white mb-5 ml-2', post.type);
    const code = create('code', 'bg-gray-600 ml-5 flex mr-5 rounded-md pb-5 pt-2 pl-2 pr-2', post.pattern);
    const desc = create('p', 'mt-8 ml-7 text-gray-600', post.description);
    const button = create('button', 'mt-4 ml-3', "show more information");

    // creation
    const anchor = document.getElementById('start');

    anchor.appendChild(a);
    a.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(h1);
    div1.appendChild(type);
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