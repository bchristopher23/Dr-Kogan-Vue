<template>
    <div class="page-modal-wrap modal-wrap" :class="this.$store.state.activePage" @click="handleClick">

        <PageMenu/>
        <ModalHeadlineWrap/>
        <img src="/images/close.png" alt="Close Modal" class="close-modal">
        <div class="modal">
            <div class="modal-content">

                <div class="modal-controls">
                    <span class="scrollbar-border"></span>
                    <div class="slide-count">
                        Articles<br>
                        List
                    </div>
                    <div class="slideshow-controls">
                        <span class="prev"> <img src="/images/arrow-up.png" alt="Page Up"> Page <br>Up</span>
                        <span class="next"> Page <br>Down <img src="/images/arrow-down.png" alt="Page Down"></span>
                    </div>
                    <a href="#" class="next-article">Next <br>Article</a>
                    <button class="download-article"><img src="/images/download-icon.png" alt="Download"></button>


                </div>

                <div class="modal-loading">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <path d="M16 50A34 34 0 0 0 84 50A34 36.5 0 0 1 16 50" fill="#f2ce9e" stroke="none">
                            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.25;360 50 51.25"></animateTransform>
                        </path>
                    </svg>
                </div>

                <div class="modal-featured-image" :class="isHarvard ? 'harvard-image' : ''">
                    <img v-if="isHarvard" src="/images/harvard.jpg" alt="Harvard Medicine">
                    <img v-if="isNews" src="/images/usnews.jpg" alt="US News">
                </div>

                <div class="modal-content-inner-wrap">
                    <div class="modal-content-inner" v-html="this.activePageContent" ref="p"></div>
                </div>

            </div>

            <div class="modal-border">
                <span class="top-right"></span>
                <span class="bottom-right"></span>
                <span class="left"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="bottom"></span>
            </div>

        </div>
        <router-link to="/pages/contact" class="contact-link" data-page-id="382">Contact</router-link>
        <ComposerMenu/>

        <div class="modal-wrap-mobile">
            <div class="mobile-page-header">
                <h1>About Dr. Richard Kogan</h1>
                <h2>{{this.pageTitle}}</h2>
                <div class="mobile-toggles">
                    <img src="/images/mobile-hamburger.png" class="mobile-close-modal" @click="this.closeMobileNav" alt="Back to Home">
                    <img src="/images/mobile-x.png" class="mobile-close-pages" @click="this.toggleNav" alt="Open Pages">
                </div>
            </div>
            <PageMenu/>
            <ModalHeadlineWrap/>
            <img src="/images/close.png" alt="Close Modal" class="close-modal">
            <div class="mobile-modal">
                <div class="mobile-modal-content">
                    <div class="modal-loading">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <path d="M16 50A34 34 0 0 0 84 50A34 36.5 0 0 1 16 50" fill="#f2ce9e" stroke="none">
                                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.25;360 50 51.25"></animateTransform>
                            </path>
                        </svg>
                    </div>

                    <div class="modal-featured-image" :class="isHarvard ? 'harvard-image' : ''">
                        <img v-if="isHarvard" src="/images/harvard.jpg" alt="Harvard Medicine">
                        <img v-if="isNews" src="/images/usnews.jpg" alt="US News">
                    </div>

                    <div class="modal-content-inner-wrap">
                        <div class="modal-content-inner" v-html="this.activePageContent" ref="p"></div>
                    </div>
                </div>
                <span class="top-right"></span>
                <span class="bottom-right"></span>
                <span class="left"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="bottom"></span>
            </div>
        </div>
    </div>
</template>

<script>
import SimpleBar from 'simplebar';
import $ from 'jquery'
import ComposerMenu from '../components/ComposerMenu.vue'
import PageMenu from '../components/PageMenu.vue'
import ModalHeadlineWrap from '../components/ModalHeadlineWrap.vue'
import store from '../store'

