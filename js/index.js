
var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");


var bookmarkList = [];

if (localStorage.getItem("BookmarkData") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("BookmarkData"));
}
renderBookmarks();

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

function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}


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



function validateSiteName() {

    var regex = /^[a-zA-Z0-9 ]{3,}$/;  
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


var validationPopup = document.getElementById("validationModal");
var closePopupButton = document.getElementById("closeModal");


function showValidationPopup() {
  validationPopup.classList.remove("hidden");
}


function hideValidationPopup() {
  validationPopup.classList.add("hidden");
}


closePopupButton.addEventListener("click", () => {
  hideValidationPopup();
});

document.getElementById("submitButton").addEventListener("click", (e) => {
  e.preventDefault(); 

  const isNameValid = validateSiteName(); 
  const isUrlValid = validateSiteUrl();


  if (!isNameValid || !isUrlValid) {
    showValidationPopup(); 
  } else {
    addBookmark(); 
  }
});
