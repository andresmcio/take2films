module.exports = {
    home: (req, res) => {
        res.render('home', {
            title: 'Take2Films | Home',
            styles: ['homeMobile', 'homeTablet', 'homeDesktop', 'homeLaptop'],
            scripts: ['visuals', 'carousel', 'videoHandler', 'blurHandler', 'reelHandler', 'langButton' ],
        });
    },
    notFound: (req, res) => {
        res.redirect('/');
    }
};
