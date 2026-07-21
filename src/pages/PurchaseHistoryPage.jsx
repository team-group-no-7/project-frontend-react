import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle2, FileText, ArrowLeft, ExternalLink, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PURCHASED_CONTENTS } from '@/data/mockData';

/**
 * PurchaseHistoryPage Component (Module 5: Payment & Access Management)
 * Displays user's order history, payment status ledger, Razorpay transaction IDs, and downloadable receipts.
 */
export default function PurchaseHistoryPage({ onBack, onOpenItem }) {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Back Button & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 mb-1"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Library
              </Button>
            )}
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-indigo-600" /> Purchase History & Payment Receipts
            </h1>
            <p className="text-xs text-gray-500">
              View your unlocked study materials, payment ledger, and downloadable transaction invoices.
            </p>
          </div>

          <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold px-3 py-1">
            ✓ Razorpay Verified Account
          </Badge>
        </div>

        {/* Purchase History Table / Card List */}
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
          
          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-gray-700 dark:text-gray-300">
              Orders & Transaction Receipts ({PURCHASED_CONTENTS.length})
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Total Spent: ₹{PURCHASED_CONTENTS.reduce((acc, curr) => acc + curr.amount_paid, 0).toFixed(2)}
            </span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {PURCHASED_CONTENTS.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                      {item.content.title}
                    </h3>
                    <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-600 border-emerald-300">
                      PAID
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {item.content.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400 pt-1">
                    <span>Txn ID: <strong className="font-mono text-gray-700 dark:text-gray-300">{item.transaction_id}</strong></span>
                    <span>Date: {new Date(item.purchased_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-800">
                  <span className="text-base font-extrabold text-gray-900 dark:text-white font-mono">
                    ₹{item.amount_paid.toFixed(2)}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedReceipt(item)}
                      className="gap-1 text-xs border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-400 font-semibold"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Receipt
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Modal: Itemized Receipt Viewer */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-6 relative">
              
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black flex items-center justify-center text-sm">
                    LH
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                      LearnHub Payment Receipt
                    </h3>
                    <p className="text-[11px] text-gray-500">Official Purchase Invoice</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="text-xs text-gray-400 hover:text-gray-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Receipt Body */}
              <div className="space-y-3 text-xs bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{selectedReceipt.transaction_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date & Time:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{new Date(selectedReceipt.purchased_at).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Gateway:</span>
                  <span className="font-medium text-indigo-600">Razorpay Unified Payments</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 my-2 pt-2 flex justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">Item: {selectedReceipt.content.title}</span>
                  <span className="font-bold font-mono text-gray-900 dark:text-white">₹{selectedReceipt.amount_paid.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <Button
                  onClick={() => alert("Downloading receipt PDF...")}
                  variant="outline"
                  className="w-full text-xs gap-1.5 font-bold"
                >
                  <Download className="h-4 w-4" /> Download Receipt PDF
                </Button>
                <Button
                  onClick={() => setSelectedReceipt(null)}
                  className="w-full bg-indigo-600 text-white text-xs font-bold"
                >
                  Close Receipt
                </Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
