import { Download } from "lucide-react";

function PurchaseTable({ purchases }) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Resource
            </th>

            <th className="px-6 py-4 text-left">
              Creator
            </th>

            <th className="px-6 py-4 text-left">
              Type
            </th>

            <th className="px-6 py-4 text-left">
              Date
            </th>

            <th className="px-6 py-4 text-left">
              Amount
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Invoice
            </th>

          </tr>

        </thead>

        <tbody>

          {purchases.map((item) => (

            <tr
              key={item.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4">
                {item.resource}
              </td>

              <td className="px-6 py-4">
                {item.creator}
              </td>

              <td className="px-6 py-4">
                {item.type}
              </td>

              <td className="px-6 py-4">
                {item.date}
              </td>

              <td className="px-6 py-4 font-semibold">
                {item.amount}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>

              </td>

              <td className="px-6 py-4 text-center">

                <button className="rounded-lg border p-2 hover:bg-slate-100">

                  <Download size={18} />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PurchaseTable;