import "../styling/components/ServiceTable.scss";
export default function ServiceTable({
  services,
  selectedIds,
  onSelect,
  onDelete,
  onEdit,
}) {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">
            <input type="checkbox" disabled />
          </th>
          <th className="p-2 text-center">Tên</th>
          <th className="p-2 text-center">Loại dịch vụ</th>
          <th className="p-2 text-right">Đơn giá (VND)</th>
          <th className="p-2 text-center">Đang dùng</th>
          <th className="p-2 text-center">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {services.map((s) => (
          <tr key={s.id} className="border-t">
            <td className="p-2 text-center">
              <input
                type="checkbox"
                checked={selectedIds.includes(s.id)}
                onChange={() => onSelect(s.id)}
              />
            </td>
            <td className="p-2">{s.name}</td>
            <td className="p-2">{s.type}</td>
            <td className="p-2 text-right">{s.price.toLocaleString()}</td>
            <td className="p-2 text-center">
              <input type="checkbox" checked={s.active} readOnly />
            </td>
            <td className="p-2 text-center space-x-2">
              <button
                onClick={() => onEdit(s.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(s.id)}
                className="text-red-600 hover:text-red-800"
              >
                ❌
              </button>
            </td>
          </tr>
        ))}
        {services.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center p-4 text-gray-500">
              Không có dịch vụ nào.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
