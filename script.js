// Show specific sections based on the user selection
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
  
    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
  }
  
  // Store user data after signup
  function signup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
  
    // Store user data in localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
  
    // Redirect to login page after successful signup
    showSection('login');
  }
  
  // Login the user by checking stored credentials
  function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    const storedName = localStorage.getItem('userName');
  
    // Check if the credentials match
    if (email === storedEmail && password === storedPassword) {
      // Set the user name in the dashboard
      document.getElementById('userName').innerText = storedName;
  
      // Show the dashboard and update the nav
      showSection('dashboard');
      document.getElementById('loginLink').style.display = 'none';
      document.getElementById('signupLink').style.display = 'none';
      document.getElementById('dashboardLink').style.display = 'inline-block';
      document.getElementById('logoutLink').style.display = 'inline-block';
    } else {
      alert('Invalid email or password');
    }
  }
  
  // Logout and return to home
  function logout() {
    // Clear the session (optional for demo purposes)
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  
    // Show the home page and update nav
    showSection('home');
    document.getElementById('loginLink').style.display = 'inline-block';
    document.getElementById('signupLink').style.display = 'inline-block';
    document.getElementById('dashboardLink').style.display = 'none';
    document.getElementById('logoutLink').style.display = 'none';
  }
  
  // Store the booking details in localStorage and display them in the dashboard
  function confirmPayment() {
    // Get booking data from the form
    const destination = 'Paris'; // Example, update with dynamic value
    const travelDate = document.querySelector('input[type="date"]').value;
    const guests = document.querySelector('input[name="adults"]').value + " Adults, " + document.querySelector('input[name="children"]').value + " Children";
  
    // Store booking data in localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push({ destination, travelDate, guests, status: 'Booked' });
  
    localStorage.setItem('bookings', JSON.stringify(bookings));
  
    // Redirect to the dashboard after successful booking
    showSection('dashboard');
    displayBookings();
  }
  
  // Display the bookings in the dashboard
  function displayBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const bookingBody = document.getElementById('bookingBody');
    bookingBody.innerHTML = ''; // Clear the current table content
  
    // Get the current date
    const currentDate = new Date();
  
    bookings.forEach(booking => {
      const bookingDate = new Date(booking.travelDate);
      let status = 'Future Journey';
      let statusClass = 'future';
  
      // Check if the journey is today or in the future
      if (bookingDate.toDateString() === currentDate.toDateString()) {
        status = 'Current Journey 😊';
        statusClass = 'current';
      } else if (bookingDate < currentDate) {
        status = 'Past Journey';
        statusClass = 'past';
      }
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${booking.destination}</td>
        <td>${booking.travelDate}</td>
        <td class="${statusClass}">${status}</td>
      `;
      bookingBody.appendChild(row);
    });
  }
  
  // Run this function to display the bookings when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      // User is logged in, show dashboard
      document.getElementById('userName').innerText = userName;
      showSection('dashboard');
      document.getElementById('loginLink').style.display = 'none';
      document.getElementById('signupLink').style.display = 'none';
      document.getElementById('dashboardLink').style.display = 'inline-block';
      document.getElementById('logoutLink').style.display = 'inline-block';
    }
  
    // Display bookings if any
    displayBookings();
  });