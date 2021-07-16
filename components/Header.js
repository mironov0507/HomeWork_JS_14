import {nav} from './Nav.js'

class Header{
    create(){

        this.element = document.createElement('header');
        this.element.classList.add('header');

        this.element.innerHTML =`
        <div class="container">
            <div class="logo"><a href="/"><img src="../img/logo1.jpg"></a></div>
                
            ${nav.outerHTML}

        </div>
        `

        return this.element
    }

    init(){
        return this.create();
    }
}

const header = new Header().init();
export {header};