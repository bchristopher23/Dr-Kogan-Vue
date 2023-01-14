<template>
    <div class="home-wrapper wrapper" v-bind:class="{ 'mobile-video-nav-active': videoNavActive, }" id="page-wrapper" @click="handleClick">
        <router-view></router-view>
        <div class="modal-bg" v-if="modalActive"></div>
        <VideoModal v-if="videoModalActive" :video="this.$store.state.composers[this.activeComposer].video != undefined ? this.$store.state.composers[this.activeComposer].video : ''" :activeComposer="activeComposer" />
        <PageModal v-if="pageModalActive" :key="activePage"/>
        <PhotoModal v-if="photoModalActive"/>
        <PageMenu/>
        <div v-if="navActive" class="mobile-nav-wrap">
            <h1>Richard Kogan, MD</h1>
            <h2>Live Concert Lectures</h2>
            <PageMenuMobile/>
            <h3 class="videos-menu-link" @click="this.toggleVideoNav">Concert Lecture Videos</h3>
        </div>
        <div v-if="videoNavActive && !videoModalActive" class="mobile-nav-wrap video" >
            <h1>Richard Kogan, MD</h1>
            <h2>Video Excerpts from his <br>Live Concert Lectures on</h2>
            <ComposerMenuMobile />
            <h3 class="about-menu-link" @click="this.toggleNav">About Dr. Kogan</h3>
        </div>
        <ComposersMobile v-if="!pageModalActive" :key="activePage"/>
        <ImageMapWrap/>
        <ComposerMenu/>
        <router-link to="/pages/contact" class="contact-link" data-page-id="382">Contact</router-link>
    </div><!-- #page-wrapper -->
</template>

<script>
// @ is an alias to /src
import $ from 'jquery'
import NavToggle from '../components/NavToggle.vue'
import PageMenu from '../components/PageMenu.vue'
import PageMenuMobile from '../components/PageMenuMobile.vue'
import ComposersMobile from '../components/ComposersMobile.vue'
import ImageMapWrap from '../components/ImageMapWrap.vue'
import ComposerMenu from '../components/ComposerMenu.vue'
import ComposerMenuMobile from '../components/ComposerMenuMobile.vue'
import PageModal from '../components/PageModal.vue'
import VideoModal from '../components/VideoModal.vue'
import PhotoModal from '../components/PhotoModal.vue'
import store from '@/store';

