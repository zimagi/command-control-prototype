var minBrowserWidth = 992;
var resizeTimer;
var arrFieldErr = [];
var dataResponse = "";
var dataComplete = false;
var idleTimeNum = 500;
var idleTime = idleTimeNum;
var intTimeToLogout;
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

function initIntegerFields() {
  $(".integer").keyup(function () {
    var val = $(this).val();
    if (isNaN(val)) {
      val = val.replace(/[^0-9\.]/g, "");
      if (val.split(".").length > 2) val = val.replace(/\.+$/, "");
    }
    $(this).val(val);
  });
}

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
  // On small devices toggle sidemenu
  if ($("#main").hasClass("show")) {
    $("#main").removeClass("show");
  }
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
      // console.log("pressed enter");
      return false;
    }
  });
  $("#frm-command").submit(function (event) {
    alert("Handler for .submit() called.");
    event.preventDefault();
  });
}

function customValidate(val, regx) {
  return regx.test(val);
}

function validateForm() {
  var strFieldRE = /^([a-zA-Z0-9 \_\-]){2,}$/;
  var result = true;

  $("#frm-command input[required=true]").each(function () {
    if ($(this).val() == "") {
      if (existsInList($(this).attr("name")) == false) {
        arrFieldErr.push({
          field: $(this).attr("name"),
          err: "Required field",
        });
      }

      result = false;
    }
    // if (
    //   customValidate($(this).val(), strFieldRE) == false &&
    //   $(this).hasClass("integer") == false
    // ) {
    //   // For fields
    //   // if (existsInList($(this).attr("name")) == false) {
    //   //   arrFieldErr.push({
    //   //     field: $(this).attr("name"),
    //   //     err: "Minimum 2 characters required.",
    //   //   });
    //   // }

    //   result = false;
    // }
  });
  return result;
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
        // val = $(this).val();
        // if (val != "") {
        //   fields[this.name] = val;
        // }
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
    });
  // Target others dynamic list components
  $(".arr-list-component").each(function () {
    var actionName = $(this).attr("data-action-name");
    var arr = "";
    $(":input", $(this)).each(function () {
      if ($(this).val() != "") {
        arr += '"' + $(this).val() + '"' + ",";
      }
    });
    if (arr.length > 0) {
      fields[actionName] = JSON.stringify("{" + arr.slice(0, -1) + "}");
      console.log(fields[actionName]);
    }
  });
  $(".obj-list-component").each(function () {
    var actionName = $(this).attr("data-action-name");
    var arr = "";
    $("li", $(this)).each(function () {
      if (
        $(".obj-key", $(this)).val() != "" &&
        $(".obj-value", $(this)).val() != ""
      ) {
        arr +=
          '"' +
          $(".obj-key", $(this)).val() +
          '"' +
          ":" +
          $(".obj-value", $(this)).val() +
          ",";
      }
    });
    if (arr.length > 0) {
      fields[actionName] = JSON.stringify("{" + arr.slice(0, -1) + "}");
      console.log(fields[actionName]);
    }
  });

  return {
    fields: fields,
  };
}

function existsInList(field) {
  for (var item of arrFieldErr) {
    if (item.field == field) {
      return true;
    }
  }
  return false;
}

function resetFormErrorMessages() {
  for (var item of arrFieldErr) {
    $("#" + item.field).removeClass("is-invalid");
    $("#" + item.field).removeAttr("aria-describedby");
    $("#err-msg-" + item.field).remove();
  }
  // Clear error messages
  arrFieldErr = [];
}

function setFormErrorMessages() {
  for (var item of arrFieldErr) {
    $("#" + item.field).addClass("is-invalid");
    $("#" + item.field).attr("aria-describedby", "err-msg-" + item.field);
    $("#" + item.field).after(
      '<div id="err-msg-' +
        item.field +
        '" class="invalid-feedback">' +
        item.err +
        "</div>"
    );
  }
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

// Create an instance to cancel fetch request.
let controller;
let signal;
let abortExecution = false;

function abortControllerInit() {
  controller = new AbortController();
  signal = controller.signal;
}

function submitFetchAPI(headers, url, data) {
  abortControllerInit();
  // Fetch API
  let _data = data;
  dataComplete = false;
  abortExecution = false;

  $("#btn-abort").removeClass("d-none");
  // Disable clear button
  $("#btn-clear-responses").addClass("d-none");

  fetch(url, {
    method: "POST",
    signal: signal,
    body: JSON.stringify(_data),
    headers: headers,
  })
    .then((response) => response.body)
    .then((rb) => {
      const reader = rb.getReader();

      return new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
              // If there is no more data to read
              if (done) {
                // console.log("done", done);
                controller.close();
                return;
              }

              // Get the data and send it to the browser via the controller
              //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
              //console.log(new TextDecoder().decode(value));
              dataResponse = new TextDecoder().decode(value);
              //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
              //controller.enqueue(value);

              // Check chunks by logging to the console
              // console.log(done, new TextDecoder().decode(value));
              push();
            });
          }

          push();
        },
      });
    })
    .then((stream) =>
      // Respond with our stream
      new Response(stream, {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }).text()
    )
    .then((result) => {
      // Do things with result

      // console.log(result);

      dataComplete = true;
      $("#btn-abort").addClass("d-none");
      // Enable clear button
      $("#btn-clear-responses").removeClass("d-none");

      // console.log("-----");
      // dataComplete = result;
    })
    .catch((err) => console.log(">> " + err));
}

function abortFetchExecution() {
  abortExecution = true;
  // Abort.
  controller.abort();
  $("#btn-abort").addClass("d-none");
}
