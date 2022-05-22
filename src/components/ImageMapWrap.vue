<template>
    <div class="image-map-wrap">

        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            width="720.001px" height="720.001px" viewBox="0 0 720.001 720.001" preserveAspectRatio="xMidYMid slice">
            <image x="0px" y="0px" preserveAspectRatio="xMidYMid meet" overflow="visible" width="100%" height="100%" class="image-bg" xlink:href="/images/image_map_tall.png">
            </image>

            <!-- Composers -->
            <rect class="composer" data-composer="Tchaikovsky" x="172" y="336" opacity="0" fill="#FFFFFF" width="39.5" height="41.586"/>
            <rect class="composer" data-composer="Beethoven" x="213.5" y="337.5" opacity="0" fill="#FFFFFF" width="39.917" height="40.938"/>
            <rect class="composer" data-composer="Bernstein" x="255.333" y="338" opacity="0" fill="#FFFFFF" width="40.667" height="40.438"/>
            <rect class="composer" data-composer="Gershwin" x="300.563" y="339.083" opacity="0" fill="#FFFFFF" width="38.688" height="40.12"/>
            <rect class="composer" data-composer="Joplin" x="343.406" y="339.083" opacity="0" fill="#FFFFFF" width="41.375" height="42.5"/>
            <rect class="composer" data-composer="Mozart" x="386.656" y="339.083" opacity="0" fill="#FFFFFF" width="42.469" height="41.667"/>
            <rect class="composer" data-composer="Chopin" x="430.563" y="339.083" opacity="0" fill="#FFFFFF" width="41.375" height="42"/>
            <rect class="composer" data-composer="Schumann" x="473.666" y="339.083" opacity="0" fill="#FFFFFF" width="40.585" height="41.667"/>
            <rect class="composer" data-composer="Rachmaninoff" x="514.666" y="339.211" opacity="0" fill="#FFFFFF" width="37.313" height="41.412"/>

            <!-- Couch -->
            <rect class="couch" x="228.75" y="400.875" opacity="0" fill="#FFFFFF" width="61" height="71.875"/>

            <!-- Select Composer Button -->
            <rect class="select-composer" x="341.25" y="297.333" opacity="0" fill="#FFFFFF" width="45.917" height="43.667"/>

            <!-- Headline -->
            <rect class="headline" x="206.708" y="181.333" opacity="0" fill="#FFFFFF" width="313.333" height="116"/>
            
        </svg>
        
        <div class="map-content">

            <HeadlineWrap :imageSrc="headlineSrc"></HeadlineWrap>

            <div class="select-composer-wrap">
                <img src="/images/select-composer.png" class="select-composer">
            </div> 

            <ComposerImageWrap
                v-for="item in this.composers"
                :key="item.name"
                :composer="item.name"
            />

            <CouchImageWrap :composer="activeComposer"></CouchImageWrap>

            <router-view></router-view>

        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import ComposerImageWrap from './ComposerImageWrap.vue'
import CouchImageWrap from './CouchImageWrap.vue'
import HeadlineWrap from './HeadlineWrap.vue'
import store from '@/store';

