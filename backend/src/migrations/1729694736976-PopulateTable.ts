import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateTable1729694736976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert vertical data
    await queryRunner.query(`INSERT INTO vertical (name) VALUES ('general'), ('fashion'), ('home');`);

    // Insert local data
    await queryRunner.query(`INSERT INTO local (local_code) VALUES ('en_US'), ('en_CA'), ('es_ES'), ('fr_FR'), ('de_DE'), ('it_IT'), ('ja_JP'), ('pt_BR'), ('zh_CN'), ('hi_IN'), ('ar_EG'), ('bn_BD'), ('ru_RU'), ('tr_TR'), ('vi_VN'), ('th_TH'), ('id_ID'), ('ms_MY'), ('ko_KR'), ('zh_TW'), ('zh_HK'), ('zh_SG');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove local data
    await queryRunner.query(`DELETE FROM local WHERE local_code IN ('en_US', 'en_CA', 'es_ES', 'fr_FR', 'de_DE', 'it_IT', 'ja_JP', 'pt_BR', 'zh_CN', 'hi_IN', 'ar_EG', 'bn_BD', 'ru_RU', 'tr_TR', 'vi_VN', 'th_TH', 'id_ID', 'ms_MY', 'ko_KR', 'zh_TW', 'zh_HK', 'zh_SG');`);

    // Remove vertical data
    await queryRunner.query(`DELETE FROM vertical WHERE name IN ('fashion', 'home', 'general');`);
  }
}
