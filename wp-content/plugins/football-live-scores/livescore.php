<?php 
    /*
    Plugin Name: Football Live Scores
    Plugin URI: https://superlivescore.com
    Description: Add Free Football Live Scores on your website.
    Author: macsonuclari.com
    Version: 1.4
    Author URI: https://superlivescore.com
    */

add_shortcode('livescore', 'livescores');


function livescore_plugin(){
    	add_options_page('Live Score Settings', 'Live Scores', 'manage_options', 'livescore-plugin', 'ms_plugin_options');
}

add_action('admin_menu','livescore_plugin');


function ms_plugin_options(){
    	include('infot.php');
}


function livescores(){
?>
<iframe src="https://www.macsonuclarim.com/live-score/index.php?gmt=<?php echo ms_Main::$settings['ms_gmt']; ?>&lang=<?php echo ms_Main::$settings['ms_lang']; ?>" class="skor" id="macsonuclarim_iframe" scrolling="no" frameborder="0" width="100%"></iframe>
<script type="text/javascript" src="https://www.macsonuclarim.com/live-score/scripts/frame.js"></script>
<?php echo '<div style="z-index:999999;text-align:right;font-size:12px;">Powered by <a title="Live Score" href="http://superlivescore.com">Live Score</a> & <a title="live score mobile app" href="https://itunes.apple.com/us/app/super-live-score/id1084521855?mt=8">Live Score App</a></div>' . "\n"; ?>


<?php
}
register_activation_hook( __FILE__,'msplugin_activate');
register_deactivation_hook( __FILE__,'msplugin_deactivate');
add_action('admin_init', 'msredirect_redirect');

function msredirect_redirect() {
if (get_option('msredirect_do_activation_redirect', false)) { 
delete_option('msredirect_do_activation_redirect'); 
wp_redirect('../wp-admin/options-general.php?page=livescore-plugin');
}
}

// Include Files
$files = array(
    '/classes/ms-module',
    '/classes/ms-main',
    '/classes/ms-show',
    '/classes/ms-setting',
    '/includes/admin-notice-helper/admin-notice-helper'
);

foreach ($files as $file) {
    require_once plugin_dir_path( __FILE__ ).$file.'.php';
}
if ( class_exists( 'ms_Main' ) ) {
    ms_Main::get_instance();
 }?>