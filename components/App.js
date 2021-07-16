class App{
    
    create(){
        this.app = document.createElement('div');
        this.app.classList.add('app');
        document.body.appendChild(this.app)

    }

 
    init(){
        import('./Head.js')
            .then(module =>{

                import('./Data.js')
                    .then(data => data.default
                        .then(result => {
                            localStorage.setItem('spa', result)
                            this.create();

                            import('./Header.js')
                                .then(modulHeader => {
                                        const header = modulHeader.header;
                                        this.app.appendChild(header)
                                    import('./Main.js')
                                        .then(modulMain => {
                                            const main = modulMain.main
                                            this.app.appendChild(main);

                                            import('./Footer.js')
                                                .then(modulFooter => {
                                            const footer = modulFooter.footer
                                            this.app.appendChild(footer);
                                            
                                                })
                                        })
                                })
                            
                        }))
            })
    }

}

export default new App().init()