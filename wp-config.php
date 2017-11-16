<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'db708030561');

/** MySQL database username */
define('DB_USER', 'dbo708030561');

/** MySQL database password */
define('DB_PASSWORD', 'Giessencestnous2');

/** MySQL hostname */
define('DB_HOST', 'db708030561.db.1and1.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '_)83[eZ^l[XAHegZ>KJi(Fds)[rs([<]rh>:>FE8w1uJs r<4%9h34HX;skgeGW ');
define('SECURE_AUTH_KEY',  'jpL([Mu^XD{zLX:_R)#A09.z<7P(N0R*>K5ZVd}YjIazp3fS<CrF2S #*zj8OAif');
define('LOGGED_IN_KEY',    '1?GtU!BoCQ_qcp}rU.1]rI2!J<1}|vo<u.qNv;ft`> ?,j9E-#[Gd+%KwH@|NDS<');
define('NONCE_KEY',        'csS=Ls-8:0gq}yGC+S&jfb(#rd4a=9-lYBE#zt;-ADr<8^eB,8niJl8*F@FQ[^D:');
define('AUTH_SALT',        'z.], C*fj]t]GWujrBekO<WcnNdHy.tb`QIEJ}xru5!24_~F/y<U1H[|vXEBzE:-');
define('SECURE_AUTH_SALT', 'hr0SX.762Vzz7baeww9Pt7A4)Rrf&9#;T.Y>[.S)hGqj|4wpM&X^!5/c*dHtBc9z');
define('LOGGED_IN_SALT',   '`t-~G<ReaUNPK(D+W Qe+ K<WvB33|r%9*9$5`#$6oD47MwS;9qO],;(?6L$5wHf');
define('NONCE_SALT',       'h[>Ax{<n5$$56=T)7Vi4A_e}c<p}r}LEs, Wj2?82gwu!01Suos#p~}W067_,bpD');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
