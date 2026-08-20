function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");

  sections.forEach(function (section) {
    section.classList.remove("active");
  });

  const selectedSection = document.getElementById(sectionId);

  if (selectedSection) {
    selectedSection.classList.add("active");
  }

  document.querySelectorAll(".nav-button").forEach(function (button) {
    button.classList.toggle(
      "active",
      button.getAttribute("onclick") === `showSection('${sectionId}')`,
    );
  });

  if (sectionId === "bookings") {
    loadBookings();
  }
}

// Booking form submission

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const bookingData = {
      passengerName: document.getElementById("passengerName").value,

      age: parseInt(document.getElementById("age").value),

      gender: document.getElementById("gender").value,

      source: document.getElementById("source").value,

      destination: document.getElementById("destination").value,

      journeyDate: document.getElementById("journeyDate").value,

      trainName: document.getElementById("trainName").value,

      travelClass: document.getElementById("travelClass").value,

      seats: parseInt(document.getElementById("seats").value),
    };

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const savedBooking = await response.json();

        alert(
          "🎉 Ticket booked successfully!\n\n" +
            "Booking ID: " +
            savedBooking.id,
        );

        bookingForm.reset();
      } else {
        alert("❌ Failed to book ticket.");
      }
    } catch (error) {
      console.error(error);

      alert(
        "❌ Cannot connect to the backend. " +
          "Make sure Spring Boot is running.",
      );
    }
  });
}

// Load all bookings from backend

async function loadBookings() {
  try {
    const response = await fetch("http://localhost:8080/api/bookings");

    if (!response.ok) {
      throw new Error("Failed to load bookings");
    }

    const bookings = await response.json();

    const tableBody = document.getElementById("bookingsTableBody");

    tableBody.innerHTML = "";

    if (bookings.length === 0) {
      tableBody.innerHTML = `
                <tr>
                    <td colspan="10">
                        No bookings found.
                    </td>
                </tr>
            `;

      return;
    }

    bookings.forEach(function (booking) {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.passengerName}</td>
                <td>${booking.age}</td>
                <td>${booking.gender}</td>
                <td>${booking.source}</td>
                <td>${booking.destination}</td>
                <td>${booking.journeyDate}</td>
                <td>${booking.trainName}</td>
                <td>${booking.travelClass}</td>
                <td>${booking.seats}</td>
            `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);

    alert("Unable to load bookings. Make sure backend is running.");
  }
}

// Cancel ticket

const cancelForm = document.getElementById("cancelForm");

if (cancelForm) {
  cancelForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const bookingId = document.getElementById("cancelBookingId").value;

    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/${bookingId}`,
        {
          method: "DELETE",
        },
      );

      const message = await response.text();

      if (response.ok && message === "Booking cancelled successfully") {
        alert("✅ Ticket cancelled successfully!");

        cancelForm.reset();

        loadBookings();
      } else {
        alert("❌ " + message);
      }
    } catch (error) {
      console.error(error);

      alert(
        "❌ Cannot connect to the backend. " +
          "Make sure Spring Boot is running.",
      );
    }
  });
}
