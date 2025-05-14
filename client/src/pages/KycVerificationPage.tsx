import { useState } from "react";
import { Button } from "@/components/ui/button";
import KycVerification from "@/components/kyc/KycVerification";
import Header from "@/components/mainComponents/Header";

const KycVerificationPage = () => {
  const [showKyc, setShowKyc] = useState(true);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {showKyc ? (
          <KycVerification onComplete={() => setShowKyc(false)} />
        ) : (
          <div className="text-center p-10 bg-[#1e1e1e] rounded-lg border border-[#333333]">
            <h1 className="text-2xl font-bold mb-4">Verification Complete!</h1>
            <p className="text-[#9e9e9e] mb-6">
              Thank you for completing your identity verification. Your account
              is now fully activated.
            </p>
            <Button
              onClick={() => setShowKyc(true)}
              className="bg-[#00b37e] hover:bg-[#00a070] text-white"
            >
              View KYC Details
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KycVerificationPage;
