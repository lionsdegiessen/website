<?php
require_once( '../../../../../../wp-load.php' );
require_once( '../../../define.php' );
require_once( 'tinymce-dialog.functions.php' );

$site_url = get_option( 'siteurl' );
$admin_url = get_admin_url();

$pool = new Football_Pool_Pool();

$suffix = defined( 'FOOTBALLPOOL_LOCAL_MODE' ) ? '' : '.min';
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="<?php bloginfo( 'html_type' ); ?>; charset=<?php echo get_option( 'blog_charset' ); ?>" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="<?php echo FOOTBALLPOOL_PLUGIN_URL ?>assets/admin/admin<?php echo $suffix; ?>.js?ver=<?php echo FOOTBALLPOOL_DB_VERSION; ?>"></script>
	<script src="tinymce-dialog<?php echo $suffix; ?>.js?ver=<?php echo FOOTBALLPOOL_DB_VERSION; ?>"></script>
	
	<link rel="stylesheet" href="../../../../../../wp-includes/js/tinymce/skins/lightgray/skin.min.css" />
	<link rel="stylesheet" href="tinymce-dialog.css" />
</head>
<body>
<form class="shortcode-dialog">
	<div class="shortcode-selector mce-container">
		<div>
			<label for="shortcode" class="mce-label"><?php _e( 'Select a shortcode', 'football-pool' ); ?></label>
			<div>
				<select class="mce-select" id="shortcode" onchange="FootballPoolTinyMCE.display_shortcode_options( jQuery( this ).val() )">
					<optgroup label="<?php _e( 'Pool', 'football-pool' ); ?>">
						<option value="fp-ranking"><?php _e( 'Ranking', 'football-pool' ); ?></option>
						<option value="fp-predictions"><?php _e( 'Predictions for match or question', 'football-pool' ); ?></option>
						<option value="fp-predictionform"><?php _e( 'Input form for predictions', 'football-pool' ); ?></option>
						<option value="fp-matches"><?php _e( 'Table of Matches', 'football-pool' ); ?></option>
						<option value="fp-next-matches"><?php _e( 'List of Next matches', 'football-pool' ); ?></option>
						<option value="fp-group"><?php _e( 'Group Table (standing)', 'football-pool' ); ?></option>
						<option value="fp-league-info"><?php _e( 'League info', 'football-pool' ); ?></option>
						<option value="fp-user-score"><?php _e( 'Score for a User', 'football-pool' ); ?></option>
						<option value="fp-user-ranking"><?php _e( 'Ranking for a User', 'football-pool' ); ?></option>
						<option value="fp-scores"><?php _e( 'Scores for a set of Matches', 'football-pool' ); ?></option>
					</optgroup>
					<optgroup label="<?php _e( 'Links', 'football-pool' ); ?>">
						<option value="fp-link"><?php _e( 'Link to page', 'football-pool' ); ?></option>
						<option value="fp-register"><?php _e( 'Link to registration', 'football-pool' ); ?></option>
					</optgroup>
					<optgroup label="<?php _e( 'Other', 'football-pool' ); ?>">
						<option value="fp-countdown"><?php _e( 'Countdown', 'football-pool' ); ?></option>
						<option value="fp-jokermultiplier"><?php _e( 'Value for' ); ?> <?php _e( 'Joker multiplier', 'football-pool' ); ?></option>
						<option value="fp-fullpoints"><?php _e( 'Value for' ); ?> <?php _e( 'Full points', 'football-pool' ); ?></option>
						<option value="fp-totopoints"><?php _e( 'Value for' ); ?> <?php _e( 'Toto points', 'football-pool' ); ?></option>
						<option value="fp-goalpoints"><?php _e( 'Value for' ); ?> <?php _e( 'Goal bonus', 'football-pool' ); ?></option>
						<option value="fp-diffpoints"><?php _e( 'Value for' ); ?> <?php _e( 'Goal difference bonus', 'football-pool' ); ?></option>
						<option value="fp-plugin-option"><?php _e( 'Show Plugin Option', 'football-pool' ); ?></option>
					</optgroup>
				</select>
			</div>
		</div>
	</div>

	<div class="mce-container">
		<div>
			<h3><?php _e( 'Set parameters', 'football-pool' ); ?></h3>
		</div>
	</div>
	
	<!-- No parameters for shortcode -->
	<div id="no-shortcode-params" class="shortcode-options-panel mce-container">
		<div class="info">
			<?php _e( 'There are no parameters for this shortcode. Just add it.', 'football-pool' ); ?>
		</div>
	</div>
	
	<!-- fp-ranking -->
	<div id="fp-ranking" class="shortcode-options-panel mce-container current">
		<?php 
		ranking_select_with_default( 'ranking' ); 
		league_select_with_default( 'ranking' );
		label_textbox( __( 'Number of players', 'football-pool' ), 'ranking-num', array( 'placeholder' => 5 ) );
		?>
		<!--<div>
			<label for="ranking-show-num-predictions"><?php _e( 'Show number of predictions?', 'football-pool' ); ?></label>
		</div>-->
		<?php date_now_postdate_custom_fieldset( 'ranking' ); ?>
	</div>
	
	<!-- fp-predictions -->
	<div id="fp-predictions" class="shortcode-options-panel mce-container">
		<?php match_select( 'predictions' ); ?>
		<div>
			<label class="mce-label"></label>
			<div>
				<span class="info"><?php _e( 'and/or', 'football-pool' ); ?></span>
			</div>
		</div>
		<?php 
		question_select( 'predictions' );
		label_textbox( 
			__( 'Text', 'football-pool' ), 
			'predictions-text',
			array(
				'placeholder' => __( 'Text to display if there is nothing to show', 'football-pool' ),
				'style' => 'width: 100%'
			)
		);
		?>
	</div>
	
	<!-- fp-user-score -->
	<div id="fp-user-score" class="shortcode-options-panel mce-container">
		<?php
		user_select( 'user-score' );
		ranking_select_with_default( 'user-score' );
		label_textbox( __( 'Text', 'football-pool' ), 'user-score-text', array( 'placeholder' => 0 ) );
		date_now_postdate_custom_fieldset( 'user-score' );
		?>
	</div>
	
	<!-- fp-user-ranking -->
	<div id="fp-user-ranking" class="shortcode-options-panel mce-container">
		<?php
		user_select( 'user-ranking' );
		ranking_select_with_default( 'user-ranking' );
		label_textbox( __( 'Text', 'football-pool' ), 'user-ranking-text' );
		date_now_postdate_custom_fieldset( 'user-ranking' );
		?>
	</div>
	
	<!-- fp-group -->
	<div id="fp-group" class="shortcode-options-panel mce-container">
		<div>
			<label class="mce-label" for="group-id"><?php _e( 'Select a group', 'football-pool' ); ?></label>
			<div>
				<select class="mce-select" id="group-id">
					<?php group_options(); ?>
				</select>
			</div>
		</div>
	</div>
	
	<!-- fp-predictionform -->
	<div id="fp-predictionform" class="shortcode-options-panel mce-container">
		<div class="info">
			<?php _e( 'Click a label to show the options.', 'football-pool' );?>
			<br />
			<?php _e( 'Use CTRL+click to select multiple values.', 'football-pool' );?>
		</div>
		<div>
			<label class="mce-label nofloat clickable" for="match-id" onclick="FootballPoolTinyMCE.toggle_select_row( this, 'predictionform' )">
				<?php _e( 'Select one or more matches', 'football-pool' ); ?>
			</label>
			<br />
			<select class="mce-select" id="match-id" style="height:100px; display:none;" multiple="multiple">
				<?php echo match_options(); ?>
			</select>
		</div>
		<div>
			<label class="mce-label nofloat clickable" for="matchtype-id" onclick="FootballPoolTinyMCE.toggle_select_row( this, 'predictionform' )">
				<?php _e( 'Select one or more match types', 'football-pool' ); ?>
			</label>
			<br />
			<select class="mce-select" id="matchtype-id" style="height:100px; display:none;" multiple="multiple">
				<?php
				$match_types = Football_Pool_Matches::get_match_types();
				foreach( $match_types as $match_type ) {
					printf( '<option value="%d">%s</option>', $match_type->id, $match_type->name );
				}
				?>
			</select>
		</div>
		<div>
			<label class="mce-label nofloat clickable" for="question-id" onclick="FootballPoolTinyMCE.toggle_select_row( this, 'predictionform' )">
				<?php _e( 'Select one or more questions', 'football-pool' ); ?>
			</label>
			<br />
			<select class="mce-select" id="question-id" style="height:100px; display:none;" multiple="multiple">
				<?php echo bonusquestion_options(); ?>
			</select>
		</div>
	</div>
	
	<!-- fp-matches -->
	<div id="fp-matches" class="shortcode-options-panel mce-container">
		<div class="info">
			<?php _e( 'Click a label to show the options.', 'football-pool' );?>
			<br />
			<?php _e( 'Use CTRL+click to select multiple values.', 'football-pool' );?>
		</div>
		<div>
			<label class="mce-label nofloat clickable" for="matches-match-id" onclick="FootballPoolTinyMCE.toggle_select_row( this, 'matches' )">
				<?php _e( 'Select one or more matches', 'football-pool' ); ?>
			</label>
			<br />
			<select class="mce-select" id="matches-match-id" style="height:100px; display:none;" multiple="multiple">
				<?php echo match_options(); ?>
			</select>
		</div>
		<div>
			<label class="mce-label nofloat clickable" for="matches-matchtype-id" onclick="FootballPoolTinyMCE.toggle_select_row( this, 'matches' )">
				<?php _e( 'Select one or more match types', 'football-pool' ); ?>
			</label>
			<br />
			<select class="mce-select" id="matches-matchtype-id" style="height:100px; display:none;" multiple="multiple">
				<?php
				$match_types = Football_Pool_Matches::get_match_types();
				foreach( $match_types as $match_type ) {
					printf( '<option value="%d">%s</option>', $match_type->id, $match_type->name );
				}
				?>
			</select>
		</div>
		<div>
			<label class="mce-label nofloat clickable" for="matches-group-id" onclick="FootballPoolTinyMCE.toggle_select_row( this, 'matches' )">
				<?php _e( 'Select a group', 'football-pool' ); ?>
			</label>
			<br />
			<select class="mce-select" id="matches-group-id" style="display:none;">
				<option value=""></option>
				<?php group_options(); ?>
			</select>
		</div>
	</div>
	
	<!-- fp-next-matches -->
	<div id="fp-next-matches" class="shortcode-options-panel mce-container">
		<?php matchtype_select( 'next-matches' ); ?>
		<div>
			<label class="mce-label" for="next-matches-group-id"><?php _e( 'Select a group', 'football-pool' ); ?></label>
			<div>
				<select class="mce-select" id="next-matches-group-id">
					<option value=""></option>
					<?php group_options(); ?>
				</select>
			</div>
		</div>
		<?php
		date_now_postdate_custom_fieldset( 'next-matches' );
		label_textbox( __( 'Number of matches', 'football-pool' ), 'next-matches-num', array( 'placeholder', 5 ) );
		?>
	</div>
	
	<!-- fp-league-info -->
	<div id="fp-league-info" class="shortcode-options-panel mce-container">
		<?php league_select( 'league-info' ); ?>
		<div>
			<fieldset>
				<legend class="mce-label">
					<?php _e( 'Show this info', 'football-pool' ); ?>
				</legend>
				<div>
					<div>
						<label class="mce-label">
							<input type="radio" id="league-info-name" name="league-info-info" value="name" checked="checked" />
							<?php _e( 'name', 'football-pool' ); ?>
						</label>
					</div>
					<div>
						<label class="mce-label">
							<input type="radio" id="league-info-points" name="league-info-info" value="points" />
							<?php _e( 'points', 'football-pool' ); ?>
						</label>
					</div>
					<div>
						<label class="mce-label">
							<input type="radio" id="league-info-avgpoints" name="league-info-info" value="avgpoints" />
							<?php _e( 'average points', 'football-pool' ); ?>
						</label>
					</div>
					<div>
						<label class="mce-label">
							<input type="radio" id="league-info-wavgpoints" name="league-info-info" value="wavgpoints" />
							<?php _e( 'weighted average points', 'football-pool' ); ?>
						</label>
					</div>
					<div>
						<label class="mce-label">
							<input type="radio" id="league-info-playernames" name="league-info-info" value="playernames" />
							<?php _e( 'player names', 'football-pool' ); ?>
						</label>
					</div>
					<div>
						<label class="mce-label">
							<input type="radio" id="league-info-numplayers" name="league-info-info" value="numplayers" />
							<?php _e( 'number of players', 'football-pool' ); ?>
						</label>
					</div>
				</div>
			</fieldset>
		</div>
		<?php
		ranking_select_with_default( 'league-info' );
		label_textbox( __( 'Format', 'football-pool' ), 'league-info-format', array( 'label_link' => '//php.net/manual/en/function.sprintf.php' ) );
		?>
	</div>
	
	<!-- fp-link -->
	<div id="fp-link" class="shortcode-options-panel mce-container">
		<div>
			<label class="mce-label" for="slug"><?php _e( 'Select a page', 'football-pool' ); ?></label>
			<div>
				<select id="slug">
					<?php
					$pages = Football_Pool::get_pages();
					foreach ( $pages as $page ) {
						printf( '<option value="%s">%s</option>', $page['slug'], __( $page['title'], 'football-pool' ) );
					}
					?>
				</select>
			</div>
		</div>
	</div>
	
	<!-- fp-register -->
	<div id="fp-register" class="shortcode-options-panel mce-container">
		<?php
		label_textbox( __( 'Link title', 'football-pool' ), 'link-title' );
		label_checkbox( __( 'New window?', 'football-pool' ), 'link-window' );
		?>
	</div>
	
	<!-- fp-countdown -->
	<div id="fp-countdown" class="shortcode-options-panel mce-container">
		<div>
			<fieldset>
				<legend for=""><?php _e( 'Countdown to', 'football-pool' ); ?></legend>
				<div>
					<div>
						<label class="mce-label">
							<input type="radio" id="count-to-match" name="count_to" value="match" checked="checked" 
								onclick="FootballPoolAdmin.toggle_linked_options( '#count-match-row', '#count-date-row' )" />
							<?php _e( 'Match', 'football-pool' ); ?>
						</label>
					</div>
					<div>
						<label class="mce-label">
							<input type="radio" id="count-to-date" name="count_to" value="date" 
								onclick="FootballPoolAdmin.toggle_linked_options( '#count-date-row', '#count-match-row' )" />
							<?php _e( 'Date', 'football-pool' ); ?>
						</label>
					</div>
				</div>
			</fieldset>
		</div>
		<?php
		label_textbox(
			__( 'Date', 'football-pool' ),
			'count-date',
			array( 
				'label_link' => '//php.net/manual/en/function.date.php',
				'label_tooltip' => __( 'information about PHP\'s date format', 'football-pool' ),
				'placeholder' => 'Y-m-d H:i',
				'div_id' => 'count-date-row',
			)
		);
		?>
		<div id="count-match-row">
			<label class="mce-label" for="count-match"><?php _e( 'Match', 'football-pool' ); ?></label>
			<div>
				<select class="mce-select" id="count-match">
					<optgroup label="<?php _e( 'default', 'football-pool' ); ?>">
						<option value="0" selected="selected"><?php _e( 'first match', 'football-pool' ); ?></option>
					</optgroup>
					<optgroup label="<?php _e( 'other', 'football-pool' ); ?>">
						<option value="next"><?php _e( 'next match', 'football-pool' ); ?></option>
					</optgroup>
					<optgroup label="<?php _e( 'or choose a match', 'football-pool' ); ?>">
						<?php echo match_options(); ?>
					</optgroup>
				</select>
			</div>
		</div>
		<div id="count-texts">
			<label class="mce-label" for="text-1">
				<a target="_blank" href="<?php echo $admin_url; ?>admin.php?page=footballpool-help#shortcodes" 
					title="<?php _e( 'More information about this on the Help page.', 'football-pool' ); ?>">
						<?php _e( 'Texts for counter', 'football-pool' ); ?>
				</a>
			</label>
			<div>
				<label>
					<input type="checkbox" id="count-no-texts" value="1" onchange="FootballPoolTinyMCE.toggle_count_texts( this.id )" />
					<?php _e( 'no texts', 'football-pool' ); ?>
				</label>
			</div>
			<div>
				<input class="mce-textbox" type="text" id="text-1" placeholder="<?php _e( 'before - time not passed', 'football-pool' ); ?>" 
					title="<?php _e( "Leave empty for the default texts. Don't forget spaces between a text and the timer.", 'football-pool' ); ?>" />
				<input class="mce-textbox" type="text" id="text-2" placeholder="<?php _e( 'after - time not passed', 'football-pool' ); ?>" 
					title="<?php _e( "Leave empty for the default texts. Don't forget spaces between a text and the timer.", 'football-pool' ); ?>" />
				<br />
				<input class="mce-textbox" type="text" id="text-3" placeholder="<?php _e( 'before - time passed', 'football-pool' ); ?>" 
					title="<?php _e( "Leave empty for the default texts. Don't forget spaces between a text and the timer.", 'football-pool' ); ?>" />
				<input class="mce-textbox" type="text" id="text-4" placeholder="<?php _e( 'after - time passed', 'football-pool' ); ?>" 
					title="<?php _e( "Leave empty for the default texts. Don't forget spaces between a text and the timer.", 'football-pool' ); ?>" />
			</div>
		</div>
		<?php label_checkbox( __( 'Display inline', 'football-pool' ), 'count-inline' ); ?>
		<div>
			<label class="mce-label" for="count-format"><?php _e( 'Time format', 'football-pool' ); ?></label>
			<div>
				<select class="mce-select" id="count-format">
					<option value="2"><?php _e( 'days, hours, minutes, seconds', 'football-pool' ); ?></option>
					<option value="3"><?php _e( 'hours, minutes, seconds', 'football-pool' ); ?></option>
					<option value="1"><?php _e( 'only seconds', 'football-pool' ); ?></option>
				</select>
			</div>
		</div>
	</div>
	
	<!-- fp-scores -->
	<div id="fp-scores" class="shortcode-options-panel mce-container">
		<?php
		league_select_with_default( 'scores' );
		user_select_multiple( 'scores' );
		match_select_multiple( 'scores' );
		matchtype_select( 'scores' );
		?>
	</div>
	
	<!-- fp-plugin-option -->
	<div id="fp-plugin-option" class="shortcode-options-panel mce-container">
		<?php
		label_textbox( __( 'Option key', 'football-pool' ), 'plugin-option-key' );
		label_textbox( __( 'Default value', 'football-pool' ), 'plugin-option-default' );
		// label_textbox( __( 'Type', 'football-pool' ), 'plugin-option-type', array( 'placeholder' => 'int or text (default)' ) );
		?>
		<div>
			<fieldset>
				<legend class="mce-label">
					<?php _e( 'Type', 'football-pool' ); ?>
				</legend>
				<div>
					<div>
						<label class="mce-label">
							<input type="radio" id="plugin-option-type-text" name="plugin-option-type" value="text" />
							<?php _e( 'Text', 'football-pool' ); ?>
						</label>
					</div>
					<div>
						<label class="mce-label">
							<input type="radio" id="plugin-option-type-int" name="plugin-option-type" value="int" />
							<?php _e( 'Numeric', 'football-pool' ); ?>
						</label>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
	
	<!-- fp-shortcode -->
	<div id="fp-shortcode" class="shortcode-options-panel mce-container">
		<div>
			<label class="mce-label">label</label>
			<div>
				input
			</div>
		</div>
	</div>
</form>
</body>
</html>