
import Link from "next/link";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-green-600">🎉 Order Placed Successfully!</h1>
      <p className="text-lg mt-2 text-center">Thank you for your purchase. Your order will be processed soon.</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Go to Homepage
      </Link>
    </div>
  );
};

export default ThankYou;
