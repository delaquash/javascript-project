const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 10;
let page = 1;

async function getPost() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data =await res.json();
    return data
}

function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show')

        setTimeout(() => {
            page++
            showPost()
        }, 300);
    }, 5000)
}

// show posts in DOM
async function showPost() {
    const posts = await getPost()
//    to fecth each post 
posts.forEach(post => {
    // attach to a div
    postEl = document.createElement('div')
    // attach the div to a class in css for styling
    postEl.classList.add('post')
    // 
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
    <div class="post-title">${post.title}</div>
    <div class="post-body">${post.body}</div>
    </div>
    `

    // pass the postEL into the corresponsding div in html to retrieve post
    postsContainer.appendChild(postEl)
}); 
}

showPost()

window.addEventListener('scroll', ()=> {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight -5) {
        showLoading()
    }
})