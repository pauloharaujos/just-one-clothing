export interface Product {
  id: number;
  name: string;
  sku: string;
  url: string;
  description: string;
  price: number;
  visible: boolean;
  productImageLinks: Array<{
    image: {
      id: number;
      filename: string;
      altText: string | null;
    };
  }>;
}
