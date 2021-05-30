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