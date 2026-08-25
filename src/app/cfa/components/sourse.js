// ============ ACCORDION LOGIC (REUSABLE) ============
function initEligibilityAccordion() {
  // Root = container where you injected the items
  var $root = $("#EligibilityAnswer");
  if (!$root.length) return;

  var $items = $root.find(".course-learning-modules-content-item");
  if (!$items.length) return;

  // Respect reduced motion
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DURATION = prefersReduced ? 0 : 250;

  // Find initial open item from markup (.active) or default to first
  var openIndex = $items.index($items.filter(".active").first());
  if (openIndex < 0) openIndex = 0;

  // Setup initial state
  $items.each(function (i) {
    var $item = $(this);
    var $content = $item.find(".content");

    if (i === openIndex) {
      $item.addClass("active");
      $content.stop(true, true).show();
    } else {
      $item.removeClass("active");
      $content.stop(true, true).hide();
    }

    // ARIA
    $item.find(".tab").attr({
      "aria-expanded": String(i === openIndex),
      role: "button",
      tabindex: "0",
    });
    $content.attr("aria-hidden", String(i !== openIndex));
  });

  function openAt(index) {
    if (index === openIndex || index < 0 || index >= $items.length) return;

    var $current = $items.eq(openIndex);
    var $currentContent = $current.find(".content");
    var $next = $items.eq(index);
    var $nextContent = $next.find(".content");

    $currentContent.stop(true, true).slideUp(DURATION, function () {
      $current.removeClass("active");
      $current.find(".tab").attr("aria-expanded", "false");
      $currentContent.attr("aria-hidden", "true");
    });

    $next.addClass("active");
    $next.find(".tab").attr("aria-expanded", "true");
    $nextContent
      .attr("aria-hidden", "false")
      .stop(true, true)
      .slideDown(DURATION);

    openIndex = index;
  }

  // Remove old handlers (if you re-init)
  $root.off(".eligibilityTabs");

  // Click handler
  $root.on("click.eligibilityTabs", ".tab", function () {
    var idx = $items.index(
      $(this).closest(".course-learning-modules-content-item"),
    );
    openAt(idx);
  });

  // Keyboard support
  $root.on("keydown.eligibilityTabs", ".tab", function (e) {
    if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
    e.preventDefault();
    $(this).trigger("click");
  });
}

// Run once on DOM ready (in case HTML is already there)
jQuery(function () {
  initEligibilityAccordion();
});

// ================== Eligibility DATA LOAD VIA API ==================
async function setEligibilityForCFA() {
  try {
    const resp = await apiCall(
      "AnonymousDataGet/ExecuteJson/SPClientAnonymous/52",
      {
        UniqueTable: "tblcourse",
        UniqueTable_Pk: "1932",
      },
    );

    const raw = resp?.result;
    const Eligibilitydata = typeof raw === "string" ? JSON.parse(raw) : raw;

    console.log("Eligibilitydata:", Eligibilitydata);

    // Safely read list
    let list = [];
    if (
      Eligibilitydata?.Eligibility &&
      Object.keys(Eligibilitydata.Eligibility).length > 0
    ) {
      list = Eligibilitydata.Eligibility.ListData || [];
    }

    if (list.length === 0) {
      $("#EligibilityAnswer").html(
        `<p>No Eligibilitys available at the moment.</p>`,
      );
      return;
    }

    const htmlEligibilityData = list
      .map(
        (e, i) => `
        <div class="course-learning-modules-content-item ${i === 0 ? "active" : ""}">
          <div class="tab">
            <div>
              <h3>${(e.FaqQuestions || "").split(" ")[0]}</h3>
              <p>${(e.FaqQuestions || "").split(" ").slice(1).join(" ")}</p>
            </div>
            <button type="button">
              <img src="$1Upload/23-08-2025/files/plus.svg" alt="plus-icon" />
              <img src="$1Upload/23-08-2025/files/minus.svg" alt="minus-icon" />
            </button>
          </div>
          <div class="content">
            ${e.FaqAnswer || ""}
          </div>
        </div>`,
      )
      .join("");

    $("#EligibilityAnswer").html(htmlEligibilityData);

    // IMPORTANT: init accordion AFTER HTML is injected
    initEligibilityAccordion();
  } catch (err) {
    console.error("Error loading Eligibility:", err);
    $("#EligibilityAnswer").html(
      `<p>Unable to load Eligibilitys right now. Please try again later.</p>`,
    );
  }
}

setEligibilityForCFA();
