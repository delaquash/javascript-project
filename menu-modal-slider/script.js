const toggle =  document.getElementById('toggle');
const modal = document.getElementById('modal');
const open = document.getElementById('open');
const close = document.getElementById('close');

// toggle nav 
toggle.addEventListener('click', () => {
    document.body.classList.toggle('show-nav')
})