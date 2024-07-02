/*
  Warnings:

  - You are about to drop the `_EventToAuthor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_EventToAuthor` DROP FOREIGN KEY `_EventToAuthor_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EventToAuthor` DROP FOREIGN KEY `_EventToAuthor_B_fkey`;

-- DropTable
DROP TABLE `_EventToAuthor`;

-- CreateTable
CREATE TABLE `_AuthorToEvent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AuthorToEvent_AB_unique`(`A`, `B`),
    INDEX `_AuthorToEvent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AuthorToEvent` ADD CONSTRAINT `_AuthorToEvent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorToEvent` ADD CONSTRAINT `_AuthorToEvent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
