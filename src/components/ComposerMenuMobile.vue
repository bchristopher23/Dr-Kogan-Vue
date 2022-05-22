<template>
    <ul class="home-menu composer-menu video-menu" v-bind:class="{'modal-menu': isModal}" @click="handleClick" @mouseenter="menuMouseEnter" @mouseleave="menuMouseLeave">
        <li><router-link :to="getVideoLink('Tchaikovsky')" @mouseenter.native="composerMouseEnter" @mouseleave.native="composerMouseLeave" :data-active="this.activeComposer == 'Tchaikovsky' ? 'yes' : 'no'" data-composer="Tchaikovsky" data-video="https://player.vimeo.com/video/569005125">Tchaikovsky</router-link></li>
        <li><router-link :to="getVideoLink('Beethoven')" @mouseenter.native="composerMouseEnter" @mouseleave.native="composerMouseLeave" :data-active="this.activeComposer == 'Beethoven' ? 'yes' : 'no'" data-composer="Beethoven" data-video="https://player.vimeo.com/video/569005582">Beethoven</router-link></li>
        <li><router-link :to="getVideoLink('Bernstein')" @mouseenter.native="composerMouseEnter" @mouseleave.native="composerMouseLeave" :data-active="this.activeComposer == 'Bernstein' ? 'yes' : 'no'" data-composer="Bernstein" data-video="https://player.vimeo.com/video/569000563">Bernstein</router-link></li>
        <li><router-link :to="getVideoLink('Gershwin')" @mouseenter.native="composerMouseEnter" @mouseleave.native="composerMouseLeave" :data-active="this.activeComposer == 'Gershwin' ? 'yes' : 'no'" data-composer="Gershwin" data-video="https://player.vimeo.com/video/569006391">Gershwin</router-link></li>
        <li><router-link :to="getVideoLink('Joplin')" @mouseenter.native="composerMouseEnter" @mouseleave.native="composerMouseLeave" :data-active="this.activeComposer == 'Joplin' ? 'yes' : 'no'" data-composer="Joplin" data-video="https://player.vimeo.com/video/569006259">Joplin</router-link></li>
        <li><router-link :to="getVideoLink('Mozart')" @mouseenter.native="composerMouseEnter" @mouseleave.native="composerMouseLeave" :data-active="this.activeComposer == 'Mozart' ? 'yes' : 'no'" data-composer="Mozart" data-video="https://player.vimeo.com/video/569004022">Mozart</router-link></li>
        <li><router-link :to="getVideoLink('Chopin')" @mouseenter.native="composerMouseEnter" @mouseleave.native="composerMouseLeave" :data-active="this.activeComposer == 'Chopin' ? 'yes' : 'no'" data-composer="Chopin" data-video="https://player.vimeo.com/video/569004614">Chopin</router-link></li>
        <li><router-link :to="getVideoLink('Schumann')" @mouseenter.native="composerMouseEnter" @mouseleave.native="composerMouseLeave" :data-active="this.activeComposer == 'Schumann' ? 'yes' : 'no'" data-composer="Schumann" data-video="https://player.vimeo.com/video/569005822">Schumann</router-link></li>
        <li><router-link :to="getVideoLink('Rachmaninoff')" @mouseenter.native="composerMouseEnter" @mouseleave.native="composerMouseLeave" :data-active="this.activeComposer == 'Rachmaninoff' ? 'yes' : 'no'" data-composer="Rachmaninoff" data-video="https://player.vimeo.com/video/569006167">Rachmaninoff</router-link></li>
    </ul>
</template>

<script>
import $ from 'jquery'
import store from '@/store';

export default {
    name: 'ComposerMenu',
    computed: {
        activeComposer() {
            return this.$store.state.activeComposer;
        },
        isActive() {
            return this.activeComposer == this.composer ? true : false;
        },
        isVideoLink() {
            return this.$store.state.activeComposer != '' ? true : false;
        },
        isModal() {
            return this.$store.state.activeModal != '' ? true : false;
        }
    },
    methods: {
        composerMouseEnter(e) {
            $('.composer-image-wrap[data-composer="' + e.target.dataset.composer + '"]').addClass('hovered');

        },
        composerMouseLeave(e) {
            $('.composer-image-wrap[data-composer="' + e.target.dataset.composer + '"]').removeClass('hovered');
        },
        menuMouseEnter(e) {
            store.dispatch( 'updateHeadlineSrc', '/images/headline-alt.png' );
            if ( this.activeComposer == '' ) {
                $('.select-composer').css('display', 'flex');
            }

        },
        menuMouseLeave(e) {
            $('.select-composer').hide();
            if ( this.activeComposer == '' ) {
                store.dispatch( 'updateHeadlineSrc', '/images/headline.png' );
            }
        },
        getVideoLink(composer) {
            return '/composers/' + composer + '#video';
        },
        handleClick(e) {

            if ( e.target.matches('.composer-menu li a')) {

                $('.select-composer').hide();

            }

        }
    }
}
</script>

<style scoped lang="scss">

</style>
