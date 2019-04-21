# ************************************************************
# Sequel Pro SQL dump
# Version 5438
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.3.12-MariaDB)
# Database: fansights_db
# Generation Time: 2019-04-21 11:01:54 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table deriv_cd
# ------------------------------------------------------------

CREATE TABLE `deriv_cd` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(4) DEFAULT NULL,
  `description` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table fd_group
# ------------------------------------------------------------

CREATE TABLE `fd_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(4) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table food_des
# ------------------------------------------------------------

CREATE TABLE `food_des` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ndb_no` varchar(11) DEFAULT NULL,
  `group_code` varchar(4) DEFAULT NULL,
  `long_desc` varchar(200) DEFAULT NULL,
  `short_desc` varchar(60) DEFAULT NULL,
  `com_name` varchar(100) DEFAULT NULL,
  `manufacturer` varchar(65) DEFAULT NULL,
  `survey` varchar(1) DEFAULT NULL,
  `ref_desc` varchar(135) DEFAULT NULL COMMENT 'Percentage of refuse by weight',
  `refuse` int(2) DEFAULT 0,
  `sci_name` varchar(65) DEFAULT NULL,
  `n_factor` float(4,2) DEFAULT 0.00 COMMENT 'Factor for converting nitrogen to protein amounts)',
  `pro_factor` float(4,2) DEFAULT 0.00 COMMENT 'Factor for calculating calories from protein amounts',
  `fat_factor` float(4,2) DEFAULT 0.00 COMMENT 'Factor for calculating calories from fat levels',
  `cho_factor` float(4,2) DEFAULT 0.00 COMMENT 'Factor for calculating calories from carbohydrate values',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table footnote
# ------------------------------------------------------------

CREATE TABLE `footnote` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ndb_no` varchar(11) DEFAULT NULL,
  `fn_no` varchar(4) DEFAULT NULL COMMENT 'footnote no',
  `fn_type` varchar(1) DEFAULT '' COMMENT 'footnote type',
  `nutr_no` varchar(3) DEFAULT NULL,
  `ft_txt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table lang_desc
# ------------------------------------------------------------

CREATE TABLE `lang_desc` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(11) DEFAULT NULL,
  `description` varchar(140) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table langual
# ------------------------------------------------------------

CREATE TABLE `langual` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ndb_no` varchar(11) DEFAULT NULL,
  `factor_code` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table meal_details
# ------------------------------------------------------------

CREATE TABLE `meal_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) DEFAULT NULL,
  `mm_id` int(11) DEFAULT NULL,
  `products_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table meal_master
# ------------------------------------------------------------

CREATE TABLE `meal_master` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `type` varchar(20) DEFAULT 'HEAVY' COMMENT 'SNACK, HEAVY',
  `caption` varchar(255) DEFAULT NULL,
  `picture` text DEFAULT NULL,
  `tag` text DEFAULT NULL,
  `processed_image_tag` text DEFAULT NULL,
  `date_created` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `IDX_MEMBER_ID` (`member_id`),
  KEY `IDX_TYPE` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table members
# ------------------------------------------------------------

CREATE TABLE `members` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `profile` text DEFAULT NULL,
  `r_calorie_count` double(11,2) DEFAULT 1000.00 COMMENT 'Real food calorie count',
  `j_calorie_count` double(11,2) DEFAULT 0.00 COMMENT 'Junk food calorie count',
  `date_created` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNQ_EMAIL` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table nut_data
# ------------------------------------------------------------

CREATE TABLE `nut_data` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ndb_no` varchar(11) DEFAULT '',
  `nutr_no` varchar(3) DEFAULT NULL,
  `nutr_val` float(10,3) DEFAULT 0.000,
  `num_data_pts` float(5,1) DEFAULT 0.0,
  `std_error` float(8,3) DEFAULT 0.000,
  `src_cd` varchar(2) DEFAULT NULL,
  `deriv_cd` varchar(4) DEFAULT NULL,
  `ref_ndb_no` varchar(5) DEFAULT NULL,
  `add_nutr_mark` varchar(1) DEFAULT NULL,
  `num_studies` int(2) DEFAULT 0,
  `min` float(10,3) DEFAULT 0.000,
  `max` float(10,3) DEFAULT 0.000,
  `df` int(4) DEFAULT 0,
  `low_eb` float(10,3) DEFAULT 0.000,
  `up_eb` float(10,3) DEFAULT 0.000,
  `stat_cmt` varchar(10) DEFAULT NULL,
  `addmod_date` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table nutr_def
# ------------------------------------------------------------

CREATE TABLE `nutr_def` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nutr_no` varchar(11) DEFAULT NULL,
  `units` varchar(7) DEFAULT NULL,
  `tagname` varchar(20) DEFAULT NULL,
  `nutr_desc` varchar(60) DEFAULT NULL,
  `num_dec` varchar(1) DEFAULT NULL,
  `sr_order` int(6) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table src_cd
# ------------------------------------------------------------

CREATE TABLE `src_cd` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(2) DEFAULT NULL,
  `description` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table src_data
# ------------------------------------------------------------

CREATE TABLE `src_data` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `src_id` varchar(6) DEFAULT NULL,
  `authors` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `year` varchar(4) DEFAULT NULL,
  `journal` varchar(135) DEFAULT NULL,
  `vol_city` varchar(16) DEFAULT NULL,
  `issue_state` varchar(5) DEFAULT NULL,
  `start_page` varchar(5) DEFAULT NULL,
  `end_page` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table src_datalink
# ------------------------------------------------------------

CREATE TABLE `src_datalink` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ndb_no` varchar(11) DEFAULT NULL,
  `nutr_no` varchar(3) DEFAULT NULL,
  `datasrc_id` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tags
# ------------------------------------------------------------

CREATE TABLE `tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNQ_NAME` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table weight
# ------------------------------------------------------------

CREATE TABLE `weight` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ndb_no` varchar(11) DEFAULT NULL,
  `seq` varchar(2) DEFAULT NULL,
  `amount` float(5,3) DEFAULT 0.000,
  `msre_desc` varchar(84) DEFAULT NULL,
  `gm_weight` float(7,1) DEFAULT 0.0,
  `num_data_pts` int(3) DEFAULT 0,
  `std_dev` float(7,3) DEFAULT 0.000,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
