export interface SoftDeleteFields {
  deletedAt?: Date | null;
  deletedById?: string | null;
}

export interface SoftDeleteResult<TRecord> {
  restored?: boolean;
  deleted?: boolean;
  record: TRecord;
}

export interface SoftDeleteOptions {
  deletedById?: string;
  deletedAt?: Date;
}

export interface RestoreOptions {
  restoredById?: string;
}

export interface SoftDeleteDelegate<TRecord> {
  findUnique(args: { where: { id: string } }): Promise<TRecord | null>;
  update(args: {
    where: { id: string };
    data: Record<string, unknown>;
  }): Promise<TRecord>;
}
