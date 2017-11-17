<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package News_Reader
 */
?>


<?php
/**
 * Hook - newsreader_footer_container.
 *
 * @hooked newsreader_footer_container_before - 10
 * @hooked newsreader_footer_container - 11
 * @hooked newsreader_footer_container_copy_right - 12
 * @hooked newsreader_footer_container_after - 13
 */
if (function_exists('slbd_display_widgets')) {
    echo slbd_display_widgets();
}
do_action('newsreader_footer_container');
?>
<?php wp_footer(); ?>
</body>
</html>
