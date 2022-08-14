import { StringOrNull } from "../utils/Types";

export interface ITable {
  Database(): string;
  Version(): number;
  TableName(): string;
  IndexName(): string;
  Build(database: IDBDatabase): void;
}

export interface ITableBuilder {
  WithDatabase(databseName: string): ITableBuilder;
  WithVersion(versionNumber: number): ITableBuilder;
  WithTableName(tableName: string): ITableBuilder;
  WithPrimaryField(primaryFeild: string): ITableBuilder;
  WithIndexName(indexName: string): ITableBuilder;
}

export class TableBuilder implements ITableBuilder, ITable {
  private database?: StringOrNull;
  private tableName?: StringOrNull;
  private primaryField?: StringOrNull;
  private indexName?: StringOrNull;
  private version: number = 1;

  public WithDatabase(databseName: string): ITableBuilder {
    this.database = databseName;
    return this;
  }
  public WithVersion(versionNumber: number): ITableBuilder {
    this.version = versionNumber;
    return this;
  }
  public WithTableName(tableName: string): ITableBuilder {
    this.tableName = tableName;
    return this;
  }
  public WithPrimaryField(primaryFeild: string): ITableBuilder {
    this.primaryField = primaryFeild;
    return this;
  }
  public WithIndexName(indexName: string): ITableBuilder {
    this.indexName = indexName;
    return this;
  }

  public Database(): string {
    if (!this.database) {
      throw new Error("You must give a database name");
    }
    return this.database;
  }
  public Version(): number {
    if (!this.version) {
      throw new Error("You must give a version name");
    }
    return this.version;
  }
  public TableName(): string {
    if (!this.tableName) {
      throw new Error("You must give a table name");
    }
    return this.tableName;
  }
  public IndexName(): string {
    if (!this.indexName) {
      throw new Error("You must give a index name");
    }
    return this.indexName;
  }
  Build(database: IDBDatabase): void {
    if (!this.tableName) {
      throw new Error("You must give a table name");
    }
    if (!this.primaryField) {
      throw new Error("You must specific a primaryField");
    }
    const parameters: IDBObjectStoreParameters = { keyPath: this.primaryField };
    const objectStore = database.createObjectStore(this.tableName, parameters);
    objectStore!.createIndex(this.tableName, this.primaryField);
  }
}