// Export Component
export default {
  name: 'Home',
  metaInfo: {
      title: 'Official Website',
      titleTemplate: 'Dr. Richard Kogan | %s'
  },
  components: {
    PageMenu,
    PageMenuMobile,
    NavToggle,
    ComposersMobile,
    ImageMapWrap,
    ComposerMenu,
    ComposerMenuMobile,
    PageModal,
    VideoModal,
    PhotoModal
  },
  mounted() {

    if ( this.$route.params.hasOwnProperty('name') ) {
        this.$store.dispatch( 'updateActiveComposer', this.$route.params.name );
        this.$store.dispatch( 'updateHeadlineSrc', '/images/headline-alt.png' );
        
        if ( this.$route.params.name != 'Tchaikovsky' 
            && this.$route.params.name != 'Beethoven'
            && this.$route.params.name != 'Bernstein' 
            && this.$route.params.name != 'Gershwin' 
            && this.$route.params.name != 'Joplin' 
            && this.$route.params.name != 'Mozart' 
            && this.$route.params.name != 'Chopin' 
            && this.$route.params.name != 'Schumann'
            && this.$route.params.name != 'Rachmaninoff' ) {

            this.$store.dispatch( 'updateActiveComposer', '' );
            this.$store.dispatch( 'updateHeadlineSrc', '/images/headline.png' );
            this.$store.dispatch( 'updateActiveModal', '' );
            this.$store.dispatch( 'updateActivePage', '' );
            this.$router.push( '/home' );

        }

    }
    
    if ( this.$route.params.hasOwnProperty('page') ) {
        this.$store.dispatch( 'updateActivePage', this.$route.params.page );

        if ( this.$route.params.page == 'photos' ) {
            this.$store.dispatch( 'updateActiveModal', 'photos' );
        } else if (this.$route.params.page == 'videos') {
            this.$store.dispatch( 'updateActiveModal', '' );
            this.$store.dispatch( 'updateActivePage', 'videos' );
            this.$store.dispatch( 'updateHeadlineSrc', '/images/headline-alt.png' );
            $('.select-composer').addClass('active');
        } else {

            if ( this.$route.params.page != 'program-descriptions' 
            && this.$route.params.page != 'harvard-medicine'
            && this.$route.params.page != 'videos' 
            && this.$route.params.page != 'news' 
            && this.$route.params.page != 'bio' 
            && this.$route.params.page != 'bookings' 
            && this.$route.params.page != 'performances' 
            && this.$route.params.page != 'psychiatric-practice' ) {

                this.$store.dispatch( 'updateActiveComposer', '' );
                this.$store.dispatch( 'updateActiveModal', '' );
                this.$store.dispatch( 'updateActivePage', '' );
                this.$store.dispatch( 'updateHeadlineSrc', '/images/headline.png' );
                this.$router.push( '/home' );

            } else {
                this.$store.dispatch( 'updateActiveModal', 'page' );
            }

        }

    }
    
    if ( this.$route.hash == '#video' ) {
        this.$store.dispatch( 'updateActiveModal', 'video' );
    }
    
    $('.modal-wrap').click(function() {
        this.$store.dispatch( 'updateActiveComposer', '' );
    });

    $('.composer-image-wrap').hover(function() {
        $('.select-composer').css('display', 'flex');
    }, function() {
        $('.select-composer').hide();
    });

  },
  created() {
    window.addEventListener('keydown', this.keyPressHandler);
  },
  beforeDestroy() {
      window.removeEventListener('keydown', this.keyPressHandler);
  },
  computed: {
    activeComposer () {
        return this.$route.params.name
    },
    composerParam () {
        return this.$route.params.name
    },
    modalActive() {
        return this.$store.state.activeModal != '' ? true : false;
    },
    videoModalActive () {
        return this.$store.state.activeModal == 'video' ? true : false
    },
    pageModalActive() {
        return this.$store.state.activeModal == 'page' && this.$store.state.activePage != 'photos' && this.$store.state.activePage != 'videos' ? true : false
    },
    photoModalActive() {
        return this.$store.state.activeModal == 'photos' ? true : false
    },
    activePage() {
        return this.$store.state.activePage
    },
    openingModal() {
        return this.$store.state.openingModal
    },
    navActive() {
        return this.$store.state.mobileNavActive
    },
    videoNavActive() {
        return this.$store.state.videoNavActive
    },
  },
  watch: {
    $route(to, from) {

        if (to.name != 'Composer') {
            this.$store.dispatch( 'updateActiveComposer', '' );
            this.$store.dispatch( 'updateHeadlineSrc', '/images/headline.png' );
        }

        if ( to.name == 'Composer' ) {
            this.$store.dispatch( 'updateActiveComposer', to.params.name );
            this.$store.dispatch( 'updateActiveModal', '' );

            if ( to.hash == '#video' ) {
                this.$store.dispatch( 'updateActiveModal', 'video' );
            }

        }
        
        if ( to.name == 'Page' ) {

            if ( to.params.page == 'videos' ) {
                this.$store.dispatch( 'updateActiveComposer', '' );
                this.$store.dispatch( 'updateActiveModal', '' );
                this.$store.dispatch( 'updateHeadlineSrc', '/images/headline-alt.png' );
                $('.select-composer').addClass('active');
            } else if( to.params.page == 'photos' ) {
                this.$store.dispatch( 'updateActiveModal', 'photos' );
            } else {
                this.$store.dispatch( 'updateActiveComposer', '' );
                this.$store.dispatch( 'updateActivePage', to.params.page );
                this.$store.dispatch( 'updateActiveModal', 'page' );
                $('.select-composer').removeClass('active');
            }

            this.$store.dispatch( 'updateMobileNavActive', false );


        }

        if ( to.name != 'Page' && to.name != 'Composer' ) {
            this.$store.dispatch( 'updateActiveComposer', '' );
            this.$store.dispatch( 'updateActiveModal', '' );
            this.$store.dispatch( 'updateActivePage', '' );
            this.$store.dispatch( 'updateActiveNewsArticle', '' );
            this.$store.dispatch( 'updateActiveProgram', '' );
            this.$store.dispatch( 'updateHeadlineSrc', '/images/headline.png' );
        }
    }
  },
  methods: {
    keyPressHandler(e) {
        if (e.repeat) { return }

        if ( this.$store.state.activeComposer != '' && this.modalActive == false ) {

            if (e.keyCode == 13 || e.keyCode == 32 ) { // Enter or Spacebar
                e.preventDefault();
                $('.couch-image-wrap').click();
            }
        }

        if ( this.modalActive == true ) {

            if (e.key == 'Escape' ) {
                e.preventDefault();
                $('.close-modal').click();
            }

        }

    },
    handleClick(e) {
        // Deselect Active Composer
        if ( e.target.matches( '.image-bg, .headline, .select-composer' ) ) {
            this.$store.dispatch( 'updateActiveComposer', '' );
            this.$router.push( '/home' );
            $('.select-composer').removeClass('active');
        }

        // Composer Image Click
        if ( e.target.matches( '.composer-image' ) ) {

            // Update store
            this.$store.dispatch( 'updateActiveComposer', e.target.alt );

            // Update Route
            this.$router.push( '/composers/' + e.target.alt);

            // Hide Select Composer Button
            $('.select-composer').hide();
            $('.select-composer').removeClass('active');

        }

        // Play Video Click
        if ( e.target.matches( '.play-video' ) ) {
            this.$router.push( '/composers/' + e.target.nextElementSibling.alt + '#video' );
        }

        // Close Modal Click
        if ( e.target.matches( '.close-modal' ) ) {
            this.$store.dispatch( 'updateActiveComposer', '' );
            this.$store.dispatch( 'updateActiveModal', '' );
            this.$store.dispatch( 'updateActivePage', '' );
            this.$store.dispatch( 'updateActiveNewsArticle', '' );
            this.$store.dispatch( 'updateActiveProgram', '' );
            this.$router.push( '/home' );
        }
        
        // Close Mobile Modal Click
        if ( e.target.matches( '.close-modal-mobile' ) ) {
            this.$store.dispatch( 'updateActiveComposer', '' );
            this.$store.dispatch( 'updateActiveModal', '' );
            this.$store.dispatch( 'updateActivePage', '' );
            this.$store.dispatch( 'updateActiveNewsArticle', '' );
            this.$store.dispatch( 'updateActiveProgram', '' );
            this.$router.push( '/home' );
        }
        
        if ( e.target.matches ( '.page-link' ) ) {
            this.$store.dispatch( 'updateOpeningModal', true );
        } else {
            this.$store.dispatch( 'updateOpeningModal', false );
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
    }
  },
}
</script>

<style lang="scss">

/** WP Styles */
.has-text-align-center {
    text-align: center;
}

/** Custom Styles */
.image-map-wrap {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    @media(max-width: 1000px) {
        display: none;
    }

    img, svg {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        z-index: 99;
    }

    .hover-text {
        display: none;
    }
}

#map {
    position: relative;
}

.map-content {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
}

.composer-image-wrap {
    position: relative;
    z-index: 999;
    color: #dca80b;
    font-family: 'Arial';
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .composer-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
        cursor: pointer;
        -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        transition: -webkit-transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),-webkit-transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    &:not(.active):hover,
    &:not(.active).hovered {
        z-index: 9999;

        img {
            transform: translateY(-15px) scale(1.2);
        }
    }

    .play-video {
        opacity: 0;
        width: 80%;
        height: auto;
        top: auto;
        left: auto;
        animation: pulsate 1s infinite;
        display: none;
    }

    &.active {
        .play-video{
             opacity: 1;
             display: block;
        }

        img:not(.play-video) {
            display: none;
        }
    }

    &:hover {
        .composer-name {
            color: #fff;
        }
    }
}

.select-composer-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        position: relative;
        height: auto;
        width: auto;
        max-height: 90%;
        max-width: 90%;
        display: none;
        opacity: 0;
        animation: pulsate 1s infinite;

        &.active {
            display: flex !important;
        }
    }

}
.play-video {

    .Tchaikovsky & {
        margin-top: .3em;
    }
    
    .Joplin & {
        margin-top: -.59em;
    }
    
    .Mozart & {
        margin-top: -.4em;
    }
    
    .Chopin & {
        margin-top: -.45em;
    }
    
    .Schumann & {
        margin-top: -.45em;
    }

}

