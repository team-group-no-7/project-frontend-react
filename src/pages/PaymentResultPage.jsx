import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, BookOpen, Download, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * PaymentResultPage Component (Module 3 - Item 10: Payment Redirect Screens)
 * Displays payment outcome feedback (Success vs Failure) after Razorpay transaction completes.
 * Managed cleanly using React Router DOM useNavigate.
 */
export default function PaymentResultPage({ transaction }) {
  const navigate = useNavigate();

  const txn = transaction || {
    paymentStatus: "SUCCESS",
    transactionId: "pay_N8s92f1Kds",
    item: {
      title: "Complete Java Spring Boot Guide",
      category_name: "Java"
    },
    amountPaid: 707.00,
    paidAt: new Date().toISOString(),
    userName: "Arjun Mehta",
    userEmail: "arjun.mehta@learnhub.com"
  };

  const isSuccess = txn.paymentStatus === "SUCCESS";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF] dark:bg-[#0b0a14] px-4 py-12">
      <Card className="w-full max-w-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Top Header Banner */}
        <div className={`p-8 text-center text-white space-y-3 ${
          isSuccess 
            ? "bg-gradient-to-b from-emerald-600 to-emerald-700" 
            : "bg-gradient-to-b from-red-600 to-red-700"
        }`}>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-md animate-bounce">
            {isSuccess ? (
              <CheckCircle2 className="h-10 w-10 text-white" />
            ) : (
              <XCircle className="h-10 w-10 text-white" />
            )}
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </h2>
          <p className="text-white/80 text-xs max-w-xs mx-auto">
            {isSuccess
              ? "Your transaction has been verified. Access to content is unlocked."
              : "We could not process your payment. No funds were debited."}
          </p>
        </div>

        {/* Card Details Body */}
        <CardContent className="p-6 space-y-5">
          
          {/* Transaction Metadata Box */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 space-y-3 text-xs">
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-500 font-medium">Transaction ID</span>
              <code className="font-mono bg-white dark:bg-gray-800 px-2 py-0.5 rounded font-bold text-gray-900 dark:text-white">
                {txn.transactionId}
              </code>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Resource Title</span>
              <span className="font-semibold text-gray-900 dark:text-white text-right max-w-[200px] truncate">
                {txn.item?.title || "Spring Boot Guide"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Amount Paid</span>
              <span className="font-bold text-gray-900 dark:text-white text-sm">
                ₹{txn.amountPaid}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Date & Time</span>
              <span className="text-gray-700 dark:text-gray-300">
                {new Date(txn.paidAt || Date.now()).toLocaleString()}
              </span>
            </div>

            {!isSuccess && (
              <div className="flex justify-between items-center text-red-600 dark:text-red-400 pt-2 border-t border-gray-200 dark:border-gray-800">
                <span className="font-medium">Failure Reason</span>
                <span>{txn.reason || "Bank authorization declined"}</span>
              </div>
            )}

          </div>

          {/* Additional Info */}
          {isSuccess && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>A confirmation invoice has been sent to {txn.userEmail || "your email"}.</span>
            </div>
          )}

        </CardContent>

        {/* Card Footer Actions */}
        <CardFooter className="p-6 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800 flex justify-center">
          {isSuccess ? (
            <Button
              onClick={() => navigate('/learner/dashboard')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md gap-2"
            >
              <BookOpen className="h-4 w-4" /> Go to My Library & Read Now
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/checkout')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-md gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Try Checkout Again
            </Button>
          )}
        </CardFooter>

      </Card>
    </div>
  );
}
