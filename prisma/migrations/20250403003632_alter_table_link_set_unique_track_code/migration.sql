/*
  Warnings:

  - You are about to drop the column `track` on the `links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[track_code]` on the table `links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `track_code` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `links` DROP COLUMN `track`,
    ADD COLUMN `track_code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `links_track_code_key` ON `links`(`track_code`);
