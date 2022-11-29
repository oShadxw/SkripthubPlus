var testing = document.getElementById('testing');
testing.addEventListener('click', function() {
    listsPost('testing', null);
})

async function test2(search) {
    const thing = document.getElementById('testing');
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
        const thing = document.getElementById('testing');
        while (thing.lastElementChild) {
            thing.removeChild(thing.lastElementChild);
        }

        listsPost('testing', search_bar.value);
    }, 1000);
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

let lastResult;
function listsPost(postContainerElementID, search) {
    const postContainerElement = document.getElementById(postContainerElementID);
    console.log(`fetching information with filter: ${search}`);
    if (!postContainerElement) {
        return;
    }
    
    fetchPosts()
        .then((posts) => {
            if (!posts) {
                return;
            }
            if (search != null) {
                posts = posts.filter((post) => {
                    return post.syntax_pattern.toLowerCase().includes(search.toLowerCase());
                });
            } 

            for (const post of posts) {
                postContainerElement.appendChild(postElement(post));
            }
        })
        .catch((e) => {
            console.error(e);
        });
}

function postElement(post) {
    const a = create('a', 'mb-4 mt-5', null);
    const div1 = create('div', 'bg-gray-400 bg-opacity-40 rounded-lg', null);
    const div2 = create('div', 'flex', null);
    const name = create('h1', 'text-4xl text-purple-700', post.addon.name);
    const desc = create('p', 'text-gray-400 mt-1.5 ml-4', post.syntax_type);

    const div3 = create('div', 'mt-5', null);
    const code = create('code', 'bg-gray-800 ml-4 rounded-md flex pb-5 pt-2 pl-2 pr-2 mr-28', post.syntax_pattern);
    const div4 = create('div', 'mt-5 ml-4 text-gray-400', null);
    const p1 = create('p', null, post.description);

    const div5 = create('div', 'mt-6 ml-2 text-2xl', null);
    const button = create('button', null, "View Examples &#10148;");

    // creation
    const anchor = document.getElementById('testing');
    
    anchor.appendChild(a);  
    a.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(desc);
    div2.appendChild(name);
    div1.appendChild(div3);
    div3.appendChild(code);
    div3.appendChild(div4);
    div4.appendChild(p1);
    div1.appendChild(div5);
    div5.appendChild(button);
    
    return name;
}

function create(element, c, text) {
    const el = document.createElement(element);
    if (c != null) el.setAttribute('class', c);
    if (text != null) el.innerHTML = text;
    return el;
}