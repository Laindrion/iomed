$(document).ready(function () {
  /**********************
   **********************
     MODALS 
   **********************
   **********************/
  $(".delete").click(() => {
    $(".modal").addClass("active");
    $(".modal__delete").addClass("active");
    $(".modal__info").removeClass("active");
  });

  $("#procedure-add").click(() => {
    $(".modal").addClass("active");
    $(".modal__add").addClass("active");
  });

  $(".close").click(() => {
    $(".modal").removeClass("active");
    $(".modal__inner").removeClass("active");
    $(".modal__info").removeClass("active");

    $(".modal__stage-2").removeClass("active");

    if ($(".modal__stage-1").hasClass("active")) {
    } else {
      $(".modal__stage-1").addClass("active");
    }
  });

  $(".no").click(() => {
    $(".modal").removeClass("active");
    $(".modal__inner").removeClass("active");
  });

  $(".yes").click(() => {
    $(".modal__delete").removeClass("active");
    $(".modal__success").addClass("active");
  });

  $(".continue").click(() => {
    $(".modal").removeClass("active");
    $(".modal__inner").removeClass("active");
  });

  $(".info").click(() => {
    $(".modal").addClass("active");
    $(".modal__info").addClass("active");
  });


  $(".modal__add-calc__inner").on("click", ".item-add", function () {
    var newItem = $(".modal__add-calc__inner-item:first").clone();
    newItem.find('input[type="text"]').val("");
    $(".modal__add-calc__inner").append(newItem);
  });

  $(".modal__add-calc__inner").on("click", ".item-remove", function () {
    if ($(".modal__add-calc__inner-item").length > 1) {
      $(this).closest(".modal__add-calc__inner-item").remove();
    }
  });

  let modalAdd = document.querySelector(".modal__add-inner");
  let modalPrice = document.querySelector(".modal__add-calc__inner");

  if (modalAdd) {
    /* Validation on modal add */
    let modalAddInputs = modalAdd.querySelectorAll("input");
    let modalAddSelects = modalAdd.querySelectorAll("select");
    let modalAddTextareas = modalAdd.querySelectorAll("textarea");
    let modalAddSelectsInner = modalAdd.getElementsByClassName(
      "select2-selection--single"
    );

    let modalAddPhone = modalAdd.querySelector('#phone');
    console.log(modalAddPhone)
    modalAddPhone.addEventListener('input', function () {
      // Remove non-numeric and non-plus sign characters
      var sanitizedValue = modalAddPhone.value.replace(/[^0-9+]/g, "");
      // Update the input value
      modalAddPhone.value = sanitizedValue;
    })

    let modalStages1 = document.querySelectorAll(".modal__stage-1");
    let modalStages2 = document.querySelectorAll(".modal__stage-2");

    let nextBtn = document.querySelector(".next");
    let saveBtn = document.querySelector(".save");

    function formValidation() {
      /* form validation starts */
      let modalAddElements = modalAdd.querySelectorAll(
        "input, select, textarea"
      );
      let isValid = true;

      modalAddElements.forEach((element) => {
        if (
          element.value.trim() === "" ||
          element.value.trim() === "0" ||
          element.validity.typeMismatch
        ) {
          isValid = false;
        }
      });

      if (isValid) {
        console.log("valid!");

        /* When valid, remove the active class from the first and move on to the seond stage */
        modalStages1.forEach((stage) => {
          /* stage-1 */
          stage.classList.remove("active");
        });
        modalStages2.forEach((stage) => {
          /* stage-2 */
          stage.classList.add("active");
        });

        /* Reseting the border Colors for every element */
        modalAddElements.forEach((element) => {
          element.style.borderColor = null;
        });
        modalAddSelects.forEach((select, index) => {
          modalAddSelectsInner[index].style.borderColor = null;
        });
      } else {
        console.log("not valid!");

        /* Input */
        modalAddInputs.forEach((input) => {
          if (input.value.trim() === "" || input.validity.typeMismatch) {
            input.style.borderColor = "red";
          } else {
            input.style.borderColor = null;
          }
        });
        /* Select */
        modalAddSelects.forEach((select, index) => {
          if (select.value.trim() === "0") {
            modalAddSelectsInner[index].style.borderColor = "red";
            return false;
          } else {
            modalAddSelectsInner[index].style.borderColor = null;
          }
        });
        /* Textarea */
        modalAddTextareas.forEach((teaxtarea) => {
          if (teaxtarea.value.trim() === "") {
            teaxtarea.style.borderColor = "red";
            return false;
          } else {
            teaxtarea.style.borderColor = null;
          }
        });
      }
    }

    nextBtn.addEventListener("click", formValidation); /* click event */
  }
  /* MODAL PRICE */
  if (modalPrice) {
    let modalAddPrice = modalPrice.querySelectorAll(".modal__add-price");
    let modalAddDiscount = modalPrice.querySelectorAll(".modal__add-discount");
    let modalAddTotalInner = modalPrice.querySelectorAll(
      ".modal__add-total__inner"
    );

    let total = document.querySelector(".total");
    let discount;
    /* discount = (priceValue / 100) * discountInputValue; */

    /* Total Price */
    function TotalView() {
      let overallPrice = 0;

      modalAddTotalInner.forEach((totalInner) => {
        overallPrice += Number(totalInner.value.replaceAll(" ", ""));
      });
      // Remove non-numeric and non-plus sign characters
      var sanitizedValue = String(overallPrice).replace(/[^0-9+]/g, "");
      // Format the input with spaces
      var formattedValue = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      // Update the input value
      overallPrice = formattedValue;
      total.innerText = overallPrice;
    }

    /* Format the numbers */
    function formatDiscount() {
      // Remove non-numeric and non-plus sign characters
      var sanitizedValue = String(discount).replace(/[^0-9+]/g, "");
      // Format the input with spaces
      var formattedValue = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      // Update the input value
      discount = formattedValue;
    }

    /* Modal price */
    modalAddPrice.forEach((price, index) => {
      price.addEventListener("input", () => {
        // Remove non-numeric and non-plus sign characters
        var sanitizedValue = price.value.replace(/[^0-9+]/g, "");
        // Format the input with spaces
        var formattedValue = sanitizedValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          " "
        );
        // Update the input value
        price.value = formattedValue;
      });

      price.addEventListener("change", () => {
        let priceValue = Number(price.value.replaceAll(" ", ""));
        let discountInputValue = Number(modalAddDiscount[index].value);

        if (discountInputValue === 0) {
          console.log("This can't be done");
          modalAddTotalInner[index].value = price.value;
          TotalView();
        } else {
          discount = Math.round(
            priceValue - (priceValue / 100) * discountInputValue
          );
          formatDiscount();
          modalAddTotalInner[index].value = discount;
          TotalView();
        }
      });
    });

    /* Modal discount */
    modalAddDiscount.forEach((discountInput, index) => {
      /* Input */
      discountInput.addEventListener("input", () => {
        if (discountInput.value > 100) {
          alert("Вы не можете ввести скиду больше 100-а процентов");
          discountInput.value = "";
        } else if (discountInput.value < 0) {
          alert("Процент не может быть минусовым");
          discountInput.value = "";
        }
      });
      /* Change */
      discountInput.addEventListener("change", () => {
        let priceValue = Number(modalAddPrice[index].value.replaceAll(" ", ""));
        let discountInputValue = Number(discountInput.value);

        if (discountInputValue <= 0) {
          modalAddTotalInner[index].value = priceValue;
        } else {
          discount = Math.round(
            priceValue - (priceValue / 100) * discountInputValue
          );
          formatDiscount();
          modalAddTotalInner[index].value = discount;
          TotalView();
        }
      });
    });
  }

  /**********************
   **********************   
     SELECT 
   **********************
   **********************/
  $("select").select2();

  /**********************
     **********************
          LINKS ONCLICK SCROLLING
     **********************
     **********************/
  let links = document.querySelectorAll('a[href="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });

  /* Jquery ends */
});
