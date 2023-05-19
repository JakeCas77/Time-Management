$(init);

function init() {
  //Display current date
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  //Block setting to update every minute
  TimeBlocks();
  setInterval(TimeBlocks, 60000);

  // Update time blocks with data in local storage
  $(".block").each(function () {
    var blockId = $(this).attr("id");
    // Load saved data from local storage
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });

  // Save buttons attachment
  $(".saveBtn").on("click", handleSave);
}

function TimeBlocks() {
  // Time block set up
  $(".block").each(function () {
    var blockTiming = parseInt($(this).attr("id").replace("time-", ""));
    var currentHour = parseInt(moment().format("H"));
    // remove a privious class 
    $(this).removeClass("past present future");
    // past, present and future bloks color set up
    if (blockTiming < currentHour) {
      $(this).addClass("past");
    } else if (blockTiming > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}

function handleSave(event) {
  //Present id
  var hourId = $(this).parent().attr("id");
  // Save data in textarea
  localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
}