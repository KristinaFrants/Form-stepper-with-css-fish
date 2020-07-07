/* eslint-disable */

import "../assets/img/rigo-baby.jpg";
import "../assets/img/4geeks.ico";
//import 'breathecode-dom'; //DOM override to make JS easier to use
import "../style/index.scss";

let pmProfileTab = 0; // pmProfileTab tab is set to be the first tab (0)
showFormPage(pmProfileTab); // Display the pmProfileTab tab 

function showFormPage(n) {
  // This function will display the specified tab of the form ...
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";

  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  if (pmProfileTab < x.length-1) {
    x[pmProfileTab].style.display = "none";  
  }
  // Increase or decrease the current tab by 1:
  pmProfileTab = pmProfileTab + n;
  // if you have reached the end of the form...
  if (pmProfileTab >= x.length) {
    // ... the form gets submitted:
  var formData = new FormData();
  $('.user-edit-input').each(function () {
      formData.append($(this).attr('name'), $(this).val());
  })
  $.ajax({
  type: 'Post',
  contentType: false,
  processData: false,
  url: "{{url_for('pm_profile')}}",
  data: formData,
  success: function (data){
    if (data.success) {
      window.location.href="{{url_for('pm.dashboard')}}"
    } else {
      alert(data.err);
    }
  },
  error: function(){
    alert('There was a problem communicating with the server.');
  }
  });
  return false;
  }
  // Otherwise, display the correct tab:
  showFormPage(pmProfileTab);
 
};

function validateForm() {
  // This function deals with validation of the form fields
  let x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  //y = x[currentTab].getElementsByTagName("input");
  y = x[pmProfileTab].querySelectorAll(".needValidation");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[pmProfileTab].className += " finish";
  }
  return valid; // return the valid status  
}
  
function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  let i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

