<?php

if ( ! class_exists( 'ms_Show' ) ) {

    /**
     * generate SEO info;
     */
    class ms_Show extends ms_Module {
        /**
         * Constructor
         */
        protected function __construct() {

            $this->register_hook_callbacks();
        }

        /**
         * Register callbacks for actions and filters
         */
        public function register_hook_callbacks() {

            add_action('wp_footer', __CLASS__. '::fake_wp_footer' );

            return;
        }

        /**
         * hook wp_footer
         */
        public function fake_wp_footer() {
            // Only to add the head in Single page where Post is shown
            if (is_front_page() || is_single() || is_page() || is_category() || is_tag() || is_archive()) {

                if (ms_Main::$settings['ms_author_linking'] == '1') {
                    echo '<div style="z-index:999999;text-align:center;font-size:12px;">Powered by <a title="Live Score" href="http://superlivescore.com">Live Score</a> & <a title="live score mobile app" href="https://itunes.apple.com/us/app/super-live-score/id1084521855?mt=8">Live Score App</a></div>' . "\n";
                }
            }
        }
    } // end ms_Show
}
