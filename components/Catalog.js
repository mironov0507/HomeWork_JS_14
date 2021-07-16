function Catalog(){

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

    this.create = (data)=>{
        this.data = data;
        this.element = document.createElement('div');
        this.element.classList.add('products');

        let list ='';

        data.forEach(item => {
            list +=`
            <li>
                <div class="product_image"><img src="${item.image}"></div>
                <div class="product_title"><a href="${location.pathname}${location.hash}/${item.id}">${item.title}</a></div>
                <div class="product_price">${item.price} BYN</div>
            </li>
            `
        });

        if(list.length > 0) list = `<ul class="products_items">${list}</ul>`

        this.element.innerHTML =`${list}
            
        `

        return this.element
    }

    this.product = () =>{
        let id = +location.hash.split('/')[1];
        let product = this.data.filter(item =>{
            return item.id == id
        });
        product = product[0]

        this.element.innerHTML = `
        <div class="cart">
            <div class="product_cart"><img src="${product.image}"></div>
            <div class="product_title">${product.title}</div>
            <div class="cart_price">${product.price} BYN
                <button class="add_basket">В Корзину</button>            
            </div>
        </div>
        `
        let butt = this.element.querySelector('.add_basket');

        butt.addEventListener('click', ()=> {
            document.cookie = `prod${id} = ${id}; max-age = 86400`;
            
            import('./Cart.js')
                .then(cartData => cartData.default.init()
                        .then(() =>{
                            import('./Cart.js')
                                .then(cData =>{
                                    let q = cData.default.getQ();
                                    let sum = cData.default.getSum();

                                    let basket = document.body.querySelector('.basket_header');

                                    basket.innerHTML =`
                                        <a href="#cart">
                                        <div class="q_prods">${q}</div>
                                        <img src="../img/b_logo_1.png">
                                        <div class="price_prods">${sum} BYN</div>
                                        </a>
                                    `
                                    
                                })
                        })
                )

        })

        return this.element
    }

    this.init = ()=>{
        return this.getProductData()
                        .then(() =>{
                            if(location.hash.indexOf('/') != -1){
                                return this.product()
                            }else{
                                return this.element
                            }
                        })
    }

}

let dataProduct = new Catalog();
export default dataProduct
