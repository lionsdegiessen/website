<?php 
/*
Plugin Name: Football Transfer Rumors
Plugin URI: https://wordpress.org/plugins/football-transfer-rumors/
Description: Rumors from news medias about transfer of football players
Version: 1.0
Author: https://www.oddsvalue.com
*/

/**
 * Main Class
 */
class Football_Transfer_Rumors_Options {
  
    /*--------------------------------------------*
     * Attributes
     *--------------------------------------------*/
  
    /** Refers to a single instance of this class. */
    private static $instance = null;
     
    /* Saved options */
    public $options;
    
    private $supported_language_arr = array(
		1	=> 'English',
		// 2	=> 'Spanish',
		// 3	=> 'Russian',
		// 4	=> 'Turkish',
		// 5	=> 'German',
		// 6	=> 'Portugese',
		// 7	=> 'Vietnamese',
		8	=> 'Macedonian',
		9	=> 'Serbian',
		// 10	=> 'Croatian',
		// 11	=> 'Bulgarian',
		12	=> 'Danish',
    );
    
    private $supported_font_family_arr = array('Trebuchet MS', 'Verdana', 'Tahoma', 'Calibri', 'Sans Serif', 'Arial');
  
    /*--------------------------------------------*
     * Constructor
     *--------------------------------------------*/
  
    /**
     * Creates or returns an instance of this class.
     *
     * @return  Oddsvalue_Options A single instance of this class.
     */
    public static function get_instance() {
  
        if ( null == self::$instance ) {
            self::$instance = new self;
        }
  
        return self::$instance;
  
    } // end get_instance;
  
    /**
     * Initializes the plugin by setting localization, filters, and administration functions.
     */
    private function __construct() { 
 
	    // Add the page to the admin menu
	    add_action( 'admin_menu', array( &$this, 'add_page' ) );
	     
	    // Register page options
	    add_action( 'admin_init', array( &$this, 'register_page_options') );
	     
	    // Css rules for Color Picker
	    wp_enqueue_style( 'wp-color-picker' );
	     
	    // Register javascript
	    add_action('admin_enqueue_scripts', array( $this, 'enqueue_admin_js' ) );
	     
	    // Get registered option
	    $this->options = get_option( 'ftr_settings' );
	    
	}

  
    /*--------------------------------------------*
     * Functions
     *--------------------------------------------*/
      
    /**
     * Function that will add the options page under Setting Menu.
     */
    public function add_page() {

    // $page_title, $menu_title, $capability, $menu_slug, $callback_function
    add_options_page( 'Theme Options', 'Football Transfer Rumors', 'manage_options', __FILE__, array( $this, 'display_page' ) );

 }
      