.headline-wrap,
.modal-headline-wrap {
    display: flex;
    align-items: center;

    @media (min-width: 3000px) and (max-height: 1275px) {
        top: 3vh !important;

        img {
            width: 70% !important;
        }
    }
    
    @media (min-width: 2500px) and (max-height: 1200px) {
        top: 3vh !important;

        img {
            width: 75% !important;
        }
    }

    img {
        position: relative;
        width: 100%;
        max-width: 100%;
        height: auto;
        margin: 0 auto;
    }

    .headline-alt {
        display: none;
    }
}

.composer-name {
    position: absolute;
    z-index: 9999999;
    top: calc(100% + 2px);
    left: 50%;
    transform: translateX(-50%);
    font-size: .95vw;
    margin: 0;

    .active & {
        color: #fff;
    }

    [data-composer="Tchaikovsky"] & {
        top: calc(100% + .2em);
    }
    
    [data-composer="Beethoven"] & {
        top: calc(100% + .17em);
    }

    [data-composer="Bernstein"] & {
        top: calc(100% + .2em);
    }
    
    [data-composer="Joplin"] & {
        top: calc(100% - .15em);
    }
    
    [data-composer="Mozart"] & {
        top: calc(100% - .05em);
    }
    
    [data-composer="Chopin"] & {
        top: calc(100% - .02em);
    }
    
    [data-composer="Schumann"] & {
        top: calc(100% - .04em);
        left: 43%;
    }

    [data-composer="Rachmaninoff"] & {
        top: calc(100% - .05em);
    }

}

.couch-image-wrap {
    position: relative;
    z-index: 999;
    cursor: pointer;
    display: flex;

    img {
        position: relative;
        bottom: 0;
        left: 0;
        top: -7px;
        width: auto;
        max-width: 100%;
        height: auto;
        max-height: 100%;
        margin-top: auto;
    }
}

.couch-composer-name {
    position: absolute;
    top: calc(100% - 12px);
    color: #fff;
    left: 50%;
    transform: translateX(-50%) rotate(-3deg);
    font-size: .95vw;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 19px;
}

.modal-wrap {
    position: fixed;
    z-index: 99999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-bg {
    position: fixed;
    z-index: 9999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/background.png');
    background-position: center;
    background-size: cover;

    @media (max-width: 1000px) {
        background-image: url('/images/mobile-background.png');
    }
}

.page-modal-wrap {
    z-index: 9999999;

    @media (max-width: 1000px) {
        position: relative;
    }

    .arrow-right,
    .arrow-left {
        display: block;
        position: absolute;
        z-index: 999;
        top: 50%;
        transform: translateY(-50%);
        left: 10%;
        width: 25px;
        height: 25px;
        cursor: pointer;
        transition: opacity .2s ease;

        &:hover {
            opacity: .7;
        }
    }

    .arrow-right {
        left: auto;
        right: 10%;
    }

    .modal-content {
        text-align: justify;
        right: -17px;
    }
}

.video-modal-wrap {
    .modal-content {
        width: 100%;
    }
}

.photo-modal-wrap {
    .modal-content {
        margin-right: 1px;
    }
}

.modal {
    position: fixed;
    z-index: 99999999;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
    width: 68vw;
    height: 710px;
    background: transparent;
    display: block;
    overflow: hidden;

    @media (max-width: 1000px) {
        height: calc(100% - 130px) !important;
        max-height: calc(100% - 130px) !important;
        width: 100% !important;
        max-width: 100% !important;
        top: 130px !important;
        left: 0 !important;
        transform: none !important;

        .program-descriptions &,
        .psychiatric-practice &,
        .performances &,
        .harvard-medicine & {
            height: calc(100% - 125px) !important;
            max-height: calc(100% - 125px) !important;
            width: 100% !important;
            max-width: 100% !important;
            top: 125px !important;
            left: 0 !important;
            transform: none !important;
        }
    }

    .page-modal-wrap & {
        background-color: #000;
    }

    .video-modal-wrap & {
        @media(max-width: 1000px) {
            height: 100% !important;
            max-height: 100% !important;
            top: 0 !important;
        }
    }

    .iframe-container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;

        @media (max-width: 1000px) {
            top: 50%;
            transform: translateY(-50%);
        }
    }

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}

.modal-featured-image {
    position: relative;
    height: 100%;
    width: calc(100% + 60px);
    left: -30px;
    display: none;

    .harvard-medicine &,
    .news & {
        display: flex;
        flex-direction: column;
    }
}

.news-toc,
.toc {
    background-color: #fef5e6;
    padding: 20px 0;
    padding-bottom: 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 0 !important;
    font-family: 'Times New Roman', Times, serif;

    @media(max-width: 1000px) {
        padding-top: 15px;
    }

    h2, h3 {
        text-align: center;
        margin-bottom: 5px;
        margin-top: 0;
        font-weight: normal;
        font-family: 'Times New Roman', Times, serif;
    }

    h2 {
        font-size: 34px !important;

        @media(max-width: 1000px) {
            font-size: 22px !important;
        }
    }

    h3 {
        font-size: 20px !important;
        font-weight: normal;

         @media(max-width: 1000px) {
            font-size: 18px !important;
        }

        &.subtitle {
            font-size: 18px;
            margin-bottom: 15px;

            @media(max-width: 1000px) {
                font-size: 16px !important;
            }
        }
    }

    ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        list-style: none;
        margin-left: 0;
        margin-top: 15px;
        padding-left: 0;
    }

    li {
        font-size: 28px;
        margin-bottom: 5px;

        @media(max-width: 1000px) {
            font-size: 20px !important;
            line-height: 1.1;
            margin-bottom: 15px !important;
        }
    }

    li a {
        text-decoration: none;
        color: #000 !important;
        transition: opacity .2s ease;

        &:hover {
            opacity: .7 !important;
        }
    }
}

.news-toc {
    padding-top: 0;
    
    ul {
        margin-top: 0;
    }

    li {
        font-size: 24px;
        margin-bottom: 0;
    }
}

