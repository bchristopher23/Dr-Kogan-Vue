<template>
    <div class="headline-wrap">
        <h1 class="sr-text">Dr. Richard Kogan</h1>
        <h2 class="sr-text">Psychiatrist at the Keyboard Composers on the Couch</h2>
        <h2 class="sr-text">Live Concert Lectures</h2>
        <h3 class="sr-text">The minds and music of great composers</h3>
        <img class="headline" :src="imageSrc">
    </div>
</template>

<script>
export default {
    name: 'HeadlineWrap',
    props: {
        imageSrc: ''
    }
}
</script>

<style scoped lang="scss">
    .sr-text {
        position: absolute;
        visibility: hidden;
    }

</style>