<template>
    <div class="video-modal-wrap modal-wrap" @click="handleClick">
        <PageMenu/>
        <ModalHeadlineWrap/>
        <img src="/images/close.png" class="close-modal" alt="Close Modal">
        <img src="/images/mobile-hamburger.png" class="hamburger-menu-mobile" alt="Return to Menu" @click="this.closeMobileNav">
        <img src="/images/mobile-x.png" class="close-modal-mobile" alt="Close Modal">
        <div class="modal">
            <div class="modal-content">
                <div class="iframe-container">
                    <iframe id="c_video" onload="this.width=screen.width;this.height=screen.height;this.contentWindow.focus();" :src="`${video}?autoplay=1`" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen autplay muted></iframe>
                </div>
            </div>
        </div>
        <router-link to="/pages/contact" class="contact-link" data-page-id="382">Contact</router-link>
        <ComposerMenu/>
    </div>
</template>

<script>
import $ from 'jquery';
import Player from '@vimeo/player';
import ComposerMenu from '../components/ComposerMenu.vue'
import PageMenu from '../components/PageMenu.vue'
import ModalHeadlineWrap from '../components/ModalHeadlineWrap.vue'
import router from '@/router';

let player;

export default {
    name: 'VideoModal',
    components: {
        PageMenu,
        ComposerMenu,
        ModalHeadlineWrap
    },
    props: {
        video: ''
    },
    metaInfo() {
        return {
            title: this.$store.state.activeComposer,
        };
    },
    mounted() {

        setTimeout(function() {
            var iframe = $("#c_video")[0];
            iframe.contentWindow.focus();
        }, 100);

        player = new Player( 'c_video' );

        player.on('ended', function() {

            router.push('/home');
            this.$store.dispatch( 'updateVideoActive', false );
            this.$store.dispatch( 'updateActiveModal', '' );
            this.$store.dispatch( 'updateActiveComposer', '' );
            
        });

        // Position X Button
        positionClose();

        $(window).resize(function() {

            positionClose();

        });

        function positionClose() {
            // Position X Button
            let modal = $('.modal');

            if ( modal.length > 0 ) {
                let close = $('.close-modal'),
                    right = modal.position().left,
                    top = modal.position().top - 28;
            
                close.css( { right: right + 'px', top: top + 'px'} );
            }
        }

    },
    beforeDestroy() {
        player.destroy().then(function() {
        });
    },
    methods: {
        handleClick(e) {
            // Close Video
            if ( e.target.matches( '.video-modal-wrap' ) || e.target.matches( '.modal-headline' ) || (e.target.matches( '.modal-headline' )) ) {
                this.$store.dispatch( 'updateActiveComposer', '' );
                this.$store.dispatch( 'updateActiveModal', '' );
                this.$store.dispatch( 'updateVideoActive', false );
                this.$router.push( '/home' );
            }

        },
        closeMobileNav() {
            this.$store.dispatch( 'updateMobileNavActive', false );
            this.$store.dispatch( 'updateVideoNavActive', false );
            this.$router.push( '/home' );
        },
    }
}
</script>

<style scoped lang="scss">

</style>