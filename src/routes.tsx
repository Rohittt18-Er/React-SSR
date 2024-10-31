import axios from "axios";
import { IndexRouteObject, NonIndexRouteObject, json } from "react-router-dom";
import { Home } from "./Home";
import { ProductDetail } from "./ProductDetails";

type MetaAttributes = "name" | "http-equiv" | "charset" | "itemprop";

type Meta = { title: string } | Partial<Record<MetaAttributes, string>>;

export type MetaRouteObject =
  | (IndexRouteObject & { meta?: React.ReactNode | Meta[] })
  | (NonIndexRouteObject & {
      meta?: React.ReactNode | Meta[];
      children?: MetaRouteObject[];
    });

const strapiService = axios.create({
  baseURL: "https://dummyjson.com",
});

export const routes: MetaRouteObject[] = [
  {
    path: "/",
    element: <Home />,
    loader: async () => {
      const foodList = (
        await strapiService.get<StrapiResponse<Food[]>>("/products")
      ).data;

      return json(foodList.products ?? []);
    },
    meta: (
      <>
        <title>Home</title>
        <meta name="title" content="Vite Server | Home" />
      </>
    ),
    children: [
      {
        path: "home",
        element: (
          <p>
            Nested Screen, rendered on <kbd>/home</kbd>
          </p>
        ),
        meta: (
          <>
            <title>Nested Home</title>
            <meta name="title" content="Vite Server" />
          </>
        ),
      },
    ],
  },
  {
    path: "products/:id", // Dynamic route
    element: <ProductDetail />,
    loader: async ({ params }) => {
      console.log("params==", params);
      const productId = params.id;
      const product = (
        await strapiService.get<StrapiResponse<Food>>(`/products/${productId}`)
      ).data;
      return json(product);
    },
    meta: (
      <>
        <title></title>
        <meta name="title" content="Vite Server | Product Detail" />
      </>
    ),
  },
  {
    path: "*",
    element: <p>404, wrong Landing</p>,
    meta: (
      <>
        <title>No page found</title>
        <meta name="title" content="Vite Server | Home" />
      </>
    ),
  },
];
