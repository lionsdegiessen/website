/**
 * tinymce-dialog.js
 *
 * Copyright, Antoine Hurkmans
 * This is part of the Football Pool WordPress plugin.
 * See https://wordpress.org/plugins/football-pool/ for details and license.
 */

jQuery( document ).ready( function() {
	// Set a callback to the get_shortcode() function in the parent window.
	parent.tinymce.activeEditor.get_shortcode = FootballPoolTinyMCE.get_shortcode;
} );

var FootballPoolTinyMCE = ( function( $ ) {
	
	function get_shortcode() {
		var selected_shortcode, 
			shortcode = '', 
			close_tag = false,
			content = false,
			preserve_content = false;
			the_text = '',
			scope = '',
			atts = '';
		
		selected_shortcode = $( '#shortcode' ).val();
		scope = '#' + selected_shortcode;
		switch( selected_shortcode ) {
			case 'fp-link':
				var slug = $( '#slug', scope ).val();
				if ( slug != '' ) atts += ' slug="' + slug + '"';
				break;
			case 'fp-register':
				preserve_content = true;
				close_tag = true;
				var title = $( '#link-title', scope ).val();
				if ( title != '' ) atts += ' title="' + title + '"';
				var new_window = $( '#link-window', scope ).is( ':checked' );
				if ( new_window ) atts += ' new="1"';
				break;
			case 'fp-countdown':
				var count_to = $( 'input[name=count_to]:checked', scope ).val();
				if ( count_to == 'date' ) {
					var the_date = $( '#count-date', scope ).val();
					if ( the_date != '' ) atts += ' date="' + the_date + '"';
				} else if ( count_to == 'match' ) {
					var match = $( '#count-match', scope ).val();
					if ( match > 0 || match == 'next' ) atts += ' match="' + match + '"';
				}
				var inline = $( '#count-inline', scope ).is( ':checked' );
				if ( inline ) atts += ' display="inline"';
				var no_texts = $( '#count-no-texts', scope ).is( ':checked' );
				var texts = '';
				if ( no_texts ) {
					texts = 'none';
				} else {
					texts = [ $( '#text-1', scope ).val(), $( '#text-2', scope ).val(), $( '#text-3', scope ).val(), $( '#text-4', scope ).val() ]
							.join( ';' );
				}
				if ( texts != '' && texts != ';;;' ) atts += ' texts="' + texts + '"';
				var time_format = $( '#count-format', scope ).val();
				if ( time_format > 0 ) atts += ' format="' + time_format + '"';
				break;
			case 'fp-group':
				var group = $( '#group-id', scope ).val();
				if ( group > 0 ) atts += ' id=' + group;
				break;
			case 'fp-ranking':
				var ranking = $( '#ranking-id', scope ).val();
				if ( ranking > 0 ) atts += ' ranking="' + ranking + '"';
				var league = $( '#ranking-league', scope ).val();
				if ( league > 0 ) atts += ' league="' + league + '"';
				var num = $( '#ranking-num', scope ).val();
				if ( num > 0 ) atts += ' num="' + num + '"';
				var date = $( 'input:radio[name=ranking-date]:checked', scope ).val();
				if ( date == 'custom' ) date = $( '#ranking-date-custom-value', scope ).val();
				if ( date != '' ) atts += ' date="' + date + '"';
				break;
			case 'fp-predictions':
				var match = $( '#predictions-match', scope ).val();
				if ( match > 0 ) atts += ' match="' + match + '"';
				var question = $( '#predictions-question', scope ).val();
				if ( question > 0 ) atts += ' question="' + question + '"';
				var text = $( '#predictions-text', scope ).val();
				if ( text != '' ) atts += ' text="' + text + '"';
				break;
			case 'fp-user-score':
				var ranking = $( '#user-score-ranking-id', scope ).val();
				if ( ranking > 0 ) atts += ' ranking="' + ranking + '"';
				var user = $( '#user-score-user-id', scope ).val();
				if ( user != '' ) atts += ' user="' + user + '"';
				var text = $( '#user-score-text', scope ).val();
				if ( text != '' ) atts += ' text="' + text + '"';
				var date = $( 'input:radio[name=user-score-date]:checked', scope ).val();
				if ( date == 'custom' ) date = $( '#user-score-date-custom-value', scope ).val();
				if ( date != '' ) atts += ' date="' + date + '"';
				break;
			case 'fp-user-ranking':
				var ranking = $( '#user-ranking-ranking-id', scope ).val();
				if ( ranking > 0 ) atts += ' ranking="' + ranking + '"';
				var user = $( '#user-ranking-user-id', scope ).val();
				if ( user != '' ) atts += ' user="' + user + '"';
				var text = $( '#user-ranking-text', scope ).val();
				if ( text != '' ) atts += ' text="' + text + '"';
				var date = $( 'input:radio[name=user-ranking-date]:checked', scope ).val();
				if ( date == 'custom' ) date = $( '#user-ranking-date-custom-value', scope ).val();
				if ( date != '' ) atts += ' date="' + date + '"';
				break;
			case 'fp-predictionform':
				var matches = $( '#match-id', scope ).val() || [];
				if ( matches.length > 0 ) atts += ' match="' + matches.join( ',' ) + '"';
				var matchtypes = $( '#matchtype-id', scope ).val() || [];
				if ( matchtypes.length > 0 ) atts += ' matchtype="' + matchtypes.join( ',' ) + '"';
				var questions = $( '#question-id', scope ).val() || [];
				if ( questions.length > 0 ) atts += ' question="' + questions.join( ',' ) + '"';
				break;
			case 'fp-matches':
				var group_id = $( '#matches-group-id', scope ).val();
				if ( group_id != '' ) atts += ' group="' + group_id + '"';
				var matches = $( '#matches-match-id', scope ).val() || [];
				if ( matches.length > 0 ) atts += ' match="' + matches.join( ',' ) + '"';
				var matchtypes = $( '#matches-matchtype-id', scope ).val() || [];
				if ( matchtypes.length > 0 ) atts += ' matchtype="' + matchtypes.join( ',' ) + '"';
				break;
			case 'fp-next-matches':
				var group_id = $( '#next-matches-group-id', scope ).val();
				if ( group_id != '' ) atts += ' group="' + group_id + '"';
				var matchtypes = $( '#next-matches-matchtype-id', scope ).val() || [];
				if ( matchtypes.length > 0 ) atts += ' matchtype="' + matchtypes.join( ',' ) + '"';
				var date = $( 'input:radio[name=next-matches-date]:checked', scope ).val();
				if ( date == 'custom' ) date = $( '#next-matches-date-custom-value', scope ).val();
				if ( date != '' ) atts += ' date="' + date + '"';
				var num = $( '#next-matches-num', scope ).val();
				if ( num > 0 ) atts += ' num="' + num + '"';
				break;
			case 'fp-league-info':
				var league_id = $( '#league-info-league-id', scope ).val();
				if ( league_id > 0 ) atts += ' league="' + league_id + '"';
				var info = $( 'input:radio[name=league-info-info]:checked', scope ).val();
				if ( info != '' ) atts += ' info="' + info + '"';
				var ranking_id = $( '#league-info-ranking-id', scope ).val();
				if ( ranking_id > 0 ) atts += ' ranking="' + ranking_id + '"';
				var format = $( '#league-info-format', scope ).val();
				if ( format != '' ) atts += ' format="' + format + '"';
				break;
			case 'fp-scores':
				var league_id = $( '#scores-league', scope ).val();
				if ( league_id > 0 ) atts += ' league="' + league_id + '"';
				var users = $( '#scores-user-id', scope ).val() || [];
				if ( users.length > 0 ) atts += ' users="' + users.join( ',' ) + '"';
				var matches = $( '#scores-match-id', scope ).val() || [];
				if ( matches.length > 0 ) atts += ' match="' + matches.join( ',' ) + '"';
				var matchtypes = $( '#scores-matchtype-id', scope ).val() || [];
				if ( matchtypes.length > 0 ) atts += ' matchtype="' + matchtypes.join( ',' ) + '"';
				break;
			case 'fp-plugin-option':
				var key = $( '#plugin-option-key', scope ).val();
				if ( key != '' ) atts += ' option="' + key + '"';
				var def = $( '#plugin-option-default', scope ).val();
				if ( def != '' ) atts += ' default="' + def + '"';
				// var type = $( '#plugin-option-type', scope ).val();
				var type = $( 'input:radio[name=plugin-option-type]:checked', scope ).val();
				if ( type != '' ) atts += ' type="' + type + '"';
				break;
			default:
				//nothing
		}
		
		if ( selected_shortcode != '' ) {
			if ( preserve_content && parent.tinymce.activeEditor.selection.getContent() != '' ) {
				the_text = parent.tinymce.activeEditor.selection.getContent( { format : 'text' } );
			}
			shortcode	= '[' + selected_shortcode + atts + ']';
			shortcode += the_text;
			shortcode += ( close_tag ? '[/' + selected_shortcode + ']' : '' );
		}
		
		return shortcode;
	}
	
	function display_shortcode_options( shortcode ) {
		var shortcode_div = $( '#' + shortcode );
		if ( shortcode_div.length == 0 ) {
			shortcode_div = $( '#no-shortcode-params' );
		}
		shortcode_div.addClass( 'current' );
		$( '.shortcode-options-panel' ).not( shortcode_div ).removeClass( 'current' );
	}
	
	function toggle_count_texts( id ) {
		var text_ids = ['#text-1', '#text-2', '#text-3', '#text-4'];
		if ( $( '#' + id ).is( ':checked' ) ) {
			FootballPoolAdmin.set_input_param( 'placeholder', text_ids, 'none' );
		} else {
			FootballPoolAdmin.restore_input_param( 'placeholder', text_ids );
		}
		FootballPoolAdmin.disable_inputs( text_ids, id );
	}
	
	function toggle_select_row( clicked, shortcode ) {
		clicked = $( clicked ).attr( 'for' );
		$( '#fp-' + shortcode + ' select' ).each( function() {
			if ( $( this ).attr( 'id' ) == clicked ) {
				$( this ).show( 'slow' );
			} else {
				$( this ).hide( 'slow' );
			}
		} );
	}

	return {
		// public methods
		display_shortcode_options: display_shortcode_options,
		toggle_count_texts: toggle_count_texts,
		toggle_select_row: toggle_select_row,
		get_shortcode: get_shortcode
	};

} )( jQuery );
	
