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

function addArrayItem(id) {
  // console.log(id);
  $("#" + id + " ul").append(
    '<li id="' +
      id +
      '-li" class="list-group-item d-flex bd-highlight align-items-center"><input type="text" class="form-control flex-grow-1 bd-highlight" /><a href="javascript://" onClick="$(\'#' +
      id +
      '-li\').remove()" class="bd-highlight remove-icon" title="Remove item"><span class="sr-only">Remove</span></a></li>'
  );
}

function addObjItem(id) {
  // console.log(id);
  $("#" + id + " ul").append(
    '<li id="' +
      id +
      '-li" class="list-group-item d-flex bd-highlight align-items-center"><div class="col-5"><label class="form-label">Key</label><input type="text" class="form-control bd-highlight" /></div><div class="col-1 d-flex justify-content-center align-items-center"><span class="mt-4">=</span></div><div class="col-5"><label class="form-label">Value</label><input type="text" class="form-control bd-highlight" /></div><div class="col-1"><a href="javascript://" onClick="$(\'#' +
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
