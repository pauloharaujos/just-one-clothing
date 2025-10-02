export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-6">
        The product you're looking for doesn't exist or may have been removed.
      </p>
      <a 
        href="/" 
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
}

