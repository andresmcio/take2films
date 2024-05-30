const { resolve } = require('path');
const { readFileSync } = require('fs');

const homeContentPath = resolve(__dirname, '../config/home.content.json');

function loadHomeContent (){
    try {
        const content = readFileSync(homeContentPath, 'utf8');
        return JSON.parse(content);
    } catch (e) {
        console.error(e.message);
    }
};

module.exports = {
    home: (req, res) => {

        const content = loadHomeContent();

        if(!content){
            return res.status(500).send('Error al cargar contenido');
        };

        res.render('home', {
            title: 'Take2Films | Home',
            styles: ['homeMobile', 'homeTablet', 'homeDesktop'],
            scripts: ['visuals', 'carousel', 'videoHandler', 'blurHandler', 'reelHandler'],
            sections: content,
        });
    },
    notFound: (req, res) => {
        res.redirect('/');
    }
};