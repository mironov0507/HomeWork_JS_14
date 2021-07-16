function Basket(){
  
    let arr = JSON.parse(localStorage.getItem('products')) || [];

    this.getProductData = async () => {
        if(arr.length > 0){
            this.create(arr)
        }else{
            await fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(result => {
                arr = result
                localStorage.setItem('products', JSON.stringify(arr))
                this.create(arr)
            })
        }
        
    }

   
    this.create = (data) =>{

        let arrCookie = (document.cookie != '') ? document.cookie.split(';').map((el) =>{
            return el.trim().split('=');
        }) : [];
    
        let arrL = (arrCookie.length > 0) ? arrCookie.filter(el => {
            return /prod\d+/.test(el[0])
        }) : [];
    
        let arrP = (arrL.length > 0) ? arrL.map((el) =>{
            return +el[1];
        }) : [];

        this.data = data;
        this.element = document.createElement('div');
        this.element.classList.add('basket_prod');

        let list ='';

        this.q = arrP.length || 0;

        this.sum = 0;

        if(arrP.length > 0){
            arrP.forEach(element => {
                let product = this.data.filter(item =>{
                    return item.id == element
                });
                product = product[0]
    
                list +=`
                <li>
                    <div class="cart_item">
                        <div class="product_cart"><img src="${product.image}"></div>
                        <div class="product_title">${product.title}</div>
                        <div class="cart_price">${product.price} BYN
                            <button class="delete" id = ${element}>Удалить</button>
                        </div>
                    </div>
                </li> 
                `
                
                this.sum += product.price;
            });
    
            if(list.length > 0) list = `<ul class="basket_items">${list}</ul>`
    
            this.element.innerHTML =`${list}`

        }else{
            this.element.innerHTML =`<h3>Ваша корзина пуста!</h3>
            <br>
            `
        }

        return this.element
    }                                                                                          
    
    this.getQ = () =>{
        return this.q
    }

    this.getSum = () =>{
        return this.sum
    }

    this.init = () =>{
        return this.getProductData()
                        .then(() =>{
                            return this.element
                        })
    }

}
let dataBasket = new Basket();
export default dataBasket