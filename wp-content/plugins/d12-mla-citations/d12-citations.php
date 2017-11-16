<?php
/*
Plugin Name: d12 MLA Citations
Plugin URI: http://www.kjodle.net/wordpress/mla-citations/
Description: Easily add MLA style citations to your WordPress posts.
Version: 2.2
Author: Kenneth John Odle
Author URI: http://techblog.kjodle.net
Author Support: http://kjodle.info/support

Copyright 2017 Kenneth John Odle
© 2017 Kenneth John Odle

Released under the GPL v.3, http://www.gnu.org/copyleft/gpl.html

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License, version 3, as 
	published by the Free Software Foundation.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/*
Icons courtesy of Fat Cow
http://www.fatcow.com/free-icons
*/

// Prevent this page from being loaded directly.
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

// Make non-self-enclosing shortcodes work
define('FILTERPRIORITY', 10);
add_filter('the_content', 'do_shortcode', FILTERPRIORITY);

// Let's add our front end stylesheets:
function d12_cite_styles() {
	wp_enqueue_style( 'mlascreenstyle', plugins_url( '/css/d12citations_screen.css', __FILE__, '1.0', 'screen' ) );
	wp_enqueue_style( 'mlaprintstyle', plugins_url( '/css/d12citations_print.css', __FILE__, '1.0', 'print' ) );
}
add_action( 'wp_enqueue_scripts', 'd12_cite_styles' );

// Let's add our back end stylesheets:
function d12_admin_styles() {
	wp_enqueue_style( 'mlaadminstyle', plugins_url( '/css/d12citations_admin.css', __FILE__, '1.0', 'screen' ) );
}
add_action( 'admin_enqueue_scripts', 'd12_admin_styles' );

// Add shortcodes to clear floats
function clearboth_shortcode() {
	return '<div style="clear:both;"></div>';
}
add_shortcode ('clear', 'clearboth_shortcode');

function clearleft_shortcode() {
	return '<div style="clear:left;"></div>';
	}
add_shortcode ('clearleft', 'clearleft_shortcode');

function clearright_shortcode() {
	return '<div style="clear: right;"></div>';
	}
add_shortcode ('clearright', 'clearright_shortcode');

// Add shortcode for smaller text
function smalltext_shortcode_handler( $atts, $content=null ) {
	return '<span class="smalltext">' . $content . '</span>';
}
add_shortcode( 'small', 'smalltext_shortcode_handler' );

// Add shortcode for superscript text
function sup_shortcode_handler( $atts, $content=null ) {
	return '<sup>' . $content . '</sup>';
}
add_shortcode( 'sup', 'sup_shortcode_handler' );

// Add MLA style "Works Cited" section //
function d12mlaworks_cited( $atts , $content = null ) {
return '<div id="d12src">
<p class="d12mlatitle">Works Cited</p>' . $content . '</div>';
}
add_shortcode( 'mlaworks', 'd12mlaworks_cited' );

// Begin MLA style "Works Cited" section //
function d12mlaworks_cited_start( $atts ) {
return '<div id="d12src">
<p class="d12mlatitle">Works Cited</p>';
}
add_shortcode( 'mla-start', 'd12mlaworks_cited_start' );

// End MLA style "Works Cited" section //
function d12mlaworks_cited_end( $atts , $content = null ) {
return '</div>';
}
add_shortcode( 'mla-end', 'd12mlaworks_cited_end' );

// Add "d12mlabook" shortcode for "Works Cited" section //
function d12mlabook_shortcode( $atts ) {
	extract( shortcode_atts(
		array(
			'author' => '',
			'title' => '',
			'city' => '',
			'publisher' => '',
			'year' => '',
			'medium' => '',
			'addt' => '',
		), $atts )
	);
	$etitle = substr($title,-1);
	$titleend = ".";
	switch($etitle) {
		case "!":
		$titleend = "";
		break;
		case "?":
		$titleend = "";
		break;
	}
	if ($author == null) {$authorend = "";} else {$authorend = ". ";}
	if ($addt == null) {$mediumend = ".";} else {$mediumend = ". ";}
return html_entity_decode(
	'<p class="d12srcp">' . 
	$author . $authorend . 
	'<i>' . $title . $titleend . '</i> ' . 
	$city . ': ' . 
	$publisher . ', ' . 
	$year . '. ' . 
	$medium . 
	$mediumend . 
	$addt . 
	'</p>');
}
add_shortcode( 'mlabook', 'd12mlabook_shortcode' );

