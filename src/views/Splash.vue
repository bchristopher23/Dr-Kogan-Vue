<template>
    <div class="splash-wrapper wrapper" id="page-wrapper">

        <section class="splash-content">

            <div class="splash-content-inner">
                <h1>Richard Kogan, MD</h1>

                <h2>Concert Pianist</h2>
                <h2>Distinguished Psychiatrist</h2>
                <h2>Master Storyteller</h2>

                <div class="quote-wrap">
                    <blockquote>Kogan has somehow managed to excel at the world's two most demanding professions.</blockquote>
                    <p class="quote-author">- The Boston Globe</p>
                </div>
                
                <div class="quote-wrap">
                    <blockquote>I came away from this extraordinary lecture and performance deeply moved by a fascinating presentation that only Dr. Kogan, psychiatrist and concert pianist, can deliver.</blockquote>
                    <p class="quote-author">- Yo-Yo Ma</p>
                </div>
                
                <div class="quote-wrap">
                    <blockquote>Exquisite playing ... Linking short musical excerpts to depressive and manic moods, Dr. Kogan seeks to isolate the actual sounds of psychiatric disorder. It’s a lesson in medico-musical listening. </blockquote>
                    <p class="quote-author">- The New York Times</p>
                </div>
            </div>

        </section>

        <section class="splash-content mobile">

            <div class="splash-content-inner">
                <div class="splash-step-1">
                    <div class="splash-header">
                        <h1>Richard Kogan, MD</h1>
                        <h2>Concert Pianist</h2>
                        <h2>Distinguished Psychiatrist</h2>
                        <h2>Master Storyteller</h2>
                        <button class="enter-link" id="step2" @click="handleClick">Enter</button>
                    </div>

                    <div class="splash-image">
                        <img src="/images/splash-bg-mobile.jpg">
                    </div>

                </div>

                <div class="splash-step-2">
                    <div class="splash-header">
                        <h1>Richard Kogan, MD</h1>
                        <h2>Psychiatrist at the Keyboard</h2>
                        <h2>Composers on the Couch</h2>

                        <div class="splash-quotes">
                            <div class="quote-wrap">
                                <blockquote>
                                    Kogan has somehow managed to excel at the world's two most demanding professions. 
                                    <span class="quote-author">- The Boston Globe</span>
                                </blockquote>
                            </div>
                            
                            <div class="quote-wrap">
                                <blockquote>
                                    I came away from this extraordinary lecture and performance deeply moved by a fascinating presentation that only Dr. Kogan, psychiatrist and concert pianist, can deliver.
                                    <span class="quote-author">- Yo-Yo Ma</span>
                                </blockquote>
                            </div>
                            
                            <div class="quote-wrap">
                                <blockquote>
                                    Exquisite playing
                                    <span class="quote-author">- The New York Times</span>
                                </blockquote>
                            </div>
                        </div>

                        <router-link to="/home" class="continue-link" id="step3" @click="handleClick">Continue</router-link>

                    </div>

                    <div class="splash-image">
                        <img src="/images/splash-bg-mobile2.jpg">
                    </div>

                    <!-- <button class="continue-link" id="step3" @click="handleClick">Continue</button> -->
                </div>
            </div>

        </section>

        <router-link to="/home" class="enter-link">Enter</router-link>
    </div><!-- #page-wrapper -->
</template>

<script>
import $ from 'jquery'
import router from '../router'

export default {
  name: 'Splash',
  mounted() {
    $(document).keypress(function(e) {

        e.preventDefault();

        if ( (e.which == 13 || e.which == 32) ) {
            router.push( '/home' );
        }

    });


  },
  methods: {
        handleClick(e) {

            // Step 2 Click
            if ( e.target.matches( '#step2' ) ) {
            
                e.preventDefault();

                $('.splash-step-1').hide();
                $('.splash-step-2').show();
                $('.splash-wrapper').addClass('step2');

                let img2 = $('.splash-step-2 .splash-image img');

                $('.splash-step-2 .splash-header').css('width', img2[0].clientWidth );
            }
            
            // Step 3 Click
            if ( e.target.matches( '#step3' ) ) {
            
                e.preventDefault();

                $('.splash-step-2').hide();
                $('.splash-step-3').show();
                $('.splash-wrapper').removeClass('step2');
                $('.splash-wrapper').addClass('step3');

            }

        },
  }
}
</script>

<style lang="scss">
body {
    margin: 0;
}

