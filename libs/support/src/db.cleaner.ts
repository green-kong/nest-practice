import { DataSource } from 'typeorm';

const foreignKeyCheckQuery = `SET foreign_key_checks = `;

const validateEnvironment = () => {
  if (process.env.NODE_ENV !== 'test') {
    throw Error('cleanupDB() MUST run in test environment');
  }
};

export const cleanupDB = async (dataSource: DataSource): Promise<void> => {
  validateEnvironment();
  const entityManager = dataSource.createEntityManager();
  const tableNames = entityManager.connection.entityMetadatas.map(
    (entity) => entity.tableName,
  );

  await entityManager.query(foreignKeyCheckQuery + false);
  for (let tableName of tableNames) {
    await entityManager.query(`truncate ${tableName};`);
  }
  await entityManager.query(foreignKeyCheckQuery + true);
};
