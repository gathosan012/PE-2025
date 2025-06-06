import "../styling/components/ServiceTable.scss";

export default function ServiceTable({
  services,
  onEdit,
  onToggleStatus, // 👈 đổi tên cho đúng logic
  onSoftDelete,
}) {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-center">Name</th>
          <th className="p-2 text-center">Type</th>
          <th className="p-2 text-right">Price (VND)</th>
          <th className="p-2 text-center">Active</th>
          <th className="p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.map((s) => (
          <tr key={s._id} className="border-t">
            <td className="p-2">{s.name}</td>
            <td className="p-2">{s.type}</td>
            <td className="p-2 text-right">{s.price.toLocaleString()}</td>
            <td className="p-2 text-center">
              <input
                type="checkbox"
                checked={s.status === "active"} // 👈 kiểm tra theo status
                onChange={() => onToggleStatus(s._id, s.status)} // 👈 gọi đúng handler
              />
            </td>
            <td className="p-2 text-center space-x-2">
              <button
                onClick={() => onEdit(s._id)}
                className="text-blue-600 hover:text-blue-800"
              >
                ✏️
              </button>
              <button
                onClick={() => onSoftDelete(s._id)}
                className="text-red-600 hover:text-red-800"
              >
                ❌
              </button>
            </td>
          </tr>
        ))}
        {services.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center p-4 text-gray-500">
              No services found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
