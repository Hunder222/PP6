-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema third_party_data
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `third_party_data` DEFAULT CHARACTER SET utf8 ;
USE `third_party_data` ;

-- -----------------------------------------------------
-- Table `third_party_data`.`educations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `third_party_data`.`educations` (
  `id` VARCHAR(5) NOT NULL,
  `name` VARCHAR(45) NULL,
  `starting_salary` INT NULL,
  `average_salary` INT NULL,
  `highest_salary` INT NULL,
  `unemployment_new_grad_pct` INT NULL,
  `dropout_first_year_pct` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `third_party_data`.`survey`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `third_party_data`.`survey` (
  `survey_id` INT NOT NULL AUTO_INCREMENT,
  `survey_name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`survey_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `third_party_data`.`survey_questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `third_party_data`.`survey_questions` (
  `question_id` INT NOT NULL AUTO_INCREMENT,
  `survey_id` INT NOT NULL,
  `question_text` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`question_id`),
  INDEX `fk_survey_questions_survey1_idx` (`survey_id` ASC) VISIBLE,
  CONSTRAINT `fk_survey_questions_survey1`
    FOREIGN KEY (`survey_id`)
    REFERENCES `third_party_data`.`survey` (`survey_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `third_party_data`.`survey_answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `third_party_data`.`survey_answers` (
  `id` VARCHAR(5) NOT NULL,
  `question_id` INT NOT NULL,
  `answer_pct` INT NULL,
  PRIMARY KEY (`id`, `question_id`),
  INDEX `fk_educations_has_reasonsForApplying_reasonsForApplying1_idx` (`question_id` ASC) VISIBLE,
  INDEX `fk_educations_has_reasonsForApplying_educations_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_educations_has_reasonsForApplying_educations`
    FOREIGN KEY (`id`)
    REFERENCES `third_party_data`.`educations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_educations_has_reasonsForApplying_reasonsForApplying1`
    FOREIGN KEY (`question_id`)
    REFERENCES `third_party_data`.`survey_questions` (`question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;








-- -----------------------------------------------------
-- Alter tables / constraints
-- -----------------------------------------------------
ALTER TABLE `educations`
    ADD CONSTRAINT `chk_starting_salary` CHECK (`starting_salary` > 0),
    ADD CONSTRAINT `chk_average_salary` CHECK (`average_salary` > 0),
    ADD CONSTRAINT `chk_highest_salary` CHECK (`highest_salary` > 0),
    ADD CONSTRAINT `chk_unemployment` CHECK (`unemployment_new_grad_pct` BETWEEN 0 AND 100),
    ADD CONSTRAINT `chk_dropout` CHECK (`dropout_first_year_pct` BETWEEN 0 AND 100);

ALTER TABLE `survey_answers`
    ADD CONSTRAINT `chk_answer_pct_range` CHECK (`answer_pct` BETWEEN 0 AND 100);







-- -----------------------------------------------------
-- Insert data
-- -----------------------------------------------------

INSERT INTO educations (id, name, starting_salary, average_salary, highest_salary, unemployment_new_grad_pct) VALUES
    ('CYBS', 'Cybersikkerhed', 37600, 42100, 48000, 2),
    ('DATA', 'Datamatiker', 31950, 36300, 43600, 5),
    ('ITAR', 'IT-Arkitektur', 45000, 67000, 70000, null),
    ('ITTE', 'IT-Teknolog', 28000, 34200, 39300, 5),
    ('MEKO', 'Multimediedesigner', 19400, 26600, 32800, 8),
    ('OCYB', 'Operationel_Cybersikkerhed', null, null, null, null),
    ('ØKIT', 'Økonomi_og_IT', 30150, 36050, 41300, 6);


INSERT INTO survey (survey_name) VALUES
    ('Årsag til nuværende arbejdsplads'),
    ('Trivsel på uddannelse socialt miljø'),
    ('Trivsel på uddannelse fagligt miljø');


INSERT INTO survey_questions (survey_id, question_text) VALUES
    (1, 'Jeg søgte og blev ansat efter et stillingsopslag'),
    (1, 'Jeg fik job gennem mit netværk'),
    (1, 'Jeg fortsatte i job på den arbejdsplads, hvor jeg skrev opgave / projekt / speciale eller var i praktik'),
    (1, 'Jeg fortsatte i job på den arbejdsplads, hvor jeg havde studiejob'),

    (2, 'Der er et godt socialt miljø'),
    (2, 'Jeg føler mig generelt rigtig godt tilpas på min uddannelse'),
    (2, 'Har du oplevet at føle dig ensom på studiet?'),
    (2, 'Har du oplevet stærke stress-symptomer i forbindelse med dit studie i dagligdagen?'),
    
    (3, 'Der er et godt fagligt miljø'),
    (3, 'Jeg har det generelt godt med at arbejde sammen med andre studerende'),
    (3, 'Jeg forstår tingene bedre, når jeg har talt med mine medstuderende om dem'),
    (3, 'Mit udbytte af undervisningen er højt');


INSERT INTO survey_answers (id, question_id, answer_pct) VALUES
    ('CYBS', '1', '30'),
    ('CYBS', '2', '17'),
    ('CYBS', '3', '17'),
    ('CYBS', '4', '17'),
    ('CYBS', '5', '69.2'),
    ('CYBS', '6', '78.2'),
    ('CYBS', '7', '81'),
    ('CYBS', '8', '70.4'),
    ('CYBS', '9', '79'),
    ('CYBS', '10', '85.8'),
    ('CYBS', '11', '84.2'),
    ('CYBS', '12', '79'),

    ('DATA', '1', '52'),
    ('DATA', '2', '20'),
    ('DATA', '3', '14'),
    ('DATA', '4', '7'),
    ('DATA', '5', '76'),
    ('DATA', '6', '81.4'),
    ('DATA', '7', '77.8'),
    ('DATA', '8', '75.6'),
    ('DATA', '9', '79.2'),
    ('DATA', '10', '82'),
    ('DATA', '11', '83.2'),
    ('DATA', '12', '77.2'),
    
    ('ITAR', '1', null),
    ('ITAR', '2', null),
    ('ITAR', '3', null),
    ('ITAR', '4', null),
    ('ITAR', '5', '79'),
    ('ITAR', '6', '81'),
    ('ITAR', '7', '81.6'),
    ('ITAR', '8', '77.4'),
    ('ITAR', '9', '81.4'),
    ('ITAR', '10', '85.2'),
    ('ITAR', '11', '84.6'),
    ('ITAR', '12', '75.8'),

    ('ITTE', '1', '39'),
    ('ITTE', '2', '22'),
    ('ITTE', '3', '22'),
    ('ITTE', '4', '17'),
    ('ITTE', '5', '79'),
    ('ITTE', '6', '77.8'),
    ('ITTE', '7', '81.2'),
    ('ITTE', '8', '71.4'),
    ('ITTE', '9', '77.8'),
    ('ITTE', '10', '83.4'),
    ('ITTE', '11', '84'),
    ('ITTE', '12', '71.2'),

    ('MEKO', '1', '25'),
    ('MEKO', '2', '23'),
    ('MEKO', '3', '23'),
    ('MEKO', '4', '15'),
    ('MEKO', '5', '77.8'),
    ('MEKO', '6', '83.8'),
    ('MEKO', '7', '76'),
    ('MEKO', '8', '68.6'),
    ('MEKO', '9', '82.2'),
    ('MEKO', '10', '84'),
    ('MEKO', '11', '85.4'),
    ('MEKO', '12', '80.4'),

    ('ØKIT', '1', '56'),
    ('ØKIT', '2', '17'),
    ('ØKIT', '3', '14'),
    ('ØKIT', '4', '6'),
    ('ØKIT', '5', '77.4'),
    ('ØKIT', '6', '79.2'),
    ('ØKIT', '7', '78.4'),
    ('ØKIT', '8', '73.8'),
    ('ØKIT', '9', '76.2'),
    ('ØKIT', '10', '84.4'),
    ('ØKIT', '11', '82.6'),
    ('ØKIT', '12', '74.2');
