
function themeButton() {

const themeButton = document.getElementById('theme')
const icon = themeButton.firstElementChild
const ls = window.localStorage
const theme = ls.getItem('theme')

// obtener el modo actual  al cargar la pagina
if (theme ==='dark__body') {
    document.body.classList.add('dark__body')
    icon.classList.remove('bx-moon')  
    icon.classList.add('bx-sun') 
}else {
    document.body.classList.remove('dark__body') 
    icon.classList.remove('bx-sun') 
    icon.classList.add('bx-moon') 

}
// esta logica se ejecuta cuando le damos click al boton
themeButton.addEventListener('click', function () {    
    document.body.classList.toggle('dark__body')    
    if (document.body.classList.contains('dark__body')) {
        ls.setItem('theme', 'dark__body')
        icon.classList.remove('bx-moon')  
        icon.classList.add('bx-sun') 

        
    }else{
        ls.removeItem('theme')
        icon.classList.remove('bx-sun') 
        icon.classList.add('bx-moon') 
    }

})




}
export default themeButton

