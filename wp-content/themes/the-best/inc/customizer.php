<?php
/**
 * the-best Theme Customizer
 *
 * @package The Best
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function the_best_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';



function the_best_customize_preview_js() {
	wp_enqueue_script( 'the_best_customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'the_best_customize_preview_js' );


		$wp_customize->add_panel( 'pro_panel' , array(
			'title'       => __( 'The Best Pro', 'the-best' ),
			'priority'		=> 3,
		) );		
		
		$wp_customize->add_section( 'the_best_prmeium_slider' , array(
			'title'       => __( 'The Best Slider ✓', 'the-best' ),
			'panel' => 'pro_panel',			
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 2,
		) );		 
		$wp_customize->add_setting( 'the_best_prmeium_slider1', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'the_best_prmeium_slider1', array(
			'section'   => 'the_best_prmeium_slider',
			'type'      => 'radio'
			 )
		 );	
		
		$wp_customize->add_section( 'the_best_prmeium_section' , array(
			'title'       => __( 'Header Options ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo1', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo1', array(
			'section'   => 'the_best_prmeium_section',
			'type'      => 'radio'
			 )
		 );	
		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section2' , array(
			'title'       => __( 'Menu Options ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo2', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo2', array(
			'section'   => 'the_best_prmeium_section2',
			'type'      => 'radio'
			 )
		 );	
		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section3' , array(
			'title'       => __( 'Content Options ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo3', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo3', array(
			'section'   => 'the_best_prmeium_section3',
			'type'      => 'radio'
			 )
		 );
		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section4' , array(
			'title'       => __( 'Sidebar Options ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo4', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo4', array(
			'section'   => 'the_best_prmeium_section4',
			'type'      => 'radio'
			 )
		 );
		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section5' , array(
			'title'       => __( 'Footer Options ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo5', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo5', array(
			'section'   => 'the_best_prmeium_section5',
			'type'      => 'radio'
			 )
		 );
		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section6' , array(
			'title'       => __( 'WooCommerce Options ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo6', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo6', array(
			'section'   => 'the_best_prmeium_section6',
			'type'      => 'radio'
			 )
		 );
		 		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section7' , array(
			'title'       => __( 'Social Icons ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo7', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo7', array(
			'section'   => 'the_best_prmeium_section7',
			'type'      => 'radio'
			 )
		 );
		 		 		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section8' , array(
			'title'       => __( 'Custom CSS ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo8', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo8', array(
			'section'   => 'the_best_prmeium_section8',
			'type'      => 'radio'
			 )
		 );
		 		 		 		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section9' , array(
			'title'       => __( 'Read More Button ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo9', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo9', array(
			'section'   => 'the_best_prmeium_section9',
			'type'      => 'radio'
			 )
		 );
		 		 		 		 		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section10' , array(
			'title'       => __( 'Back To Top Button ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo10', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo10', array(
			'section'   => 'the_best_prmeium_section10',
			'type'      => 'radio'
			 )
		 );
		 		 		 		 		 		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section11' , array(
			'title'       => __( 'Banner ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo11', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo11', array(
			'section'   => 'the_best_prmeium_section11',
			'type'      => 'radio'
			 )
		 );
		 		 		 		 		 		 		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section12' , array(
			'title'       => __( 'Disable All Comments ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo12', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo12', array(
			'section'   => 'the_best_prmeium_section12',
			'type'      => 'radio'
			 )
		 );
		 		 		 		 		 		 		 		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section13' , array(
			'title'       => __( 'Hide All Titles ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo13', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo13', array(
			'section'   => 'the_best_prmeium_section13',
			'type'      => 'radio'
			 )
		 );
		 		 		 		 		 		 		 		 		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section14' , array(
			'title'       => __( 'All Google Fonts ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo14', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo14', array(
			'section'   => 'the_best_prmeium_section14',
			'type'      => 'radio'
			 )
		 );
		 		 		 		 		 		 		 		 		 		 		 		 
/***************************************************/	
	 
		$wp_customize->add_section( 'the_best_prmeium_section15' , array(
			'title'       => __( 'Mobile Phone ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'demo15', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'demo15', array(
			'section'   => 'the_best_prmeium_section15',
			'type'      => 'radio'
			 )
		 );
		 
/***************************************************/			 

		
		$wp_customize->add_section( 'the_best_prmeium_section_animation' , array(
			'title'       => __( 'Site Title Animation ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'animation1', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'animation1', array(
			'section'   => 'the_best_prmeium_section_animation',
			'type'      => 'radio'
			 )
		 );
		 
/***************************************************/
		 		
		$wp_customize->add_section( 'the_best_prmeium_section_animation2' , array(
			'title'       => __( 'Sub Menu Animation ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'animation2', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'animation2', array(
			'section'   => 'the_best_prmeium_section_animation2',
			'type'      => 'radio'
			 )
		 );			 
		 
		 		 
/***************************************************/
		 		
		$wp_customize->add_section( 'the_best_prmeium_section_animation3' , array(
			'title'       => __( 'Header Title Animation ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'animation3', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'animation3', array(
			'section'   => 'the_best_prmeium_section_animation3',
			'type'      => 'radio'
			 )
		 );			 
		 		 		 
/***************************************************/
		 		
		$wp_customize->add_section( 'the_best_prmeium_section_animation4' , array(
			'title'       => __( 'Slider Animation ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'animation4', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'animation4', array(
			'section'   => 'the_best_prmeium_section_animation4',
			'type'      => 'radio'
			 )
		 );			 
		 		 		 		 
/***************************************************/
		 		
		$wp_customize->add_section( 'the_best_prmeium_section_animation5' , array(
			'title'       => __( 'Header Button Animation ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'animation5', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'animation5', array(
			'section'   => 'the_best_prmeium_section_animation5',
			'type'      => 'radio'
			 )
		 );			 
		 		 		 		 		 
/***************************************************/
		 		
		$wp_customize->add_section( 'the_best_prmeium_section_animation6' , array(
			'title'       => __( 'Articles Animation ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'animation6', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'animation6', array(
			'section'   => 'the_best_prmeium_section_animation6',
			'type'      => 'radio'
			 )
		 );			 
		 		 		 		 		 		 
/***************************************************/
		 		
		$wp_customize->add_section( 'the_best_prmeium_section_animation7' , array(
			'title'       => __( 'Footer Animation ✓', 'the-best' ),
			'panel' => 'pro_panel',
			'description'    => __( '<a target="_blank" href="http://minathemes.com/the-best/">Preview Pro Version</a>', 'the-best' ),	
			'priority'		=> 3,
		) );		 
		$wp_customize->add_setting( 'animation7', array(
			'default'        => false,
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'esc_attr',
		 ) );

		$wp_customize->add_control( 'animation7', array(
			'section'   => 'the_best_prmeium_section_animation7',
			'type'      => 'radio'
			 )
		 );			 
		 
		 
}
add_action( 'customize_register', 'the_best_customize_register' );



/*****************************************************
Styles
*****************************************************/

function the_bestkirki_styles () { ?>
	<style>
			
		<?php if(!get_theme_mod('custom_header_overlay')) { ?> .dotted { background-image: none; !important; } <?php } ?>

	</style>
<?php }
	add_action('wp_head','the_bestkirki_styles');