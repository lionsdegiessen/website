<?php
/**
 * Plugin Name: WP Modal Popup with Cookie Integration
 * Plugin URI: http://www.wponlinesupport.com/
 * Description: Show Popup on your blog with desired content.
 * Text Domain: wp-modal-popup-with-cookie-integration
 * Domain Path: /languages/
 * Author: WP Online Support 
 * Version: 1.2.1
 * Author URI: http://www.wponlinesupport.com/
 *
 * @package WordPress
 * @author SP Technolab
 */

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Basic plugin definitions
 * 
 * @package WP Modal Popup with Cookie Integration
 * @since 1.0.0
 */
if( !defined( 'WMPCI_VERSION' ) ) {
	define( 'WMPCI_VERSION', '1.2.1' );	// Version of plugin
}
if( !defined( 'WMPCI_DIR' ) ) {
	define( 'WMPCI_DIR', dirname( __FILE__ ) );	// Plugin dir
}
if( !defined( 'WMPCI_URL' ) ) {
	define( 'WMPCI_URL', plugin_dir_url( __FILE__ ) );	// Plugin url
}
if( !defined( 'WMPCI_POPUP_POST_TYPE' ) ) {
	define( 'WMPCI_POPUP_POST_TYPE', 'wpo_popup' );	// Plugin meta prefix
}
if( !defined( 'WMPCI_META_PREFIX' ) ) {
	define( 'WMPCI_META_PREFIX', '_wmpci_' );	// Plugin meta prefix
}

/**
 * Load Text Domain
 * This gets the plugin ready for translation
 * 
 * @package WP Modal Popup with Cookie Integration
 * @since 1.0.0
 */
function wmpci_load_textdomain() {
	load_plugin_textdomain( 'wp-modal-popup-with-cookie-integration', false, dirname( plugin_basename(__FILE__) ) . '/languages/' );
}

// Action to load plugin text domain
add_action('plugins_loaded', 'wmpci_load_textdomain');

/**
 * Activation Hook
 * 
 * Register plugin activation hook.
 * 
 * @package WP Modal Popup with Cookie Integration
 * @since 1.0.0
 */
register_activation_hook( __FILE__, 'wmpci_install' );

/**
 * Deactivation Hook
 * 
 * Register plugin deactivation hook.
 * 
 * @package WP Modal Popup with Cookie Integration
 * @since 1.0.0
 */
register_deactivation_hook( __FILE__, 'wmpci_uninstall');

/**
 * Plugin Activation Function
 * Does the initial setup, sets the default values for the plugin options
 * 
 * @package WP Modal Popup with Cookie Integration
 * @since 1.0.0
 */
function wmpci_install(){

	// Get settings for the plugin
	$wmpci_options = get_option( 'wmpci_options' );
	
	if( empty( $wmpci_options ) ) { // Check plugin version option
		
		// set default settings
		wmpci_default_settings();

		// Update plugin version to option
		update_option( 'wmpci_plugin_version', '1.2.1' );
	}
}

/**
 * Plugin Deactivation Function
 * Delete  plugin options
 * 
 * @package WP Modal Popup with Cookie Integration
 * @since 1.0.0
 */
function wmpci_uninstall(){
}

// Global Variables
global $wmpci_options;

// Function File
require_once( WMPCI_DIR . '/includes/wmpci-functions.php' );
$wmpci_options = wmpci_get_settings();

// Script Class
require_once( WMPCI_DIR . '/includes/class-wmpci-script.php' );

// Admin Class
require_once( WMPCI_DIR . '/includes/admin/class-wmpci-admin.php' );

// Public Class
require_once( WMPCI_DIR . '/includes/class-wmpci-public.php' );