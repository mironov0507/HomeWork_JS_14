const data = JSON.parse(localStorage.getItem('spa'));
class Nav{
    create(){
        this.element = document.createElement('nav');
        this.element.classList.add('nav');

        let list='';

        data.forEach(page => {
            list +=`
            <li><a href="#${page.slug}">${page.shortTitle}</a></li>
            `
        })

        this.element.innerHTML = `
        <ul>
            ${list}
        </ul>
        `

        return this.element

    }

    init(){
        return this.create();
    }
}

const nav = new Nav().init();
export {nav};