document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById("salesTableBody");

  try {
    // استبدل الرابط ده بالرابط الحقيقي عندك في الباك
    const response = await fetch("https://localhost:7240/api/sales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const salesData = await response.json();
    console.log("✅ Sales Data:", salesData);

    // تفريغ الجدول قبل ما نضيف البيانات
    tableBody.innerHTML = "";

    // لو الـ API بيرجع Array
    salesData.forEach((sale) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><input type="checkbox" class="row-check" /></td>
        <td>${sale.id || "—"}</td>
        <td>${new Date(sale.date).toLocaleString() || "—"}</td>
        <td>${sale.customer || "—"}</td>
        <td>${sale.salesperson || "—"}</td>
        <td class="speciall">$${sale.totalAmount?.toLocaleString() || "0.00"}</td>
        <td><button class="statu"><a href="salesorder.html">Sales Order</a></button></td>
      `;

      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("❌ Error fetching sales data:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-danger">Failed to load sales data 😔</td>
      </tr>
    `;
  }
});
