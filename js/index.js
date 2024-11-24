// Get input fields
var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");

// Initialize the bookmark list
var bookmarkList = [];

// Load bookmarks from local storage if available
if (localStorage.getItem("BookmarkData") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("BookmarkData"));
}
renderBookmarks();

// Function to add a bookmark
function addBookmark() {
  if (validateSiteName() && validateSiteUrl()) {
    var bookmark = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("BookmarkData", JSON.stringify(bookmarkList));
    renderBookmarks();
    clearInputs();
  }
}

// Function to clear input fields
function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

// Function to render bookmarks
function renderBookmarks() {
  var bookmarkTableContent = "";

  for (var i = 0; i < bookmarkList.length; i++) {
    bookmarkTableContent += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${bookmarkList[i].name}</td>
                <td>
                  <button type="button" class="btn btn-success">
                    <a class="text-white text-decoration-none" target="_blank" href="${
                      bookmarkList[i].url
                    }">
                    <i class="fa-regular fa-eye me-1"></i> Visit
                    </a>
                  </button>
                </td>
                <td>
                  <button onclick="deleteBookmark(${i})" type="button" class="btn btn-danger">
                    <i class="fa-solid fa-trash-can me-1"></i>
                    Delete
                  </button>
                </td>
              </tr>`;
  }
  document.getElementById("bookmarkTableBody").innerHTML = bookmarkTableContent;
}

// Function to delete a bookmark
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("BookmarkData", JSON.stringify(bookmarkList));
  renderBookmarks();
}

// Function to validate site name
// function validateSiteName() {
//   var regex =
//     /^[a-zA-Z]{3,}([-_][a-zA-Z]{3,})*(\s[a-zA-Z]{3,}([-_][a-zA-Z]{3,})*)?$/;
//   var text = siteNameInput.value;

//   if (regex.test(text)) {
//     siteNameInput.classList.add("valid-input");
//     siteNameInput.classList.remove("invalid-input");
//     siteNameInput.classList.add("is-valid");
//     siteNameInput.classList.remove("is-invalid");
//     return true;
//   } else {
//     siteNameInput.classList.add("invalid-input");
//     siteNameInput.classList.remove("valid-input");
//     siteNameInput.classList.add("is-invalid");
//     siteNameInput.classList.remove("is-valid");
//     return false;
//   }
// }

function validateSiteName() {
    // السماح بالحروف والأرقام
    var regex = /^[a-zA-Z0-9 ]{3,}$/;  // يسمح بالحروف الكبيرة والصغيرة، الأرقام والمسافات
    var text = siteNameInput.value;
  
    if (regex.test(text)) {
      siteNameInput.classList.add("valid-input");
      siteNameInput.classList.remove("invalid-input");
      siteNameInput.classList.add("is-valid");
      siteNameInput.classList.remove("is-invalid");
      return true;
    } else {
      siteNameInput.classList.add("invalid-input");
      siteNameInput.classList.remove("valid-input");
      siteNameInput.classList.add("is-invalid");
      siteNameInput.classList.remove("is-valid");
      return false;
    }
  }
  



// Function to validate site URL
function validateSiteUrl() {
  var regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  var text = siteUrlInput.value;

  if (regex.test(text)) {
    siteUrlInput.classList.add("valid-input");
    siteUrlInput.classList.remove("invalid-input");
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    return true;
  } else {
    siteUrlInput.classList.add("invalid-input");
    siteUrlInput.classList.remove("valid-input");
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    return false;
  }
}

// Popup validation
var validationPopup = document.getElementById("validationModal");
var closePopupButton = document.getElementById("closeModal");

// Function to show the popup
function showValidationPopup() {
  validationPopup.classList.remove("hidden");
}

// Function to hide the popup
function hideValidationPopup() {
  validationPopup.classList.add("hidden");
}

// Close popup when clicking the close button
closePopupButton.addEventListener("click", () => {
  hideValidationPopup();
});

document.getElementById("submitButton").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission

  const isNameValid = validateSiteName(); // Validate the site name
  const isUrlValid = validateSiteUrl(); // Validate the URL

  // Only show the popup if any input is invalid
  if (!isNameValid || !isUrlValid) {
    showValidationPopup(); // Show popup if either the site name or URL is invalid
  } else {
    addBookmark(); // Proceed with adding the bookmark if both are valid
  }
});
