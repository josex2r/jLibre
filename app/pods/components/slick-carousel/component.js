import Ember from 'ember';

export default Ember.Component.extend({

    classNames: ['row'],

    data: null,

    didRender () {
        this._super.apply(this, arguments);

        this.$().slick({
            lazyLoad: 'ondemand',
            slidesToShow: 5,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 1500,
            centerMode: true,
            centerPadding: '40px',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }

});
