import React, { useState } from "react";

const DummyProductPage = () => {
  // Dummy product data (static)
  const product = {
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: { name: "Electronics" },
    price: 1200,
    inStock: true,
    description:
      "The latest Apple flagship smartphone featuring an A17 Pro chip, titanium build, and an advanced camera system.",
    imageURL:
      "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pro_Max_Blue_Titanium_PDP_Image_Position-1__en-IN.jpg?v=1694758834&width=1445",
    gallery: [
      "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pro_Max_Blue_Titanium_PDP_Image_Position-1__en-IN.jpg?v=1694758834&width=1445",
    ],
    attributes: {
      "Screen Size": "6.1 inch",
      Storage: "256GB",
      Color: "Blue Titanium",
      Processor: "A17 Pro Chip",
    },
  };

  const [mainImage, setMainImage] = useState(product.imageURL);

  return (
    <div className="max-w-6xl mx-auto p-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <img
          src={mainImage}
          alt={product.name}
          className="w-full rounded-xl shadow-lg object-cover"
        />

        <div className="flex gap-3 mt-4 overflow-x-auto">
          {product.gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer transition ${
                img === mainImage
                  ? "border-blue-500"
                  : "border-transparent hover:border-gray-400"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-500">{product.brand}</p>
          <span className="text-sm text-gray-400">{product.category.name}</span>
        </div>

        <p className="text-2xl font-bold text-green-600">
          ${product.price.toLocaleString()}
        </p>

        <p
          className={`font-medium ${
            product.inStock ? "text-green-500" : "text-red-500"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>

        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        {product.attributes && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Specifications:</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full border-collapse">
                <tbody>
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="px-4 py-2 font-medium text-gray-600">
                        {key}
                      </td>
                      <td className="px-4 py-2 text-gray-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DummyProductPage;
