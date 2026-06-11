export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-6" />
        <div className="h-6 bg-gray-200 rounded mb-4" />
        <div className="h-40 bg-gray-200 rounded" />
      </div>
    </div>
  );
}