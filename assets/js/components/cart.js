function cart (db, printProducts) {
    


    // carrito
    let cart = JSON.parse(localStorage.getItem('db')) || []
    //add DOM
    const productsDOM = document.querySelector('.products__container')
    const notifyDOM = document.querySelector('.notify')
    const cartDOM = document.querySelector('.cart__body')
    const countDOM = document.querySelector ('.cart__count--item')
    const totalDOM = document.querySelector ('.cart__total--item')
    const checkoutDOM = document.querySelector ('.btn--buy')


    function printCart () {  
        let htmlCart = ''       

         if(cart.length === 0) {
            htmlCart += `
            <div class="cart__empty  btn__cart__empty ">
            <i class='bx bx-cart'></i>
            <p class="cart__empty--text">No hay productos en el carrito</p>
            </div>
            `

            notifyDOM.classList.remove('show--notify')
         }else {
              for (const item of cart)  {
                const product = db.find(p => p.id === item.id)
                htmlCart += `
                <article class="article">
                    <div class="article__image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>

                    <div class="article__content">
                        <h3 class="article__title">${product.name}</h3>
                        <span class="article__price">$${product.price}</span>
                        <div class="article__quantity">
                            <button  type="button" class="article_quantity-btn 
                            article--minus"  data-id = "${item.id}">
                            <i class="bx bx-minus"></i>
                            </button>
                            <span class="article_quantity-text">${item.qty}</span>
                            
                            <button type="button" class="article_quantity-btn article--plus"
                            data-id = "${item.id}">
                                <i class="bx bx-plus"></i>
                            </button>
                            <button  type="button" 
                            class="article__btn 
                            remove-from-cart"
                            data-id = "${item.id}">
                                <i class="bx bx-trash"></i>
                            </button>

                        </div>    
                        
                    </div>

                </article>
                
                `               
              }

            notifyDOM.classList.add('show--notify')
           
         }   
         
        cartDOM.innerHTML = htmlCart 
        notifyDOM.innerHTML = showItemsCount()
        countDOM.innerHTML = showItemsCount()
        totalDOM.innerHTML=  showTotal()


        localStorage.setItem('db', JSON.stringify(cart))
    }

    function addToCart (id, qty = 1) {
        
        const itemFinded = cart.find(i => i.id === id )
        if (itemFinded) {
            console.log('El producto con el ID' + id + 'ya esta en el carrito')
            itemFinded.qty += qty
        }   else {
            console.log('El producto con el ID' + id + 'no esta')
            cart.push({ id, qty })
        }
        printCart()
    }
    
   /* addToCart(1)
    addToCart(1)
    addToCart(2)
    addToCart(2)*/
    
    function removeFromCart (id, qty = 1) {
        const itemFinded = cart.find(i => i.id === id)
        const result = itemFinded.qty - qty
        if (result > 0) {
            console.log('quedan productos con el id' + id)
            itemFinded.qty -= qty
        } else {
            console.log('no quedan productos con el id '+ id )
            cart = cart.filter(i => i.id !== id)
        }    

        printCart()   
    }

   // removeFromCart(2)
   

    function deleteFromCart (id) {
        cart = cart.filter(i => i.id !== id)
        console.log("se elimino el producto con el id" + id)
        printCart()
    }

   // deleteFromCart(2)


    function showItemsCount () {
        let suma = 0
        for (const item of cart) {
        suma += item.qty 
        }      
        return suma
    }
    
    function showTotal () {
        let total = 0
        for (const item of cart) {
            const productFinded = db.find(p => p.id === item.id)
            total += item.qty * productFinded.price
        }
        return total        
    }

    function checkout() {
        for (const item of cart) {
            const productFinded = db.find( p => p.id === item.id)
        productFinded.quantity -= item.qty
        
        }
        cart = []
        printCart()
        printProducts()
        window.alert('Gracias por su compra')

    }

    printCart()
    // Eventos 

    productsDOM.addEventListener('click', function (event) {
        if(event.target.closest('.add--to--cart')) {
        const id = +event.target.closest('.add--to--cart').dataset.id
        addToCart(id)
    }

    })

    cartDOM.addEventListener('click', function(event){
        if(event.target.closest('.article--minus')) {
            const id = +event.target.closest('.article--minus').dataset.id
            removeFromCart(id)
        }
        if(event.target.closest('.article--plus')) {
            const id = +event.target.closest('.article--plus').dataset.id
            addToCart(id)
        }
        if(event.target.closest('.remove-from-cart')) {
            const id = +event.target.closest('.remove-from-cart').dataset.id
            deleteFromCart(id)
        }
    })

    checkoutDOM.addEventListener('click', function(){
        checkout()

    })


    




}
export default cart