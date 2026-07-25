import DashboardLayout from "../components/layout/DashboardLayout";
import PurchaseTable from "../components/cards/PurchaseTable";

import { purchaseHistory } from "../data/dashboardData";

function PurchaseHistory() {
  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Purchase History
        </h1>

        <p className="mt-2 text-gray-500">
          View all your purchased resources and invoices.
        </p>

      </div>

      <PurchaseTable purchases={purchaseHistory} />

    </DashboardLayout>
  );
}

export default PurchaseHistory;