/*
  Warnings:

  - Added the required column `link_id` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `locations_latitude_key` ON `locations`;

-- AlterTable
ALTER TABLE `locations` ADD COLUMN `link_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `locations` ADD CONSTRAINT `locations_link_id_fkey` FOREIGN KEY (`link_id`) REFERENCES `links`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
