/*
  Warnings:

  - Made the column `lastLogin` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `lastLogin` DATETIME(3) NOT NULL;
