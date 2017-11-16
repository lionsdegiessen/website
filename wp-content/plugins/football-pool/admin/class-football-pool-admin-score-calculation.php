<?php
// constants
define( 'FOOTBALLPOOL_CALC_INFO_MESSAGE',    'info' );
define( 'FOOTBALLPOOL_CALC_WARNING_MESSAGE', 'warning' );
define( 'FOOTBALLPOOL_CALC_ERROR_MESSAGE',   'error' );

class Football_Pool_Admin_Score_Calculation extends Football_Pool_Admin {
	public static function process( $is_cli = false, $args = null ) {
		// session data is initiated in Football_Pool->init
		
		// initialize variables
		global $wpdb;
		$prefix = FOOTBALLPOOL_DB_PREFIX;
		$pool = new Football_Pool_Pool();
		$params = array();
		$completed = 0;
		$check = true;
		$result = 0;
		$output = '';
		$msg = null;
		$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
		$is_cli = ( $is_cli === true );
		
		// get parameters
		if ( $is_cli === true ) {
			$force_calculation = $total_iterations = $iteration = $sub_iteration = 0;
			$calculation_step = 'undefined';
			$sub_iterations = '1,1,1,1';
			$user = $ranking = $match = $question = $prev_total_score = $score_order = 0;
			
			extract( $args, EXTR_IF_EXISTS );
			$sub_iterations = explode( ',', $sub_iterations );
		} else {
			$force_calculation = self::post_int( 'force_calculation', 0 ) == 1 || FOOTBALLPOOL_FORCE_CALCULATION;
			$total_iterations = self::post_int( 'total_iterations', 0 );
			$iteration = self::post_int( 'iteration', 0 );
			$sub_iteration = self::post_int( 'sub_iteration', 0 );
			$calculation_step = self::post_string( 'calculation_step', 'undefined' );
			
			$sub_iterations = self::post_string( 'sub_iterations', '1,1,1,1' );
			$sub_iterations = explode( ',', $sub_iterations );
			
			$user = self::post_int( 'user', 0 );
			$ranking = self::post_int( 'ranking', 0 );
			$match = self::post_int( 'match', 0 );
			$question = self::post_int( 'question', 0 );
			$prev_total_score = self::post_int( 'prev_total_score', 0 );
			$score_order = self::post_int( 'score_order', 0 );
		}
		
		// security
		if ( ! $is_cli ) {
			if ( FOOTBALLPOOL_RANKING_CALCULATION_NOAJAX ) {
				if ( $iteration > 0 ) check_admin_referer( FOOTBALLPOOL_NONCE_SCORE_CALC, 'fp_recalc_nonce' );
			} else {
				check_ajax_referer( FOOTBALLPOOL_NONCE_SCORE_CALC, 'fp_recalc_nonce' );
			}
		}
		$nonce = wp_create_nonce( FOOTBALLPOOL_NONCE_SCORE_CALC );
		
		// check if we want to start a calculation but another calculation is in progress
		// but allow override
		if ( $iteration === 0 && $force_calculation ) {
			Football_Pool_Utils::set_fp_option( 'calculation_in_progress', 0 );
		}
		if ( $iteration === 0 ) {
			if ( Football_Pool_Utils::get_fp_option( 'calculation_in_progress' ) == 1 ) {
				$calculation_step = 'stop_message';
			} else {
				// continue, lock calculation and set step to 'prepare'
				Football_Pool_Utils::set_fp_option( 'calculation_in_progress', 1 );
				$calculation_step = 'prepare';
			}
		}
		
		// determine the active and new history table
		$active_history_table = $pool->get_score_table( true );
		$new_history_table = $pool->get_score_table( false );
		
		// get the data to work on from the session
		if ( ! in_array( $calculation_step, array( 'cancel_calculation', 'finalize', 'stop_message' ) ) ) {
			$ranking_ids = self::get_rankings();
			$ranking_id = $ranking_ids[$ranking];
			
			$match_ids = self::get_matches( $ranking_id );
			$question_ids = self::get_questions( $ranking_id );
			
			$user_ids = self::get_user_set( $pool->has_leagues );
			if ( $user < count( $user_ids ) ) {
				$user_id = $user_ids[$user];
			} else {
				$user_id = -1;
			}
			
			if ( $ranking_id == FOOTBALLPOOL_RANKING_DEFAULT ) {
				// no calculation needed if there are no users or no matches and questions finished
				if ( count( $user_ids ) == 0 || ( count( $match_ids ) == 0 && count( $question_ids ) == 0 ) ) {
					$calculation_step = 'no_calc_needed';
				}
			}
		}
		
		// prepare lightbox
		$output .= sprintf( '<h2>%s</h2>' , __( 'Score and ranking calculation', 'football-pool' ) );
		
		// calculation steps
		switch ( $calculation_step ) {
			case 'prepare':
				do_action( 'football_pool_score_calculation_prepare_before' );
				
				$msg = __( 'Preparing the calculation', 'football-pool' );
				$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				
				// empty the new table
				$check = self::empty_scorehistory( 'all', $new_history_table );
				
				$total_users = 0;
				$total_matches = $total_questions = array( 0, 0 );
				
				// reset session vars for calculation
				array_walk( $_SESSION, array( 'self', 'destroy_calc_session_keys' ) );
				
				$user_ids = self::get_user_set( $pool->has_leagues );
				$total_users = count( $user_ids );
				
				$ranking_ids = self::get_rankings();
				foreach ( $ranking_ids as $ranking_id ) {
					$ranking_match_ids = self::get_matches( $ranking_id );
					$total_matches[0] += count( $ranking_match_ids );
					
					$ranking_question_ids = self::get_questions( $ranking_id );
					$total_questions[0] += count( $ranking_question_ids );
					
					if ( $ranking_id == FOOTBALLPOOL_RANKING_DEFAULT ) {
						$total_matches[1] = count( $ranking_match_ids );
						$total_questions[1] = count( $ranking_question_ids );
					}
				}
				
				// calculate total number of iterations
				$match_iterations = (int) ceil( ( $total_matches[1] * $total_users ) / FOOTBALLPOOL_CALC_STEPSIZE_MATCH );
				$question_iterations = (int) ceil( ( $total_questions[1] * $total_users ) 
													/ FOOTBALLPOOL_CALC_STEPSIZE_QUESTION );
				$score_iterations = (int) ceil( ( $total_users * ( $total_questions[0] + $total_matches[0] 
																	+ count( $ranking_ids ) ) ) 
												/ FOOTBALLPOOL_CALC_STEPSIZE_SCORE );
				$ranking_iterations = (int) ceil( ( $total_users * ( $total_questions[0] + $total_matches[0] ) )
												/ FOOTBALLPOOL_CALC_STEPSIZE_RANKING );
				
				$total_iterations = 1						// prepare
									+ $match_iterations		// match score calculation
									+ $question_iterations	// question score calculation
									+ $score_iterations		// incremented total scores calculation
									+ $ranking_iterations	// compute ranking
									+ 1;					// finalize
				// adjust for case where there are no matches or no questions
				if ( $total_matches[1] == 0 ) {
					$total_iterations++;
					$match_iterations = 1;
				}
				if ( $total_questions[1] == 0 ) {
					$total_iterations++;
					$question_iterations = 1;
				}
				
				$sub_iterations = array( $match_iterations, $question_iterations, $score_iterations, $ranking_iterations );
				
				// prepare lightbox
				$output .= '<div class="fp-calc-progress" id="fp-calc-progress">';
				$output .= sprintf( '<h4>%s</h4>'
									, __( 'Please do not interrupt this process.', 'football-pool' ) );
				$output .= sprintf( '<p>%s</p>'
									, __( 'Sit back and relax, this may take a while :-)', 'football-pool' ) );
				$output .= '<div id="fp-calc-progressbar"></div>';
				$output .= '<div><div id="ajax-loader"></div><p id="calculation-message">&nbsp;</p></div>';
				$output .= sprintf( '<p id="calculation-timer">%s:&nbsp;&nbsp;<span id="time-elapsed"></span><br />'
									, __( 'Time elapsed', 'football-pool' ) );
				$output .= sprintf( '%s:&nbsp;&nbsp;<span id="time-left"></span></p>'
									, __( 'Estimated time left', 'football-pool' ) );
				$output .= '</div>';
				
				$calculation_step = 'match_scores';
				if ( $pool->has_matches && count( $match_ids ) > 0 ) {
					$msg = sprintf( __( "Updating match scores (step %s of %s)", 'football-pool' )
									, 1, $sub_iterations[0] );
					$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				} else {
					$msg = __( 'No matches to calculate.', 'football-pool' );
					$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				}
				
				do_action( 'football_pool_score_calculation_prepare_after' );
				break;
			case 'match_scores':
				$calculation_step = 'match_scores';
				$sub_iteration++;
				
				if ( $pool->has_matches && count( $match_ids ) > 0 ) {
					$msg = sprintf( __( "Updating match scores (step %s of %s)", 'football-pool' )
									, ( $sub_iteration + 1 ), $sub_iterations[0] );
					$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
					
					$ranking_ids = self::get_rankings();
					$i = 0;
					while ( $i++ < FOOTBALLPOOL_CALC_STEPSIZE_MATCH ) {
						$user_id = $user_ids[$user];
						$match_id = $match_ids[$match];
						
						// calc score
						$user_home = $user_away = null;
						$has_joker = 0;
						$sql = $wpdb->prepare( "SELECT home_score, away_score, has_joker 
												FROM {$prefix}predictions 
												WHERE user_id = %d AND match_id = %d"
												, $user_id, $match_id );
						$row = $wpdb->get_row( $sql, ARRAY_A );
						if ( $row !== null ) {
							$user_home = (int) $row['home_score'];
							$user_away = (int) $row['away_score'];
							$has_joker = (int) $row['has_joker'];
						}
						
						$sql = $wpdb->prepare( "SELECT home_score, away_score 
												FROM {$prefix}matches WHERE id = %d", $match_id );
						$row = $wpdb->get_row( $sql, ARRAY_A );
						$score = $pool->calc_score(
													(int) $row['home_score'], 
													(int) $row['away_score'], 
													$user_home, 
													$user_away, 
													$has_joker,
													$match_id,
													$user_id
												);
						
						// update for each ranking
						foreach ( $ranking_ids as $ranking_id ) {
							if ( in_array( $match_id, self::get_matches( $ranking_id ) ) ) {
								$sql = $wpdb->prepare( "INSERT INTO {$prefix}{$new_history_table}
														( ranking_id, score_order, type, score_date, source_id, user_id, score, full, toto, goal_bonus, goal_diff_bonus, total_score, ranking )
														SELECT %d, 0, %d, play_date, id, %d, %d, %d, %d, %d, %d, 0, 0
														FROM {$prefix}matches
														WHERE id = %d"
														, $ranking_id
														, FOOTBALLPOOL_TYPE_MATCH
														, $user_id
														, $score['score']
														, $score['full']
														, $score['toto']
														, $score['goal_bonus']
														, $score['goal_diff_bonus']
														, $match_id );
								$result = $wpdb->query( $sql );			
								$check = $check && ( $result !== false );
							}
						}
						// next match
						$match++;
						
						if ( $match >= count( $match_ids ) ) {
							// next user
							$user++;
							$match = 0;
							
							if ( $user >= count( $user_ids ) ) {
								// all users finished, proceed with questions
								$user = 0;
								$sub_iteration = 0;
								$calculation_step = 'question_scores';
								break;
							}
						}
					}
				} else {
					// no matches in this season
					$sub_iteration = 0;
					$calculation_step = 'question_scores';
				}
				
				if ( $calculation_step == 'question_scores' ) {
					if ( $pool->has_bonus_questions && count( $question_ids ) > 0 ) {
						$msg = sprintf( __( "Updating question scores (step %s of %s)", 'football-pool' )
										, 1, $sub_iterations[1] );
						$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
					} else {
						$msg = __( 'No questions to calculate.', 'football-pool' );
						$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
					}
				}
				break;
			case 'question_scores':
				$calculation_step = 'question_scores';
				$sub_iteration++;
				
				if ( $pool->has_bonus_questions && count( $question_ids ) > 0 ) {
					$msg = sprintf( __( "Updating question scores (step %s of %s)", 'football-pool' )
									, ( $sub_iteration + 1 ), $sub_iterations[1] );
					$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
					
					$ranking_ids = self::get_rankings();
					$i = 0;
					while ( $i++ < FOOTBALLPOOL_CALC_STEPSIZE_QUESTION ) {
						$user_id = $user_ids[$user];
						$question_id = $question_ids[$question];
				
						// update for each ranking
						foreach ( $ranking_ids as $ranking_id ) {
							if ( in_array( $question_id, self::get_questions( $ranking_id ) ) ) {
								$sql = "INSERT INTO {$prefix}{$new_history_table} 
											( score_order, type, score_date, source_id, user_id
											, score, full, toto, goal_bonus, goal_diff_bonus
											, ranking, ranking_id ) 
										SELECT 
											0, %d, q.score_date, q.id, %d, 
											IF ( a.points <> 0, a.points, q.points ) * IFNULL( a.correct, 0 ), 
											NULL, NULL, NULL, NULL, 
											0, %d 
										FROM {$prefix}bonusquestions q
										LEFT OUTER JOIN {$prefix}bonusquestions_useranswers a 
											ON ( a.question_id = q.id AND ( a.user_id = %d OR a.user_id IS NULL ) )
										WHERE q.score_date IS NOT NULL AND q.id = %d";
								$sql = $wpdb->prepare( $sql
														, FOOTBALLPOOL_TYPE_QUESTION
														, $user_id
														, $ranking_id
														, $user_id
														, $question_id );
								$result = $wpdb->query( $sql );			
								$check = $check && ( $result !== false );
							}
						}
						// next question
						$question++;
						
						if ( $question >= count( $question_ids ) ) {
							// next user
							$user++;
							$question = 0;
							
							if ( $user >= count( $user_ids ) ) {
								// all users finished, proceed with total score calculation
								$user = 0;
								$sub_iteration = 0;
								$calculation_step = 'total_scores';
								break;
							}
						}
					}
				} else {
					// no bonus questions in this season
					$sub_iteration = 0;
					$calculation_step = 'total_scores';
				}
				
				if ( $calculation_step == 'total_scores' ) {
					$msg = sprintf( __( "Updating total scores (step %s of %s)", 'football-pool' )
									, 1, $sub_iterations[2] );
					$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				}
				break;
			case 'total_scores':
				$calculation_step = 'total_scores';
				$sub_iteration++;
				
				$msg = sprintf( __( 'Updating total scores (step %s of %s)', 'football-pool' )
								, ( $sub_iteration + 1 ), $sub_iterations[2] );
				$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				
				$i = 0;
				while ( $i++ < FOOTBALLPOOL_CALC_STEPSIZE_SCORE ) {
					$user_id = $user_ids[$user];
					$ranking_id = $ranking_ids[$ranking];
					// get the row to update
					$row = self::get_score_row( $user_id, $ranking_id, $new_history_table );
					
					if ( $row !== null ) {
						// update the new total score
						$total_score = (int) $row['score'] + $prev_total_score;
						$sql = $wpdb->prepare( "UPDATE {$prefix}{$new_history_table} 
												SET total_score = %d, score_order = %d
												WHERE user_id = %d AND source_id = %d 
												AND ranking_id = %d AND type = %d"
												, $total_score
												, ++$score_order
												, $user_id
												, $row['source_id']
												, $ranking_id
												, $row['type'] );
						$result = $wpdb->query( $sql );			
						$check = $check && ( $result !== false );
						
						$prev_total_score = $total_score;
					} else {
						// next ranking
						unset( $_SESSION['fp_calc_score_rows'] );
						$ranking++;
						$prev_total_score = 0;
						$score_order = 0;
						
						if ( $ranking >= count( $ranking_ids ) ) {
							$ranking = 0;
							$user++;
							
							if ( $user >= count( $user_ids ) ) {
								// all users finished, proceed with ranking update
								$sub_iteration = 0;
								$user = 0;
								$calculation_step = 'compute_ranking';
								break;
							}
						}
					}
				}
				
				if ( $calculation_step == 'compute_ranking' ) {
					$msg = sprintf( __( 'Calculating the user rankings (step %s of %s).', 'football-pool' )
									, 1, $sub_iterations[3] );
					$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				}
				break;
			case 'compute_ranking':
				$calculation_step = 'compute_ranking';
				$sub_iteration++;
				
				$msg = sprintf( __( 'Calculating the user rankings (step %s of %s).', 'football-pool' )
								, ( $sub_iteration + 1 ), $sub_iterations[3] );
				$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				
				$i = 0;
				while ( $i++ < FOOTBALLPOOL_CALC_STEPSIZE_RANKING ) {
					$user_id = $user_ids[$user];
					$ranking_id = $ranking_ids[$ranking];
					
					// for each ranking and score (can be match or question) calculate the ranking at that point
					$scores_for_ranking = self::get_scores_for_ranking( $ranking_id, $new_history_table );
					
					if ( count ( $scores_for_ranking ) > 0 ) {
						// get the ranking
						$ranking_order = self::get_ranking_order(
														$pool->has_leagues, 
														$ranking_id, 
														$scores_for_ranking[$score_order], 
														$new_history_table
													);
						
						// save ranking for user
						$ranking_for_user = array_search( $user_id, $ranking_order );
						if ( $ranking_for_user !== false ) {
							$ranking_for_user += 1; // because arrays are zero-based
							$sql = $wpdb->prepare( "UPDATE {$prefix}{$new_history_table}
													SET ranking = %d
													WHERE ranking_id = %d AND score_order = %d AND user_id = %d"
													, $ranking_for_user
													, $ranking_id
													, $scores_for_ranking[$score_order]
													, $user_id );
							$result = $wpdb->query( $sql );
							$check = $check && ( $result !== false );
						} else {
							// whut? user not found in score table?!?
							$check = false;
						}
						
						// next user
						$user++;
						
						if ( $user >= count( $user_ids ) ) {
							// next score
							$score_order++;
							$user = 0;
							
							unset( $_SESSION['fp_calc_ranking_order'] );
							
							if ( $score_order >= count( $scores_for_ranking ) ) {
								// next ranking
								$ranking++;
								$score_order = 0;
								
								unset( $_SESSION['fp_calc_ranking_scores'] );
								
								if ( $ranking >= count( $ranking_ids ) ) {
									// all rankings finished
									$sub_iteration = 0;
									$calculation_step = 'finalize';
									break;
								}
							}
						}
					} else {
						// no scores in this ranking, so go to next ranking
						unset( $_SESSION['fp_calc_ranking_scores'] );
						unset( $_SESSION['fp_calc_ranking_order'] );
						$ranking++;
						$user = 0;
						$score_order = 0;
						
						if ( $ranking >= count( $ranking_ids ) ) {
							// all rankings finished
							$ranking = 0;
							$sub_iteration = 0;
							$calculation_step = 'finalize';
							break;
						}
					}
				}
				
				if ( $calculation_step == 'finalize' ) {
					$msg = __( 'Activating new ranking and clean-up.', 'football-pool' );
					$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				}
				break;
			case 'finalize':
				do_action( 'football_pool_score_calculation_final_before' );
				
				$msg = __( 'Calculation completed. Thanks for your patience.', 'football-pool' );
				$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				
				// make the new table active
				$pool->set_score_table( $new_history_table );
				// empty the old table
				$check = self::empty_scorehistory( 'all', $active_history_table );
				// empty session storage for this calculation
				array_walk( $_SESSION, array( 'self', 'destroy_calc_session_keys' ) );

				// calculation finished
				Football_Pool_Utils::set_fp_option( 'calculation_in_progress', 0 );
				$completed = 1;
				
				do_action( 'football_pool_score_calculation_final_after' );
				break;
			case 'cancel_calculation':
				do_action( 'football_pool_score_calculation_cancelled_before' );
				
				// empty session storage
				array_walk( $_SESSION, array( 'self', 'destroy_calc_session_keys' ) );
				// calculation cancelled, so no longer in progress
				Football_Pool_Utils::set_fp_option( 'calculation_in_progress', 0 );
				
				do_action( 'football_pool_score_calculation_cancelled_after' );
				break;
			case 'stop_message':
				// show message
				$str = __( 'There is already a calculation in progress. Please wait for it to finish before starting a new one.', 'football-pool' );
				$output .= sprintf( '<p>%s</p>', $str );
				$output .= '<p>If - for some reason - this message is wrong, see the <a href="?page=footballpool-help#calculation-already-running">help page</a> for tips on how to force a calculation start.</p>';
				if ( ! FOOTBALLPOOL_RANKING_CALCULATION_NOAJAX ) $output .= self::ok_button();
				if ( $is_cli ) {
					$msg = $str;
					$msg_type = FOOTBALLPOOL_CALC_WARNING_MESSAGE;
				}
				$completed = 1;
				break;
			case 'no_calc_needed':
				$str = __( 'No matches or questions to calculate, or no users in the pool. Ranking cleared.', 'football-pool' );
				$output .= $str;
				if ( $is_cli ) {
					$msg = $str;
					$msg_type = FOOTBALLPOOL_CALC_INFO_MESSAGE;
				}
				// empty the new table (just in case and because we didn't do the prepare step)
				$check = self::empty_scorehistory( 'all', $new_history_table );
				
				$total_iterations = 2; // just this one and the finalize step
				$calculation_step = 'finalize';
				break;
			default:
				// just proceed
				$calculation_step = 'prepare';
				$check = true;
				break;
		}
		
		// set the params to send back to the calling script
		$params['colorbox_html'] = $output;
		$params['error'] = false;
		if ( $check === true ) {
			$params['fp_recalc_nonce'] = $nonce;
			$params['force_calculation'] = $force_calculation ? 1 : 0;
			$params['completed'] = $completed;
			$params['iteration'] = ++$iteration;
			$params['sub_iteration'] = $sub_iteration;
			$params['total_iterations'] = $total_iterations;
			$params['calculation_step'] = $calculation_step;
			$params['user'] = $user;
			$params['ranking'] = $ranking;
			$params['match'] = $match;
			$params['question'] = $question;
			$params['prev_total_score'] = $prev_total_score;
			$params['score_order'] = $score_order;
			$params['sub_iterations'] = implode( ',', $sub_iterations );
			$params['message_type'] = $msg_type;
			// unset($msg);
			if ( isset( $msg ) ) {
				$params['message'] = $msg;
			} else {
				$i = $iteration - 1;
				$params['message'] = "step '{$calculation_step}': user {$user}, match {$match}, question {$question}, ranking {$ranking}, iteration {$i} of {$total_iterations}";
			}
		} else {
			$params['error'] = sprintf( '%s %s: %s'
										, __( 'Step', 'football-pool' )
										, "'{$calculation_step}'"
										, __( 'Something went wrong while (re)calculating the scores. See the <a href="?page=footballpool-help#ranking-calculation">help page</a> for details on solving this problem.', 'football-pool' )
								);
			$params['message'] = sprintf( '%s %s: %s'
										, __( 'Step', 'football-pool' )
										, "'{$calculation_step}'"
										, 'Calculation not successful.'
								);
			$params['message_type'] = FOOTBALLPOOL_CALC_ERROR_MESSAGE;
			
			do_action( 'footballpool_score_calc_error' );
		}
		
		if ( $is_cli ) {
			return $params;
		} else {
			if ( FOOTBALLPOOL_RANKING_CALCULATION_NOAJAX ) {
				unset( $params['colorbox_html'] );
				
				printf( '<div>%s</div>', $output );
				printf( '<p>%s</p>', $msg );
				
				if ( $completed !== 1 && $params['error'] === false ) {
					unset( $params['error'] );
					$url = add_query_arg( $params, "{$_SERVER['PHP_SELF']}?page=footballpool-score-calculation" );
					// printf( '<a href="%s">debug next</a>', $url );
					printf( '<script>location.href = "%s";</script>', $url );
				} else {
					if ( $params['error'] !== false ) {
						printf( '<p class="error">%s</p>', $params['error'] );
					}
				}
			} else {
				header( 'Content-Type: application/json' );
				echo json_encode( $params );
				// always die when doing ajax responses
				die();
			}
		}
	}
	
	public static function admin() {
		self::process();
	}
	
	private static function ok_button() {
		return self::link_button(
									__( 'OK', 'football-pool' ), 
									array( '', 'jQuery.colorbox.close()' ), 
									true, 
									'js-button',
									'primary'
								);
	}
	
	private static function get_user_set( $has_leagues ) {
		if ( ! isset( $_SESSION['fp_calc_users'] ) ) {
			global $wpdb;
			$prefix = FOOTBALLPOOL_DB_PREFIX;
			
			if ( $has_leagues ) {
				$sql = "SELECT DISTINCT( u.ID ) FROM {$wpdb->users} u 
						INNER JOIN {$prefix}league_users lu ON ( u.ID = lu.user_id )
						INNER JOIN {$prefix}leagues l ON ( l.id = lu.league_id )
						ORDER BY 1 ASC";
			} else {
				$sql = "SELECT DISTINCT( u.ID ) FROM {$wpdb->users} u 
						LEFT OUTER JOIN {$prefix}league_users lu ON ( u.ID = lu.user_id )
						WHERE lu.league_id > 0 OR lu.league_id IS NULL
						ORDER BY 1 ASC";
			}
			$users = $wpdb->get_col( $sql );
			$_SESSION['fp_calc_users'] = apply_filters( 'footballpool_score_calc_users', $users, $has_leagues );
		}
		
		return $_SESSION['fp_calc_users'];
	}
	
	private static function get_matches( $ranking_id ) {
		if ( ! isset( $_SESSION["fp_calc_matches_{$ranking_id}"] ) ) {
			global $wpdb;
			$prefix = FOOTBALLPOOL_DB_PREFIX;
			
			if ( $ranking_id != FOOTBALLPOOL_RANKING_DEFAULT ) {
				$sql = $wpdb->prepare( "SELECT m.id FROM {$prefix}matches m
										INNER JOIN {$prefix}rankings_matches r ON ( m.id = r.match_id )
										WHERE m.home_score IS NOT NULL AND m.away_score IS NOT NULL
										AND r.ranking_id = %d ORDER BY m.play_date"
										, $ranking_id );
			} else {
				$sql = "SELECT id FROM {$prefix}matches 
						WHERE home_score IS NOT NULL AND away_score IS NOT NULL
						ORDER BY play_date";
			}
			$ids = $wpdb->get_col( $sql );
			if ( $ids === null ) $ids = array();
			$_SESSION["fp_calc_matches_{$ranking_id}"] = apply_filters( 'footballpool_score_calc_matches'
																		, $ids, $ranking_id );
		}
		
		return $_SESSION["fp_calc_matches_{$ranking_id}"];
	}
	
	private static function get_questions( $ranking_id ) {
		if ( ! isset( $_SESSION["fp_calc_questions_{$ranking_id}"] ) ) {
			global $wpdb;
			$prefix = FOOTBALLPOOL_DB_PREFIX;
			
			if ( $ranking_id != FOOTBALLPOOL_RANKING_DEFAULT ) {
				$sql = $wpdb->prepare( "SELECT q.id FROM {$prefix}rankings_bonusquestions r
										INNER JOIN {$prefix}bonusquestions q ON ( r.question_id = q.id )
										WHERE r.ranking_id = %d AND q.score_date IS NOT NULL"
										, $ranking_id );
			} else {
				$sql = "SELECT id FROM {$prefix}bonusquestions 
						WHERE score_date IS NOT NULL
						ORDER BY score_date";
			}
			$ids = $wpdb->get_col( $sql );
			if ( $ids === null ) $ids = array();
			$_SESSION["fp_calc_questions_{$ranking_id}"] = apply_filters( 'footballpool_score_calc_questions'
																		, $ids, $ranking_id );
		}
		
		return $_SESSION["fp_calc_questions_{$ranking_id}"];
	}
	
	private static function get_rankings() {
		if ( ! isset( $_SESSION['fp_calc_rankings'] ) ) {
			global $wpdb;
			$prefix = FOOTBALLPOOL_DB_PREFIX;
			
			$sql = "SELECT id FROM {$prefix}rankings ORDER BY id ASC";
			$rankings = $wpdb->get_col( $sql );
			$_SESSION['fp_calc_rankings'] = apply_filters( 'footballpool_score_calc_rankings', $rankings );
		}
		
		return $_SESSION['fp_calc_rankings'];
	}
	
	private static function get_score_row( $user_id, $ranking_id, $new_history_table ) {
		if ( ! isset( $_SESSION['fp_calc_score_rows'] ) ) {
			global $wpdb;
			$prefix = FOOTBALLPOOL_DB_PREFIX;
			$sql = $wpdb->prepare( "SELECT score, total_score, source_id, type 
									FROM {$prefix}{$new_history_table} 
									WHERE user_id = %d AND ranking_id = %d AND score_order = 0
									ORDER BY score_date ASC, type ASC, source_id ASC"
									, $user_id, $ranking_id );
			$_SESSION['fp_calc_score_rows'] = $wpdb->get_results( $sql, ARRAY_A );
		}
		$row = array_shift( $_SESSION['fp_calc_score_rows'] );
		if ( $row === null ) unset( $_SESSION['fp_calc_score_rows'] );
		return $row;
	}
	
	private static function get_scores_for_ranking( $ranking_id, $new_history_table ) {
		if ( ! isset( $_SESSION['fp_calc_ranking_scores'] ) ) {
			global $wpdb;
			$prefix = FOOTBALLPOOL_DB_PREFIX;
			$sql = $wpdb->prepare( "SELECT DISTINCT( score_order )
									FROM {$prefix}{$new_history_table}
									WHERE ranking_id = %d ORDER BY 1 ASC"
									, $ranking_id );
			$_SESSION['fp_calc_ranking_scores'] = $wpdb->get_col( $sql );
		}
		
		return $_SESSION['fp_calc_ranking_scores'];
	}
	
	private static function get_ranking_order( 
									$has_leagues,
									$ranking_id = FOOTBALLPOOL_RANKING_DEFAULT,
									$score_order = 0,
									$new_history_table ) {

		if ( ! isset( $_SESSION['fp_calc_ranking_order'] ) ) {
			global $wpdb;
			$prefix = FOOTBALLPOOL_DB_PREFIX;
			$sql = "SELECT 
						u.ID AS `user_id`, 
						COALESCE( MAX( s.total_score ), 0 ) AS `points`, 
						COUNT( IF( s.full = 1, 1, NULL ) ) AS `full`, 
						COUNT( IF( s.toto = 1, 1, NULL ) ) AS `toto`,
						COUNT( IF( s.type = 1 AND score > 0, 1, NULL ) ) AS `bonus`
					FROM {$wpdb->users} u ";
			if ( $has_leagues ) {
				$sql .= "INNER JOIN `{$prefix}league_users` lu ON ( u.ID = lu.user_id ) ";
				$sql .= "INNER JOIN `{$prefix}leagues` l ON ( lu.league_id = l.id ) ";
			} else {
				$sql .= "LEFT OUTER JOIN `{$prefix}league_users` lu ON ( lu.user_id = u.ID ) ";
			}
			$sql .= "LEFT OUTER JOIN `{$prefix}{$new_history_table}` s ON 
						( s.user_id = u.ID AND s.ranking_id = %d AND s.score_order <= %d ) ";
			$sql .= "WHERE s.ranking_id IS NOT NULL ";
			if ( ! $has_leagues ) $sql .= "AND ( lu.league_id > 0 OR lu.league_id IS NULL ) ";
			$sql .= "GROUP BY u.ID
					ORDER BY `points` DESC, `full` DESC, `toto` DESC, `bonus` DESC, ";
			if ( $has_leagues ) $sql .= "lu.league_id ASC, ";
			$sql .= "LOWER( u.display_name ) ASC";
			$sql = $wpdb->prepare( $sql, $ranking_id, $score_order );
			$sql = apply_filters( 'footballpool_get_ranking_order'
									, $sql, $has_leagues, $ranking_id, $score_order );
			$_SESSION['fp_calc_ranking_order'] = $wpdb->get_col( $sql, 0 );
		}
		
		return $_SESSION['fp_calc_ranking_order'];
	}
	
	private static function destroy_calc_session_keys( $val, $key ) {
		if ( strpos( $key, 'fp_calc_' ) !== false ) unset( $_SESSION[$key] );
	}
	
	private static function post_int( $key, $default = 0 ) {
		if ( FOOTBALLPOOL_RANKING_CALCULATION_NOAJAX ) {
			return Football_Pool_Utils::get_int( $key, $default );
		} else {
			return Football_Pool_Utils::post_int( $key, $default );
		}
	}
	
	private static function post_string( $key, $default = '' ) {
		if ( FOOTBALLPOOL_RANKING_CALCULATION_NOAJAX ) {
			return Football_Pool_Utils::get_str( $key, $default );
		} else {
			return Football_Pool_Utils::post_str( $key, $default );
		}
	}
	
}
