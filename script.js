// My code to handle form submit
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("bookingForm");
    const confirmation = document.getElementById("confirmation");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Stop page reload
  
      // Get inputs
      const carBrand = document.getElementById("carBrand").value;
      const service = document.getElementById("service").value;
      const date = document.getElementById("date").value;
  
      // Dynamic 1: Validate
      if (!carBrand || !service || !date) {
        confirmation.textContent = "Please fill all fields!";
        confirmation.style.color = "red";
        return;
      }
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        confirmation.textContent = "Please select a future date!";
        confirmation.style.color = "red";
        return;
      }
  
      // Dynamic 2: Send to server
      const bookingData = { carBrand, service, date };
      fetch("http://localhost:3000/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      })
      .then(response => response.json())
      .then(data => {
        confirmation.textContent = data.message;
        confirmation.style.color = "green";
      })
      .catch(error => {
        confirmation.textContent = "Error: " + error;
        confirmation.style.color = "red";
      });
    });
  });