.modal-content {
    height: 100%;
    width: calc(100% - 135px);
    color: #000;

    .mobile-photo-container {
        display: none;
    }

    @media (max-width: 1000px) {
        right: 0 !important;
        width: 100% !important;

        .photo-modal-wrap & {                
            width: 100% !important;
            overflow-y: scroll;

            .tns-outer {
                display: none !important;
            }

            .mobile-photo-container {
                background-color: #fdf5e6;
                padding-top: 0;
                position: relative;
                z-index: 999;
                display: block;
                text-align: center;
                

                .slide {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 30px;
                    font-family: 'Times New Roman', Times, serif;
                    font-size: 24px;

                    img {
                        top: auto;
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
    }

    h2, h3 {
        line-height: 1.2;
    }


    .video-modal-wrap & {
        background: #000;
    }

    .page-modal-wrap & {
        position: relative;
        z-index: 9999;
        background-color: #000;
        font-family: Georgia, 'Times New Roman', Times, serif;
        padding-top: 25px;
        padding-bottom: 25px;

        @media (max-width: 1000px) {
            background-color: #fdf5e6;
        }

        .wp-block-image figcaption {
            margin-top: 5px;
        }

        .modal-content-inner-wrap {
            // width: 75%;
            width: calc(100% - 20px);
            height: 100%;
            margin: 0 auto;
            position: relative;
            // left: -5px;
            left: -7px;

            @media (max-width: 1000px) {
                width: 100%;
                left: 0;
            }
        }

        .modal-content-inner {
            width: 100%;
            height: 100%;
            padding: 0;
            font-size: 20px;
            padding-top: 20px;


            @media (max-width: 999px) {
                padding: 0 15px;
                font-size: 16px;
            }

            @media( max-width: 1000px) {
                padding-top: 15px;
                padding-bottom: 30px;
            }
        }

        .wp-block-group {

            &:last-of-type {
                @media(max-width: 1000px) {
                    padding-bottom: 50px !important;

                    &.usnews,
                    &.usnews-group {
                        padding-bottom: 0 !important;
                        margin-bottom: 0 !important;
                    }
                }
            }

            h2, h3 {
                font-family: 'Times New Roman', Times, serif;
            }

            h2 {
                font-size: 30px;
                margin-bottom: 0;
                margin-top: 0;
                font-weight: normal;

                &.subheading {
                    font-size: 22px;
                    margin-bottom: 10px;
                }

                &.program-title {
                    font-size: 24px;
                    margin-bottom: 20px;
                }
            }

            h3 {
                font-size: 22px;
                font-weight: normal;
                margin-top: 0;
            }

            a {
                color: #000 !important;

                &:hover {
                    color: rgba(0, 0, 0, .7) !important;
                }
            }

            .small-heading {
                font-size: 24px;
            }

            &.inner {
                position: relative;
                width: 75.5%;
                min-height: 100%;
                margin: 0 auto;
                background-color: #fef5e6;
                padding: 15px 60px;
                padding-bottom: 40px;

                @media (max-width: 1000px) {
                    width: 100%;
                    padding: 0 10px;
                    min-height: auto !important;
                    margin-bottom: 50px;
                }

                p:not(.has-text-align-center) {
                    text-align: justify;
                }

                &.news,
                &.nyt,
                &.no-padding-top {
                    padding-top: 0;
                }

                .harvard-first {
                    margin-top: 0;
                }
            }

            &.weill {
                background-color: #c3122f;
                color: #fff;

                h1, h2, h3 {
                    color: #fff;
                }
            }

            &.full-height {
                min-height: 100%;

                &.contact,
                &.bookings,
                &.psychiatric-practice {
                    margin-top:  0 !important;
                    padding-left: 80px;

                    @media(max-width: 1000px) {
                        padding-left: 0;
                    }

                    .wp-block-group__inner-container {
                        max-width: 800px;
                        margin: 0 auto;
                    }
                }

                &.bookings {
                    .wp-block-group__inner-container {
                        max-width: 900px;
                    } 
                }

            }

            &.full-width {
                background-color: #fef5e6;
                padding: 15px 30px;
                padding-bottom: 0;

                @media(max-width: 1000px) {
                    padding-left: 0;
                    padding-right: 0;
                }

                .inner {
                    position: relative;
                    padding-top: 0;
                    padding-bottom: 15px;
                    width: 80%;

                    @media(max-width: 1000px) {
                        width: 100%;
                    }

                    &:before,
                    &:after {
                        content: '';
                        height: 100%;
                        width: 150%;
                        position: absolute;
                        left: -150%;
                        top: 0;
                        background-color: #000;

                        @media(max-width: 1000px) {
                            display: none;
                        }
                    }

                    &:after {
                        left: auto;
                        right: -150%;
                    }

                    .text-left.mb-0 {
                        margin-bottom: 8px !important;
                        margin-top: 15px !important;
                    }

                    .wp-block-image {
                        display: flex;
                        width: calc(100% + 120px);
                        position: relative;
                        left: -60px;
                        margin: 0 0 30px;

                        img {
                            width: 100%;
                        }

                        &.us-news-image {
                            img {
                                margin: 0 auto;
                                width: 65% !important;
                            }

                            &:first-of-type {
                                margin-top: 30px !important;
                            }
        
                        }
                    }
                }
            }

        }

        .wp-block-image {
            &.featured-image {
                margin: 0;
                height: auto;
                width: calc(100% + 120px);
                left: -60px;
                position: relative;
            }

            &.creativity-pressure {
                margin-bottom: 20px !important;
                border-left: 1px solid #e8dbcb;
                border-right: 1px solid #e8dbcb;

                img {
                    margin-top: 20px !important;
                }
            }
        }

        .full-width-header {
            width: calc(100% + 60px);
            position: relative;
            left: -30px;

            img {
                width: 100%;
            }
        }
    }

    .page-modal-wrap.program-descriptions & {

        .inner {
            padding-top: 30px;

            @media(max-width: 1000px) {
                padding-top: 0;

                &#program-9 {
                    padding-bottom: 80px;
                }
            }

            h3, h2 {
                text-align: center;
                margin-bottom: 0;
                margin-top: 0;
                font-weight: normal;
                font-family: 'Times New Roman', Times, serif;
            }
        
            h2 {
                font-size: 34px;

                @media(max-width: 1000px) {
                    font-size: 26px !important;
                }

                &.subheading {
                    font-size: 22px;
                    margin-bottom: 10px;

                    @media(max-width: 1000px) {
                        font-size: 18px !important;
                    }
                }

                &.program-title {
                    font-size: 24px;
                    margin-bottom: 20px;

                    @media(max-width: 1000px) {
                        font-size: 20px !important;
                    }
                }
            }
        
            h3 {
                font-size: 20px !important;
                font-weight: normal;

                &.subtitle {
                    font-size: 18px;
                    margin-bottom: 30px;
                }
            }

            p {
                text-align: justify;
                margin-bottom: 20px;
            }
        }

    }

    .photo-modal-wrap & {
        background-color: #000;

        @media(max-width: 1000px) {
            background-color: #fdf5e6;
        }

    }

    .page-modal-wrap.harvard-medicine & {
        .modal-content-inner {
            @media (max-width: 1000px) {
                padding-top: 5px;
            }

            .composer img {
                max-height: 500px;
                width: auto;
                margin: 0 auto;
                display: block;

                @media( min-width: 1615px ) {
                    min-height: 500px;
                }
            }
        }

            
        .sticky-header {
            padding-left: 30px;
            padding-right: 30px;

            img {
                width: calc(100% - 40px);
                left: 20px;
                position: relative;
            }
        }
    }

    .page-modal-wrap.contact &,
    .page-modal-wrap.bookings &,
    .page-modal-wrap.psychiatric-practice & {
        width: 100%;
        right: 0;

        .wp-block-group {
            width: 100% !important;
        }

        .modal-controls {
            display: none;
        }
    }

	.header-image {
		display: flex;
		margin-bottom: 0;
        width: 100%;
        height: 100%;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
	}

	.sticky-header {
		position: sticky;
		top: 20px;
		left: 0;
		width: calc(100% + 120px);
        margin: 0 auto;
        margin-left: -60px;
        height: auto;

        @media(max-width: 1000px) {
            top: 126px;
        }

        img {
            width: 100%;
        }
	}

    .tns-ovh {
        overflow: hidden;
    }

    .tns-ovh,
    .tns-outer {
        display: flex;
        max-height: 100%;
    }

    .slideshow-container,
    .tns-item {
        height: 100%;
    }

    .tns-item {
        display: inline-flex !important;
        justify-content: center;
    }

    .slide img {
        position: relative;
        top: 20px;
        height: calc(100% - 40px);
        width: auto;
        margin: 0 auto;
        object-fit: contain;
        right: 6px;

        &:after {
            content: '';
            position: absolute;
            width: 6px;
            right: 0;
            top: 0;
            height: 100%;
            background-color: #000;
        }
    }

    .tns-controls,
    .tns-nav {
        position: absolute;
    }

    .modal-controls {
        position: fixed;
        z-index: 9999;
        top: 20px;
        right: 20px;
        height: calc(100% - 40px);
        width: 115px;
        color: #f2ce9e;
        background-color: #000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        line-height: 1.3;
        padding-left: 12px;
        text-align: center;
       	font-family: Arial,sans-serif; 

        @media ( max-width: 1000px ) {
            display: none !important;
        }

        .scrollbar-border {
            content: '';
            position: absolute;
            display: block;
            left: 0;
            top: 0;
            height: 100%;
            width: 12px;
            background-image: url('/images/modal-controls-border.png');
            background-size: cover;
        }

        .next-article {
            margin-bottom: 50px;
        }

        a, a:hover {
            color: #f2ce9e;
            text-decoration: none;
        }
    }

    .photo-modal-wrap & {
        .modal-controls {

            &:before {
                content: '';
                position: absolute;
                z-index: 99999999;
                top: 0;
                left: -8px;
                height: 100%;
                width: 8px;
                background-color: #000;
            }

            
            @media( max-width: 1100px ) {
                .slide-count {
                    margin-top: 20px;
                }

                .download-slide {
                    margin-bottom: 20px;
                }

                .slideshow-controls .next img, 
                .slideshow-controls .prev img {
                    width: 25px;
                }
            }

            @media ( max-width: 1000px ) {
                display: none !important;

                .slide-count,
                .download-slide {
                    display: none;
                }
            }
        }
    }

    .page-modal-wrap.harvard &,
    .page-modal-wrap.news & {

        a, a:hover {
            color: #f2ce9e;
        }

    }

    .slide-count {
        text-align: center;
        margin-top: 50px;
        cursor: pointer;
    }
    
    .slideshow-controls {
        cursor: pointer;
        display: flex;
        flex-direction: column;

        img {
            width: 30px;
        }

        .next {
            img {
                width: 34px;
            }
        }

        span {
            display: flex;
            align-items: center;

            &:first-of-type {
                margin-bottom: 45px;
            }
        }
    }

    .page-modal-wrap & .slideshow-controls {

        .prev,
        .next {
            position: relative;
            display: block;

            img {
                height: 29px;
                width: 55px;
                margin: 0 auto;
            }
        }

        .prev {
            img {
                margin-bottom: 10px;
            }
        }

        .next {
            img {
                margin-top: 15px;
            }
        }

    }

    .download-slide,
    .download-article {
        appearance: none;
        background: none;
        margin: 0;
        padding: 0;
        border: none;
        margin-bottom: 50px;
        margin-left: 30px;
        margin-right: 30px;
        cursor: pointer;
    }

    .download-article {
        position: absolute;
        bottom: 0;
        right: 15px;
        margin-right: 15px;
        display: none;

        img {
            width: 43px;
            height: 40px;
        }
    }

    .program-descriptions & {
        // .download-article {
        //     display: block;
        // }

        .slide-count,
        .next-article {
            display: none;
        }

        .modal-controls {
            justify-content: center;
        }
    }

    .harvard-medicine &,
    .bio &,
    .bookings &,
    .performances &,
    .psychiatric-practice &,
    .contact & {
        .slide-count,
        .next-article {
            display: none;
        }
    }

    .news &,
    .photo-modal-active & {
        .modal-controls {
            justify-content: space-between;
        }
    }

    .news & {
        .next-article {
            display: block;
        }
    }

    .ludwig figure {
        display: flex;
        justify-content: center;

        img {
            width: 600px;
            max-width: 80%;
        }
    }

    h2, h3, h4 {
        color: #000;
    }

    .wp-block-image figcaption {
        margin-top: 0;
        font-size: 16px;
        text-align: center;
    }

    a {
        text-decoration: underline;
        color: #000;

        &:hover {
            color: rgba(0, 0, 0, .7);
        }
    }

    .hindustan-logo {
        figure {
            margin: 0;
        }
    }

    .hindustan-logo,
    .hindustan-logo img {
        width: 340px;
        height: auto;
        margin: 0 auto;
    }

    .hindustan-featured-image {
        margin-top: 0;
        padding: 0 60px;
    }

    .featured-image-wrap {
        background-color: #fef5e6;
    }

    .sa-express {
        figure {
            margin-bottom: 0;
        }
    }

    .sa-heading {
        font-size: 26px;
    }

    .sa-subheading {
        font-size: 16px;
    }

}

.modal-border,
.mobile-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    span {
        position: absolute;
        z-index: 999999;
        background-size: cover;
    }

    .top {
        top: 0;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 20px;
        background-image: url('/images/border-top.png');

        @media (max-width: 1000px) {
            background-image: url('/images/mobile-frame-top.png');
            height: 5px;
        }
    }
    
    .bottom {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20px;
        background-image: url('/images/border-bottom.png');

        @media (max-width: 1000px) {
            background-image: url('/images/mobile-frame-bottom.png');
            height: 5px;
        }
    }
    
    .left {
        top: 0;
        left: 0;
        width: 20px;
        height: 100%;
        background-image: url('/images/border-left.png');

        @media (max-width: 1000px) {
            background-image: url('/images/mobile-frame-left.png');
            width: 5px;
        }
    }
    
    .right {
        top: 0;
        right: 0;
        width: 20px;
        height: 100%;
        background-image: url('/images/border-right.png');

        @media (max-width: 1000px) {
            background-image: url('/images/mobile-frame-right.png');
            width: 5px;
        }
    }

    .top-right {
        content: '';
        position: absolute;
        z-index: 99999999;
        height: 49px;
        width: 49px;
        top: 2px;
        right: 0;
        background-image: url('/images/border-top-right.png');
        background-size: 100%;
        display: block;

        @media (max-width: 1000px) {
            display: none;
        }
    }

    .bottom-right {
        content: '';
        position: absolute;
        z-index: 99999999;
        height: 49px;
        width: 49px;
        bottom: 2px;
        right: 0;
        background-image: url('/images/border-bottom-right.png');
        background-size: 100%;
        display: block;

        @media (max-width: 1000px) {
            display: none;
        }
    }
}

.mobile-modal {

    .right, .left, .top, .bottom {
        position: fixed;
    }

    .top {
        top: 121px;
    }

    .right, .left {
        height: 100vh;
        top: 121px;
    }

    .bottom {
        bottom: 0;
        width: 100vw;
    }
}

.close-modal,
.close-modal-mobile {
    position: absolute;
    z-index: 99999999999;
    top: -26px;
    right: 0;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    transition: opacity .2s ease;
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1000px) {
        display: none;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .page-modal-active &,
    .photo-modal-active & {
        top: -30px;
        right: 0;
    }

    &:hover {
        opacity: .7;
    }
}

.close-modal-mobile {
    @media(max-width: 1000px) {
        display: block !important;
        top: 10px !important;
        right: 10px !important;
    }
}

.hamburger-menu-mobile {
    display: none;

    @media(max-width: 1000px) {
        display: block !important;
        position: absolute;
        z-index: 999999999;
        top: 10px !important;
        left: 10px !important;
        height: 20px;
        width: 28px;
    }

}

.harvard-image {

    @media (max-width: 1100px) {
        height: auto;
    }

}

.home-menu {
    position: absolute;
    z-index: 9999;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 0;
    margin-left: 0;
    display: none;

    @media(min-width: 1001px) {
        display: block !important;
    }

    @media (max-width: 1000px) {
        position: relative;
        top: 0;
        transform: none;

        .mobile-video-nav-active & {
            display: block !important;    
        }

        &.composer-menu {
            right: 0;
            text-align: center;
            margin-top: 15px;
            margin-bottom: 0;

            ul li:last-of-type() {

            }
        }
    }

    .video-modal-active .home-wrapper &,
    .page-modal-active .home-wrapper &,
    .photo-modal-active .home-wrapper & {
        display: none !important;
    }

    li, a {
      list-style: none;
      margin-bottom: 4vh;
      font-family: 'Times New Roman', Times, serif;
      font-size: 43px;
      font-size: 2.2vw;
      color: #dca80b;
      text-decoration: none;
      cursor: pointer;

      @media (max-width: 1000px) {
          font-size: 22px;
          color: #f2ce9e;
      }

      &:last-of-type {
          margin-bottom: 0;
      }

      &.router-link-active {
          color: #fff;
      }

      &:hover,
          &.active,
          &.selected {
            color: #fff;
      }
    }

    &.page-menu {
      text-align: left;
    }

    &.page-menu li:nth-last-of-type(2) {

        @media(min-width: 1001px) {
            margin-bottom: 0;
        }

    }

    &.modal-menu {
        li, a {
            color: #463c23;

            &:hover,
            &.router-link-active {
                color: #dca80b;
            }
        }
    }
}

.composer-menu {
    right: 65px;
	text-align: right;

    &.video-menu li a[data-active="yes"] {
        color: #fff;
    }
    
    &.modal-menu li a[data-active="yes"] {
        color: #dca80b;
    }
}

.page-menu {
	left: 65px;

    .mobile {
        display: none;
    }

    @media (max-width: 1000px) {
        transform: none;
        position: fixed;
        z-index: 9999999;
        overflow-y: scroll;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        padding: 50px;
        padding-top: 90px;
        padding-bottom: 80px;
        text-align: center;

        .mobile {
            display: block;
        }
    }
}

@-webkit-keyframes pulsate {
    0% { 
        opacity: 0;
    }
    50% { 
        opacity: 1.0;
    }
    100% { 
        opacity: 0;
    }
}

.contact-link {
    position: fixed;
    z-index: 99999;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1.8em;
    font-family: 'Times New Roman', Times, serif;
    font-size: 25px;
    transition: color .2s ease;

    .modal-wrap & {
        color: #dca80b;

        &.router-link-active,
        &:hover {
            color: #fff;
        }
    }

    @media(max-width: 1000px) {
        display: none;
    }

    &:hover {
        color: #fff;
    }
}

/** Helpers **/
.mt-0 {
    margin-top: 0 !important;
}

.mt-1 {
    margin-top: 15px !important;
}

.mt-2 {
    margin-top: 30px !important;
}

.mb-0 {
    margin-bottom: 0 !important;
}

.mb-1 {
    margin-bottom: 15px !important;
}

.mb-2 {
    margin-bottom: 30px !important;
}

.text-left {
    text-align: left;
}

.dropcap:first-child:first-letter {
    float: left;
    font-size: 75px;
    line-height: 40px;
    padding-top: 10px;
    padding-right: 5px;
    padding-bottom: 5px;
}

/** Scroll Bar **/
[data-simplebar] {
    position: relative;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
  }
  
  .simplebar-wrapper {
    overflow: hidden;
    width: inherit;
    height: inherit;
    max-width: inherit;
    max-height: inherit;
  }
  
  .simplebar-mask {
    direction: inherit;
    position: absolute;
    overflow: hidden;
    padding: 0;
    margin: 0;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: auto !important;
    height: auto !important;
    z-index: 0;
  }
  
  .simplebar-offset {
    direction: inherit !important;
    box-sizing: inherit !important;
    resize: none !important;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0;
    margin: 0;
    -webkit-overflow-scrolling: touch;
  }
  
  .simplebar-content-wrapper {
    direction: inherit;
    box-sizing: border-box !important;
    position: relative;
    display: block;
    height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */
    width: auto;
    max-width: 100%; /* Not required for horizontal scroll to trigger */
    max-height: 100%; /* Needed for vertical scroll to trigger */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .simplebar-content-wrapper::-webkit-scrollbar,
  .simplebar-hide-scrollbar::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  
  .simplebar-content:before,
  .simplebar-content:after {
    content: ' ';
    display: table;
  }
  
  .simplebar-placeholder {
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    pointer-events: none;
  }
  
  .simplebar-height-auto-observer-wrapper {
    box-sizing: inherit !important;
    height: 100%;
    width: 100%;
    max-width: 1px;
    position: relative;
    float: left;
    max-height: 1px;
    overflow: hidden;
    z-index: -1;
    padding: 0;
    margin: 0;
    pointer-events: none;
    flex-grow: inherit;
    flex-shrink: 0;
    flex-basis: 0;
  }
  
  .simplebar-height-auto-observer {
    box-sizing: inherit;
    display: block;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 1000%;
    width: 1000%;
    min-height: 1px;
    min-width: 1px;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
  }
  
  .simplebar-track {
    z-index: 1;
    position: absolute;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
  }
  
  [data-simplebar].simplebar-dragging .simplebar-content {
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
  
  [data-simplebar].simplebar-dragging .simplebar-track {
    pointer-events: all;
  }
  
  .simplebar-scrollbar {
    position: absolute;
    left: 0;
    right: 0;
    min-height: 10px;
  }
  
  .simplebar-scrollbar:before {
    position: absolute;
    content: '';
    background-color: #966419;
    border-radius: 7px;
    left: 2px;
    right: 2px;
    opacity: 0;
    transition: opacity 0.2s linear;
  }
  
  .simplebar-scrollbar.simplebar-visible:before {
    /* When hovered, remove all transitions from drag handle */
    opacity: 1;
    transition: opacity 0s linear;
  }
  
  .simplebar-track.simplebar-vertical {
    top: 0;
    width: 11px;
  }
  
  .simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
    top: 2px;
    bottom: 2px;
  }
  
  .simplebar-track.simplebar-horizontal {
    left: 0;
    height: 11px;
  }
  
  .simplebar-track.simplebar-horizontal .simplebar-scrollbar:before {
    height: 100%;
    left: 2px;
    right: 2px;
  }
  
  .simplebar-track.simplebar-horizontal .simplebar-scrollbar {
    right: auto;
    left: 0;
    top: 2px;
    height: 7px;
    min-height: 0;
    min-width: 10px;
    width: auto;
  }
  
  /* Rtl support */
  [data-simplebar-direction='rtl'] .simplebar-track.simplebar-vertical {
    right: auto;
    left: 0;
  }
  
  .hs-dummy-scrollbar-size {
    direction: rtl;
    position: fixed;
    opacity: 0;
    visibility: hidden;
    height: 500px;
    width: 500px;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  
  .simplebar-hide-scrollbar {
    position: fixed;
    left: 0;
    visibility: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

/** Custom **/
.simplebar-scrollbar {
    z-index: 9999999;
}
.simplebar-scrollbar::before {
    background-color: #956418;
    z-index: 9999999;
    opacity: 1 !important;
    height: 60px;
    border-radius: 40%;

    @media (max-width: 1000px) {
        height: 30px !important;
        margin-left: 4px;
        width: 7px;
    }
}

.simplebar-track.simplebar-vertical {
    top: 16px;
    width: 16px;
    right: 3px;
    bottom: 20px;
    z-index: 999999;

    .simplebar-scrollbar {
        height: 60px !important;
    }
}

.simplebar-content {
    padding-top: 0 !important;
    height: 100%;
}

.simplebar-content-wrapper {
    overflow-x: hidden !important;
}

.full-width img {
    width: 100% !important;
}

.wp-block-image.size-large.half-image img {
    margin: 0 auto !important;
    width: 65% !important;
}

.wp-block-image.la-times-logo {
    figure {
        margin-bottom: 5px;
    }
}

#program-toc {
    @media (max-width: 1000px) {
        min-height: auto !important;
    }
}

.toc-link {
    margin-top: 30px;
    margin-bottom: 30px;
    line-height: 1;
    position: fixed;
    z-index: 10;
    bottom: -10px;
    left: 0;
    width: calc(100% - 125px);
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    opacity: 0;
    transition: opacity .2s ease;

    @media(max-width: 1000px) {
        width: 100%;
        margin-bottom: 15px;
        height: 45px;
    }
}

.toc-link a {
    color: #f2ce9e;
    text-decoration: none;
    transition: opacity .2s ease;

    &:hover {
        opacity: .7;
        color: #f2ce9e;
    }
}

.performance {
    p {
        margin-top: 0;
        margin-bottom: 0;
        text-align: left !important;
    }

    &.past p {
        color: rgba(0, 0, 0, .5);
    }
}

.aligncenter {
    text-align: center;
}

.booking-cols {
    display: flex;

    .performance.centered {
        justify-self: center;
        flex-basis: auto !important;
        margin: 0 auto;
    }

    a {
        text-decoration: none;
    }
}

.modal-loading {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #fef5e6;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bio-pl {
    padding-left: 50px;

    a {
        text-decoration: none;
    }
}

.no-link-style a {
    text-decoration: none;
}

/** Mobile */
.composers-mobile-wrap {
    min-height: 100vh;
    display: flex;
    position: relative; 
    padding: 40px 0;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 25px;
    background-color: #000;

    @media(min-width: 1001px) {
        display: none;
    }
}

.composers-mobile {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 0;
}

.mobile-nav-wrap {
    position: fixed;
    z-index: 999999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url('/images/mobile-nav-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    overflow-y: scroll;
    text-align: center;
    -webkit-text-size-adjust: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    @media ( min-width: 1001px ) {
        display: none;
    }

    h1, h2, h3 {
        color: #fff;
        margin-bottom: 0;
        font-family: 'Times New Roman', Times, serif;
        font-weight: normal;
        -webkit-text-size-adjust: 100%;
    }

    h1 {
        font-size: 36px;
        margin-top: 15px;

        @media(max-height: 615px) {
            margin-top: 10px;
            font-size: 34px !important;
        }
    }

    h2, h3 {
        text-transform: uppercase;
    }

    h2 {
        font-size: 28px;
        margin-top: 5px;

        @media(max-height: 615px) {
            font-size: 22px !important;
        }
    }

    h3 {
        color: #fec6ad;
        font-size: 22px;
        font-weight: normal;
        margin-top: 5px;
        line-height: 1.2;
        margin-top: 15px;
        margin-bottom: 250px;
    }

    .page-menu {
        display: block !important;
        position: relative;
        background-color: transparent;
        overflow-y: initial;
        padding-top: 10px;
        padding-bottom: 0;
        margin-bottom: 30px;
        height: auto;

        li {
            text-align: center;
            margin-bottom: 8px;

            &:last-of-type {
                position: relative;
                
                &:after {
                    content: '';
                    position: absolute;
                    bottom: -13px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 135px;
                    height: 1px;
                    background-color: #e39c68;
                }
            }
        }

        li a {
            color: #e39c68 !important;

            &:hover {
                color: #e39c68 !important;
            }
        }
    }

    .composer-menu {
        margin-bottom: 30px;

        li {
            text-align: center;
            margin-bottom: 10px;

            &:last-of-type {
                position: relative;
                
                &:after {
                    content: '';
                    position: absolute;
                    bottom: -13px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 135px;
                    height: 1px;
                    background-color: #e39c68;
                }
            }
        }
    }

    &.video {
        h2 {
            font-size: 30px;
            text-transform: none;
            line-height: 1.2;
        }

        .home-menu {

            li a {
                color: #e39c68 !important;
                    
                &:hover {
                    color: #e39c68 !important;
                }
            }
        }
    }
}

body.mobile-nav-active {
    overflow: hidden;
}

.hidden-mobile {
    @media(max-width: 1000px) {
        display: none !important;
    }
}

.mobile-page-header {
    background-image: url('/images/mobile-menu-header.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding-top: 15px;
    padding-bottom: 20px;
    position: fixed;
    z-index: 999999999;
    top: 0;
    left: 0;
    width: 100%;

    @media (min-width: 1001px) {
        display: none;
    }

    h1, h2 {
        color: #fff;
        text-align: center;
        margin-top: 0;
        margin-bottom: 0;
        font-family: 'Times New Roman', Times, serif;
        font-weight: normal;
    }

    h2 {
        text-transform: uppercase;
        font-size: 24px;
        margin-top: 5px;

        @media(max-width: 370px) {
            font-size: 22px;
        }
    }

    // .program-descriptions &,
    // .performances &,
    // .psychiatric-practice &,
    // .harvard-medicine & {
    //     h2 {
    //         font-size: 24px;

    //         @media(max-width: 370px) {
    //             font-size: 22px;
    //         }
    //     }
    // }
}

.mobile-toggles {
    position: absolute;
    top: 95px;
    left: 0;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;

    img {
        padding: 0 10px;
    }
}

.wp-block-spacer.mobile {
    @media(max-width: 1000px) {
        display: none;
    }
}

/** Mobile Modal */
.modal-wrap-mobile {
    display: none;

    @media (max-width: 1000px) {
        display: block;
    }

    .modal-border {
        position: fixed;
        top: 124px;
        height: calc(100vh - 124px);
    }
}

.modal {
    @media (max-width: 1000px) {
        display: none;

        .photo-modal-wrap &,
        .video-modal-wrap & {
            display: block;
        }
    }
}

.mobile-modal-content {
    background-color: #fef5e6;
    padding-top: 124px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 60px;
    min-height: 100vh;
    text-align: justify;

    .sticky-header {
		position: sticky;
		top: 126px;
		left: 0;
		width: calc(100% + 50px);
        margin: 0 auto;
        margin-left: -25px;
        height: auto;

        img {
            width: 100%;
        }
	}

    .harvard-medicine & {
        .sticky-header {
            margin-left: -20px;
            width: calc(100% + 40px);
        }
    }

    .modal-content-inner {
        padding-top: 15px;
    }

    .bookings,
    .psychiatric-practice,
    .contact {
        margin-top: 0 !important;
    }

    h2, h3 {
        font-family: 'Times New Roman', Times, serif;
    }

    h2 {
        font-size: 30px;
        margin-bottom: 0;
        margin-top: 0;
        font-weight: normal;

        &.subheading {
            font-size: 22px;
            margin-bottom: 10px;
        }

        &.program-title {
            font-size: 24px;
            margin-bottom: 20px;
        }

        @media(max-width: 1000px) {
            font-size: 26px !important;
            line-height: 1.2;
        }

        &.subheading {
            font-size: 22px;
            margin-bottom: 10px;

            @media(max-width: 1000px) {
                font-size: 18px !important;
            }
        }

        &.program-title {
            font-size: 24px;
            margin-bottom: 20px;

            @media(max-width: 1000px) {
                font-size: 20px !important;
            }
        }
    }

    h3 {
        font-size: 22px;
        font-weight: normal;
        margin-top: 0;
    }

    a {
        color: #000 !important;

        &:hover {
            color: rgba(0, 0, 0, .7) !important;
        }
    }
    
    .toc-link a {
        color: #f2ce9e !important;

        &:hover {
            color: #f2ce9e !important;
        }

    }

    .small-heading {
        font-size: 24px;
    }

    .program-descriptions & {
        .wp-block-group {
            @media (max-width: 1000px) {
                min-height: auto !important;
                margin-top: 50px !important;
            }
        }

        #program-toc {
            @media(max-width: 1000px) {
                margin-top: 0px !important;
                padding-top: 0px;
            }
        }
    }
}

.page-modal-wrap #article-1.usnews .modal-featured-image {
    display: none;
}

@media (max-width: 1000px) {
    span.break,
    span.italics {
        display: block;
        position: relative;
    }

    span.italics {
        font-style: italic;
    }
}

.news-toc {

    @media(min-width: 1001px) {
        ul li {
            line-height: 1.15;
            margin-bottom: 15px;
        }

        span.break {
            display: inline-block !important;
        
            &:nth-of-type(2) {
                padding-left: 5px;
            }

        }
    }

    span.break,
    span.italics {
        display: block;
        position: relative;
    }

    span.italics {
        font-style: italic;
    } 
}

</style>