module.exports = {
    home: (req, res) => {
        res.render('home', {
            title: 'Take2Films | Home',
            styles: ['homeDesktop', 'homeLaptop', 'homeTablet', 'homeMobile'],
            scripts: ['visuals', 'carousel', 'videoHandler', 'blurHandler', 'reelHandler', 'langButton' ],
        });
    },
    notFound: (req, res) => {
        res.redirect('/');
    }
};