.splash-wrapper {
    min-height: 100vh;
    background-image: url('/images/splash-bg.jpg');
    background-size: cover;
    background-position-x: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    padding: 40px 0;
    
    @media(max-width: 1000px) {
        background: #000;
        padding: 0;
        align-items: flex-start;

        .splash-header {
            height: 200px;
            background-image: url('/images/splash-header-bg-mobile.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            margin: 0 auto;
            -webkit-text-size-adjust: 100%;
            width: 100% !important;

            @media (max-width: 385px) {
                height: 200px;
            }

            h1, h2, h3, .enter-link {
                -webkit-text-size-adjust: 100%;
            }
            
            h1 {
                font-size: 36px;
                margin-bottom: 8px !important;
                padding-top: 10px;

                @media (max-width: 385px) {
                    font-size: 30px;
                    margin-bottom: 15px !important;
                }
            }

            h2 {
                font-size: 25px !important;
                line-height: 1.2;

                @media (max-width: 385px) {
                    font-size: 22px !important;
                }
            }

            .enter-link {
                display: block;
                position: relative;
                right: auto;
                bottom: auto;
                text-align: center;
                margin: 0 auto;
                font-size: 25px;
                margin-top: 5px;
                transform: none;
                top: auto;

                 @media (max-width: 385px) {
                    font-size: 24px;
                    margin-top: 10px;
                }
            }

        }

        .splash-image {
            background: #000;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            padding-top: 0;
            top: calc(100vh - 200px);
            width: auto;

            img {
                top: calc(100vh - 200px);
                min-height: calc(100vh - 200px);
                object-fit: cover;
                object-position: top;
                height: auto;
                margin: 0 auto;
                width: 100%;

                @media (max-width: 385px) {
                    top: calc(100vh - 200px);
                }
            }
        }

        &.step2 {
            .splash-header {
                height: 385px;
                position: relative;
            }

            .splash-image {
                top: calc(100vh - 385px);
                height: auto;

                img {
                    top: calc(100vh - 385px);
                    min-height: calc(100vh - 385px);
                    object-fit: cover;
                    object-position: top;
                }
            }
        }
    }
}

.splash-content {
    color: #fff;
    font-family: 'Times New Roman', Times, serif;
    font-size: 32px;
    line-height: 1.2;
    margin-right: 8vw;
    display: flex;
    justify-content: flex-end;
    width: 1550px;

    &.mobile {
        display: none;
        margin-right: 0;
        width: 100%;
    }

    .splash-step-1 .enter-link {
        display: block !important;
        appearance: none;
        background: none;
        border: none;
        box-shadow: none;
    }

    .splash-step-2 {

        .quote-wrap {
            max-width: auto;
            margin: auto;
            font-size: 16px;
            line-height: 1.2;
            margin-top: 15px;
            padding: 0 25px;

            @media(max-width: 340px) {
                font-size: 14px;
            }
        }

        .quote-author {
            display: block;
            margin-top: 5px;
            // padding-left: 10px;
        }

    }

    .splash-step-3 {

        h2  {
            font-size: 34px;
        }

        h3 {
            text-align: center;
            font-size: 28px;
            font-weight: normal;
            margin-top: 10px;
        }

        .mobile-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 45px;

            button {
                appearance: none;
                background: none;
                border: none;
                box-shadow: none;
                margin-bottom: 20px;
                font-size: 32px;
                left: auto;
                color: #e39c68 !important;
                font-family: 'Times New Roman', Times, serif;
                text-transform: uppercase;
                margin-bottom: 45px;

                &:hover {
                    color: transparentize(#e39c68, .6) !important;
                    text-decoration: none;
                }
            }
        }
    }

    .splash-step-2,
    .splash-step-3 {
        display: none;
    }

    @media(max-width: 1000px) {
        display: none;

        &.mobile {
            display: block;
        }
    }

    @media (min-width: 1800px) {
        margin: 0 auto;
    }

    @media (min-height: 1081px) and (min-width: 1921px) {
        width: 75vw;

        h1 {
            font-size: 6.5vh !important;
            line-height: 1 !important;
        }

        h2 {
            font-size: 4.2vh !important;
        }

        .quote-wrap {
            font-size: 2.8vh !important;
            line-height: 1.3 !important;
            max-width: 28vw !important;

            &:first-of-type {
                margin-top: 3vh;
            }

            &:last-of-type {
                margin-left: auto !important;
            }
        }

    }

    @media (min-height: 1240px) and (min-width: 1921px) {
        width: 80vw;

        h1 {
            font-size: 6vh !important;
            line-height: 1 !important;
        }

        h2 {
            font-size: 3.7vh !important;
        }

        .quote-wrap {
            font-size: 2.3vh !important;
            max-width: 30vw !important;
        }
    }

    @media (min-width: 2350px) {
        width: 75vw;
    }
    
    @media (min-width: 2650px) {
        width: 70vw;

        .quote-wrap {
            max-width: 25vw !important;
        }
    }

    h1, h2 {
        color: #fff;
        text-align: center;
        margin-top: 0;
        font-weight: normal;
    }

    h1 {
        font-size: 72px;
        margin-bottom: 45px;
    }

    h2 {
        font-size: 40px;
        margin-bottom: 0;
        line-height: 1.2;
        font-weight: normal;
    }

    blockquote {
        margin: 0;
    }
}

.enter-link,
.continue-link {
    position: fixed;
    bottom: 1.8em;
    left: 50%;
    transform: translateX(-50%);
    color: #dca80b;
    font-family: 'Times New Roman', Times, serif;
    font-size: 25px;

    &:hover {
        color: transparentize(#dca80b, .6);
        text-decoration: none;
    }

    @media (max-width: 1000px) {
        display: none;
        font-size: 32px;
        left: auto;
        transform: none;
        right: 1.1em;
        bottom: 8.3em;
        color: #e39c68 !important;

        &:hover {
            color: transparentize(#e39c68, .6) !important;
            text-decoration: none;
        }
    }


}

.enter-link {
    right: 2.5em;
    left: auto;
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
    font-size: 32px;
}

.continue-link {
    display: block !important;
    appearance: none;
    box-shadow: none;
    background: none;
    border: none;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(110%);
    font-size: 25px;
    text-align: center;
}

.quote-wrap {
    max-width: 585px;
    margin: 0 auto;
    margin-top: 30px;

    &:last-of-type {
        max-width: 661px;
        margin-left: 80px;
    }
}

.quote-author {
    text-align: right;
}
</style>
