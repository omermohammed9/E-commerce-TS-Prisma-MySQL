/*
  Warnings:

  - Made the column `shippingAddress` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `billingAddress` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentMethod` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trackingNumber` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shippedAt` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deliveredAt` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `shippingAddress` VARCHAR(191) NOT NULL,
    MODIFY `billingAddress` VARCHAR(191) NOT NULL,
    MODIFY `paymentMethod` VARCHAR(191) NOT NULL,
    MODIFY `trackingNumber` VARCHAR(191) NOT NULL,
    MODIFY `shippedAt` DATETIME(3) NOT NULL,
    MODIFY `deliveredAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `phoneNumber` VARCHAR(191) NOT NULL;
