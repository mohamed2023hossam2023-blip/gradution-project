document.getElementById("sendOrder").addEventListener("click", async () => {
  const orderData = {
    invoiceNo: "INV-006",
    customerId: 1,
    date: "2025-10-28T00:00:00",
    paymentStatus: "Paid",
    items: [
      { inventoryItemId: 1, quantity: 2, unitPrice: 15000.0 },
      { inventoryItemId: 5, quantity: 1, unitPrice: 15000.0 }
    ]
  };

  try {
    const response = await fetch("https://localhost:7240/api/salesorders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    console.log("✅ Response from API:", data);

    // تحديث المودال بالبيانات
    document.getElementById("responseMessage").textContent = `✅ ${data.message}`;
    document.getElementById("responseInvoice").textContent = `🧾 Invoice: ${data.invoiceNo}`;
    document.getElementById("responseCustomer").textContent = `👤 Customer: ${data.customer}`;
    document.getElementById("responseTotal").textContent = `💰 Total: ${data.totalAmount} EGP`;

    // إظهار المودال
    document.getElementById("responseModal").classList.remove("d-none");

  } catch (error) {
    console.error("❌ Error sending order:", error);
    alert("⚠️ Failed to send Sales Order. Please check console for details.");
  }
});

// زر الإغلاق
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("responseModal").classList.add("d-none");
});
