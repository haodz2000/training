export interface IDocument {
  id: number;
  name: string;
  hashName: string;
  description?: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}
