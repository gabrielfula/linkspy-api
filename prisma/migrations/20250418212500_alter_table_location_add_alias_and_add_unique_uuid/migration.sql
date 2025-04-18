/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `integration_logs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `links` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `locations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `links` ADD COLUMN `alias` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `integration_logs_uuid_key` ON `integration_logs`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `links_uuid_key` ON `links`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `locations_uuid_key` ON `locations`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `users_uuid_key` ON `users`(`uuid`);
