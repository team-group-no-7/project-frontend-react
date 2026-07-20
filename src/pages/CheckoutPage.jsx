import React, { useState } from "react";
import { CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowLeft, ArrowRight, X, AlertTriangle, QrCode, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

/**
 * CheckoutPage Component (Module 3 - Item 9: Checkout & Invoice Summary Page)
 * Invoice summary breakdown with Razorpay payment SDK widget modal simulation.
 * 
 * Props:
 *  - item: Selected content item object to purchase
 *  - onPaymentSuccess: Callback function when payment completes successfully
 *  - onPaymentFailure: Callback function when payment fails
 *  - onCancel: Callback to return back to marketplace
 */
export default function CheckoutPage({ item, onPaymentSuccess, onPaymentFailure, onCancel }) {
  // Default mock item if none passed
  const contentItem = item || {
    id: 11,
    title: "Complete Java Spring Boot Guide",
    category_name: "Java",
    creator_name: "Rohan Verma",
    price: 599.00
  };

  // Billing form details
  const [userName, setUserName] = useState("Arjun Mehta");
  const [userEmail, setUserEmail] = useState("arjun.mehta@learnhub.com");
  const [userPhone, setUserPhone] = useState("+91 98765 43210");

  // Payment gateway popup state
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi' | 'card' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);

  // Invoice calculations
  const subtotal = contentItem.price;
  const gstTax = Math.round(subtotal * 0.18); // 18% GST
  const platformFee = 0.00; // Free platform processing
  const totalAmount = subtotal + gstTax;

  // Handle launch Razorpay widget
  const handleLaunchRazorpay = (e) => {
    e.preventDefault();
    setShowRazorpayModal(true);
  };

  // Simulate Razorpay success transaction
  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpayModal(false);
      const transactionData = {
        transactionId: "pay_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        item: contentItem,
        amountPaid: totalAmount,
        paidAt: new Date().toISOString(),
        paymentStatus: "SUCCESS",
        userName: userName,
        userEmail: userEmail
      };
      if (onPaymentSuccess) onPaymentSuccess(transactionData);
    }, 1200);
  };

  // Simulate Razorpay failure transaction
  const handleSimulateFailure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpayModal(false);
      const transactionData = {
        transactionId: "pay_FAIL_" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        item: contentItem,
        amountPaid: totalAmount,
        failedAt: new Date().toISOString(),
        paymentStatus: "FAILED",
        reason: "Bank server timeout / insufficient funds"
      };
      if (onPaymentFailure) onPaymentFailure(transactionData);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onCancel} className="gap-2 text-xs text-gray-600 dark:text-gray-400">
            <ArrowLeft className="h-4 w-4" /> Back to Marketplace
          </Button>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40">
            Secure SSL Checkout
          </Badge>
        </div>

        {/* Checkout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Billing Information */}
          <div className="md:col-span-7 space-y-6">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Billing Details</CardTitle>
                <CardDescription className="text-xs">
                  Information for receipt generation and access verification.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="space-y-1.5">
                  <Label htmlFor="b-name" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Full Name *
                  </Label>
                  <Input
                    id="b-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50/50 dark:bg-black/20 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="b-email" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Email Address (For PDF Access) *
                  </Label>
                  <Input
                    id="b-email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="bg-gray-50/50 dark:bg-black/20 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="b-phone" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Phone Number (SMS Receipt)
                  </Label>
                  <Input
                    id="b-phone"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="bg-gray-50/50 dark:bg-black/20 text-sm"
                  />
                </div>

              </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-700 dark:text-indigo-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="h-4 w-4 text-indigo-600" /> 256-Bit Encrypted Razorpay Gateway
              </div>
              <p className="text-[11px] text-gray-500">
                Your payment data is securely handled directly by Razorpay SDK. LearnHub does not store card credentials.
              </p>
            </div>
          </div>

          {/* Right Column: Invoice Breakdown */}
          <div className="md:col-span-5 space-y-6">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-md">
              <CardHeader className="bg-gray-50/80 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 pb-4">
                <CardTitle className="text-base font-bold">Order Summary</CardTitle>
                <CardDescription className="text-xs">Invoice preview for item purchase</CardDescription>
              </CardHeader>

              <CardContent className="p-5 space-y-4">
                
                {/* Item Card */}
                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                  <Badge variant="outline" className="text-[10px] bg-indigo-50 text-indigo-600">
                    {contentItem.category_name}
                  </Badge>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{contentItem.title}</h4>
                  <p className="text-xs text-gray-500">Creator: {contentItem.creator_name}</p>
                </div>

                {/* Price Calculation Table */}
                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 pt-2">
                  <div className="flex justify-between">
                    <span>Resource Price</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{gstTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Convenience Fee</span>
                    <span className="font-medium text-emerald-600">FREE</span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-3 mt-2 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Total Amount</span>
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Razorpay Launch Button */}
                <Button
                  onClick={handleLaunchRazorpay}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-md gap-2 mt-4"
                >
                  <CreditCard className="h-4 w-4" /> Pay ₹{totalAmount.toFixed(2)} via Razorpay
                </Button>

              </CardContent>
            </Card>
          </div>

        </div>

      </div>

      {/* Razorpay Interactive Popup Overlay Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Razorpay Top Header */}
            <div className="bg-[#02042b] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 text-white font-black text-base px-2 py-0.5 rounded">
                  RZP
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Razorpay Secure Checkout</h4>
                  <p className="text-[10px] text-gray-400">LearnHub Platform Payment</p>
                </div>
              </div>
              <button onClick={() => setShowRazorpayModal(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              <div className="text-center space-y-1 pb-3 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-400">Payable Amount</span>
                <div className="text-3xl font-black text-gray-900 dark:text-white">₹{totalAmount.toFixed(2)}</div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{contentItem.title}</p>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-gray-500">Select Payment Method</Label>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition ${
                      paymentMethod === "upi" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600" : "border-gray-200 dark:border-gray-800 text-gray-600"
                    }`}
                  >
                    <QrCode className="h-4 w-4 mx-auto mb-1" /> UPI / QR
                  </button>

                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition ${
                      paymentMethod === "card" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600" : "border-gray-200 dark:border-gray-800 text-gray-600"
                    }`}
                  >
                    <CreditCard className="h-4 w-4 mx-auto mb-1" /> Card
                  </button>

                  <button
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition ${
                      paymentMethod === "netbanking" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600" : "border-gray-200 dark:border-gray-800 text-gray-600"
                    }`}
                  >
                    <Building2 className="h-4 w-4 mx-auto mb-1" /> Net Banking
                  </button>
                </div>
              </div>

              {/* Simulation Action Buttons for Testing */}
              <div className="space-y-2 pt-2">
                <Label className="text-[11px] text-gray-400 uppercase font-bold text-center block">
                  Simulate Gateway Response (CDAC Testing)
                </Label>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleSimulateSuccess}
                    disabled={isProcessing}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 py-2.5"
                  >
                    <CheckCircle2 className="h-4 w-4" /> {isProcessing ? "Processing..." : "Simulate Success"}
                  </Button>

                  <Button
                    onClick={handleSimulateFailure}
                    disabled={isProcessing}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 text-xs gap-1.5 py-2.5"
                  >
                    <AlertTriangle className="h-4 w-4" /> {isProcessing ? "Processing..." : "Simulate Failure"}
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
