/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse<T> {
  products: T;
  meta: any;
  error: any;
}

interface Food {
  id: number;
  attributes: {
    name: string;
    category: string;
    recipe: string;
    createAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
