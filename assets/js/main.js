import loader from './components/loader.js'
import showMenu from './components/showMenu.js'
import showCart from './components/showCart.js'
import products from './components/products.js'
import getProducts from './helpers/getProducts.js'
import cart from './components/cart.js'
import themeButton from './components/darktheme.js'



/*UI Elements*/
/*ocultar loader*/ 
loader()
/*mostrar menu*/
showMenu()
/*mostrar carrito */
showCart()

/* End UI Elements */

/* Productos */

const { db, printProducts } = products( await getProducts())

/* Carrito*/

cart(db,printProducts)

//dark mode
themeButton()
