/*
  Warnings:

  - The values [CONFIRMED] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `orderdetail` DROP FOREIGN KEY `OrderDetail_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL,
    MODIFY `shippingAddress` VARCHAR(191) NULL,
    MODIFY `billingAddress` VARCHAR(191) NULL,
    MODIFY `paymentMethod` VARCHAR(191) NULL,
    MODIFY `trackingNumber` VARCHAR(191) NULL,
    MODIFY `shippedAt` DATETIME(3) NULL,
    MODIFY `deliveredAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `stockQuantity` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
