import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: string;
  images: any[];
}

export const ProductDetail: React.FC = () => {
  const product = useLoaderData() as Product;
  console.log("product", product);
  useEffect(() => {
    if (product) {
      document.title = product.brand;
      const metaTitle = document.querySelector('meta[name="title"]');
      if (metaTitle) {
        metaTitle.setAttribute("content", `Vite Server | ${product.title}`);
      }
    }
  }, [product]);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{product.brand}</h1>
      <img src={product.images[0]} alt={product.title} style={imageStyle} />
      <p style={descriptionStyle}>{product.description}</p>
      <p style={priceStyle}>Price: ${product.price}</p>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: "20px",
  maxWidth: "600px",
  margin: "auto",
  textAlign: "center",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "24px",
  marginBottom: "10px",
};

const imageStyle: React.CSSProperties = {
  maxWidth: "100%",
  height: "auto",
  marginBottom: "10px",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "16px",
  marginBottom: "10px",
};

const priceStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
};
