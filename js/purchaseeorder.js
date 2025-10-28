// لما الصفحة تخلص تحميل
document.addEventListener("DOMContentLoaded", () => {

  // زرار إرسال الريكوست (تقدر تغيره حسب اسم الزر عندك)
  const sendButton = document.getElementById("sendOrder");

  // عند الضغط على الزرار
  sendButton.addEventListener("click", async () => {
    // البيانات اللي هنرسلها للـ API
    const orderData = {
      purchaseOrderNo: "PO-0001",
      supplierId: 1,
      date: "2025-10-03T12:30:00",
      paymentStatus: "Paid",
      items: [
        {
          inventoryItemId: 8,
          itemName: "Laptop Dell",
          quantity: 5,
          unitPrice: 14500.00
        }
      ]
    };

    try {
      // إرسال البيانات باستخدام fetch
      const response = await fetch("https://localhost:7240/api/purchaseorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      // تحويل الرد إلى JSON
      const result = await response.json();

      // عرض النتيجة في الكونسول أو على الصفحة
      console.log("✅ API Response:", result);
      alert("Order sent successfully!");

    } catch (error) {
      console.error("❌ Error sending order:", error);
      alert("Failed to send order. Check console for details.");
    }
  });
});
