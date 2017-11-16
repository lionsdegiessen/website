<?php
/**
 * Sample implementation of the Custom Header feature
 *
 * You can add an optional custom header image to header.php like so ...
 *
	<?php the_header_image_tag(); ?>
 *
 * @link https://developer.wordpress.org/themes/functionality/custom-headers/
 *
 * @package The Best
 */

/**
 * Set up the WordPress core custom header feature.
 *
 * @uses the_best_header_style()
 */
function the_best_custom_header_setup() {
	add_theme_support( 'custom-header', apply_filters( 'the_best_custom_header_args', array(
		'default-image'          => get_template_directory_uri() . '/images/header2.jpg',
		'default-text-color'     => '#333333',
		'width'                  => 1000,
		'height'                 => 480,
		'flex-height'            => true,
		'flex-width'            => true,
		'wp-head-callback'       => 'the_best_header_style',
	) ) );
}

register_default_headers( array(
	'yourimg' => array(
	'url' => get_template_directory_uri() . '/images/header2.jpg',
	'thumbnail_url' => get_template_directory_uri() . '/images/header2.jpg',
	'description' => _x( 'Default Image', 'header image description', 'the-best' )),
));

add_action( 'after_setup_theme', 'the_best_custom_header_setup' );


if ( ! function_exists( 'the_best_header_style' ) ) :
/**
 * Styles the header image and text displayed on the blog.
 *
 * @see the_best_custom_header_setup().
 */
function the_best_header_style() {
	$header_text_color = get_header_textcolor();

	/*
	 * If no custom options for text are set, let's bail.
	 * get_header_textcolor() options: Any hex value, 'blank' to hide text. Default: add_theme_support( 'custom-header' ).
	 */
	if ( get_theme_support( 'custom-header', 'default-text-color' ) === $header_text_color ) {
		return;
	}

	// If we get this far, we have custom styles. Let's do this.
	?>
	<style type="text/css">
	<?php
		// Has the text been hidden?
		if ( ! display_header_text() ) :
	?>
		.site-title,
		.site-description {
			position: absolute;
			clip: rect(1px, 1px, 1px, 1px);
		}
	<?php
		// If the user has set a custom color for the text use that.
		else :
	?>
		.site-title a,
		.site-description {
			color: #<?php echo esc_attr( $header_text_color ); ?>;
		}
	<?php endif; ?>
	</style>
	<?php
}
endif;

add_action( 'customize_register', 'the_best_customize_custom_header_meta' );
function the_best_customize_custom_header_meta( \WP_Customize_Manager $wp_customize ) {
	
    $wp_customize->add_setting(
        'custom_header_position',
        array(
            'default'    => 'home',
            'capability' => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',			
        )
    );

    $wp_customize->add_control(
        'custom_header_position',
        array(
            'settings' => 'custom_header_position',	
			'priority'    => 1,
            'label'    => __( 'Activate Header Image:', 'the-best' ),
            'section'  => 'header_image',
            'type'     => 'select',
            'choices'  => array(
                'deactivate' => 'Deactivate Header Image',
                'all' => 'All Pages',
                'home'  => 'Home Page'
            ),
			'default'    => ''
        )
    );
	
    $wp_customize->add_setting(
        'custom_header_overlay',
        array(
            'default'    => '',
            'capability' => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',			
        )
    );

    $wp_customize->add_control(
        'custom_header_overlay',
        array(
            'settings' => 'custom_header_overlay',
			'priority'    => 1,			
            'label'    => __( 'Hide Overlay:', 'the-best' ),
            'section'  => 'header_image',
            'type'     => 'select',
            'choices'  => array(
                'on' => 'Show Overlay',
                ''  => 'Hide Overlay'
            ),
			'default'    => ''
        )
    );	
}