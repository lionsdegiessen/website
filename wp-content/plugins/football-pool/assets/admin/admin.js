// minified with http://closure-compiler.appspot.com/home
// local: CTRL+SHIFT+C

jQuery( document ).ready( function() {
	jQuery( 'body.football-pool input.current-page' ).keydown( function( e ) {
		var code = ( e.keyCode ? e.keyCode : e.which );
		if ( code == 13 ) jQuery( 'input[name="action"]' ).val( '' );
	} );
	
	jQuery( 'div.matchtype input:checkbox' ).click( function() {
		var matchtype_id = jQuery( this ).attr( 'id' ).replace( 'matchtype-', '' );
		if ( jQuery( this ).is( ':checked' ) ) {
			jQuery( 'div.matchtype-' + matchtype_id + ' input:checkbox' ).each( function() {
				jQuery( this ).attr( 'checked', 'checked' );
			} );
		} else {
			jQuery( 'div.matchtype-' + matchtype_id + ' input:checkbox' ).each( function() {
				jQuery( this ).removeAttr( 'checked' );
			} );
		}
	} );
	
	// show/hide row actions on tab navigation
	jQuery( 'div.row-actions span a' ).each( function() {
		jQuery( this ).focus( { el: jQuery( this ) }, function( e ) {
			jQuery( window ).keyup( { el: e.data.el }, function( e ) {
				var code = ( e.keyCode ? e.keyCode : e.which );
				if ( code == 9 ) {
					e.data.el.parent().parent().css( { left: 0 } ); 
				}
			} );
		} );
		jQuery( this ).blur( { el: jQuery( this ) }, function( e ) {
			jQuery( window ).keyup( { el: e.data.el }, function( e ) {
				var code = ( e.keyCode ? e.keyCode : e.which );
				if ( code == 9 ) {
					e.data.el.parent().parent().css( { left: -9999 } ); 
				}
			} );
		} );
	} );
} );

