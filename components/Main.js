const data = JSON.parse(localStorage.getItem('spa'));
class Main{
    create(){
        this.element = document.createElement('main');
        this.element.classList.add('main');
        
        this.render();
        window.addEventListener('hashchange', ()=>{
            this.render();
        })

        return this.element

    }

    render(){
        let hash = location.hash.slice(1) || 'home';



        if(hash == 'cart'){
            document.title='Корзина'
                this.element.innerHTML =`
            <div class="container">
                <h1>Корзина</h1>
            </div>
            `
            import('./Cart.js')
                .then(cartData => cartData.default.init()
                        .then(bData => {
                            this.element.appendChild(bData)

                            let btnDelete = this.element.querySelectorAll('.delete');
             
                            btnDelete.forEach((element)=>{
                                element.addEventListener('click', (event)=>{

                                    document.cookie = `prod${event.target.id}=; max-age = -1`;

                                    this.render();
                                    
                                })
                            })
                        })
                )            
        }

        data.forEach(page => {
            if(hash.indexOf(page.slug) != -1){
                document.title=`${page.title}`
                this.element.innerHTML =`
            <div class="container">
                <h1>${page.title}</h1>
                <p>${page.content}</p>
            </div>
        `

        if(page.slug == 'catalog'){
            import('./Catalog.js')
                .then(catData => catData.default.init()
                                    .then(pData => this.element.appendChild(pData)))
            }
        }
      })

      import('./Cart.js')
                .then(cartData => cartData.default.init()
                        .then(() =>{
                            import('./Cart.js')
                                .then(cData =>{
                                    let q = cData.default.getQ();
                                    let sum = cData.default.getSum();

                                    let basket = document.createElement('div');
                                    basket.classList.add('basket_header');

                                    basket.innerHTML =`
                                        <a href="#cart">
                                        <div class="q_prods">${q}</div>
                                        <img src="../img/b_logo_1.png">
                                        <div class="price_prods">${sum} BYN</div>
                                        </a>
                                    `

                                    this.element.insertBefore(basket, this.element.querySelector('.container'));
                                })
                        })
                )


    }

    init(){
        return this.create();
    }
}

const main = new Main().init();
export {main};