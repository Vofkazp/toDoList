export interface ListDto {
  TotalElement: number;
  content: ListInterface[];
}

export interface ListInterface {
  id?: number;
  name: string;
  description: string;
  visibility: string;
}
