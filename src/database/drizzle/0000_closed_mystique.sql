CREATE TABLE `notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`status` text DEFAULT 'PENDENTE'
);
