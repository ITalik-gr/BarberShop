const rec_interval = 1200.5; //Частота переключения слайдера рекомендуемых товаров в секундах
const news_interval = 300.5; //Частота переключения слайдера отзывов в секундах


$(document).ready(function(){
    
    checkWindowSize();
    $("#close-cataloge").toggle();
    $("#cataloge").slideUp();

    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
    
          // Store hash
          var hash = this.hash;
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
       
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
});

// $(".recomended-circle").click(function(){
//     rec_StylePagination($(this).data("rec_id"));
//     rec_SetSlide($(this).data("page"));
// });

// $(".news-circle").click(function(){
//     news_StylePagination($(this).data("news_id"));
//     news_SetSlide($(this).data("page"));
// });

let rec_currentSlide = 0;
let rec_step = 2;
let rec_slidesCount = $("#slides > .slide").length;
let rec_slidesDisplaying = 5;
let rec_marginMultipler = 195;

let rec_step_desktop = 2;
let rec_slidesDisplaying_desktop = 5;
let rec_marginMultipler_desktop = 193;

let rec_step_mobile = 1;
let rec_slidesDisplaying_mobile = 3;
let rec_marginMultipler_mobile = 190;

let rec_step_mobile400px = 1;
let rec_slidesDisplaying_mobile400px = 1;
let rec_marginMultipler_mobile400px = 190;


function rec_NextSlide(){
    if (rec_currentSlide + rec_slidesDisplaying + 1 < rec_slidesCount) {
        rec_currentSlide += rec_step;
        $("#slides").css("margin-left", -rec_marginMultipler * rec_currentSlide);
    }
    else if (rec_slidesCount - (rec_currentSlide + rec_slidesDisplaying + 1) >= 0){
        rec_currentSlide = (rec_slidesCount  - rec_slidesDisplaying);
        $("#slides").css("margin-left", -rec_marginMultipler * rec_currentSlide);
    }
    else {
        $("#slides").css("margin-left", 0);
        rec_currentSlide = 0;
    }

    rec_StylePagination($("#recomended-pagination > a[data-page='" + rec_currentSlide + "']").data("rec_id"));
}
// function rec_PreviousSlide(){
//     if (rec_currentSlide - rec_step > 0) {
//         rec_currentSlide-= rec_step;
//         $("#slides").css("margin-left", -190 * rec_currentSlide);
//     } else if (rec_currentSlide - rec_step > -rec_step) {
//         rec_currentSlide = 0;
//         $("#slides").css("margin-left", rec_currentSlide);
//     } else {
//         $("#slides").css("margin-left", -190 * lastSlide);
//         rec_currentSlide = lastSlide;
//     }  
// }

function rec_SetSlide(slide_id){
    rec_currentSlide = slide_id;
    $("#slides").css("margin-left", -rec_marginMultipler * rec_currentSlide);
}

function rec_StylePagination(setid){
    $("#recomended-pagination > .active").removeClass("active");
    
    let circles = $("#recomended-pagination > a");

    for (const circle of circles) {
        if ($(circle).data("rec_id") == setid){
            $(circle).addClass("active")
            rec_currentSlide = $(circle).data("page");
        } else if (Math.abs(setid - $(circle).data("rec_id")) == 1){
            $(circle).css("opacity", "0.8");
        } else {
            $(circle).css("opacity", "0.4");
        }
        
    }
}
function rec_InitializeCircles(){
    let slides = $("#slides > .slide").length - rec_slidesDisplaying;
    const pagParent = $("#recomended-pagination");

    if (slides > 0) {
        let rec_id = 1;
        let data_page = 0;

        pagParent.append(`<a data-rec_id='${rec_id}' data-page='${data_page}' class='recomended-circle' href='#' onclick='return false;'>&nbsp;</a>`);
        rec_id++;
        data_page += rec_step;

        while (slides > 0){
            pagParent.append(`<a data-rec_id='${rec_id}' data-page='${data_page}' class='recomended-circle' href='#' onclick='return false;'>&nbsp;</a>`);
            rec_id++;

            if (slides - rec_step*2 == -1){
                data_page += 1;
            } else {
                data_page += rec_step;
            }
            
            
            slides -= rec_step;
        }
    }
}

window.setInterval(function(){
    rec_NextSlide();
}, rec_interval * 1000);



// ----------------------------------

// News Slider

// ----------------------------------
let news_currentSlide = 0;
let news_step = 2;
let news_slidesCount = $("#news-slides > .slide").length;
let news_slidesDisplaying = 4;
let news_marginMultipler;

let news_step_desktop = 2;
let news_slidesDisplaying_desktop = 5;
let news_marginMultipler_desktop = 230;

let news_step_table = 2;
let news_slidesDisplaying_table = 3;
let news_marginMultipler_table = 200;

let news_step_mobile = 1;
let news_slidesDisplaying_mobile = 1;
let news_marginMultipler_mobile = 375;

function news_SetSlide(slide_id){
    news_currentSlide = slide_id;
    $("#news-slides").css("margin-left", -news_marginMultipler * news_currentSlide);
}

