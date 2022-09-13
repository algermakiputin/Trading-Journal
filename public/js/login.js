function google_login(url) {
    
    popupWindow = window.open(url, 'name','width=600,height=400');
    
    setInterval(function(){
        let location = popupWindow.location.pathname
        if ( location == '/dashboard') {

            popupWindow.close()
            window.location.reload()
        }
    },
    500)
} 

window.onload = function() {
    let navbar_toggler = document.getElementsByClassName('navbar-toggler')[0];
    navbar_toggler.addEventListener('click', function() {
        let navbar = document.getElementById("navbarSupportedContent");
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
        }else {
            navbar.classList.add('show');
        }
    }, false);
}