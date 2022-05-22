<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

/** Vars */
$color__background-body: #fff;
$color__background-screen: #f1f1f1;
$color__background-hr: #ccc;
$color__background-button: #e6e6e6;
$color__background-pre: #eee;
$color__background-ins: #fff9c0;

$color__text-screen: #21759b;
$color__text-input: #666;
$color__text-input-focus: #111;
$color__link: #dca80b; //royalblue
$color__link-visited: #dca80b; //purple
$color__link-hover: transparentize( #dca80b, .4); //midnightblue
$color__text-main: #404040;

$color__border-button: #ccc #ccc #bbb;
$color__border-button-hover: #ccc #bbb #aaa;
$color__border-button-focus: #aaa #bbb #bbb;
$color__border-input: #ccc;
$color__border-abbr: #666;

/** Mixins */
// Center block
@mixin center-block {
	display: block;
	margin-left: auto;
	margin-right: auto;
}

// Column width with margin
@mixin column-width($numberColumns: 3) {
	width: map-get($columns, $numberColumns) - ( ( $columns__margin * ( $numberColumns - 1 ) ) / $numberColumns );
}


#app {
  background-color: $color__background-body;
  line-height: 1.5;
}

/** Links */
a {
	color: $color__link;
	text-decoration: none;

	&:visited {
		color: $color__link-visited;
	}

	&:hover,
	&:focus,
	&:active {
		color: $color__link-hover;
	}

	&:focus {
		outline: none;
	}

	&:hover,
	&:active {
		outline: 0;
	}
}

/** Lists */
ul,
ol {
	margin: 0 0 1.5em 3em;
}

ul {
	list-style: disc;
}

ol {
	list-style: decimal;
}

li > ul,
li > ol {
	margin-bottom: 0;
	margin-left: 1.5em;
}

dt {
	font-weight: 700;
}

dd {
	margin: 0 1.5em 1.5em;
}

/** Media */
/* Make sure embeds and iframes fit their containers. */
embed,
iframe,
object {
	max-width: 100%;
}

img {
	height: auto; // Make sure images are scaled correctly.
	max-width: 100%; // Adhere to container width.
}

figure {
	margin: 1em 0; // Extra wide images within figure tags don't overflow the content area.
}

/** Copy */
p {
	margin-bottom: 0;
	margin-top: 0.7em;
	line-height: 1.2;
}

dfn,
cite,
em,
i {
	font-style: italic;
}

blockquote {
	margin: 0 1.5em;
}

address {
	margin: 0 0 1.5em;
}

abbr,
acronym {
	border-bottom: 1px dotted $color__border-abbr;
	cursor: help;
}

mark,
ins {
	background: $color__background-ins;
	text-decoration: none;
}

big {
	font-size: 125%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	clear: both;
}

/** Accessibility */
/* Text meant only for screen readers. */
.screen-reader-text {
	border: 0;
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute !important;
	width: 1px;
	word-wrap: normal !important; // Many screen reader and browser combinations announce broken words as they would appear visually.

	&:focus {
		background-color: $color__background-screen;
		border-radius: 3px;
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.6);
		clip: auto !important;
		clip-path: none;
		color: $color__text-screen;
		display: block;
		font-size: 0.875rem;
		font-weight: 700;
		height: auto;
		left: 5px;
		line-height: normal;
		padding: 15px 23px 14px;
		text-decoration: none;
		top: 5px;
		width: auto;
		z-index: 100000; // Above WP toolbar.
	}
}

/* Do not show the outline on the skip link target. */
#primary[tabindex="-1"]:focus {
	outline: 0;
}

/** Alignments */
.alignleft {

	/*rtl:ignore*/
	float: left;

	/*rtl:ignore*/
	margin-right: 1.5em;
	margin-bottom: 1.5em;
}

.alignright {

	/*rtl:ignore*/
	float: right;

	/*rtl:ignore*/
	margin-left: 1.5em;
	margin-bottom: 1.5em;
}

.aligncenter {
	clear: both;

	@include center-block;

	margin-bottom: 1.5em;
}

/** Box Sizing */
*,
*::before,
*::after {
	box-sizing: inherit;
}

html {
	box-sizing: border-box;
}

</style>
