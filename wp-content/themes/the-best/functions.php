<?php
/**
 * The Best functions and definitions
 */

if ( ! function_exists( 'the_best_setup' ) ) :

function the_best_setup() {
	load_theme_textdomain( 'the-best', get_template_directory() . '/languages' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );

	register_nav_menus( array(
		'menu-1' => esc_html__( 'Primary', 'the-best' ),
	) );

	register_nav_menus( array(
		'menu-2' => esc_html__( 'Top', 'the-best' ),
	) );

	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'the_best_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );
	
    // add custom logo
    add_theme_support( 'custom-logo', array (
                       'width'                  => 145,
                       'height'                 => 36,
                       'flex-height'            => true,
                       'flex-width'             => true,
                    ) );	
}
endif;
add_action( 'after_setup_theme', 'the_best_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function the_best_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'the_best_content_width', 640 );
}
add_action( 'after_setup_theme', 'the_best_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function the_best_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'the-best' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'the-best' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'the_best_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function the_best_scripts() {
	
	wp_enqueue_style( 'the-best-style', get_stylesheet_uri() );

	wp_enqueue_style( 'the-best-genericons', get_template_directory_uri() . '/genericons/genericons.css', array(), '3.4.1' );
	
	wp_enqueue_script( 'the-best-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'the_best_scripts' );

require get_template_directory() . '/inc/custom-header.php';
require get_template_directory() . '/inc/template-tags.php';
require get_template_directory() . '/inc/extras.php';
require get_template_directory() . '/inc/customizer.php';
require get_template_directory() . '/inc/jetpack.php';

				
		
/***********************************************************************************
 * Buy
***********************************************************************************/

		function customize_styles_the_best( $input ) { ?>
			<style type="text/css">
				#customize-theme-controls #accordion-panel-pro_panel .accordion-section-title,
				#customize-theme-controls #accordion-panel-pro_panel > .accordion-section-title {
					background: #CE0000;
					color: #FFFFFF;
				}

				.the_best-info button a {
					color: #FFFFFF;
				}	
			</style>
		<?php }
		
		add_action( 'customize_controls_print_styles', 'customize_styles_the_best');
		
/*********************************************************************************************************
* Excerpt
**********************************************************************************************************/
	
		function the_bestmagazine_excerpt_more( $more ) {

				return '<p class="link-more"><a class="read-more" href="'. get_permalink( get_the_ID() ) . '">' . the_bestreturn_read_more_text (). '</a></p>';
			
		}
			add_filter( 'excerpt_more', 'the_bestmagazine_excerpt_more' );

		function custom_excerpt_length( $length ) {
			if (get_theme_mod('the_bestread_more_lenght') and get_theme_mod('the_bestread_more_activate')) {
				return get_theme_mod('the_bestread_more_lenght');
			}
			else return 42;
		}
		add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
	
	
	function the_bestreturn_read_more_text () {
		if (get_theme_mod('the_bestread_more_text')) {	 
			return get_theme_mod('the_bestread_more_text');
		} 
		return "Read More";
	}
		