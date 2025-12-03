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
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `third_party_data`.`reasonsForApplying`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `third_party_data`.`reasons_for_applying` (
  `reason_id` INT NOT NULL AUTO_INCREMENT,
  `reason_text` VARCHAR(150) NULL,
  PRIMARY KEY (`reason_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `third_party_data`.`surveyAnswers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `third_party_data`.`survey_answers` (
  `id` VARCHAR(5) NOT NULL,
  `reason_id` INT NOT NULL,
  `answer_pct` INT NULL,
  PRIMARY KEY (`id`, `reason_id`),
  INDEX `fk_educations_has_reasonsForApplying_reasonsForApplying1_idx` (`reason_id` ASC) VISIBLE,
  INDEX `fk_educations_has_reasonsForApplying_educations_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_educations_has_reasonsForApplying_educations`
    FOREIGN KEY (`id`)
    REFERENCES `third_party_data`.`educations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_educations_has_reasonsForApplying_reasonsForApplying1`
    FOREIGN KEY (`reason_id`)
    REFERENCES `third_party_data`.`reasons_for_applying` (`reason_id`)
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
    ADD CONSTRAINT `chk_unemployment` CHECK (`unemployment_new_grad_pct` BETWEEN 0 AND 100);


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


INSERT INTO reasons_for_applying (reason_text) VALUES
    ('Jeg søgte og blev ansat efter et stillingsopslag'),
    ('Jeg fik job gennem mit netværk'),
    ('Jeg fortsatte i job på den arbejdsplads, hvor jeg skrev opgave / projekt / speciale eller var i praktik'),
    ('Jeg fortsatte i job på den arbejdsplads, hvor jeg havde studiejob');


INSERT INTO survey_answers (id, reason_id, answer_pct) VALUES
    ('CYBS', '1', '30'),
    ('CYBS', '2', '17'),
    ('CYBS', '3', '17'),
    ('CYBS', '4', '17'),
   
    ('DATA', '1', '52'),
    ('DATA', '2', '20'),
    ('DATA', '3', '14'),
    ('DATA', '4', '7'),

    ('ITTE', '1', '39'),
    ('ITTE', '2', '22'),
    ('ITTE', '3', '22'),
    ('ITTE', '4', '17'),

    ('MEKO', '1', '25'),
    ('MEKO', '2', '23'),
    ('MEKO', '3', '23'),
    ('MEKO', '4', '15'),

    ('ØKIT', '1', '56'),
    ('ØKIT', '2', '17'),
    ('ØKIT', '3', '14'),
    ('ØKIT', '4', '6');