// Add "d12mlajournal" shortcode for "Works Cited" section //
function d12mlajournal_shortcode( $atts ) {
	extract( shortcode_atts(
		array(
			'author' => '',
			'title' => '',
			'journal' => '',
			'volume' => '',
			'issue' => '',
			'year' => '',
			'pages' => '',
			'medium' => '',
			'addt' => '',
		), $atts )
	);
	$etitle = substr($title,-1);
	$titleend = ".";
	switch($etitle) {
		case "!":
		$titleend = "";
		break;
		case "?":
		$titleend = "";
		break;
	}
	if ($author == null) {$authorend = "";} else {$authorend = ". ";}
	if ($addt == null) {$mediumend = ".";} else {$mediumend = ". ";}
return html_entity_decode(
	'<p class="d12srcp">' . $author . $authorend . 
	'&ldquo;' . $title . $titleend . '&rdquo; ' . 
	'<i>' . $journal . '</i>. ' . 
	$volume . '.' . 
	$issue . 
	' (' . $year . '): ' . 
	$pages . '. ' . 
	$medium . $mediumend . $addt . 
	'</p>');
}
add_shortcode( 'mlajournal', 'd12mlajournal_shortcode' );

// Add "d12mlamagazine" shortcode for "Works Cited" section //
function d12mlamagazine_shortcode( $atts ) {
	extract( shortcode_atts(
		array(
			'author' => '',
			'title' => '',
			'magazine' => '',
			'date' => '',
			'pages' => '',
			'medium' => '',
			'addt' => '',
		), $atts )
	);
	$etitle = substr($title,-1);
	$titleend = ".";
	switch($etitle) {
		case "!":
		$titleend = "";
		break;
		case "?":
		$titleend = "";
		break;
	}
	if ($author == null) {$authorend = "";} else {$authorend = ". ";}
	if ($addt == null) {$mediumend = ".";} else {$mediumend = ". ";}
return html_entity_decode(
	'<p class="d12srcp">' . $author . $authorend . 
	'&ldquo;' . $title . $titleend . '&rdquo; ' . 
	'<i>' . $magazine . '</i>. ' . 
	$date . ': ' . 
	$pages . '. ' . 
	$medium . $mediumend . $addt . 
	'</p>');
}
add_shortcode( 'mlamagazine', 'd12mlamagazine_shortcode' );

// Add note paragraph 
function d12citationnote_shortcode_handler( $atts, $content=null, $code="" ) {
	return '<p class="d12citenote">' . $content . '</p>';
}
add_shortcode( 'note' , 'd12citationnote_shortcode_handler' );

// Add a highlighting shortcode
function d12highlightyellow_handler( $atts, $content=null ) {
	return '<span class="d12highlightyellow">' . $content . '</span>';
}
add_shortcode( 'hly' , 'd12highlightyellow_handler' );


/* Register a TinyMCE button */
add_action( 'init', 'd12citations_buttons' );
function d12citations_buttons() {
	if ( current_user_can('edit_posts') &&  current_user_can('edit_pages') )
	{
		add_filter( "mce_external_plugins", "d12mla_add_buttons" );
		add_filter( 'mce_buttons_2', 'd12mla_register_buttons' );
	}
}
function d12mla_add_buttons( $plugin_array ) {
	$plugin_array['d12mla'] = plugins_url( 'js/d12mla.js', __FILE__ );
	return $plugin_array;
}
function d12mla_register_buttons( $buttons ) {
	array_push( $buttons, 'd12-mla-button' );
	return $buttons;
}