export default {
    name: 'PageModal',
    components: {
        PageMenu,
        ComposerMenu,
        ModalHeadlineWrap
    },
    metaInfo() {
        let title = this.capitalizeWords( this.$store.state.activePage.replace('-', ' ') );
        return {
            title: title,
        };
    },
    data() {
        return({
            activeAnchor: '',
            nextAnchor: 'article-1'   
        })
    },
    mounted() {
        this.fetchData();
                
        // Position X Button
        positionClose();

        window.addEventListener('keydown', this.keyPressHandler);

        $(window).resize(function() {

            positionClose();

        });

        function positionClose() {
            // Position X Button
            let modal = $('.modal'),
                close = $('.close-modal'),
                right = modal.position().left,
                top = modal.position().top - 28;
        
            close.css( { right: right + 'px', top: top + 'px'} );
        }

    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.keyPressHandler);
    },
    computed: {
       activePageContent() {
           return this.$store.state.activePageContent;
        },
        isHarvard() {
            return this.$store.state.activePage == 'harvard-medicine' ? true : false;
        },
        isNews() {
            return this.$store.state.activePage == 'news' ? true : false;
        },
        isPrograms() {
            return this.$store.state.activePage == 'program-descriptions' ? true : false;
        },
        activeNewsArticle() {
            return this.$store.state.activeNewsArticle;
        },
        pageTitle() {
            let page = this.$store.state.activePage;
            page = page.replace(/-/g, ' ');

            function toTitleCase(str) {
                return str.replace(/\w\S*/g, function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }

            return toTitleCase(page);
        }
    },
    methods: {
        toggleNav() {
			if (store.state.mobileNavActive) {
				store.dispatch( 'updateMobileNavActive', false );
			} else {
				store.dispatch( 'updateMobileNavActive', true );
			}
		},
        toggleVideoNav() {
			if (store.state.videoNavActive) {
				store.dispatch( 'updateVideoNavActive', false );
			} else {
				store.dispatch( 'updateVideoNavActive', true );
			}
		},
        closeMobileNav() {
            store.dispatch( 'updateMobileNavActive', false );
            store.dispatch( 'updateVideoNavActive', false );
            this.$router.push( '/home' );
        },
        keyPressHandler(e) {
            if (e.repeat) { return }

            if (e.keyCode == 13 || e.keyCode == 32 || e.key == 'Enter' == e.key == 'Spacebar' ) { // Enter or Spacebar
                e.preventDefault();
                $( '.slideshow-controls .next').click();
            }
        },
        fetchData() {
            fetch("https://www.richardkogan.com/wp/?rest_route=/wp/v2/pages/&slug=" + this.$store.state.activePage)
            // fetch("http://kogan.test/wp-json/wp/v2/pages?slug=" + this.$store.state.activePage)
            .then(response => response.json())
            .then(data => {
                this.$store.dispatch( 'updateActivePageContent', data[0].content.rendered );
                $('.modal-loading').hide();

                this.$nextTick( () => {

                    $.fn.isInViewport = function() {
                        var elementTop = $(this).offset().top - 200;
                        var elementBottom = elementTop + $(this).outerHeight() - 200;

                        var viewportTop = $(window).scrollTop();
                        var viewportBottom = viewportTop + $(window).height();

                        return elementBottom > viewportTop && elementTop < viewportBottom;
                    };

                    new SimpleBar( $( '.modal-content')[0], { autoHide: false } );

                    this.$store.dispatch( 'updateActiveNewsArticle', '' );
                    this.$store.dispatch( 'updateActiveProgram', '' );
                    $('.simplebar-content-wrapper').scrollTop(0);
                    
                    $('.full-height').each(function() {

                        let height = $('.modal').outerHeight() - 40;

                        $(this).css('min-height', height + 'px');
                        $(this).css('margin-top', '20px');

                    });

                    $( '.toc-link' ).click(function(e) {

                        e.preventDefault();
                
                        $('.simplebar-content-wrapper').scrollTop(0);
            
                    });

                    $('.modal .modal-featured-image').prependTo('.modal #article-1');
                    $('.mobile-modal .modal-featured-image').prependTo('.mobile-modal #article-1');

                    $('.page-modal-wrap .simplebar-content-wrapper').scroll(function ( event ) {

                        if ( $( '.wp-block-group.toc' ).length > 0 ) {
            
                            if ( elementScrolled( $( '.wp-block-group.toc' ) ) ) {

                                $( '.page-modal-wrap .toc-link' ).css( 'opacity', '0' );
                                
                            } else {
                                
                                $( '.page-modal-wrap .toc-link' ).css( 'opacity', '1' );

                            }

                        }
                        

                        if ( store.state.activePage == 'news' ) {
                            const anchors = [
                                'article-1',
                                'article-2',
                                'article-3',
                                'article-4',
                                'article-5',
                                'article-6',
                                'article-7',
                                'article-8',
                                'article-9',
                                'article-10',
                                'article-11',
                                'article-12',
                                'article-13',
                            ];

                            for ( var i = 0; i < anchors.length; i++ ) {

                                if ( $( '#' + anchors[i] ).length > 0 ) {

                                    if ( $( '#' + anchors[i] ).isInViewport() ) {
                                        store.dispatch( 'updateActiveNewsArticle', anchors[i] );

                                    }

                                }
                            }

                            if ( $(this).scrollTop() == 0 ) {
                                store.dispatch( 'updateActiveNewsArticle', '' );
                            }
                        }


                        if ( store.state.activePage == 'program-descriptions' ) {
                            const anchors = [
                                'program-1',
                                'program-2',
                                'program-3',
                                'program-4',
                                'program-5',
                                'program-6',
                                'program-7',
                                'program-8',
                                'program-9',
                            ];

                            var found = false;

                            for ( var i = 0; i < anchors.length; i++ ) {

                                if ( $( '#' + anchors[i] ).length > 0 ) {

                                    if ( $( '#' + anchors[i] ).isInViewport() ) {

                                        if ( !found ) {
                                            store.dispatch( 'updateActiveProgram', anchors[i] );
                                            found = true;
                                        }

                                    }

                                }
                            }

                            if ( $(this).scrollTop() == 0 ) {
                                store.dispatch( 'updateActiveProgram', '' );
                            }
  
                        }

                    });
         
                    function elementScrolled(elem) {
                        var docViewTop = $(window).scrollTop();
                        var docViewBottom = docViewTop + $(window).height();
                        var elemTop = $(elem).offset().top;
                        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
                    }

                    if ( $( '.wp-block-group.toc' ).length > 0 ) {
                        
                        if ( elementScrolled( $( '.wp-block-group.toc' ) ) ) {

                            $( '.page-modal-wrap .toc-link' ).css( 'opacity', '0' );
                            
                        } else {
                            
                            $( '.page-modal-wrap .toc-link' ).css( 'opacity', '1' );

                        }

                    }

                    $('.toc li a').click(function(e) {

                        let offset = $('.toc').outerHeight() + 20,
                            hash = $(this).attr('href');

                        store.dispatch( 'updateActiveProgram', hash.replace('#', '') )

                        $('.simplebar-content-wrapper').scrollTop( $(hash).position().top + offset );

                    });

                    $('.news-toc ul li a').click(function(e) {


                        e.preventDefault();

                        let offset = -20,
                            hash = $(this).attr('href');

                        if ( hash == '#article-1' || hash == '#article-2' ) {
                            offset = -20;
                        }                        

                        $('.simplebar-content-wrapper').scrollTop( $(hash).position().top + offset );


                    });

                    $('.modal-content-inner').focus();
    
                });

            });

            $(window).scroll(function ( event ) {

                let offset = $(document).scrollTop();

                if (offset > 100) {
                    $('.toc-link').css('opacity', 1);
                } else {
                    $('.toc-link').css('opacity', 0);
                }

            });

        },
        handleClick(e) {

            // Close Modal
            if ( e.target.matches( '.page-modal-wrap' ) || e.target.matches('.modal-headline') || e.target.matches( '.close-modal' ) ) {
                this.$store.dispatch( 'updateActivePage', '' );
                this.$store.dispatch( 'updateActiveNewsArticle', '' );
                this.$store.dispatch( 'updateActiveProgram', '' );
                this.$store.dispatch( 'updateActiveModal', '' );
                this.$router.push( '/home' );
            }

            if ( e.target.matches( '.mobile-close-pages' ) ) {
                this.$router.push( '/home' );
            }
            
            // Page Up Click
            if ( e.target.matches( '.slideshow-controls .prev' ) || e.target.matches( '.slideshow-controls .prev img' ) ) {

                if ( this.isPrograms ) {

                    // Change to prev article behavior if programs page

                    let offset = 10,
                        prevAnchor = '';

                    if ( this.$store.state.activeProgram == 'program-1') {
                        
                        prevAnchor = 'toc';

                    } else {

                        // Decrease anchor by 1 to go to the next article
                        let number = this.$store.state.activeProgram.replace(/(.*)-/,"");

                        number = parseInt(number) - 1;

                        prevAnchor = this.$store.state.activeProgram.split('-')[0] + '-' + number;

                    }

                    if ( prevAnchor != 'program-1' && prevAnchor != '' ) {
                        offset = $('.program-toc').outerHeight() + $('.modal-featured-image').outerHeight() - 80;
                    } else {
                        offset = 0;
                    }

                    if ( $('#' + prevAnchor).length > 0 ) {

                        $('.simplebar-content-wrapper').scrollTop( $( '#' + prevAnchor ).position().top );

                        this.$store.dispatch( 'updateActiveProgram', prevAnchor );
                    }

                    if ( prevAnchor == 'toc' ) {
                        $('.simplebar-content-wrapper').scrollTop(0);
                        this.$store.dispatch( 'updateActiveProgram', '' );
                    }

                } else {

                    // Scroll up page like normal if not on programs page
                    let scrollPos = $('.simplebar-content-wrapper').scrollTop(),
                        offset = 65;

                    if ( $( '.sticky-header' ).length > 0 ) {
                        
                        if ( elementScrolled( $( '.sticky-header' ) ) ) {
                            offset = 135;
                        }

                    }

                    let height = $('.page-modal-wrap .modal').outerHeight() - offset;
                    
                    $('.simplebar-content-wrapper').scrollTop(scrollPos - height);
                        
                }

            }

            // Page Down Click
            if ( e.target.matches( '.slideshow-controls .next' ) || e.target.matches( '.slideshow-controls .next img' ) ) {

                if ( this.isPrograms ) {


                    let offset = 10,
                        nextAnchor = '';

                    if ( this.$store.state.activeProgram == '') {
                        
                        nextAnchor = 'program-1';

                    } else {

                        // Increase anchor by 1 to go to the next article
                        let number = this.$store.state.activeProgram.replace(/(.*)-/,"");

                        let increasedNumber = parseInt(number) + 1;

                        nextAnchor = this.$store.state.activeProgram.split('-')[0] + '-' + increasedNumber;

                    }

                    if ( nextAnchor != 'program-1' ) {
                        offset = $('.program-toc').outerHeight() + $('.modal-featured-image').outerHeight() - 80;
                    }

                    if ( $('#' + nextAnchor ).length > 0 ) {
                        $('.simplebar-content-wrapper').scrollTop( $('#' + nextAnchor).position().top );
                        this.$store.dispatch( 'updateActiveProgram', nextAnchor );
                    }



                } else {

                    // Scroll down page like normal if not on the programs or news page
                    let scrollPos = $('.simplebar-content-wrapper').scrollTop(),
                        offset = 65;

                    if ( $( '.sticky-header' ).length > 0 ) {
                            
                        if ( elementScrolled( $( '.sticky-header' ) ) ) {
                            offset = 135;
                        }

                    }

                    let height = $('.page-modal-wrap .modal').outerHeight() - offset;

                    if ( scrollPos == 0 && $('.page-modal-wrap').hasClass('harvard-medicine') ) {
                        $('.simplebar-content-wrapper').scrollTop( scrollPos + height + 110 );
                    } else if ( scrollPos == 0 && $('.page-modal-wrap').hasClass('news')) {
                        $('.simplebar-content-wrapper').scrollTop( $('.page-modal-wrap #article-1').position().top + 10 );
                    } 
                    else {
                        $('.simplebar-content-wrapper').scrollTop( scrollPos + height );
                    }

                }


            }

            if ( e.target.matches( '.page-modal-wrap .modal-content .modal-controls .slide-count' ) ) {

                e.preventDefault();
                this.$store.dispatch( 'updateActiveNewsArticle', '' );

                $('.simplebar-content-wrapper').scrollTop(0);


            }

            if ( e.target.matches( '.page-modal-wrap .modal-controls .next-article' ) ) {
                
                e.preventDefault();

                let offset = 10,
                    nextAnchor = '';

                if ( this.$store.state.activeNewsArticle == '') {
                    nextAnchor = 'article-1';
                } else {

                    // Increase anchor by 1 to go to the next article
                    let number = this.$store.state.activeNewsArticle.replace(/(.*)-/,"");

                    number = parseInt(number) + 1;

                    nextAnchor = this.$store.state.activeNewsArticle.split('-')[0] + '-' + number;

                }

                if ( nextAnchor != 'article-1' ) {
                    offset = $('.news-toc').outerHeight() + $('.modal-featured-image').outerHeight() - 80;
                }

                $('.simplebar-content-wrapper').scrollTop( $('#' + nextAnchor).position().top - 20 );

                this.$store.dispatch( 'updateActiveNewsArticle', nextAnchor );

            }

            // Mobile Modal TOC Click
            if ( e.target.matches( '.mobile-modal #program-toc li a' ) ) {

                let anchor = $(e.target).attr('href'),
                    section = $('.mobile-modal ' + anchor),
                    offset = section.offset().top - 130;

                $('html,body').animate({scrollTop: offset}, 500 );

            }
            
            if ( e.target.matches( '.mobile-modal #program-toc li span' ) ) {

                let anchor = $(e.target).parent().attr('href'),
                    section = $('.mobile-modal ' + anchor),
                    offset = section.offset().top - 130;

                $('html,body').animate({scrollTop: offset}, 500 );

            }

            if ( e.target.matches( '.mobile-modal #news-toc li a' ) ) {

                let anchor = $(e.target).attr('href'),
                    section = $('.mobile-modal ' + anchor),
                    offset = section.offset().top - 130;

                $('html,body').animate({scrollTop: offset}, 500 );

            }
            
            if ( e.target.matches( '.mobile-modal #news-toc li a span' ) ) {

                let anchor = $(e.target).parent().attr('href'),
                    section = $('.mobile-modal ' + anchor),
                    offset = section.offset().top - 130;

                $('html,body').animate({scrollTop: offset}, 500 );

            }

            if ( e.target.matches( '.mobile-modal .toc-link a' ) ) {
                $("html, body").animate({ scrollTop: 0 }, 500);
            }


            function elementScrolled(elem) {
                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height() - 100;
                var elemTop = $(elem).offset().top;
                return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
            }
        },
        capitalizeWords(str) {
            const arr = str.split(" ");

            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

            }

            const str2 = arr.join(" ");

            return str2;
        }
    }
}
</script>

<style scoped lang="scss">

</style>