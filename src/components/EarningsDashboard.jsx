import React, { useState } from "react";
import { TrendingUp, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Download, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * EarningsDashboard Component (Module 3 - Item 12: Creator Earnings Dashboard)
 * Metrics graph & financial wallet dashboard component for creators.
 */
export default function EarningsDashboard() {
  const [walletBalance, setWalletBalance] = useState(12560.00);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [payoutNotification, setPayoutNotification] = useState("");

  // Simulated sales ledger
  const transactions = [
    { id: "tx_901", title: "Complete Java Spring Boot Guide", buyer: "Rohan V.", amount: 599.00, date: "2026-07-18", status: "CLEARED" },
    { id: "tx_902", title: "React 19 Hooks Deep Dive", buyer: "Priya S.", amount: 299.00, date: "2026-07-17", status: "CLEARED" },
    { id: "tx_903", title: "Mastering SQL Indexing", buyer: "Amit K.", amount: 349.00, date: "2026-07-15", status: "CLEARED" },
    { id: "tx_904", title: "Complete Java Spring Boot Guide", buyer: "Neha G.", amount: 599.00, date: "2026-07-14", status: "CLEARED" }
  ];

  // Monthly breakdown chart values
  const monthlyData = [
    { month: "Mar", sales: 4200 },
    { month: "Apr", sales: 7800 },
    { month: "May", sales: 9400 },
    { month: "Jun", sales: 11200 },
    { month: "Jul", sales: 12560 }
  ];

  const handleWithdrawFunds = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setPayoutNotification(`Payout of ₹${walletBalance.toLocaleString()} initiated to linked Bank Account (HDFC Bank ****4821).`);
      setWalletBalance(0);
      setTimeout(() => setPayoutNotification(""), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Payout Notification */}
      {payoutNotification && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
          <span>{payoutNotification}</span>
        </div>
      )}

      {/* Top Wallet Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Wallet Balance Card */}
        <Card className="border border-indigo-200 dark:border-indigo-900 bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-5 rounded-2xl shadow-md space-y-3">
          <div className="flex justify-between items-center text-xs text-indigo-200 font-medium">
            <span>Available Payout Wallet</span>
            <Wallet className="h-4 w-4 text-amber-300" />
          </div>
          <div className="text-3xl font-black tracking-tight">
            ₹{walletBalance.toLocaleString()}
          </div>
          <Button
            onClick={handleWithdrawFunds}
            disabled={walletBalance === 0 || isWithdrawing}
            className="w-full bg-amber-400 hover:bg-amber-500 text-indigo-950 font-bold text-xs py-2 rounded-xl"
          >
            {isWithdrawing ? "Processing Bank Payout..." : "Withdraw to Bank"}
          </Button>
        </Card>

        {/* Total Sales Volume */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
            <span>Total Sales Volume</span>
            <span className="text-emerald-600 flex items-center font-bold text-[11px]">
              <ArrowUpRight className="h-3.5 w-3.5" /> +24%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹45,160
          </div>
          <p className="text-[11px] text-gray-400">Lifetime revenue generated across all items</p>
        </Card>

        {/* Item Purchases Count */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
            <span>Total Items Sold</span>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            184 Copies
          </div>
          <p className="text-[11px] text-gray-400">Verified student transactions</p>
        </Card>

      </div>

      {/* Monthly Sales Revenue Visual Bar Chart Representation */}
      <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-6 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Monthly Sales Growth</h3>
            <p className="text-xs text-gray-500">Revenue trajectory over recent months (INR)</p>
          </div>
          <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-600">
            2026 Analytics
          </Badge>
        </div>

        {/* CSS Bar Graph */}
        <div className="h-40 flex items-end justify-between gap-4 pt-6 pb-2 px-4 border-b border-gray-100 dark:border-gray-800">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                ₹{(d.sales / 1000).toFixed(1)}k
              </span>
              <div
                style={{ height: `${(d.sales / 13000) * 100}%` }}
                className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-500 group-hover:from-indigo-500 group-hover:to-purple-400"
              />
              <span className="text-xs font-medium text-gray-500">{d.month}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Payout Transactions Ledger */}
      <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-base font-bold">Recent Transaction Ledger</CardTitle>
          <CardDescription className="text-xs">Individual purchases credited to your wallet</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 font-semibold uppercase">
              <tr>
                <th className="p-4">TXN ID</th>
                <th className="p-4">Content Resource</th>
                <th className="p-4">Student</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-black/20">
                  <td className="p-4 font-mono font-bold text-gray-900 dark:text-white">{tx.id}</td>
                  <td className="p-4 font-medium text-gray-700 dark:text-gray-300">{tx.title}</td>
                  <td className="p-4 text-gray-500">{tx.buyer}</td>
                  <td className="p-4 font-bold text-emerald-600">+₹{tx.amount}</td>
                  <td className="p-4">
                    <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
}
