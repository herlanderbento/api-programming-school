export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  findById(id: string): Promise<T>;
  findByEmail(email: string): Promise<T>;
  findAll(): Promise<T[]>;
  delete(email: string): Promise<void>;
}
