document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");

  // هنا بنحط لينك الـ API
  const apiUrl = "https://localhost:7240/api/purchaseorders";

  async function fetchPurchaseOrders() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const orders = await response.json();
      tableBody.innerHTML = ""; // نظّف الجدول قبل ما تضيف البيانات

      orders.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><input type="checkbox" class="row-check" /></td>
          <td>${order.id || "—"}</td>
          <td>${order.creationDate || "—"}</td>
          <td>${order.vendorName || "—"}</td>
          <td>${order.representativeName || "—"}</td>
          <td class="speciall">$${order.totalAmount || 0}</td>
          <td><button class="statu"><a href="purchasesorder.html">Purchase Order</a></button></td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("❌ Error fetching purchase orders:", error);
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="color: red; font-weight: bold;">
            Failed to load sales data 😔
          </td>
        </tr>
      `;
    }
  }

  fetchPurchaseOrders();
});
