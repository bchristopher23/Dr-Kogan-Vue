<template>
    <nav>
        <ul class="home-menu page-menu" v-bind:class="{'modal-menu': isModal}">
            <li><router-link to="/pages/program-descriptions" data-page-id="172" class="page-link">Program Descriptions</router-link></li>
            <li><router-link to="/pages/harvard-medicine" data-page-id="45" class="page-link">Harvard Medicine</router-link></li>
            <li><router-link to="/pages/videos">Videos</router-link></li>
            <li><router-link to="/pages/photos">Photos</router-link></li>
            <li><router-link to="/pages/news" data-page-id="22" class="page-link">News</router-link></li>
            <li><router-link to="/pages/bio" data-page-id="220" class="page-link">Bio</router-link></li>
            <li><router-link to="/pages/bookings" data-page-id="222" class="page-link">Bookings</router-link></li>
            <li><router-link to="/pages/performances" data-page-id="234" class="page-link">Performances</router-link></li>
            <li><router-link to="/pages/psychiatric-practice" data-page-id="225" class="page-link">Psychiatric Practice</router-link></li>
            <li><router-link to="/pages/contact" data-page-id="382" class="mobile page-link">Contact</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'PageMenu',
    computed: {
        isModal() {
            return this.$store.state.activeModal != '' ? true : false;
        }
    }
}
</script>

<style scoped lang="scss">

</style>
