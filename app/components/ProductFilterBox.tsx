export default function ProductFilterBox() {
  return (
    <div className="flex flex-col gap-1 w-full">
      <h1 className="p-4">Filter</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 bg-white rounded-xl p-4 mx-1">
          <h2 className="font-medium text-sm">Vendors</h2>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-xl p-4 mx-1">
          <h2 className="font-medium text-sm">Goals</h2>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-xl p-4 mx-1">
          <h2 className="font-medium text-sm">Price</h2>
        </div>
      </div>
    </div>
  );
}
