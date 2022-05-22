<template>
    <div class="modal-headline-wrap">
        <img class="modal-headline" src="/images/headline-modal.png">
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    name: 'ModalHeadlineWrap',
    mounted() {

        positionElements();
        
        $(window).resize(function() {

            positionElements();

        });

        function positionElements() {
            const aspect_ratio = 1.830985915492958;

            let svg = $("svg"), 
                rect = svg.find("rect.headline");

            let top = rect[0].getBoundingClientRect().top, 
                left = rect[0].getBoundingClientRect().left, 
                bottom = rect[0].getBoundingClientRect().bottom, 
                right = rect[0].getBoundingClientRect().right, 
                height = rect[0].getBoundingClientRect().height, 
                width = rect[0].getBoundingClientRect().width,
                headline = $('.modal-headline-wrap');

            // Place Modal Headline
            let units = "px";
            
            if (top < 4) {
                top = 3;
                units = "vh";
            }

            headline.css({ position: "absolute", top: top + units, left: left + "px", bottom: bottom + "px", right: right + "px", width: width + "px", height: height + "px" });

            if (top < 4) {
                top = 3;
                units = "vh";
                headline.css({ "align-items": "flex-start" });
                headline.find("img").css({ width: "90%" });
            }

            // Resize Modal
            let heading_height = headline[0].getBoundingClientRect().height / 2.4;
            let headline_height = (window.innerHeight - bottom) + (heading_height) - (window.innerHeight * 0.12);
            let new_modal_width = headline_height * aspect_ratio;
            let modal_max_height = window.innerHeight - headline.find(".modal-headline")[0].getBoundingClientRect().height + (window.innerHeight * 0.12);

            $(".modal").css({ height: headline_height + 10, maxHeight: modal_max_height + 10, width: new_modal_width + 10, maxWidth: "80%" });
        }


    }
}
</script>

<style scoped lang="scss">

</style>
