-- ============================================
-- MOVELLA - Database Completo
-- Importar este arquivo no phpMyAdmin
-- ============================================

-- Criar database
CREATE DATABASE IF NOT EXISTS movella_production 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Selecionar database
USE movella_production;

-- ============================================
-- TABELA: users
-- ============================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `whatsapp` VARCHAR(20) NOT NULL,
  `name` VARCHAR(100) DEFAULT NULL,
  `role` ENUM('superadmin', 'client') NOT NULL DEFAULT 'client',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `last_login_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_whatsapp` (`whatsapp`),
  KEY `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: otp_codes
-- ============================================
CREATE TABLE IF NOT EXISTS `otp_codes` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `whatsapp` VARCHAR(20) NOT NULL,
  `code` VARCHAR(6) NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `is_used` BOOLEAN NOT NULL DEFAULT FALSE,
  `attempts` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_whatsapp_used` (`whatsapp`, `is_used`, `expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: templates
-- ============================================
CREATE TABLE IF NOT EXISTS `templates` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(50) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `preview_image` VARCHAR(255) DEFAULT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_slug` (`slug`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: sites
-- ============================================
CREATE TABLE IF NOT EXISTS `sites` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `subdomain` VARCHAR(50) NOT NULL,
  `business_name` VARCHAR(100) NOT NULL,
  `template_id` BIGINT UNSIGNED NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `whatsapp` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `address` VARCHAR(255) DEFAULT NULL,
  `neighborhood` VARCHAR(100) DEFAULT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(2) NOT NULL,
  `zipcode` VARCHAR(10) DEFAULT NULL,
  `settings` JSON DEFAULT NULL,
  `seo_title` VARCHAR(60) DEFAULT NULL,
  `seo_description` VARCHAR(160) DEFAULT NULL,
  `is_published` BOOLEAN NOT NULL DEFAULT FALSE,
  `published_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_subdomain` (`subdomain`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_published` (`is_published`),
  CONSTRAINT `fk_sites_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sites_template` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: sections
-- ============================================
CREATE TABLE IF NOT EXISTS `sections` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` BIGINT UNSIGNED NOT NULL,
  `section_type` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `position` INT NOT NULL DEFAULT 0,
  `data` JSON NOT NULL,
  `is_visible` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_site_position` (`site_id`, `position`),
  KEY `idx_site_visible` (`site_id`, `is_visible`),
  CONSTRAINT `fk_sections_site` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: assets
-- ============================================
CREATE TABLE IF NOT EXISTS `assets` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` BIGINT UNSIGNED NOT NULL,
  `asset_type` VARCHAR(20) NOT NULL,
  `hash` VARCHAR(32) NOT NULL,
  `file_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(500) NOT NULL,
  `file_size` INT UNSIGNED NOT NULL,
  `mime_type` VARCHAR(50) NOT NULL,
  `width` INT UNSIGNED DEFAULT NULL,
  `height` INT UNSIGNED DEFAULT NULL,
  `alt_text` VARCHAR(255) DEFAULT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `uploaded_by` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_hash` (`hash`),
  KEY `idx_site_id` (`site_id`),
  KEY `idx_active` (`is_active`),
  CONSTRAINT `fk_assets_site` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_assets_uploader` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: plans
-- ============================================
CREATE TABLE IF NOT EXISTS `plans` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(50) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `billing_cycle` ENUM('monthly', 'quarterly', 'yearly') NOT NULL DEFAULT 'monthly',
  `trial_days` INT NOT NULL DEFAULT 7,
  `features` JSON DEFAULT NULL,
  `limits` JSON DEFAULT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `is_public` BOOLEAN NOT NULL DEFAULT TRUE,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_slug` (`slug`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: subscriptions
-- ============================================
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` BIGINT UNSIGNED NOT NULL,
  `plan_id` BIGINT UNSIGNED NOT NULL,
  `status` ENUM('trialing', 'active', 'past_due', 'unpaid', 'canceled', 'incomplete') NOT NULL DEFAULT 'trialing',
  `started_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `trial_ends_at` TIMESTAMP NULL DEFAULT NULL,
  `next_billing_date` TIMESTAMP NULL DEFAULT NULL,
  `canceled_at` TIMESTAMP NULL DEFAULT NULL,
  `ends_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_site_id` (`site_id`),
  KEY `idx_status` (`status`),
  CONSTRAINT `fk_subscriptions_site` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_subscriptions_plan` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: transactions
-- ============================================
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` BIGINT UNSIGNED NOT NULL,
  `subscription_id` BIGINT UNSIGNED DEFAULT NULL,
  `transaction_type` ENUM('payment', 'refund', 'adjustment') NOT NULL DEFAULT 'payment',
  `amount` DECIMAL(10, 2) NOT NULL,
  `status` ENUM('pending', 'succeeded', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  `payment_method` VARCHAR(50) DEFAULT NULL,
  `payment_gateway` VARCHAR(50) DEFAULT NULL,
  `gateway_transaction_id` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `metadata` JSON DEFAULT NULL,
  `paid_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_site_id` (`site_id`),
  KEY `idx_status` (`status`),
  KEY `idx_subscription_id` (`subscription_id`),
  CONSTRAINT `fk_transactions_site` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_transactions_subscription` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: audit_logs
-- ============================================
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED DEFAULT NULL,
  `site_id` BIGINT UNSIGNED DEFAULT NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity_type` VARCHAR(50) NOT NULL,
  `entity_id` BIGINT UNSIGNED DEFAULT NULL,
  `old_values` JSON DEFAULT NULL,
  `new_values` JSON DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `user_agent` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_site_id` (`site_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERIR DADOS INICIAIS
-- ============================================

-- Inserir primeiro SUPERADMIN
-- ⚠️ IMPORTANTE: ALTERE O WHATSAPP ABAIXO PARA O SEU NÚMERO!
-- Formato: 5548999999999 (código país + DDD + número)
INSERT INTO `users` (`whatsapp`, `name`, `role`) VALUES 
('5548999999999', 'Admin Master', 'superadmin');

-- Inserir Templates padrão
INSERT INTO `templates` (`name`, `slug`, `category`, `description`, `is_active`, `sort_order`) VALUES 
('Serviços Gerais', 'servicos-gerais', 'geral', 'Template versátil para qualquer tipo de serviço', TRUE, 1),
('Salão & Estética', 'salao-estetica', 'salao', 'Design elegante para salões e clínicas de beleza', TRUE, 2),
('Pet Shop', 'petshop', 'petshop', 'Template moderno para pet shops e clínicas veterinárias', TRUE, 3),
('Restaurante', 'restaurante', 'food', 'Template para restaurantes e food service', TRUE, 4),
('Profissional Liberal', 'profissional-liberal', 'profissional', 'Para advogados, contadores, consultores', TRUE, 5);

-- Inserir Planos
INSERT INTO `plans` (`name`, `slug`, `description`, `price`, `billing_cycle`, `trial_days`, `features`, `limits`, `is_active`, `sort_order`) VALUES 
(
  'Básico', 
  'basico', 
  'Ideal para começar', 
  29.90, 
  'monthly', 
  7,
  JSON_ARRAY('Site profissional', 'SSL gratuito', 'Suporte WhatsApp', 'Até 10 seções'),
  JSON_OBJECT('max_sites', 1, 'max_sections', 10, 'max_storage_mb', 50, 'max_images', 20),
  TRUE,
  1
),
(
  'Pro', 
  'pro', 
  'Para negócios em crescimento', 
  49.90, 
  'monthly', 
  7,
  JSON_ARRAY('Tudo do Básico', 'Seções ilimitadas', '200MB storage', 'Domínio próprio'),
  JSON_OBJECT('max_sites', 1, 'max_sections', -1, 'max_storage_mb', 200, 'max_images', 100),
  TRUE,
  2
),
(
  'Premium', 
  'premium', 
  'Recursos avançados', 
  79.90, 
  'monthly', 
  7,
  JSON_ARRAY('Tudo do Pro', '500MB storage', 'Prioridade suporte', 'Analytics avançado'),
  JSON_OBJECT('max_sites', 3, 'max_sections', -1, 'max_storage_mb', 500, 'max_images', -1),
  TRUE,
  3
);

-- ============================================
-- CONCLUÍDO!
-- ============================================
-- Database criado com sucesso.
-- 
-- Próximos passos:
-- 1. Altere o WhatsApp do superadmin na linha 233
-- 2. Verifique se todas as tabelas foram criadas
-- 3. Faça login no sistema com o WhatsApp configurado
-- ============================================
