export default function Page() {
  return (
    <main className="flex flex-col p-6">
      <div className="bg-blue-500 h-20 flex items-center mb-6 rounded-lg">
        <h1 className="text-right text-xl w-full mr-4">Welcome!</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
          <span>Chart 1 Placeholder</span>
        </div>
        <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
          <span>Chart 2 Placeholder</span>
        </div>
        <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
          <span>Chart 3 Placeholder</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Room Number</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Last Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Type</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">View Chat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 border-b border-gray-200">1</td>
              <td className="px-6 py-4 border-b border-gray-200">101</td>
              <td className="px-6 py-4 border-b border-gray-200">Smith</td>
              <td className="px-6 py-4 border-b border-gray-200">Standard</td>
              <td className="px-6 py-4 border-b border-gray-200">Occupied</td>
              <td className="px-6 py-4 border-b border-gray-200">2024-05-30</td>
              <td className="px-6 py-4 border-b border-gray-200 text-blue-500 cursor-pointer">View</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
