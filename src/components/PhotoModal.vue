<template>
<div class="photo-modal-wrap modal-wrap" @click="handleClick">

        <div class="mobile-page-header">
            <h1>About Dr. Richard Kogan</h1>
            <h2>Photos</h2>
            <div class="mobile-toggles">
                <img src="/images/mobile-hamburger.png" class="mobile-open-videos" @click="this.toggleVideoNav" alt="Open Videos">
                <img src="/images/mobile-x.png" class="mobile-close-pages" @click="this.toggleNav" alt="Open Pages">
            </div>
        </div>

        <PageMenu/>
        <ModalHeadlineWrap/>
        <img src="/images/close.png" class="close-modal" alt="Close Modal">

        <div class="modal">
            <div class="modal-content">
                <div class="modal-controls">
                    <span class="scrollbar-border"></span>
                    <div class="slide-count">
                        Photo<br>
                        <span class="current-index">1</span>/27
                    </div>
                    <div class="slideshow-controls">
                        <span class="next">Next<img src="/images/arrow-right.png" alt="Next"></span>
                        <span class="prev"><img src="/images/arrow-left.png" alt="Back">Back</span>
                    </div>
                    <button class="download-slide"><img src="/images/download-icon.png" alt="Download"></button>
                </div>

                <div class="mobile-photo-container">
                    <div class="slide">
                        <img src="/images/slideshow/slide1.jpg" 
                            data-highres="/images/slideshow/slide1-highres.jpg" 
                            alt="Dr. Richard Kogan publicity1">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide2.jpg" 
                            data-highres="/images/slideshow/slide2-highres.jpg" 
                            alt="Dr. Richard Kogan publicity2">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide3.jpg" 
                            data-highres="/images/slideshow/slide3-highres.jpg" 
                            alt="Dr. Richard Kogan hands to head">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide4.jpg" 
                            data-highres="/images/slideshow/slide4-highres.jpg" 
                            alt="Dr. Richard Kogan profile, hands open">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide5.jpg"
                            data-highres="/images/slideshow/slide5-highres.jpg" 
                            alt="Dr. Richard Kogan Looking Down, Leaning On Piano">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide6.jpg" 
                            data-highres="/images/slideshow/slide6-highres.jpg" 
                            alt="Dr. Richard Kogan playing piano in spotlight">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide7.jpg" 
                            data-highres="/images/slideshow/slide7-highres.jpg" 
                            alt="Dr. Richard Kogan onstage at Aspen">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide8.jpg"
                            data-highres="/images/slideshow/slide8-highres.jpg" 
                            alt="Drs. Kogan and Fauci at Aspen">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide9.jpg"
                            data-highres="/images/slideshow/slide9-highres.jpg" 
                            alt="Dr. Richard Kogan TedMed1">                    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide10.jpg" 
                            data-highres="/images/slideshow/slide10-highres.jpg" 
                            alt="Dr. Richard Kogan TedMed2">    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide11.jpg" 
                            data-highres="/images/slideshow/slide11-highres.jpg" 
                            alt="Dr. Richard Kogan TedMed3">    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide12.jpg" 
                            data-highres="/images/slideshow/slide12-highres.jpg" 
                            alt="Dr. Richard Kogan at Davos">   
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide13.jpg" 
                            data-highres="/images/slideshow/slide13-highres.jpg" 
                            alt="Dr. Richard Kogan _ Marin Alsop">                     
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide14.jpg" 
                            data-highres="/images/slideshow/slide14-highres.jpg" 
                            alt="Dr. Richard Kogan _ Gustavo Dudamel">                       
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide15.jpg" 
                            data-highres="/images/slideshow/slide15-highres.jpg" 
                            alt="Dr. Richard Kogan _ Andrés Orozco-Estrada">     
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide16.jpg" 
                            data-highres="/images/slideshow/slide16-highres.jpg" 
                            alt="Dr. Richard Kogan plays Rachmaninoff1">     
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide17.jpg" 
                            data-highres="/images/slideshow/slide17-highres.jpg" 
                            alt="Dr. Richard Kogan plays Rachmaninoff2">                        
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide18.jpg" 
                            data-highres="/images/slideshow/slide18-highres.jpg" 
                            alt="Dr. Richard Kogan plays Rachmaninoff3">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide19.jpg" 
                            data-highres="/images/slideshow/slide19-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture1">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide20.jpg" 
                            data-highres="/images/slideshow/slide20-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture2">                    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide21.jpg" 
                            data-highres="/images/slideshow/slide21-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture3">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide22.jpg" 
                            data-highres="/images/slideshow/slide22-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture4">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide23.jpg" 
                            data-highres="/images/slideshow/slide23-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture5">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide24.jpg" 
                            data-highres="/images/slideshow/slide24-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture6">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide25.jpg" 
                            data-highres="/images/slideshow/slide25-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture7">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide26.jpg" 
                            data-highres="/images/slideshow/slide26-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture8">                    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide27.jpg" 
                            data-highres="/images/slideshow/slide27-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture9">                         
                    </div>
                </div>

                <div class="slideshow-container">
                    <div class="slide">
                        <img src="/images/slideshow/slide1.jpg" 
                            data-highres="/images/slideshow/slide1-highres.jpg" 
                            alt="Dr. Richard Kogan publicity1">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide2.jpg" 
                            data-highres="/images/slideshow/slide2-highres.jpg" 
                            alt="Dr. Richard Kogan publicity2">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide3.jpg" 
                            data-highres="/images/slideshow/slide3-highres.jpg" 
                            alt="Dr. Richard Kogan hands to head">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide4.jpg" 
                            data-highres="/images/slideshow/slide4-highres.jpg" 
                            alt="Dr. Richard Kogan profile, hands open">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide5.jpg"
                            data-highres="/images/slideshow/slide5-highres.jpg" 
                            alt="Dr. Richard Kogan Looking Down, Leaning On Piano">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide6.jpg" 
                            data-highres="/images/slideshow/slide6-highres.jpg" 
                            alt="Dr. Richard Kogan playing piano in spotlight">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide7.jpg" 
                            data-highres="/images/slideshow/slide7-highres.jpg" 
                            alt="Dr. Richard Kogan onstage at Aspen">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide8.jpg"
                            data-highres="/images/slideshow/slide8-highres.jpg" 
                            alt="Drs. Kogan and Fauci at Aspen">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide9.jpg"
                            data-highres="/images/slideshow/slide9-highres.jpg" 
                            alt="Dr. Richard Kogan TedMed1">                    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide10.jpg" 
                            data-highres="/images/slideshow/slide10-highres.jpg" 
                            alt="Dr. Richard Kogan TedMed2">    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide11.jpg" 
                            data-highres="/images/slideshow/slide11-highres.jpg" 
                            alt="Dr. Richard Kogan TedMed3">    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide12.jpg" 
                            data-highres="/images/slideshow/slide12-highres.jpg" 
                            alt="Dr. Richard Kogan at Davos">   
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide13.jpg" 
                            data-highres="/images/slideshow/slide13-highres.jpg" 
                            alt="Dr. Richard Kogan _ Marin Alsop">                     
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide14.jpg" 
                            data-highres="/images/slideshow/slide14-highres.jpg" 
                            alt="Dr. Richard Kogan _ Gustavo Dudamel">                       
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide15.jpg" 
                            data-highres="/images/slideshow/slide15-highres.jpg" 
                            alt="Dr. Richard Kogan _ Andrés Orozco-Estrada">     
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide16.jpg" 
                            data-highres="/images/slideshow/slide16-highres.jpg" 
                            alt="Dr. Richard Kogan plays Rachmaninoff1">     
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide17.jpg" 
                            data-highres="/images/slideshow/slide17-highres.jpg" 
                            alt="Dr. Richard Kogan plays Rachmaninoff2">                        
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide18.jpg" 
                            data-highres="/images/slideshow/slide18-highres.jpg" 
                            alt="Dr. Richard Kogan plays Rachmaninoff3">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide19.jpg" 
                            data-highres="/images/slideshow/slide19-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture1">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide20.jpg" 
                            data-highres="/images/slideshow/slide20-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture2">                    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide21.jpg" 
                            data-highres="/images/slideshow/slide21-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture3">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide22.jpg" 
                            data-highres="/images/slideshow/slide22-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture4">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide23.jpg" 
                            data-highres="/images/slideshow/slide23-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture5">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide24.jpg" 
                            data-highres="/images/slideshow/slide24-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture6">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide25.jpg" 
                            data-highres="/images/slideshow/slide25-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture7">
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide26.jpg" 
                            data-highres="/images/slideshow/slide26-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture8">                    
                    </div>
                    <div class="slide">
                        <img src="/images/slideshow/slide27.jpg" 
                            data-highres="/images/slideshow/slide27-highres.jpg" 
                            alt="Dr. Richard Kogan Concert Lecture9">                         
                    </div>
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

    </div>
