// import ProductDetail from '@/app/components/ProductDetail';
// import { client } from '@/sanity/lib/client';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   category: string;
//   stockLevel: number;
//   imageUrl: string;
// }

// export default async function Page({ params }: { params: { id: string } }) {
//   const query = `*[ _type == "product" && _id == $id]{
//     name,
//     "id": _id,
//     price,
//     description,
//     category,
//     stockLevel,
//     "imageUrl": image.asset._ref
//   }[0]`;

//   const product: Product | null = await client.fetch(query, { id: params.id });

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <h1 className="text-2xl font-bold text-gray-700">Product Not Found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
//         <ProductDetail product={product} key={product.id} />
//       </div>
//     </div>
//   );
// }



import ProductDetail from "@/app/components/ProductDetail";
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types"; // ✅ Import correct type

export default async function Page({ params }: { params: { id: string } }) {
  const query = `*[_type == "product" && _id == $id]{
    name,
    "id": _id, // ✅ Sanity CMS _id is string
    price,
    description,
    category,
    stockLevel,
    "imageUrl": image.asset._ref
  }[0]`;

  const product: Product | null = await client.fetch(query, { id: params.id });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <ProductDetail product={product} key={product.id} />
      </div>
    </div>
  );
}

