import { useOverview } from "../hooks/OverviewHooks";
import { formatNumber, formatCurrency } from "./utils/formatters";

export default function ProductStats() {
  const { overviewData } = useOverview();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 text-left ">Category</th>
              <th className="px-6 text-left">Total Stock</th>
              <th className="px-6 text-left">Total Value</th>
              <th className="px-6 text-left">Average Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {overviewData.map((stat) => (
              <tr key={stat.category}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {stat.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatNumber(stat.totalStock)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatCurrency(stat.totalValue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatCurrency(stat.averagePrice)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-6 py-4 font-bold text-gray-900">Overall</td>
              <td className="px-6 py-4 font-bold text-gray-900">
                {formatNumber(
                  overviewData.reduce((acc, stat) => acc + stat.totalStock, 0)
                )}
              </td>
              <td className="px-6 py-4 font-bold text-gray-900">
                {formatCurrency(
                  overviewData.reduce((acc, stat) => acc + stat.totalValue, 0)
                )}
              </td>
              <td className="px-6 py-4 font-bold text-gray-900">
                {formatCurrency(
                  overviewData.reduce(
                    (acc, stat) => acc + stat.averagePrice * stat.totalStock,
                    0
                  ) /
                    overviewData.reduce((acc, stat) => acc + stat.totalStock, 0)
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {overviewData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No overview data available
        </div>
      )}
    </div>
  );
}