var FootballPoolAdmin = (function ( $ ) {
	
	var value_store = [];
	
	// score calculation handling
	var cbox;
	var start_time;
	var calc_timer = false;
	var force_calculation_setting = 0;
	var calculation_completed = false;
	var calculation_cancelled = false;
	
	function force_calculation() {
		force_calculation_setting = 1;
		calculate_score_history();
	}
	
	function cancel_calculation() {
		if ( ! calculation_completed ) {
			var ajax_action = 'footballpool_calculate_scorehistory';
			calculation_cancelled = true;
			
			$.ajax( {
					data: {
						action: ajax_action,
						fp_recalc_nonce: FootballPoolAjax.fp_recalc_nonce,
						calculation_step: 'cancel_calculation',
						iteration: 1
					},
					url: ajaxurl,
					global: false,
					dataType: 'json',
					method: 'POST',
					success: function( data, textStatus, jqXHR ) {
						console.log( 'football pool calculation cancelled' );
					},
					error: function( jqXHR, textStatus, errorThrown ) {
						console.log( errorThrown );
					}
			} );
		}
	}
	
	function calculate_score_history() {
		var data = arguments[0] || 0;
		var ajax_action = 'footballpool_calculate_scorehistory';
		var bar = [];
		
		if ( data === 0 ) {
			calculation_cancelled = false;
			start_time = new Date().getTime();
			
			$.ajax( {
					data: {
						action: ajax_action,
						fp_recalc_nonce: FootballPoolAjax.fp_recalc_nonce,
						iteration: 0,
						force_calculation: force_calculation_setting
					},
					url: ajaxurl,
					global: false,
					dataType: 'json',
					method: 'POST',
					success: function( response, textStatus, jqXHR ) {
								cbox = $.colorbox( { 
													html: response.colorbox_html,
													overlayClose: false,
													escKey: true,
													arrowKey: false,
													close: FootballPoolAjax.colorbox_close,
													innerWidth: "500px",
													innerHeight: "285px"
												} );
								// bind cleanup method to colorbox
								$( document ).bind( 'cbox_cleanup', function() {
									cancel_calculation();
								} );
								$( '#fp-calc-progress' ).show();
								bar = $( '#fp-calc-progressbar' );
								if ( bar.length != 0 ) {
									bar.progressbar();
									bar.show();
									$( '#ajax-loader' ).show();
									if ( bar.progressbar( 'option', 'max' ) != response.total_iterations ) {
										bar.progressbar( 'option', 'max', response.total_iterations );
									}
								}
								$( '#calculation-message' ).html( response.message );
								if ( ! calculation_cancelled ) calculate_score_history( response );
					},
					error: function( jqXHR, textStatus, errorThrown ) {
								clear_elapsed_time_timer();
								alert( "Error message:\n" + errorThrown ); 
					}
			} );
		} else {
			if ( calc_timer === false ) {
				calc_timer = setInterval( function() { 
											var elapsed_time = ( new Date().getTime() ) - start_time; 
											$( '#time-elapsed' ).html( format_time( elapsed_time / 1000 ) );
										}, 1000 );
			}
			
			$.ajax( {
					data: {
						action: ajax_action,
						force_calculation: data.force_calculation,
						fp_recalc_nonce: data.fp_recalc_nonce,
						total_iterations: data.total_iterations,
						iteration: data.iteration,
						sub_iteration: data.sub_iteration,
						sub_iterations: data.sub_iterations,
						calculation_step: data.calculation_step,
						user: data.user,
						ranking: data.ranking,
						match: data.match,
						question: data.question,
						prev_total_score: data.prev_total_score,
						score_order: data.score_order
					},
					url: ajaxurl,
					global: false,
					dataType: 'json',
					method: 'POST',
					success: function( response, textStatus, jqXHR ) {
								// console.log( response );
								if ( response == null ) {
									score_calculation_error( FootballPoolAdmin.error_message + ' Error: response was null.' );
								} else {
									calculation_completed = ( typeof response.completed !== 'undefined' 
																	&& response.completed === 1 );
									
									// calculate estimated time left
									var elapsed_time = ( new Date().getTime() ) - start_time;
									var iteration_time = elapsed_time / data.iteration;
									var estimated_total_time = data.total_iterations * iteration_time;
									var time_left_in_seconds = ( estimated_total_time - elapsed_time ) / 1000;
									if ( time_left_in_seconds < 0 ) time_left_in_seconds = 0;
									// only show time left when at least 2 iterations have passed
									if ( data.iteration > 1 ) {
										$( '#time-left' ).html( format_time( time_left_in_seconds ) );
									}
									// update progress bar and status message
									bar = $( '#fp-calc-progressbar' );
									if ( bar.length != 0 ) {
										bar.progressbar();
										if ( bar.progressbar( 'option', 'max' ) != response.total_iterations ) {
											bar.progressbar( 'option', 'max', response.total_iterations );
										}
										bar.progressbar( 'option', 'value', response.iteration );
									}
									$( '#calculation-message' ).html( response.message );
									
									// continue or stop?
									if ( response.error === false ) {
										if ( calculation_completed ) {
											clear_elapsed_time_timer();
											$( '#time-left' ).html( format_time( 0 ) );
											$( '#ajax-loader' ).hide();
										} else {
											if ( ! calculation_cancelled ) calculate_score_history( response );
										}
									} else {
										clear_elapsed_time_timer();
										score_calculation_error( response.error );
									}
								}
					},
					error: function( jqXHR, textStatus, errorThrown ) {
						score_calculation_error( errorThrown );
					}
			} );
		}
	}
	
	function format_time( sec_num ) {
		sec_num = Math.floor( sec_num );
		var hours   = Math.floor( sec_num / 3600 );
		var minutes = Math.floor( ( sec_num - ( hours * 3600 ) ) / 60 );
		var seconds = sec_num - ( hours * 3600 ) - ( minutes * 60 );

		if ( hours   < 10 ) hours   = '0' + hours;
		if ( minutes < 10 ) minutes = '0' + minutes;
		if ( seconds < 10 ) seconds = '0' + seconds;
		var time = hours + ':' + minutes + ':' + seconds;
		return time;
	}
	
	function clear_elapsed_time_timer() {
		clearInterval( calc_timer );
		calc_timer = false;
	}
	
	function score_calculation_error() {
		var msg = arguments[0] || FootballPoolAjax.error_message;
		clear_elapsed_time_timer();
		$( '#ajax-loader' ).hide();
		$( '#fp-calc-progress' ).show();
		$( '#calculation-message' ).html( '<span class="error">' + msg + '</span>' );
	}
	// end score calculation handler
	
	function bulk_action_warning( id ) {
		var bulk_select = $( '#' + id );
		var msg;
		if ( bulk_select && bulk_select.prop( 'selectedIndex' ) != 0 ) {
			msg = $( '#' + id + ' option').filter( ':selected' ).attr( 'bulk-msg' );
			if ( msg != '' && msg != undefined ) {
				return( confirm( msg ) );
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	function toggle_points( id ) {
		$( '#' + id + '_points' ).toggle();
	}
	
	function set_input_param( param, id, value ) {
		var param_value;
		if ( $.isArray( id ) && id.length >= 1 ) {
			$.each( id, function( i, v ) { 
				if ( v != '' ) {
					if ( ! $.isArray( value_store[v] ) ) value_store[v] = [];
					value_store[v][param] = $( v ).attr( param );
					param_value = $.isArray( value ) ? value[i] : value;
					$( v ).attr( param, param_value );
				}
			} );
		} else {
			if ( id != '' ) {
				value_store[id] = [ param, $( id ).attr( param ) ];
				param_value = $.isArray( value ) ? value[0] : value;
				$( id ).attr( param, param_value );
			}
		}
	}

	function restore_input_param( param, id ) {
		var param_value = '';
		if ( $.isArray( id ) && id.length >= 1 ) {
			$.each( id, function( i, v ) {
				param_value = ( typeof value_store[v][param] != undefined ) ? value_store[v][param] : '';
				$( v ).attr( param, param_value );
			} );
		} else {
			if ( id != '' ) {
				param_value = ( typeof value_store[id][param] != undefined ) ? value_store[id][param] : '';
				$( id ).attr( param, param_value );
			}
		}
	}
	
	function disable_inputs( id ) {
		var check_id = arguments[1] || '';
		var readonly = false;
		if ( check_id != '' ) {
			readonly = $( '#' + check_id ).is( ':checked' );
		}
		
		if ( $.isArray( id ) && id.length >= 1 ) {
			$.each( id, function( i, v ) { 
				if ( v != '' ) {
					if ( check_id != '' ) {
						if ( readonly ) {
							$( v ).attr( 'disabled', 'disabled' );
						} else {
							$( v ).removeAttr( 'disabled' );
						}
					} else {
						$( v ).attr( 'disabled', 'disabled' ); 
					}
				}
			} );
		} else if ( id != '' ) {
			if ( check_id != '' ) {
				if ( readonly ) {
					$( id ).attr( 'disabled', 'disabled' );
				} else {
					$( id ).removeAttr( 'disabled' );
				}
			} else {
				$( id ).attr( 'disabled', 'disabled' ); 
			}
		}
	}

	function toggle_linked_radio_options( active_id, disabled_id ) {
		if ( $.isArray( active_id ) && active_id.length >= 1 ) {
			$.each( active_id, function( i, v ) { 
				if ( v != '' ) $( v ).toggle( true ); 
			} );
		} else if ( active_id != '' ) {
			$( active_id ).toggle( true );
		}
		
		if ( $.isArray( disabled_id ) && disabled_id.length >= 1 ) {
			$.each( disabled_id, function( i, v ) { 
				if ( v != '' ) $( v ).toggle( false ); 
			} );
		} else if ( disabled_id != '' ) {
			$( disabled_id ).toggle( false );
		}
	}
	
	return {
		// public methods
		calculate: calculate_score_history,
		force_calculation: force_calculation,
		bulk_action_warning: bulk_action_warning,
		toggle_points: toggle_points,
		set_input_param: set_input_param,
		restore_input_param: restore_input_param,
		disable_inputs: disable_inputs,
		toggle_linked_options: toggle_linked_radio_options
	};

} )( jQuery );

// jQuery Input Hints plugin
// Copyright (c) 2009 Rob Volk
// http://www.robvolk.com

jQuery( document ).ready( function() {
   jQuery( 'input[title].with-hint' ).inputHints();
});

jQuery.fn.inputHints=function() {
	// hides the input display text stored in the title on focus
	// and sets it on blur if the user hasn't changed it.

	// show the display text
	// changed (AntoineH): only for empty inputs
	jQuery(this).each(function(i) {
		if (jQuery(this).val() == '') {
			jQuery(this).val(jQuery(this).attr('title'))
				.addClass('hint');
		}
	});

	// hook up the blur & focus
	return jQuery(this).focus(function() {
		if (jQuery(this).val() == jQuery(this).attr('title'))
			jQuery(this).val('')
				.removeClass('hint');
	}).blur(function() {
		if (jQuery(this).val() == '')
			jQuery(this).val(jQuery(this).attr('title'))
				.addClass('hint');
	});
}; // jQuery Input Hints plugin
