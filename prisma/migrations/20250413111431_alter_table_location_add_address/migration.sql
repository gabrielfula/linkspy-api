-- AlterTable
ALTER TABLE `locations` ADD COLUMN `cep` VARCHAR(191) NULL,
    ADD COLUMN `neighborhood` VARCHAR(191) NULL,
    ADD COLUMN `street` VARCHAR(191) NULL;
