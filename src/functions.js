var minBrowserWidth = 992;
var resizeTimer;
/** Sidenav functionality*/
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
window.openMobileNav = function () {
  buildMobileMenu();
  $("#mobile-sidenav, #overall-overlay").addClass("show");
};

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
window.closeMobileNav = function () {
  $("#mobile-sidenav, #overall-overlay").removeClass("show");
};
/** End Sidenav functionality */

window.buildMobileMenu = function () {
  var win_w = $(window).width();
  if (win_w <= minBrowserWidth) {
    $("#drop-user, #lnk-documentation, #lnk-platforms").appendTo(
      "#mobile-sidenav-body"
    );
    $("#main-sidenav").appendTo("#mobile-sidenav-body");
    // Hide sidenav container
    //$("#main").hide();

    // Set platform header name bellow header tag
    $("#platform-name").appendTo("#mobile-platform-name .col");
    // Collapse all accordions
    // $('.collapse').each(function () {
    //   $(this).collapse();
    //   $(this).attr("aria-expanded", "false");
    // });
  } else {
    // Return to original container
    $("#drop-user").appendTo("#drop-user-container");
    $("#lnk-documentation").appendTo("#lnk-documentation-container");
    $("#lnk-platforms").appendTo("#lnk-platforms-container");
    $("#main-sidenav").appendTo("#main");
    $("#platform-name").appendTo("#head-platform-name-container");
    $("#main").show();
  }
};

function getUID() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

$(function () {
  $('[data-toggle="popover"]').popover();
  $(window).on("resize", function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Run code here, resizing has "stopped"
      buildMobileMenu();
    }, 250);
  });
  // Hide side menu on overlay focus
  $("#overall-overlay").click(function () {
    // Close mobile nav
    closeMobileNav();
  });
  // Hide menu and overlay
  $(document).on("keydown", function (event) {
    if (event.key == "Escape") {
      // Close mobile nav
      closeMobileNav();
    }
  });
});

function addArrayItem(id, inpt) {
  // console.log(id);
  var uId = getUID();
  $("#" + id + " ul").append(
    '<li id="' +
      id +
      '-li" class="list-group-item d-flex bd-highlight align-items-center"><input name="' +
      inpt +
      ":" +
      uId +
      '"  type="text" class="form-control flex-grow-1 bd-highlight arr-inpt" /><a href="javascript://" onClick="$(\'#' +
      id +
      '-li\').remove()" class="bd-highlight remove-icon" title="Remove item"><span class="sr-only">Remove</span></a></li>'
  );
}

function addObjItem(id, inpt) {
  var uId = getUID();
  $("#" + id + " ul").append(
    '<li id="' +
      id +
      '-li" class="list-group-item d-flex bd-highlight align-items-center"><div class="col-5"><label class="form-label">Key</label><input name="key-' +
      inpt +
      ":" +
      uId +
      '" type="text" class="form-control bd-highlight obj-key obj-inpt" /></div><div class="col-1 d-flex justify-content-center align-items-center"><span class="mt-4">=</span></div><div class="col-5"><label class="form-label">Value</label><input type="text" class="form-control bd-highlight obj-value obj-inpt" /></div><div class="col-1"><a href="javascript://" onClick="$(\'#' +
      id +
      '-li\').remove()" class="bd-highlight remove-icon" style="margin-top: 1.9rem !important;margin-left: 0px !important" title="Remove item"><span class="sr-only">Remove</span></a></div></li>'
  );
}

function goTo(action) {
  setTimeout(() => {
    $("#begin").hide();
  }, 200);
  // console.log(action);
  $(".tree-lnk").removeClass("active");
  $("#lnk-" + action.replace(/:/g, "-")).addClass("active");
  document.location.href = "../#/commands";
  document.location.href = "#/commands/" + action;
  // if (noAction === true) {
  //   this.router.navigate(['/commands/' + this.command]);
  // } else {
  //   this.router.navigate(['/commands/' + this.command + '/' + action]);
  // }
}

