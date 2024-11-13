
function moveToNext(current, nextId) {
  if (current.value.length === 1 && nextId) {
    document.getElementById(nextId).focus();
  }
}

function clearAllInputs(event) {
  // Check if the backspace key is pressed
  if (event.key === 'Backspace') {
    const currentInput = event.target;

    // If the current input has a value, clear it
    if (currentInput.value) {
      currentInput.value = '';
    } else {
      // Otherwise, move to the previous input and clear it
      const previousInput = currentInput.previousElementSibling;
      if (previousInput) {
        previousInput.value = '';
        previousInput.focus();
      }
    }
  }
}

function getPincode1() {
  const inputs = document.querySelectorAll(".Pincode-1 input");
  
  let pincode = '';
  
  inputs.forEach(input => {
      pincode += input.value;
  });
  
  return pincode;
}

function getPincode2() {
  const inputs = document.querySelectorAll(".Pincode-2 input");
  
  let pincode = '';
  
  inputs.forEach(input => {
      pincode += input.value;
  });

  
  return pincode;
}



function validatePincode() {
  const pincode1 = getPincode1();
  const pincode2 = getPincode2();
  const result = document.getElementById("result");


  if (pincode1 && pincode2 && pincode1 === pincode2) {
    result.textContent = "Your PIN codes are the same ✓";

    result.classList.add('confirmation-message');

    const button = document.querySelector('.continue-button');

    button.style.backgroundColor = "red";

    button.addEventListener('click', () => { 
      document.getElementById("Page-1").style.visibility = "hidden";

      document.getElementById("Next-page").style.display = "block";
    });

    fetch(`https://api.postalpincode.in/pincode/${pincode1}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data[0].PostOffice[0].Name);

        const location = document.getElementById("location1");

        location.textContent = `${data[0].PostOffice[0].Name}`;

        document.getElementById("location2").textContent = `${data[0].PostOffice[0].Division}`;

        document.getElementById("location3").textContent = `${data[0].PostOffice[0].District}`;

        document.getElementById("location4").textContent = `${data[0].PostOffice[0].Circle}`;

        document.getElementById("location5").textContent = `${data[0].PostOffice[0].Country}`;
      })
      .catch(error => {
        console.error(error);
      });
    
    const back_arrow = document.querySelector('.Arrow-button');

    back_arrow.addEventListener('click', () => {
      document.getElementById("Next-page").style.display = "none";
      document.getElementById("Page-1").style.visibility = "visible";

      document.querySelector('.continue-button').style.backgroundColor = "#983c3c";

      resetAndRevalidatePincode();
    });
    
  } else if (pincode1 && pincode2) {
    result.textContent = "Pincodes do not match.";
    result.style.color = "red";
  } else {
    result.textContent = "";
  }
}

function resetAndRevalidatePincode() {
  // Clear any existing result message
  document.getElementById("result").textContent = "";
  document.getElementById("result").style.color = ""; // Reset color for new validation

  // Reset PIN inputs
  document.querySelectorAll(".Pincode-1 input, .Pincode-2 input").forEach(input => {
    input.value = ""; // Clear all input fields
  });

  // Call validatePincode() to re-evaluate
  validatePincode();
}


// Select elements
const backArrow = document.querySelector('.Arrow-button');
const nextButton = document.querySelector('.continue-button');
const page1 = document.getElementById("Page-1");
const page2 = document.getElementById("Next-page");

// Transition to the Next Page
nextButton.addEventListener('click', () => {
  page1.classList.remove("visible");
  page1.classList.add("hidden");

  setTimeout(() => {
    page1.style.visibility = "hidden" // Hide Page 1 after fade-out
    page2.style.display = "block"; // Show Page 2 before fade-in

    // Add transition effect for Page 2
    page2.classList.remove("hidden");
    page2.classList.add("visible");
  }, 200); // Delay to match the transition time
});

// Transition Back to Page 1
backArrow.addEventListener('click', () => {
  page2.classList.remove("visible");
  page2.classList.add("hidden");

  setTimeout(() => {
    page2.style.display = "none"; // Hide Page 2 after fade-out
    page1.style.visibility = "visible" // Show Page 1 before fade-in

    // Add transition effect for Page 1
    page1.classList.remove("hidden");
    page1.classList.add("visible");
  }, 200); // Delay to match the transition time
});




