import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowLeft, ArrowRight, X, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

/**
 * CheckoutPage Component (Module 3 - Item 9: Checkout & Invoice Summary Page)
 * Simple invoice breakdown with a simulated Razorpay SDK gateway launcher.
 * Managed cleanly using React Router DOM useNavigate.
 */
export default function CheckoutPage({ item, profile, onPaymentSuccess, onPaymentFailure }) {
  const navigate = useNavigate();

  const contentItem = item || {
    id: 11,
    title: "Complete Java Spring Boot Guide",
    category_name: "Java",
    creator_name: "Rohan Verma",
    price: 599.00
  };

  const [userName, setUserName] = useState(() => profile?.name || "Arjun Mehta");
  const [userEmail, setUserEmail] = useState(() => profile?.email || "arjun.mehta@learnhub.com");
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = contentItem.price;
  const gstTax = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gstTax;

  const handleLaunchPayment = (e) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      alert("Please fill in billing details.");
      return;
    }
    setShowRazorpayModal(true);
  };

  const simulatePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpayModal(false);
      onPaymentSuccess({
        transactionId: "pay_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        item: contentItem,
        amountPaid: totalAmount,
        paidAt: new Date().toISOString(),
        paymentStatus: "SUCCESS",
        userName,
        userEmail
      });
    }, 1000);
  };

  const simulatePaymentFailure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpayModal(false);
      onPaymentFailure({
        transactionId: "pay_FAIL_" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        item: contentItem,
        amountPaid: totalAmount,
        failedAt: new Date().toISOString(),
        paymentStatus: "FAILED",
        reason: "Bank Server Timeout"
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/marketplace')} className="gap-2 text-xs text-gray-600 dark:text-gray-400">
            <ArrowLeft className="h-4 w-4" /> Cancel Checkout
          </Button>
          <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-200">
            Secure SSL Checkout
          </Badge>
        </div>

        {/* Invoice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Customer Details Form */}
          <div className="md:col-span-7 space-y-4">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm">
              <CardHeader className="p-5">
                <CardTitle className="text-base font-bold">Billing Details</CardTitle>
                <CardDescription className="text-xs">Provide details for license registration.</CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-4 pt-0">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700 dark:text-gray-300">Full Name *</Label>
                  <Input value={userName} onChange={(e) => setUserName(e.target.value)} className="text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700 dark:text-gray-300">Email Address *</Label>
                  <Input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="text-xs" />
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 text-xs text-indigo-700 dark:text-indigo-300 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold block">Razorpay Encrypted Payment Integration</span>
                <span className="text-gray-500 text-[10px] block mt-0.5">Payment credentials are processed directly via secure Razorpay scripts.</span>
              </div>
            </div>
          </div>

          {/* Pricing Details Summary */}
          <div className="md:col-span-5">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-md">
              <CardHeader className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/40">
                <CardTitle className="text-sm font-bold">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="p-3 bg-gray-50 dark:bg-black/20 border border-gray-100 rounded-xl space-y-1">
                  <Badge className="bg-indigo-50 text-indigo-600 text-[10px]">{contentItem.category_name}</Badge>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white mt-1">{contentItem.title}</h4>
                  <p className="text-[10px] text-gray-400">Author: {contentItem.creator_name}</p>
                </div>

                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 pt-1">
                  <div className="flex justify-between">
                    <span>Base Price</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST Tax (18%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{gstTax}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-baseline font-bold text-gray-900 dark:text-white">
                    <span>Total Amount</span>
                    <span className="text-xl font-black text-indigo-600">₹{totalAmount}</span>
                  </div>
                </div>

                <Button onClick={handleLaunchPayment} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md gap-1.5 mt-2">
                  <CreditCard className="h-4 w-4" /> Pay via Razorpay
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      {/* Razorpay Simulated SDK Overlay Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-[#0a091a] text-white border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            
            {/* Header */}
            <div className="bg-[#02042b] p-4 flex justify-between items-center border-b border-gray-900">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 text-white font-black text-xs px-2 py-0.5 rounded">RZP</div>
                <span className="text-xs font-bold">Razorpay Secure Sandbox</span>
              </div>
              <button onClick={() => setShowRazorpayModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 text-center">
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Payable Balance</span>
              <div className="text-2xl font-black">₹{totalAmount}</div>
              <p className="text-xs text-indigo-300 font-semibold">{contentItem.title}</p>
              
              <div className="space-y-2 pt-4">
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Simulate payment callbacks</span>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={simulatePaymentSuccess} disabled={isProcessing} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
                    {isProcessing ? "Processing..." : "Success"}
                  </Button>
                  <Button onClick={simulatePaymentFailure} disabled={isProcessing} variant="outline" className="border-red-500 text-red-500 text-xs font-bold bg-transparent">
                    {isProcessing ? "Processing..." : "Decline"}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
