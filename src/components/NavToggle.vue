<template>
    <div class="nav-toggle" @click="this.toggleNav">
        <button>
            <span class="toggle-icon">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </button>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name: 'NavToggle',
	computed: {
		navActive() {
            return store.state.mobileNavActive;
        },
	},
	methods: {
		toggleNav() {
			if (store.state.mobileNavActive) {
				store.dispatch( 'updateMobileNavActive', false );
			} else {
				store.dispatch( 'updateMobileNavActive', true );
			}

		}
	}
}
</script>

<style scoped lang="scss">
.nav-toggle {
	display: flex;
	justify-content: flex-end;
	width: 100%;
    position: absolute;
    z-index: 9999999999;
    top: 30px;
    right: 30px;

    @media(min-width: 1001px) {
        display: none;
    }
}

.nav-toggle button {
	appearance: none;
	position: relative;
    background: none;
    border: none;
    height: auto;
    width: auto;
    padding: 0;
    cursor: pointer;
}

.toggle-icon {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 30px;
	width: 35px;

	span {
		position: relative;
		height: 4px;
		width: 100%;
		background-color: #f2ce9e;
		border-radius: 2px;
		transform-origin: top left;
		transition: transform 0.4s ease;

		&:nth-of-type( 2 ) {
			top: 7px;
		}

		&:nth-of-type( 3 ) {
			top: 14px;
			transform-origin: bottom left;
		}
	}
}

</style>