export default {
    name: "ImageMapWrap",
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
        }
    },
    methods: {
        forceRerender() {
            this.selectComposerKey += 1;
        }
    },
    watch: {
        $route(to, from) {
            this.forceRerender();
        }
    },
    mounted() {
        
        const aspect_ratio = 1.830985915492958;
        
        // Place composer porttraits on the page in the correct position
        setPortraitPositions();

        function setPortraitPositions() {
            
            let svg = $("svg"), rect = svg.find("rect");

            rect.each(function () {
                
                let top = $(this)[0].getBoundingClientRect().top, 
                    left = $(this)[0].getBoundingClientRect().left, 
                    bottom = $(this)[0].getBoundingClientRect().bottom, 
                    right = $(this)[0].getBoundingClientRect().right, 
                    height = $(this)[0].getBoundingClientRect().height, 
                    width = $(this)[0].getBoundingClientRect().width, 
                    composer = $(this).attr("data-composer"), 
                    wrap, 
                    wrap2, 
                    wrap3;

                // Place composer portraits
                if ($(this).attr("class") == "composer") {
                    $('.map-content .composer-image-wrap[data-composer="' + composer + '"]').css({ position: "absolute", top: top + "px", left: left + "px", bottom: bottom + "px", right: right + "px", width: width + "px", height: height + "px" });
                }
                
                // Place Select Composer Button
                if ($(this).attr("class") == "select-composer") {
                    $('.select-composer-wrap').css({ position: "absolute", top: top + "px", left: left + "px", bottom: bottom + "px", right: right + "px", width: width + "px", height: height + "px" });
                }

                // Place Couch Wrap
                if ($(this).attr("class") == "couch") {
                    $('.couch-image-wrap').css({ position: "absolute", top: top + "px", left: left + "px", bottom: bottom + "px", right: right + "px", width: width + "px", height: height + "px" });
                }

                // Place Headline
                if ($(this).attr("class") == "headline") {

                    let units = "px";
                    
                    if (top < 4) {
                        top = 3;
                        units = "vh";
                    }
                    
                    $('.headline-wrap').css({ position: "absolute", top: top + units, left: left + "px", bottom: bottom + "px", right: right + "px", width: width + "px", height: height + "px" });
                    
                    if (units == "vh") {
                        $(".headline-wrap").css({ "align-items": "flex-start" });
                        $(".headline-wrap img").css({ width: "90%" });
                    }

                }

            }); 
        }

        // Resize composer portraits and modals when the window is resized
        $(window).on("resize", function () {

            // Resize Portraits
            $(".map-content .composer-image-wrap").each(function () {
                let composer = $(this).attr("data-composer"), rect = $("svg").find("rect[data-composer=\"" + composer + "\"]"), top = rect[0].getBoundingClientRect().top, left = rect[0].getBoundingClientRect().left, bottom = rect[0].getBoundingClientRect().bottom, right = rect[0].getBoundingClientRect().right, height = rect[0].getBoundingClientRect().height, width = rect[0].getBoundingClientRect().width;
                $(this).css({ position: "absolute", top: top + "px", left: left + "px", bottom: bottom + "px", right: right + "px", width: width + "px", height: height + "px" });
            });
            
            // Resize Select Composer Text
            let select_composer_rect = $("svg").find(".select-composer"), top = select_composer_rect[0].getBoundingClientRect().top, left = select_composer_rect[0].getBoundingClientRect().left, bottom = select_composer_rect[0].getBoundingClientRect().bottom, right = select_composer_rect[0].getBoundingClientRect().right, height = select_composer_rect[0].getBoundingClientRect().height, width = select_composer_rect[0].getBoundingClientRect().width;
            $(".select-composer-wrap").css({ position: "absolute", top: top + "px", left: left + "px", bottom: bottom + "px", right: right + "px", width: width + "px", height: height + "px" });
            
            // Resize Couch Image
            let couch_rect = $("svg").find(".couch"), couch_top = couch_rect[0].getBoundingClientRect().top, couch_left = couch_rect[0].getBoundingClientRect().left, couch_bottom = couch_rect[0].getBoundingClientRect().bottom, couch_right = couch_rect[0].getBoundingClientRect().right, couch_height = couch_rect[0].getBoundingClientRect().height, couch_width = couch_rect[0].getBoundingClientRect().width;
            $(".couch-image-wrap").css({ position: "absolute", top: couch_top + "px", left: couch_left + "px", bottom: couch_bottom + "px", right: couch_right + "px", width: couch_width + "px", height: couch_height + "px" });
            
            // Resize Headline Text
            let headline_rect = $("svg").find(".headline"), headline_rect_top = headline_rect[0].getBoundingClientRect().top, headline_rect_left = headline_rect[0].getBoundingClientRect().left, headline_rect_bottom = headline_rect[0].getBoundingClientRect().bottom, headline_rect_right = headline_rect[0].getBoundingClientRect().right, headline_rect_height = headline_rect[0].getBoundingClientRect().height, headline_rect_width = headline_rect[0].getBoundingClientRect().width, units = "px";
            $(".headline-wrap").css({ "align-items": "center" });
            $(".headline-wrap img").css({ width: "100%" });

            if (headline_rect_top < 4) {
                headline_rect_top = 3;
                units = "vh";
                $(".headline-wrap").css({ "align-items": "flex-start" });
                $(".headline-wrap img").css({ width: "90%" });
            }
            $(".headline-wrap").css({ position: "absolute", top: headline_rect_top + units, left: headline_rect_left + "px", bottom: headline_rect_bottom + "px", right: headline_rect_right + "px", width: headline_rect_width + "px", height: headline_rect_height + "px" });
            
            // Resize Modal
            if ( $('.modal-headline').length > 0 ) {
                let heading_height = $(".modal-headline")[0].getBoundingClientRect().height / 1.9;
                let headline_height = (window.innerHeight - headline_rect_bottom) + (heading_height) - (window.innerHeight * 0.12);
                let new_modal_width = headline_height * aspect_ratio;
                let modal_max_height = window.innerHeight - $(".modal-headline")[0].getBoundingClientRect().height + (window.innerHeight * 0.12);

                if (units == "vh") {
                    headline_rect_top = headline_rect[0].getBoundingClientRect().top;
                    headline_rect_left = headline_rect[0].getBoundingClientRect().left;
                    headline_rect_bottom = headline_rect[0].getBoundingClientRect().bottom;
                    headline_rect_right = headline_rect[0].getBoundingClientRect().right;
                    headline_rect_height = headline_rect[0].getBoundingClientRect().height;
                    headline_rect_width = headline_rect[0].getBoundingClientRect().width;
                    headline_height = (window.innerHeight - headline_rect_bottom) + (heading_height) - (window.innerHeight * 0.12);
                    new_modal_width = headline_height * aspect_ratio;
                    modal_max_height = (window.innerHeight - $(".modal-headline")[0].getBoundingClientRect().height) + (window.innerHeight * 0.12) - ($(".modal-headline")[0].getBoundingClientRect().bottom * 0.6);
                }

                $(".modal").css({ height: headline_height + 10, maxHeight: modal_max_height + 10, width: new_modal_width + 10, maxWidth: "80%" });
                
                // Resize Modal Headline
                headline_rect_top = headline_rect[0].getBoundingClientRect().top;
                
                if (headline_rect_top < 4) {
                    headline_rect_top = 3;
                    units = "vh";
                    $(".modal-headline-wrap").css({ "align-items": "flex-start" });
                    $(".modal-headline-wrap img").css({ width: "90%" });
                }
                else {
                    $(".modal-headline-wrap").css({ "align-items": "center" });
                }

                $(".modal-headline-wrap").css({ position: "absolute", top: headline_rect_top + units, left: headline_rect_left + "px", bottom: headline_rect_bottom + "px", right: headline_rect_right + "px", width: headline_rect_width + "px", maxHeight: modal_max_height, height: headline_rect_height + "px" });
            }

            // Update full height group blocks min-height value
            if ($(".page-modal-wrap").length > 0) {
                $(".page-modal-wrap .full-height").each(function () {
                    let height = $(".page-modal-wrap .modal").outerHeight() - 40;
                    $(this).css("min-height", height + "px");
                    $(this).css("margin-top", "20px");
                });
            }
            
        });
    },
    components: { 
        ComposerImageWrap, 
        CouchImageWrap,
        HeadlineWrap,
    }
}
</script>

<style scoped lang="scss">
</style>