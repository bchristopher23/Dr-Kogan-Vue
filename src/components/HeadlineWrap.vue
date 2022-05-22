<template>
    <div class="headline-wrap">
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

</style>