    /**
     * Function that will display the options page.
     */
	public function display_page() { 
	    ?>
	    <div class="wrap">
	     
	        <h2>Football Transfer Rumors Plugin Options</h2>
	        <form method="post" action="options.php">     
	        <?php 
	            settings_fields(__FILE__);      
	            do_settings_sections(__FILE__);
	            submit_button();
	        ?>
	        </form>
	    <h2>Notes</h2>
	    <ul>
	        <li>How to use the plugin?
	            <blockquote>
	                * Use <code>[football_transfer_rumors]</code> shortcode where you want to display the rumors section.
	            </blockquote>
	        </li>
	        <li>When you set "Author Credit Link" to "Off" means:
	            <blockquote>
	                * You are not linking back to author site.<br>
	                * Football Transfer Rumors will work in an iframe that sized 100% x 5000px .<br>
	                * Color and Font customizations will be default setting.<br>
	            </blockquote>
	        </li>
	        <li>When you set "Author Credit Link" to "On" means:
	            <blockquote>
	                * You are linking back to author site.<br>
	                * Football Transfer Rumors will work without an iframe.<br>
	                * Color and Font customizations will be your setting.<br>
	            </blockquote>
	        </li>
	        <li>To use as widget, do the following:
	            <blockquote>
	                * Enter <code>add_filter('widget_text','do_shortcode');</code> in theme &quot;functions.php&quot;.<br>
	                * Add textbox to widget.<br>
	                * Use short code <code>[football_transfer_rumors widget=3]</code> to show 3 latest rumors. <small>You can put any number there</small><br>
	            </blockquote>
	        </li>
	    </ul>
	    </div> <!-- /wrap -->
	    <?php    
	}   
    /**
     * Function that will register admin page options.
     */
	public function register_page_options() { 
	    
		
	    // Add Section for option fields
	    add_settings_section( 'main_section', 'Fonts, colors and other settings', array( $this, 'display_section' ), __FILE__ ); // id, title, display cb, page
	     
	    add_settings_field( 'languageId', 'Language', array( $this, 'outputLanguageOptions' ), __FILE__, 'main_section' ); // id, title, display cb, page, section     
	    add_settings_field( 'authorLink', 'Author Credit Link', array( $this, 'outputSettingAuthorLink' ), __FILE__, 'main_section' ); // id, title, display cb, page, section     
	    add_settings_field( 'fontFamily', 'Font', array( $this, 'getFontFamilyOptions' ), __FILE__, 'main_section' ); // id, title, display cb, page, section     
		add_settings_field( 'color_picker_font_color', 'Font Color', array( $this, 'getColorPicker' ), __FILE__, 'main_section', array('o_name' => 'colorFont', 'def_color' => $this->getOptionColor('colorFont')) ); // id, title, display cb, page, section
	    
	    /////////////////////////////////////////////////////////////////////
	    // COLOR PICKER SETTINGS FOR MENU
	    /////////////////////////////////////////////////////////////////////
	    add_settings_section( 'color_picker_date_row', 'Date Row Colors', array( $this, 'display_section' ), __FILE__ ); // id, title, display cb, page

	    add_settings_field( 'color_picker_date_row_bg',		'Date Row Background Color',	array( $this, 'getColorPicker' ),	__FILE__, 'color_picker_date_row', array('o_name' => 'colorDateRowBg', 'def_color' => $this->getOptionColor('colorDateRowBg')) ); // id, title, display cb, page, section
	    add_settings_field( 'color_picker_date_row_font',	'Date Row Font Color',			array( $this, 'getColorPicker'),	__FILE__, 'color_picker_date_row', array('o_name' => 'colorDateRowFont', 'def_color' => $this->getOptionColor('colorDateRowFont')) ); // id, title, display cb, page, section
		
	    
	    add_settings_section( 'widget_options', 'Widget Options', array( $this, 'display_section' ), __FILE__ );
	    //add_settings_field( 'widgetLength', 'Items in widget', array( $this, 'getItemsInWidget' ), __FILE__, 'widget_options' ); // id, title, display cb, page, section 
	    add_settings_field( 'widgetURL', 'URL to transfer rumors page', array( $this, 'getUrlTransferRumors' ), __FILE__, 'widget_options' ); // id, title, display cb, page, section 
	    
	    // Register Settings
	   // register_setting( __FILE__, 'cpa_settings_options', array( $this, 'validateOptions' ) ); // option group, option name, sanitize cb 
	    register_setting( __FILE__, 'ftr_settings', array( $this, 'validateOptions' ) ); // option group, option name, sanitize cb 
	}
	
	function getUrlTransferRumors() {
		
		$value = array_key_exists('pageUrl', $this->options) ? $this->options['pageUrl'] : '';
		echo '<input type="text" name="ftr_settings[pageUrl]" value="'.$value.'"/>';
		echo '<p><small>Enter the relative url to the page showing all transfer rumors. Eg. /transfer-rumors/</small></p>';
	}
	function getItemsInWidget() {
		
		$value = array_key_exists('widgetLength', $this->options) ? $this->options['widgetLength'] : 3;
		
		echo '<select name="ftr_settings[widgetLength]">';
		
		for($i = 1 ; $i <= 10 ; $i++) {
			echo '<option value="'.$i.'" '.($i == $value ? 'selected' : '').'>'.$i.'</option>';
		}
		
		echo '</select>';
	}
	
	private function getOptionColor($key) {
		if(array_key_exists($key, $this->options)) {
			$color = $this->options[$key];
		} else {
			switch ($key) {
				case 'colorFont':					$color = '#505050'; break;
				case 'colorDateRowBg':				$color = '#505050'; break;
				case 'colorDateRowFont':			$color = '#FFFFFF'; break;
				default:							$color = '#000000';
			}
		}
		
		return $color;
	}
     