function sortByRequired(a, b) {
  const startA = parseInt($(a).data("required"));
  const startB = parseInt($(b).data("required"));
  return startA - startB;
}

// Numeric input fields
// Restricts input for the set of matched elements to the given inputFilter function.
// (function ($) {
//   $.fn.inputFilter = function (callback, errMsg) {
//     return this.on(
//       "input keydown keyup mousedown mouseup select contextmenu drop focusout",
//       function (e) {
//         if (callback(this.value)) {
//           // Accepted value
//           if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
//             $(this).removeClass("is-invalid");
//             this.setCustomValidity("");
//           }
//           this.oldValue = this.value;
//           this.oldSelectionStart = this.selectionStart;
//           this.oldSelectionEnd = this.selectionEnd;
//         } else if (this.hasOwnProperty("oldValue")) {
//           // Rejected value - restore the previous one
//           $(this).addClass("is-invalid");
//           this.setCustomValidity(errMsg);
//           this.reportValidity();
//           this.value = this.oldValue;
//           this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
//         } else {
//           // Rejected value - nothing to restore
//           this.value = "";
//         }
//       }
//     );
//   };
// })(jQuery);

function isNumberKey(evt, id) {
  try {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (charCode == 46) {
      var txt = document.getElementById(id).value;
      if (!(txt.indexOf(".") > -1)) {
        return true;
      }
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

    return true;
  } catch (w) {
    alert(w);
  }
}

function disableInptEnterKey() {
  $("input[type='text']").keypress(function (e) {
    var key = e.which;
    if (key == 13) {
      // the enter key code
      console.log("pressed enter");
      return false;
    }
  });
  $("#frm-command").submit(function (event) {
    alert("Handler for .submit() called.");
    event.preventDefault();
  });
}

function getFormData(frm) {
  var fields = {};
  $("#" + frm)
    .find(":input")
    .each(function () {
      // The selector will match buttons; if you want to filter
      // them out, check `this.tagName` and `this.type`; see
      // below
      var val = "";
      // Target all radio buttons
      if (this.type == "radio") {
        val = $(this).is(":checked");
        fields[this.name] = val;
      } else {
        val = $(this).val();
        if (val != "") {
          fields[this.name] = val;
        }
      }
      // Target all inputs that are not arrays/objects
      if (
        $(this).hasClass("arr-inpt") == false &&
        $(this).hasClass("obj-inpt") == false &&
        this.type == "text"
      ) {
        val = $(this).val();
        if (val != "") {
          fields[this.name] = val;
        }
      }
      // Target others
      if (
        $(this).hasClass("arr-inpt") == true ||
        $(this).hasClass("obj-inpt") == true
      ) {
        var arr = [];
        var obj = [];
        if (this.name.indexOf(":") == -1) {
          // Array fields
          $(".arr-" + this.name + " :input").each(function () {
            if ($(this).val() != "") {
              arr.push($(this).val());
            }
          });
          if (arr.length > 0) {
            fields[this.name] = arr.toString();
          }
          // Object fields (Key value Pairs)
          $(".obj-" + this.name + " li").each(function () {
            if (
              $(".obj-key", $(this)).val() != "" &&
              $(".obj-value", $(this)).val()
            ) {
              obj.push(
                $(".obj-key", $(this)).val() +
                  "=" +
                  $(".obj-value", $(this)).val()
              );
            }
          });
          if (obj.length > 0) {
            fields[this.name] = obj.toString();
          }
        }
      }
    });
  return { fields: fields };
}

function setFormData(frm, data) {
  setTimeout(function () {
    for (key in data) {
      console.log('input[name="' + key + '"]');
      var inpt = $('input[name="' + key + '"]');
      if (inpt.attr("radio")) {
        inpt.attr("checked", true);
      } else {
        inpt.val(data[key]);
        console.log(inpt);
      }
    }
  }, 1000);
}
