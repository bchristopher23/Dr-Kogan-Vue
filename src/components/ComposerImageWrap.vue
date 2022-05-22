<template>
    <div class="composer-image-wrap" @mouseenter="composerMouseEnter" @mouseleave="composerMouseLeave" :data-composer="composer" v-bind:class="{ active: this.isActive }">
        <img class="play-video" src="/images/play-video.png">
        <img class="composer-image" :src="`/images/composers/${composer}.png`" :alt="composer" />
        <p class="composer-name">{{ composer }}</p>
    </div>
</template>

<script>
import $ from 'jquery'
import store from '../store'

export default {
    name: 'ComposerImageWrap',
    props: {
        composer: ''
    },
    computed: {
        activeComposer() {
            return store.state.activeComposer;
        },
        isActive() {
            return this.activeComposer == this.composer ? true : false;
        }
    },
    methods: {
        composerMouseEnter(e) {

            store.dispatch( 'updateHeadlineSrc', '/images/headline-alt.png' );

            if ( this.activeComposer == '' ) {
                $('.select-composer').css('display', 'flex');
                $('.composer-menu a[data-composer="' + e.target.dataset.composer + '"]').css('color', '#fff');
            }
        },
        composerMouseLeave(e) {

            if ( this.activeComposer == '' ) {
                store.dispatch( 'updateHeadlineSrc', '/images/headline.png' );
            }

            $('.composer-menu a[data-composer="' + e.target.dataset.composer + '"]').removeAttr('style');
            $('.select-composer').hide();
        },
    }
}
</script>

<style scoped lang="scss">

</style>