    /**
     * Function that will add javascript file for Color Piker.
     */
	public function enqueue_admin_js() { 
	     
	    // Make sure to add the wp-color-picker dependecy to js file
	    wp_enqueue_script( 'cpa_custom_js', plugins_url( 'jquery.custom.js', __FILE__ ), array( 'jquery', 'wp-color-picker' ), '', true  );
	}     
    /**
     * Function that will validate all fields.
     */
	public function validateOptions( $fields ) {
		
		$valid_fields = array();
		
		foreach ($fields as $key => $value) {
			
			$value = trim($value);
			$fields[$key] = $value;
			
			if(substr($key, 0, 5) == 'color') {
				if(!$this->validateColor($value)) {
					add_settings_error('ftr_setting', 'ftr_error', 'Insert a valid color', 'error' );
					
					if(array_key_exists($key, $this->options)) {
						$valid_fields[$key] = $this->options[$key];
					} else {
						unset($fields[$key]);
					}
					
				} else {
					$valid_fields[$key] = $value;
				}
			} else if($key == 'languageId') {
				if(array_key_exists($value, $this->supported_language_arr)) {
					$valid_fields[$key] = $value;
				} else {
					add_settings_error('ftr_setting', 'ftr_error', 'Invalid language selected', 'error' );
					$valid_fields[$key] = 1;
				}
			} else if($key == 'fontFamily') {
				if(in_array($value, $this->supported_font_family_arr)) {
					$valid_fields[$key] = $value;
				} else {
					add_settings_error('ftr_setting', 'ftr_error', 'Invalid font selected', 'error' );
					$valid_fields[$key] = 'Verdana';
				}
			} else if($key == 'authorLink') {
				if(!in_array($value, array(0, 1))) {
					$valid_fields[$key] = 0;
				} else {
					$valid_fields[$key] = $value;
				}
			} else if(in_array($key, array('widgetLength', 'pageUrl'))) {
				$valid_fields[$key] = $value;
			}
		}
	
	    return apply_filters( 'validateOptions', $valid_fields, $fields);
	
	} 
    /**
     * Function that will check if value is a valid HEX color.
     */
	public function validateColor($value) { 
		
		if ( preg_match( '/^#[a-f0-9]{6}$/i', $value ) ) { // if user insert a HEX color with #     
			return true;
		}
		
		return false;
	}     
    /**
     * Callback function for settings section
     */
    public function display_section() { /* Leave blank */ } 
     
    /**
     * Functions that display the fields.
     */
	
	public function outputSettingAuthorLink() { 
	
		$selected_key = (is_array($this->options) && array_key_exists('authorLink', $this->options)) ? $this->options['authorLink'] : 0;
		
		$value_arr = array(
			0	=> 'Off',
			1	=> 'On'
		);
		
		echo	'<select name="ftr_settings[authorLink]">';
		
		foreach ($value_arr as $key => $value) {
			echo	'<option value="'.$key.'" '.($key == $selected_key ? 'selected' : '').'>'.$value.'</option>';
		}
		
		echo	'</select>';
	}
	public function getFontFamilyOptions() {
		
		$selected_value = (is_array($this->options) && array_key_exists('fontFamily', $this->options)) ? $this->options['fontFamily'] : 0;
		
		echo	'<select name="ftr_settings[fontFamily]">';
		
		foreach ($this->supported_font_family_arr as $value) {
			echo	'<option value="'.$value.'" '.($value == $selected_value ? 'selected' : '').'>'.$value.'</option>';
		}
		
		echo	'</select>';
	}
	public function outputLanguageOptions() { 
		
		$language_id = (is_array($this->options) && array_key_exists('languageId', $this->options)) ? $this->options['languageId'] : 0;
		
		echo	'<select name="ftr_settings[languageId]">';
		
		foreach ($this->supported_language_arr as $id => $name) {
			echo	'<option value="'.$id.'" '.($id == $language_id ? 'selected' : '').'>'.$name.'</option>';
		}
		
		echo	'</select>';
	}

	public function getColorPicker(array $args) {

		$val=$this->options[$args['o_name']];
		
		if ($val=='') { 
			$val=$args['def_color'];
		}
		
		echo '<input type="text" name="ftr_settings['. $args['o_name'] .']" value="' . $val . '" class="cpa-color-picker" >  ';
	}

         
} // end class

Football_Transfer_Rumors_Options::get_instance();

function get_football_transfer_rumors($atts) {
	
	$obj_arr = array();
	
	$settings = get_option('ftr_settings');

	if(array_key_exists('authorLink', $settings) && $settings['authorLink'] == 1) {
		foreach ($settings as $key => $value) {
			array_push($obj_arr, $key.':\''.$value.'\'');
		}
		
		if(is_array($atts)) {
			if(array_key_exists('widget', $atts)) {
				array_push($obj_arr, 'widget:\''.$atts['widget'].'\'');
			}
		}
	
	    $html	=	'<script type="text/javascript" src="http://oddsvalue.com/plugin/rumor/script/launch.js"></script>'
	    		.	'<script type="text/javascript">'
	    		.		'Rumors.launch({'.implode(', ', $obj_arr).'});'
	    		.	'</script>'
	    		.	'<div id="Rumors"><a href="http://www.oddsvalue.com" title="Get free football transfer rumors">Football Transfer Rumors</a></div>';
	} else {
		$language_id = array_key_exists('languageId', $settings) ? $settings['languageId'] : 1;
		
		$html	=	'<iframe src="http://www.oddsvalue.com/plugin/rumor/?language_id='.$language_id.'" frameborder="0" style="width:100%;height:5000px;"></iframe>';
	}
    
    
    return    $html;
}
  
add_shortcode( 'football_transfer_rumors', 'get_football_transfer_rumors' );

?>