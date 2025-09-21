#!/usr/bin/env node

const { Client } = require('pg');

async function runMigrations() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Criar tabela de migrações se não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criar tabelas básicas do Backstage
    await client.query(`
      CREATE TABLE IF NOT EXISTS catalog_entities (
        id VARCHAR(255) PRIMARY KEY,
        entity JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS catalog_locations (
        id VARCHAR(255) PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        target VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS catalog_relations (
        originating_entity_id VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        target_entity_ref VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (originating_entity_id, type, target_entity_ref)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS refresh_state (
        entity_id VARCHAR(255) PRIMARY KEY,
        entity_ref VARCHAR(255) NOT NULL,
        unprocessed_entity JSONB,
        processed_entity JSONB,
        next_update_at TIMESTAMP,
        last_discovery_at TIMESTAMP,
        errors JSONB,
        location_key VARCHAR(255)
      );
    `);

    console.log('Database migrations completed successfully!');
    
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
