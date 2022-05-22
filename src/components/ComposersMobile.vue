<template>
    <div class="composers-mobile-wrap">
        <div class="composers-mobile">

            <div class="composers-mobile-header">
                <h1>Richard Kogan, MD</h1>
                <h2>The Minds and Music <br>of <br>Great Composers</h2>
                <div class="composers-mobile-links">
                    <button class="mobile-page-menu-btn"  @click="this.toggleNav">Live Concert Lectures</button>
                    <button class="mobile-video-menu-btn" @click="this.toggleVideoNav">Concert Lecture Videos</button>
                </div>
            </div>

            <div class="composers-mobile-image">
                <img src="/images/splash-bg-mobile3.jpg" alt="Dr. Richard Kogan">
            </div>

        </div>
    </div>
</template>

<script>
import ComposerImageWrap from './ComposerImageWrap.vue'
import store from '@/store';
import $ from 'jquery'

export default {
    name: 'ComposersMobile',
    	computed: {

	},
    computed: {
        activeComposer() {
            return store.state.activeComposer;
        },
        isActive() {
            return store.state.activeComposer != '' ? true : false;
        },
        composers() {
            return store.state.composers;
        },
        headlineSrc() {
            return store.state.headlineSrc;
        },
        activePage() {
            return this.$store.state.activePage;
        },
        selectComposerActive() {
            return this.$store.state.activePage == 'videos' ? true : false;
        },
        navActive() {
            return store.state.mobileNavActive;
        },
        videoNavActive() {
            return store.state.videoNavActive;
        },
    },
    methods: {
        forceRerender() {
            this.selectComposerKey += 1;
        },
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
    },
    watch: {
        $route(to, from) {
            this.forceRerender();
        }
    },
    components: {
        ComposerImageWrap, 
    }
}
</script>

<style scoped lang="scss">

.composers-mobile-wrap {
    padding-top: 0;
    padding-bottom: 0;
}

.composers-mobile-header {
    height: 250px;
    width: 100%;
    background-image: url('/images/splash-header-bg-mobile.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0 auto;
    text-align: center;

    h1, h2, h3 {
        font-family: 'Times New Roman', Times, serif;
        font-weight: normal;
        color: #fff;
    }

    h1 {
        font-size: 36px;
        line-height: 1.2;
        margin-bottom: 8px !important;
        padding-top: 10px;
        margin-top: 0;

        @media (max-width: 385px) {
            font-size: 30px;
            margin-bottom: 15px !important;
        }
    }

    h2 {
        font-size: 25px !important;
        line-height: 1.2;
        margin-top: 0;
        margin-bottom: 0;

        @media (max-width: 385px) {
            font-size: 22px !important;
        }
    }

    h3 {
        margin-top: 15px;
        margin-bottom: 15px;
        line-height: 1.2;
    }

}

.composers-mobile-image {
    background: #000;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 0;
    top: calc(100vh - 250px);
    width: 100%;

    img {
        top: calc(100vh - 250px);
        min-height: calc(100vh - 250px);
        object-fit: cover;
        object-position: top;
        width: 100%;
        height: auto;
        margin: 0 auto;

        @media (max-width: 385px) {
            top: calc(100vh - 250px);
        }
    }
}

.composers-mobile-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    button {
        appearance: none;
        border: none;
        background: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
        color: #fec6ad;
        text-transform: uppercase;
        font-family: 'Times New Roman', Times, serif;
        font-size: 23px;
        margin-bottom: 15px;

        @media (max-width: 380px) {
            font-size: 22px;
        }
    }
}

.composers-mobile {
    padding-top: 0;
    padding-bottom: 0;

    @media(min-width: 1001px) {
        display: none;
    }
    
    .composer-portraits {
        display: flex;
        flex-wrap: wrap;
        max-width: 65%;
        margin: 0 auto;
        margin-top: 1.5em;
    }

    .composer {
        flex-basis: 33.333333%;
        margin-bottom: .8em;
        overflow: hidden;
        cursor: pointer;
     
        @media(max-width: 535px) {
            flex-basis: 50%;
        }
        
        @media(max-width: 415px) {
            flex-basis: 100%;
        }

        img {
            height: 160px;
            width: 100%;
            object-fit: cover;

            @media(max-width: 650px) {
                height: 120px;
            }
            
            @media(max-width: 535px) {
                height: 150px;
            }

            @media(max-width: 415px) {
                height: auto;
            }
        }
    }

    .composer-name {
        position: relative;
        z-index: 1;
        left: 0;
        top: 0;
        transform: none;
        color: #fff;
        font-size: 16px;
        line-height: 1;
        font-weight: bold;
        text-align: center;
    }

}

</style>
