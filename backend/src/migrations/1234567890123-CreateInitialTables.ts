import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create vertical table
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS vertical (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
        );        
    `);

    // Create local table
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS local (
            id INT AUTO_INCREMENT PRIMARY KEY,
            local_code VARCHAR(10) UNIQUE NOT NULL
        );
    `);

    // Create catalog table
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS catalog (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        vertical_id INT NOT NULL,
        is_primary BOOLEAN NOT NULL DEFAULT FALSE,
        indexed_at TIMESTAMP NOT NULL,
        FOREIGN KEY (vertical_id) REFERENCES vertical(id)
        );
    `);

    // Create catalog_local junction table
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS catalog_local (
            catalog_id INT,
            local_id INT,
            PRIMARY KEY (catalog_id , local_id ),
            FOREIGN KEY (catalog_id) REFERENCES catalog(id),
            FOREIGN KEY (local_id) REFERENCES local(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE catalog_local`);
    await queryRunner.query(`DROP TABLE catalog`);
    await queryRunner.query(`DROP TABLE local`);
    await queryRunner.query(`DROP TABLE vertical`);
  }
}