function news_NextSlide(){
    if (news_currentSlide + news_slidesDisplaying + 1 < news_slidesCount) {
        news_currentSlide += news_step;
        $("#news-slides").css("margin-left", -news_marginMultipler * news_currentSlide);
    }
    else if (news_slidesCount - (news_currentSlide + news_slidesDisplaying + 1) >= 0){
        news_currentSlide = (news_slidesCount  - news_slidesDisplaying);
        $("#news-slides").css("margin-left", -news_marginMultipler * news_currentSlide);
    }
    else {
        $("#news-slides").css("margin-left", 0);
        news_currentSlide = 0;
    }

    news_StylePagination($("#news-pagination > a[data-page='" + news_currentSlide + "']").data("news_id"));
}

function news_StylePagination(setid){
    $("#news-pagination > .active").removeClass("active");
    
    let circles = $("#news-pagination > a");

    for (const circle of circles) {
        if ($(circle).data("news_id") == setid){
            $(circle).addClass("active")
            news_currentSlide = $(circle).data("page");
        } else if (Math.abs(setid - $(circle).data("news_id")) == 1){
            $(circle).css("opacity", "0.8");
        } else {
            $(circle).css("opacity", "0.4");
        }
        
    }
}

function news_InitializeCircles(){
    let slides = $("#news-slides > .slide").length - news_slidesDisplaying;
    const pagParent = $("#news-pagination");

    if (slides > 0) {
        let news_id = 1;
        let data_page = 0;

        pagParent.append(`<a data-news_id='${news_id}' data-page='${data_page}' class='news-circle' href='#' onclick='return false;'>&nbsp;</a>`);
        news_id++;
        data_page += news_step;

        while (slides > 0){
            pagParent.append(`<a data-news_id='${news_id}' data-page='${data_page}' class='news-circle' href='#' onclick='return false;'>&nbsp;</a>`);
            news_id++;

            if (slides - news_step*2 == -1){
                
                data_page += 1;
            } else {
                data_page += news_step;
            }

            slides -= news_step;
        }
    }
}

window.setInterval(function(){
    news_NextSlide();
}, news_interval * 1000);


$( window ).resize(function() {
    checkWindowSize();
});

let windowSize = "";

function checkWindowSize(){
    if ($(window).width() >= 992 && windowSize != "desktop"){
        if ($("#news-pagination .news-circle").length > 0){
            $("#news-pagination .news-circle").remove();
            $("#recomended-pagination .recomended-circle").remove();
        }
        rec_step = rec_step_desktop;
        rec_slidesDisplaying = rec_slidesDisplaying_desktop;
        rec_marginMultipler = rec_marginMultipler_desktop;

        news_step = news_step_desktop;
        news_slidesDisplaying = news_slidesDisplaying_desktop;
        news_marginMultipler = news_marginMultipler_desktop;

        windowSize = "desktop";

        InitializeCircles();
    } else if ($(window).width() < 992 && $(window).width() >= 768 && windowSize != "table") {
        if ($("#news-pagination .news-circle").length > 0){
            $("#news-pagination .news-circle").remove();
            $("#recomended-pagination .recomended-circle").remove();
        }
        rec_step = rec_step_mobile;
        rec_slidesDisplaying = rec_slidesDisplaying_mobile;
        rec_marginMultipler = rec_marginMultipler_mobile;

        news_step = news_step_table;
        news_slidesDisplaying = news_slidesDisplaying_table;
        news_marginMultipler = news_marginMultipler_table;
        console.log(news_marginMultipler);

        windowSize = "table";

        InitializeCircles();
    } else if ($(window).width() < 768 && windowSize != "mobile") {
        if ($("#news-pagination .news-circle").length > 0){
            $("#news-pagination .news-circle").remove();
            $("#recomended-pagination .recomended-circle").remove();
        }
        rec_step = rec_step_mobile;
        rec_slidesDisplaying = rec_slidesDisplaying_mobile;
        rec_marginMultipler = rec_marginMultipler_mobile;

        news_step = news_step_mobile;
        news_slidesDisplaying = news_slidesDisplaying_mobile;
        news_marginMultipler = news_marginMultipler_mobile;

        windowSize = "mobile";

        InitializeCircles();
    } 
}

function InitializeCircles(){
    //Recomendations
    rec_InitializeCircles();
    rec_StylePagination(1);
    

    //News
    news_InitializeCircles();
    news_StylePagination(1);

    $(".recomended-circle").click(function(){
        rec_StylePagination($(this).data("rec_id"));
        rec_SetSlide($(this).data("page"));
    });

    $(".news-circle").click(function(){
        news_StylePagination($(this).data("news_id"));
        news_SetSlide($(this).data("page"));
    });
    
}
// 

// Paralax Effect

// 
window.addEventListener('scroll', function(){
    let value = window.scrollY;

    
    $("#delivey").css("margin-top", value * 0.4 - 350);
    $("#scrool-item1").css("margin-top", value * 0.4 - 350);
    $("#scrool-item2").css("margin-top", value * 0.4 - 120);
    $("#scrool-item3").css("margin-top", value * 0.4 - 120);
    $("#scrool-item4").css("margin-top", value * 0.3 - 680);
});


//  

// Cataloge

// 
$("#open-cataloge").click(function(){
    $("#cataloge").slideDown();
    $("#close-cataloge").toggle();
});

$("#close-cataloge").click(function(){
    $("#cataloge").slideUp();
    $("#close-cataloge").toggle();
});



$("#close-link").click(function(){
    $("#adaptive-menu").slideToggle();
});

$("#adaptive-menu ul li > a").click(function(){
    $("#adaptive-menu").slideToggle();
});

$("#menu-mobile-link").click(function(){
    $("#adaptive-menu").slideToggle();
});



