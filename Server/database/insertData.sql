USE myTest;
-- Tạo dữ liệu cho bảng roles
INSERT INTO roles (roleId, description, createdAt, updatedAt) VALUES
(1, 'Admin', NOW(), NOW()),
(2, 'Customer', NOW(), NOW()),
(3, 'Jeweler', NOW(), NOW()),
(4, 'Manager', NOW(), NOW()),
(5, 'Guest', NOW(), NOW());

-- Tạo dữ liệu cho bảng users
INSERT INTO users (userId, email, password, firstName, lastName, address, gender, phonenumber, roleId, image, createdAt, updatedAt) VALUES
(1, 'john.doe@example.com', 'password123', 'John', 'Doe', '123 Main St', 1, '1234567890', 2, 'john.jpg', NOW(), NOW()),
(2, 'jane.smith@example.com', 'password456', 'Jane', 'Smith', '456 Elm St', 2, '0987654321', 3, 'jane.jpg', NOW(), NOW()),
(3, 'admin@example.com', 'adminpass', 'Admin', 'User', '789 Oak St', 1, '1112223333', 1, 'admin.jpg', NOW(), NOW()),
(4, 'jeweler@example.com', 'jewelerpass', 'Tom', 'Jeweler', '321 Pine St', 1, '4445556666', 3, 'tom.jpg', NOW(), NOW()),
(5, 'guest@example.com', 'guestpass', 'Guest', 'User', '654 Maple St', 1, '7778889999', 5, 'guest.jpg', NOW(), NOW());

-- Tạo dữ liệu cho bảng producttypes
INSERT INTO producttypes (productTypeId, description, createdAt, updatedAt) VALUES
(1, 'Necklaces', NOW(), NOW()),
(2, 'Rings', NOW(), NOW()),
(3, 'Bracelets', NOW(), NOW()),
(4, 'Earrings', NOW(), NOW());

-- Tạo dữ liệu cho bảng products
INSERT INTO products (productId, productName, price, productTypeId, quantityInStock, description, image, createdAt, updatedAt) VALUES
(1, 'Gold Necklace', 1500.00, 1, 10, '18K gold necklace with diamonds', 'gold_necklace.jpg', NOW(), NOW()),
(2, 'Diamond Ring', 2500.00, 2, 15, 'Platinum ring with diamond', 'diamond_ring.jpg', NOW(), NOW()),
(3, 'Silver Bracelet', 300.00, 3, 20, 'Sterling silver bracelet', 'silver_bracelet.jpg', NOW(), NOW()),
(4, 'Pearl Earrings', 400.00, 4, 25, 'Classic pearl earrings', 'pearl_earrings.jpg', NOW(), NOW()),
(5, 'Platinum Ring', 2800.00, 2, 8, 'Platinum ring with sapphire', 'platinum_ring.jpg', NOW(), NOW());

-- Tạo dữ liệu cho bảng discounts
INSERT INTO discounts (discountId, description, createdAt, updatedAt) VALUES
(1, '10% off on gold jewelry', NOW(), NOW()),
(2, '15% off on diamond rings', NOW(), NOW()),
(3, 'Free shipping on orders over $500', NOW(), NOW()),
(4, '20% off on silver bracelets', NOW(), NOW()),
(5, '5% off on all purchases', NOW(), NOW());

-- Tạo dữ liệu cho bảng recievediscount
INSERT INTO recievediscount (discountId, userId, createdAt, updatedAt) VALUES
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 3, NOW(), NOW()),
(4, 4, NOW(), NOW()),
(5, 5, NOW(), NOW());

-- Tạo dữ liệu cho bảng payments
INSERT INTO payments (paymentId, paymentMethod, createdAt, updatedAt) VALUES
(1, 'Credit Card', NOW(), NOW()),
(2, 'PayPal', NOW(), NOW()),
(3, 'Bank Transfer', NOW(), NOW()),
(4, 'Cash on Delivery', NOW(), NOW()),
(5, 'Debit Card', NOW(), NOW());

-- Tạo dữ liệu cho bảng invoices
INSERT INTO invoices (invoiceId, userId, totalPrice, paymentId, createdAt, updatedAt) VALUES
(1, 1, 1500.00, 1, NOW(), NOW()),
(2, 2, 2500.00, 2, NOW(), NOW()),
(3, 3, 300.00, 3, NOW(), NOW()),
(4, 4, 400.00, 4, NOW(), NOW()),
(5, 5, 2800.00, 5, NOW(), NOW());

-- Tạo dữ liệu cho bảng bought
INSERT INTO bought (invoiceId, productId, quantity, totalPrice, createdAt, updatedAt) VALUES
(1, 1, '1', 1500.00, NOW(), NOW()),
(2, 2, '1', 2500.00, NOW(), NOW()),
(3, 3, '1', 300.00, NOW(), NOW()),
(4, 4, '1', 400.00, NOW(), NOW()),
(5, 5, '1', 2800.00, NOW(), NOW());

-- Tạo dữ liệu cho bảng shoppingcarts
INSERT INTO shoppingcarts (userId, productId, quantity, createdAt, updatedAt) VALUES
(1, 3, 1, NOW(), NOW()),
(2, 4, 2, NOW(), NOW()),
(3, 5, 1, NOW(), NOW()),
(4, 1, 1, NOW(), NOW()),
(5, 2, 1, NOW(), NOW());