</template>

<script>
import $ from 'jquery'
import ComposerMenu from '../components/ComposerMenu.vue'
import PageMenu from '../components/PageMenu.vue'
import ModalHeadlineWrap from '../components/ModalHeadlineWrap.vue'
import { tns } from "../../node_modules/tiny-slider/src/tiny-slider"
import store from '../store'

let slider;

export default {
    name: 'PhotoModal',
    components: {
        PageMenu,
        ComposerMenu,
        ModalHeadlineWrap
    },
    mounted() {

        // Modal Slideshow
        slider = tns({
            container: '.slideshow-container',
            items: 1,
            slideBy: 'page',
            autoplay: false,
            autoplayButtonOutput: false,
            nav: false,
            arrowKeys: true,
            controlsContainer: '.slideshow-controls',
            prevButton: '.slideshow-controls .prev',
            nextButton: '.slideshow-controls .next',
        });

        var slideChange = function (info, eventName) {
            $('.modal-controls .current-index').html(info.displayIndex);
        }

        // bind function to event
        slider.events.on('transitionEnd', slideChange);

        $('.download-slide').click(function() {

            let active_slide_img = $('.tns-slide-active img'),
                img_src = active_slide_img.attr('src'),
                img_src_og = img_src.replace( '.jpg', '-highres.jpg'),
                alt = active_slide_img.attr('alt'),
                a = $('<a href="' + img_src_og + '" download="' + alt + '.jpg">DOWNLOAD</a>').appendTo("body");

            a[0].click();

            a.remove();
        });

        $('.mobile-photo-container .slide img').click(function() {

            let active_slide_img = $(this),
                img_src = active_slide_img.attr('src'),
                img_src_og = img_src.replace( '.jpg', '-highres.jpg'),
                alt = active_slide_img.attr('alt'),
                a = $('<a href="' + img_src_og + '" download="' + alt + '.jpg">DOWNLOAD</a>').appendTo("body");

            a[0].click();

            a.remove();

        });

        // Position X Button
        positionClose();

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

        // Add captions to mobile photos
        // $('.mobile-photo-container .slide').each(function() {

        //     const caption = $(this).find('img').attr('alt'),
        //         captionHTML = $('<p class="photo-caption">' + caption + '</p>');

        //     $(this).append(captionHTML);

        // });

    },
    beforeDestroy() {
        slider.destroy();
    },
    methods: {
        handleClick(e) {
            // Close Video
            if ( e.target.matches( '.photo-modal-wrap' ) || e.target.matches( '.modal-headline' ) || (e.target.matches( '.close-modal' )) ) {
                this.$store.dispatch( 'updateActiveModal', '' );
                this.$store.dispatch( 'updateActivePage', '' );
                this.$router.push( '/home' );
            }

        },
        toggleNav() {
			if (store.state.mobileNavActive) {
				store.dispatch( 'updateMobileNavActive', false );
			} else {
				store.dispatch( 'updateMobileNavActive', true );
			}
            store.dispatch('updateVideoNavActive', false );
		},
        toggleVideoNav() {
			if (store.state.videoNavActive) {
				store.dispatch( 'updateVideoNavActive', false );
			} else {
				store.dispatch( 'updateVideoNavActive', true );
			}
            store.dispatch('updateMobileNavActive', false );
		},
    }
}
</script>

<style scoped lang="scss">
    .photo-modal-wrap .modal-content .modal-controls {
        justify-content: space-between;
    }
    .slide-count,
    .next-article {
        display: block;
    }
    .slide-count {
        display: block;
    }

    .close-modal {
        top: -30px;
        right: 0;
    }
</style>