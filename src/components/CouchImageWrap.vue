<template>
    <div class="couch-image-wrap" @click="openVideo">
        <div v-if="this.$store.state.activeComposer != ''">
            <img class="couch-image" :src="`/images/composers/${composer}-Couch.png`" :alt="composer" />
            <p class="couch-composer-name">{{ composer }}</p>
        </div>
    </div>
</template>

<script>
import store from '../store'

export default {
    name: 'CouchImageWrap',
    props: {
        composer: ''
    },
    computed: {
        activeComposer() {
            return store.state.activeComposer;
        },
        isActive() {
            return store.state.activeComposer == this.composer ? true : false;
        }
    },
    methods: {
        openVideo() {
            if ( this.activeComposer != '' ) {
                this.$store.dispatch( 'updateActiveModal', 'video' );
            }
        }
    }
}
</script>

<style scoped lang="scss">

</style>