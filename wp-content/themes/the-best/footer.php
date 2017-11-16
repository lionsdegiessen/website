<?php
/**
 * The template for displaying the footer.
 *
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		
		<div class="site-info">
		
				<?php _e('All rights reserved', 'the-best'); ?>  &copy; <?php bloginfo('name'); ?>
				
				<a href="http://wordpress.org/" title="<?php esc_attr_e( 'WordPress', 'the-best' ); ?>"><?php printf( __( 'Powered by %s', 'the-best' ), 'WordPress' ); ?></a>
							
				<a title="<?php _e('Wordpress theme', 'the-best'); ?>" href="<?php echo esc_url(__('http://minathemes.com/', 'the-best')); ?>" target="_blank"><?php _e('Theme by Mina Themes', 'the-best'); ?></a>	
				
		</div><!-- .site-info -->
	
	</footer><!-- #colophon -->
</div><!-- #page -->
	
<?php wp_footer(); ?>

</body>
</html>
