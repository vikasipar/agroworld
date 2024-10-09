const AMOUNT = 1000;

export const usePayment = async (
  userEmail: string,
  userName: string,
  setIsProcessing: (value: boolean) => void,
  setIsPaymentDone: (value: boolean) => void
) => {
  setIsProcessing(true);

  try {
    // Make a request to create the Razorpay order
    const res = await fetch("/api/create-order", { method: "POST" });
    const data = await res.json();

    if (!data.orderId) {
      throw new Error("Failed to create order");
    }

    // Dynamically load the Razorpay script if it hasn't been loaded already
    const loadRazorpayScript = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = () => reject("Failed to load Razorpay script");
        document.body.appendChild(script);
      });
    };

    // Check if Razorpay is available, otherwise load it
    if (!window.Razorpay) {
      await loadRazorpayScript();
    }

    // Initialize Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: AMOUNT * 1000,
      currency: "INR",
      name: "AgroWorld Pvt. Ltd.",
      description: "Test transaction",
      order_id: data.orderId,
      handler: function (response: any) {
        console.log("Payment successful", response);
        setIsPaymentDone(true);
      },
      prefill: {
        name: userName,
        email: userEmail,
      },
      theme: {
        color: "#4cbb17",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Payment failed: ", error);
  } finally {
    setIsProcessing(false);
    // for testing
    // setIsPaymentDone(true);
  }
};
