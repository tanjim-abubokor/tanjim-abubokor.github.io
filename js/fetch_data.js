const DATA_URL = "https://tanjim.pythonanywhere.com/get-all";
const url = window.location.href;

function Visitor() {
  const endpoint = "https://tanjim.pythonanywhere.com/add-visitor";
  let visitorId = null;

  // Initialize the agent at application startup.
  const fpPromise = import("https://openfpcdn.io/fingerprintjs/v4").then(
    (FingerprintJS) => FingerprintJS.load()
  );

  // Get the visitor identifier when you need it.
  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      // This is the visitor identifier:
      visitorId = result.visitorId;
    });

  // (url,data,function)
  jQuery.post(
    endpoint,
    {
      visitor_id: visitorId,
      visited_url: url,
    },
    function (data) {
      console.log(data);
    }
  );
}

function viewAllProjects(event) {
  let parentDiv = document.querySelector("div#portfolio");
  let projects = parentDiv.querySelectorAll("ul.owl-carousel.gallery_zoom");
  console.log(projects);
  if (event.textContent == "View More") {
    projects.forEach((project) => {
      project.style.display = "block";
    });
    event.textContent = "View Less";
  } else {
    for (let i = 3; i < projects.length; i++) {
      let project = projects[i];
      project.style.display = "none";
      event.textContent = "View More";
    }
  }
}

async function fetchData() {
  fetch(DATA_URL)
    .then((data) => data?.json())
    .then((data) => {
      document.title = data?.page_title;

      home(data);
      about(data);
      service(data);
      project(data);
      testimonial(data);
      blog(data);
      contact(data);
      sidebar(data);
    })
    .catch((error) => console.error("Error:", error));
}

function sidebar(data) {
  let topbar = document.querySelector("div.elisc_tm_topbar");
  let mobilebar = document.querySelector("div.elisc_tm_mobile_menu");
  let sidebar = document.querySelector("div.elisc_tm_sidebar");

  data = data?.sidebar;

  topbar.querySelector("div.logo").querySelector("img").src = data?.logo;
  topbar.querySelector("div.logo").querySelector("span").textContent =
    data?.textLogo;

  mobilebar
    .querySelector("div.avatar")
    .querySelector("div.image").style.backgroundImage = `url(${data?.profile})`;
  mobilebar.querySelector("div.copyright").querySelector("p").textContent =
    data?.copyright;
  mobilebar.querySelector("div.social").querySelector("ul").innerHTML = "";

  sidebar
    .querySelector("div.image")
    .querySelector("div.main")
    .setAttribute("data-img-url", data?.profile);
  sidebar
    .querySelector("div.name")
    .querySelector(
      "h3"
    ).innerHTML = `<span>Tanjim<span class="back">${data?.name}</span></span>`;
  sidebar.querySelector("div.copyright").querySelector("div.text").textContent =
    data?.copyright;
  sidebar.querySelector("div.social").querySelector("ul").innerHTML = "";

  data?.social?.forEach((social) => {
    mobilebar
      .querySelector("div.social")
      .querySelector(
        "ul"
      ).innerHTML += `<li><a href="${social?.link}" target="_blank"><img src="${social?.logo}" alt /></a></li>`;

    sidebar
      .querySelector("div.social")
      .querySelector(
        "ul"
      ).innerHTML += `<li><a href="${social?.link}" target="_blank"><img src="${social?.logo}" alt /></a></li>`;
  });
}

function home(data) {
  let title = document.querySelector("div#home-title");
  let subtitle = document.querySelector("div#home-subtitle");
  let button = document.querySelector("div#home-button");
  let contact = document.querySelector("ul#home-contact");
  let heroImage = document.querySelector("img#hero-image");

  let contactInfo = data?.contact;
  console.log(contactInfo?.contacts);
  data = data?.home;
  title.innerHTML = data?.title;
  subtitle.innerHTML = data?.subtitle;
  button.innerHTML = ""; // Clear existing content
  for (let button_ of data?.buttons) {
    // Create an anchor element
    let anchor = document.createElement("a");
    anchor.className = "anchor";
    anchor.href = button_.url;
    anchor.textContent = button_.text;

    // Add attributes from the attributes array
    if (button_.attributes && Array.isArray(button_.attributes)) {
      for (let attr of button_.attributes) {
        for (let key in attr) {
          anchor.setAttribute(key, attr[key]);
        }
      }
    }

    // Append the anchor inside a container div
    let div = document.createElement("div");
    div.className = "elisc_tm_button";
    div.appendChild(anchor);

    // Add to the button container
    button.appendChild(div);
  }

  contact.innerHTML = ""; //making contents empty
  for (let contact_ of contactInfo?.contacts) {
    contact.innerHTML += `<li><a href="${contact_.href}">${contact_.contact}</a></li>`;
  }

  heroImage.src = data?.heroImage;
}

function about(data) {
  let title = document.querySelector("div#about-title");
  let button = document.querySelector("div#about-button");
  let contact = document.querySelector("ul#about-contact");
  let description = document.querySelector("div#about-text");
  let banner = document.querySelector("ul#about-banner");
  let skill = document.querySelector("ul#about-skill");

  let contactInfo = data?.contact;
  data = data?.about;
  console.log(data?.buttons);
  title.innerHTML = data?.title;
  description.innerHTML = data?.description;
  button.innerHTML = ""; //making contents empty
  for (let button_ of data?.buttons) {
    button.innerHTML += `<div class="elisc_tm_button">
        <a class="anchor" href="index.html#${button_.url}">${button_.text}</a>
        </div> 
        `;
  }
  contact.innerHTML = ""; //making contents empty
  for (let contact_ of contactInfo?.contacts) {
    contact.innerHTML += `<li>
        <span>${contact_.media}</span>
        <span><a href="${contact_.href}" target="_blank">${contact_.contact}</a></span>
        </li>`;
  }
  banner.innerHTML = ""; //making contents empty
  for (let banner_ of data?.banner) {
    banner.innerHTML += `<li>
        <div class="list_inner">
        <h3>${banner_.years}+</h3>
        <span>${banner_.text}</span>
        </div>
        </li>`;
  }
  skill.innerHTML = ""; // making contents empty
  for (let skill_ of data?.skills) {
    skill.innerHTML += `<li>
        <div class="list_inner">
        <div class="short">
        <div class="job">
        <span class="yellowColor">${skill_.date}</span>
        <h3>${skill_.field}</h3>
        </div>
        <div class="place">
        <span>-${skill_.subtitle}</span>
        </div>
        </div>
        <div class="text">
        <p>${skill_.text}</p>
        </div>
        <b>Skills</b>: <span style="color:green">${skill_.skill}</span>
        </div>
        </li>`;
  }
}

function service(data) {
  let title = document.querySelector("div#service-title");
  let service = document.querySelector("ul#service_list");
  let thumbnail = document.querySelector("div#service-thumbnail");
  let play_btn = document.querySelector("img#service-vdo-btn");
  let intro_vdo = document.querySelector("a#service-intro-vdo");
  let vdo_title = document.querySelector("div#service-vdo-text");

  data = data?.service;
  title.innerHTML = data?.title;
  service.innerHTML = "";
  data?.services.forEach((service_) => {
    service.innerHTML += `
        <li>
        <img class="popup_image" src="${service_?.image}" alt />
        <div class="list_inner">
        <div class="details">
        <div class="title">
        <span>${data?.services.indexOf(service_) + 1}</span>
        <h3>${service_?.title}</h3>
        </div>
        <div class="text">
        <p>${service_?.short_description}</p>
        </div>
        <div class="elisc_tm_read_more">
        <a href="index.html#">${
          service_?.btn
        }<span><img class="svg" src="img/svg/rightArrow.svg" alt /></span></a>
        </div>
        </div>
        <a class="elisc_tm_full_link" href="index.html#"></a>

        <div class="hidden_details">
        <div class="descriptions">${service_?.description}</div>
        </div>
        </div>
        </li>`;
  });

  if (data?.show_intro_video) {
    thumbnail.setAttribute("data-img-url", data?.thumbnail);
    play_btn.src = data?.play_btn;
    intro_vdo.href = data?.video_url;
    vdo_title.innerHTML = data?.video_title;
  } else {
    thumbnail.parentNode.style.display = "none";
  }
}

function project(data) {
  let parentDiv = document.querySelector("div#portfolio");
  let project = parentDiv.querySelector("div.portfolio_list");
  // let modalBox = parentDiv.querySelector('ul#all_projects_view');
  let button = parentDiv.querySelector("div.elisc_tm_button");

  data = data?.project;

  if (data?.projects.length < 6) {
    button.style.display = "none";
  }
  project.querySelector("div.projects").innerHTML = "";

  let allProjects = '<ul class="owl-carousel gallery_zoom">';
  console.log(data?.projects);
  for (let i = 0; i < data?.projects.length; i++) {
    let project_ = data?.projects[i];

    if (i % 3 == 0) {
      if (i > 5) {
        allProjects +=
          '</ul><ul class="owl-carousel gallery_zoom" style="display: none;">';
      } else {
        allProjects += '</ul><ul class="owl-carousel gallery_zoom">';
      }
    }

    if (
      project_?.type?.toLowerCase() == "video" ||
      project_?.video ||
      project_?.video_url
    ) {
      let htmlCode = `
                <li>
                    <div class="list_inner">
                    <div class="image">
                    <img src="img/thumbs/31-36.jpg" alt />
                    <div class="main" data-img-url="${
                      project_?.thumbnail || project_?.image
                    }"></div>
                    <a class="elisc_tm_full_link popup-youtube" href="${
                      project_.url
                    }"></a>
                    </div>
                    <div class="details">
                    <span class="category"><a href="index.html#">Video</a></span>
                    <h3 class="title"><a class="line_effect popup-youtube" href="${
                      project_.url
                    }">${project_.title}</a></h3>
                    </div>
                    </div>
                </li>
            `;
      allProjects += htmlCode;
    } else {
      let htmlCode = `
                <li>
                    <div class="list_inner">
                    <div class="image">
                    <img src="img/thumbs/31-36.jpg" alt />
                    <div class="main" data-img-url="${project_.image}"></div>
                    <a class="elisc_tm_full_link portfolio_popup" href="index.html#"></a>
                    </div>
                    <div class="details">
                    <span class="category"><a href="index.html#">Blog</a></span>
                    <h3 class="title"><a class="line_effect portfolio_popup" href="index.html#">${project_.title}</a></h3>
                    </div>
                    </div>
                    
                    <div class="hidden_content_portfolio">
                    <div class="popup_details">
                    <div class="main_details">
                    <div class="textbox">
                    ${project_.description}
                    </div>
                    <div class="detailbox">
                    <ul>
                    <li>
                    <span class="first">Client</span>
                    <span>${project_.client}</span>
                    </li>
                    <li>
                    <span class="first">Source Code</span>
                    <span><a href="${project_.source_code}" style="color:blue" target="_blank">Get Code</a></span>
                    </li>
                    <li>
                    <span class="first">Date</span>
                    <span>${project_.date}</span>
                    </li>
                    </ul>
                    </div>
                    </div>
                    </div>
                    </div>
                </li>
            `;
      allProjects += htmlCode;
    }
  }
  allProjects += "</ul>";
  project.querySelector("div.projects").innerHTML = allProjects;
}

function testimonial(data) {
  let parentDiv = document.querySelector("div.elisc_tm_testimonial_wrapper");
  let testimonial = parentDiv.querySelector("ul.owl-carousel.owl-theme");
  let clientDiv = document.querySelector("div.elisc_tm_partners");

  data = data?.testimonial;
  testimonial.innerHTML = "";
  if (data !== undefined) {
    data?.testimonials.forEach((testimonial_) => {
      testimonial.innerHTML += `
                <li>
                <div class="text">
                <p>${testimonial_.message}</p>
                <p class="job"><b>Project</b>: ${testimonial_.job}</p>
                </div>
                <div class="short">
                <div class="image">
                <div class="main" data-img-url="${testimonial_.image}"></div>
                </div>
                <div class="detail">
                <h3>${testimonial_.name}</h3>
                </div>
                </div>
                </li>
            `;
    });
  } else {
    parentDiv.remove();
    clientDiv.remove();
  }
}

function blog(data) {
  let parentDiv = document.querySelector("div#news");
  let leftSide = parentDiv.querySelector("div.elisc_tm_sticky_section");
  let blog = parentDiv.querySelector("ul#blogs");

  data = data?.blog;

  leftSide.querySelector("span").textContent = data?.title;
  leftSide.querySelector("h3").textContent = data?.heading;

  data?.buttons.forEach((button) => {
    leftSide.innerHTML += `
            <div class="elisc_tm_button">
                <a class="anchor" href="${button.url}">${button.text}</a>
            </div>
        `;
  });

  blog.innerHTML = "";
  data?.blogs.forEach((blog_) => {
    blog.innerHTML += `
            <li>
                <img class="popup_image" src="${blog_.image}" alt />
                <div class="list_inner">
                <div class="info">
                <div class="meta">
                <img class="svg" src="img/svg/calendar.svg" alt /> <span>${blog_.date}</span>
                </div>
                <div class="title">
                <h3><a href="index.html#">${blog_.title}</a></h3>
                </div>
                </div>
                <div class="elisc_tm_read_more">
                <a class="line_effect" href="index.html#">Learn More<span><img class="svg" src="img/svg/rightArrow.svg" alt /></span></a>
                </div>

                <div class="news_hidden_details">
                <div class="news_popup_informations">
                <div class="text">
                ${blog_.description}
                </div>
                </div>
                </div>

                </div>
            </li>
        `;
  });
}

function contact(data) {
  let parentDiv = document.querySelector("div#contact");
  let leftSide = parentDiv.querySelector("div.left");
  let contact = leftSide.querySelector("div.info").querySelector("ul");
  let button = parentDiv.querySelector("a#send_message");
  let location = parentDiv.querySelector("iframe");

  data = data?.contact;

  button.textContent = data?.btn_text;
  leftSide.querySelector("span").textContent = data?.title;
  leftSide.querySelector("h3").textContent = data?.heading;
  leftSide.querySelector("div.text").querySelector("p").textContent =
    data?.text;
  location.src = data?.location;

  contact.innerHTML = "";
  data?.contacts.forEach((contact_) => {
    contact.innerHTML += `
            <li>
                <a href="${contact_.href}">${contact_.contact}</a>
            </li>
        `;
  });
}

function elisc_tm_modalbox() {
  "use strict";
  jQuery(".elisc_tm_all_wrap").prepend(
    `<div class="elisc_tm_modalbox"><div class="box_inner"><div class="close" ><a href="#" style="background-color:#a5b6c4;"><img src="https://raw.githubusercontent.com/tanjim-abubokor/tanjim-abubokor.github.io/b23e751a3a211477de87b2dd52479e030c377d5f/img/svg/close.svg" height="40px" width="40px"></a></div><div class="description_wrap"></div></div></div>`
  );
}
function elisc_tm_movingbox() {
  "use strict";
  var news = jQuery(".elisc_tm_news");
  if (news.length) {
    if (!$(".movingbox").length) {
      $("body").append('<div class="movingbox"></div>');
    }
  }
  var movingbox = jQuery(".movingbox");
  var movingboxH = jQuery(".movingbox").height() / 2;
  var list = jQuery(".elisc_tm_news .list ul li");
  list
    .on("mouseenter", function () {
      var element = jQuery(this);
      var image = element.find(".popup_image").attr("src");
      movingbox.addClass("opened");
      movingbox.css({ backgroundImage: "url(" + image + ")" });
    })
    .on("mouseleave", function () {
      movingbox.removeClass("opened");
    })
    .on("mousemove", function (event) {
      var ymove = event.clientY - movingboxH;
      var xmove = event.clientX + 20;
      movingbox.css({ top: ymove + "px", left: xmove + "px" });
    });
}
function elisc_tm_page_transition() {
  "use strict";
  var section = jQuery(".elisc_tm_section");
  var allLi = jQuery(".transition_link li");
  var button = jQuery(".transition_link a");
  var wrapper = jQuery(".elisc_tm_all_wrap");
  var enter = wrapper.data("enter");
  var exit = wrapper.data("exit");
  button.on("click", function () {
    var element = jQuery(this);
    var href = element.attr("href");
    if (element.parent().hasClass("elisc_tm_button")) {
      jQuery('.menu .transition_link a[href="' + href + '"]').trigger("click");
      hashtag();
      return false;
    }
    var sectionID = jQuery(href);
    var parent = element.closest("li");
    if (!parent.hasClass("active")) {
      allLi.removeClass("active");
      wrapper.find(section).removeClass("animated " + enter);
      if (wrapper.hasClass("opened")) {
        wrapper.find(section).addClass("animated " + exit);
      }
      parent.addClass("active");
      wrapper.addClass("opened");
      wrapper
        .find(sectionID)
        .removeClass("animated " + exit)
        .addClass("animated " + enter);
      jQuery(section).addClass("hidden");
      jQuery(sectionID).removeClass("hidden").addClass("active");
    }
    return false;
  });
}
function elisc_tm_trigger_menu() {
  "use strict";
  var hamburger = jQuery(".elisc_tm_topbar .trigger .hamburger");
  var mobileMenu = jQuery(".elisc_tm_mobile_menu");
  var mobileMenuList = jQuery(".elisc_tm_mobile_menu .menu_list ul li a");
  hamburger.on("click", function () {
    var element = jQuery(this);
    if (element.hasClass("is-active")) {
      element.removeClass("is-active");
      mobileMenu.removeClass("opened");
    } else {
      element.addClass("is-active");
      mobileMenu.addClass("opened");
    }
    return false;
  });
  mobileMenuList.on("click", function () {
    jQuery(".elisc_tm_topbar .trigger .hamburger").removeClass("is-active");
    mobileMenu.removeClass("opened");
    return false;
  });
}
function elisc_tm_menu_closer() {
  "use strict";
  var ww = jQuery(window).width();
  if (ww >= 1040) {
    jQuery(".elisc_tm_mobile_menu").removeClass("opened");
    jQuery(".elisc_tm_topbar .trigger .hamburger").removeClass("is-active");
  }
}
function elisc_tm_experience_popup() {
  "use strict";
  var modalBox = jQuery(".elisc_tm_modalbox");
  var button = jQuery(".elisc_tm_experience .elisc_tm_full_link");
  var closePopup = modalBox.find(".close");
  button.on("click", function () {
    var element = jQuery(this);
    var parent = element.closest(".elisc_tm_experience .list ul li");
    var elImage = parent.find(".popup_image").attr("src");
    var year = parent.find(".job span").text().slice(1);
    var job = parent.find(".job h3").text();
    var place = parent.find(".place span").text().slice(1);
    var content = parent.find(".hidden_details").html();
    modalBox.addClass("opened");
    modalBox.find(".description_wrap").html(content);
    modalBox
      .find(".descriptions")
      .prepend(
        '<div class="top_image"><img src="img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="' +
          elImage +
          '"></div></div>'
      );
    elisc_tm_data_images();
    modalBox
      .find(".descriptions .top_image")
      .after(
        '<div class="infos"><div class="year"><span>' +
          year +
          '</span></div><div class="job"><span>' +
          place +
          "</span><h3>" +
          job +
          "</h3></div></div>"
      );
    return false;
  });
  closePopup.on("click", function () {
    modalBox.removeClass("opened");
    modalBox.find(".description_wrap").html("");
    return false;
  });
}
function elisc_tm_service_popup() {
  "use strict";
  var modalBox = jQuery(".elisc_tm_modalbox");
  var button = jQuery(".elisc_tm_services .service_list .elisc_tm_full_link");
  var closePopup = modalBox.find(".close");
  button.on("click", function () {
    var element = jQuery(this);
    var parent = element.closest(".elisc_tm_services .service_list ul li");
    var elImage = parent.find(".popup_image").attr("src");
    var title = parent.find(".title h3").text();
    var content = parent.find(".hidden_details").html();
    modalBox.addClass("opened");
    modalBox.find(".description_wrap").html(content);
    modalBox
      .find(".descriptions")
      .prepend(
        '<div class="top_image"><img src="img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="' +
          elImage +
          '"></div></div>'
      );
    elisc_tm_data_images();
    modalBox
      .find(".descriptions .top_image")
      .after('<div class="main_title"><h3>' + title + "</h3></div>");
    return false;
  });
  closePopup.on("click", function () {
    modalBox.removeClass("opened");
    modalBox.find(".description_wrap").html("");
    return false;
  });
}
function elisc_tm_modalbox_news() {
  "use strict";
  var modalBox = jQuery(".elisc_tm_modalbox");
  var button = jQuery(
    ".elisc_tm_news .list .title a,.elisc_tm_news .elisc_tm_read_more a"
  );
  var closePopup = modalBox.find(".close");
  button.on("click", function () {
    var element = jQuery(this);
    var parent = element.closest("li");
    var content = parent.find(".news_hidden_details").html();
    var image = parent.find(".popup_image").attr("src");
    var meta = parent.find(".meta").html();
    var title = parent.find(".title h3 a").text();
    modalBox.addClass("opened");
    modalBox.find(".description_wrap").html(content);
    modalBox
      .find(".news_popup_informations")
      .prepend(
        '<div class="image"><img src="img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="' +
          image +
          '"></div></div>'
      );
    modalBox
      .find(".news_popup_informations .image")
      .after(
        '<div class="details"><div class="meta">' +
          meta +
          '</div><div class="title"><h3>' +
          title +
          "</h3></div></div>"
      );
    elisc_tm_data_images();
    return false;
  });
  closePopup.on("click", function () {
    modalBox.removeClass("opened");
    modalBox.find(".description_wrap").html("");
    return false;
  });
}
function elisc_tm_modalbox_portfolio() {
  "use strict";
  var modalBox = jQuery(".elisc_tm_modalbox");
  var button = jQuery(".elisc_tm_portfolio .portfolio_popup");
  button.on("click", function () {
    var element = jQuery(this);
    var parent = element.closest("li");
    var image = parent.find(".image .main").data("img-url");
    var details = parent.find(".hidden_content_portfolio").html();
    var category = parent.find(".details .category").html();
    var title = parent.find(".details .title a").text();
    modalBox.addClass("opened");
    modalBox.find(".description_wrap").html(details);
    modalBox
      .find(".popup_details")
      .prepend(
        '<div class="top_image"><img src="img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="' +
          image +
          '"></div></div>'
      );
    modalBox
      .find(".popup_details .top_image")
      .after(
        '<div class="portfolio_main_title"><span class="category">' +
          category +
          '</span><h3 class="title">' +
          title +
          "</h3></div>"
      );
    elisc_tm_data_images();
    return false;
  });
}
function elisc_tm_preloader() {
  "use strict";
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  )
    ? true
    : false;
  var preloader = $("#preloader");
  if (!isMobile) {
    setTimeout(function () {
      preloader.addClass("preloaded");
    }, 800);
    setTimeout(function () {
      preloader.remove();
    }, 2000);
  } else {
    preloader.remove();
  }
}
function elisc_tm_my_load() {
  "use strict";
  var speed = 500;
  setTimeout(function () {
    elisc_tm_preloader();
  }, speed);
}
function elisc_tm_cursor() {
  "use strict";
  var myCursor = jQuery(".mouse-cursor");
  if (myCursor.length) {
    if ($("body")) {
      const e = document.querySelector(".cursor-inner"),
        t = document.querySelector(".cursor-outer");
      let n,
        i = 0,
        o = !1;
      (window.onmousemove = function (s) {
        o ||
          (t.style.transform =
            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
          (e.style.transform =
            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
          (n = s.clientY),
          (i = s.clientX);
      }),
        $("body").on("mouseenter", "a, .cursor-pointer", function () {
          e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
        }),
        $("body").on("mouseleave", "a, .cursor-pointer", function () {
          ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
            (e.classList.remove("cursor-hover"),
            t.classList.remove("cursor-hover"));
        }),
        (e.style.visibility = "visible"),
        (t.style.visibility = "visible");
    }
  }
}
function elisc_tm_imgtosvg() {
  "use strict";
  jQuery("img.svg").each(function () {
    var jQueryimg = jQuery(this);
    var imgClass = jQueryimg.attr("class");
    var imgURL = jQueryimg.attr("src");
    jQuery.get(
      imgURL,
      function (data) {
        var jQuerysvg = jQuery(data).find("svg");
        if (typeof imgClass !== "undefined") {
          jQuerysvg = jQuerysvg.attr("class", imgClass + " replaced-svg");
        }
        jQuerysvg = jQuerysvg.removeAttr("xmlns:a");
        jQueryimg.replaceWith(jQuerysvg);
      },
      "xml"
    );
  });
}
function elisc_tm_popup() {
  "use strict";
  jQuery(".gallery_zoom").each(function () {
    jQuery(this).magnificPopup({
      delegate: "a.zoom",
      type: "image",
      gallery: { enabled: true },
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
  });
  jQuery(".popup-youtube, .popup-vimeo").each(function () {
    jQuery(this).magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: true,
    });
  });
  jQuery(".soundcloude_link").magnificPopup({
    type: "image",
    gallery: { enabled: true },
  });
}
function elisc_tm_data_images() {
  "use strict";
  var data = jQuery("*[data-img-url]");
  data.each(function () {
    var element = jQuery(this);
    var url = element.data("img-url");
    element.css({ backgroundImage: "url(" + url + ")" });
  });
}
function elisc_tm_contact_form() {
  "use strict";
  jQuery(".contact_form #send_message").on("click", function () {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var loading_msg = document.querySelector(".contact_form div.loading");

    var name = jQuery(".contact_form #name").val();
    var email = jQuery(".contact_form #email").val();
    var message = jQuery(".contact_form #message").val();
    var subject = name + " send a message from your portfolio";
    var success = jQuery(".contact_form .returnmessage").data("success");
    jQuery(".contact_form .returnmessage").empty();
    if (name === "" || email === "" || message === "") {
      jQuery("div.empty_notice").slideDown(500).delay(2000).slideUp(500);
    } else {
      if (emailRegex.test(email)) {
        //display loading message
        loading_msg.style.display = "block";

        // reset The form
        jQuery("#contact_form")[0].reset();

        // send request to server
        jQuery.post(
          "https://tanjim.pythonanywhere.com/get-contact",
          {
            name: name,
            email: email,
            message: message,
            subject: subject,
          },
          function (data) {
            if (data.success) {
              //hide loading message
              loading_msg.style.display = "none";

              jQuery(".contact_form .returnmessage").append(data);
              if (
                jQuery(".contact_form .returnmessage span.contact_error").length
              ) {
                jQuery(".contact_form .returnmessage")
                  .slideDown(500)
                  .delay(2000)
                  .slideUp(500);
              } else {
                jQuery(".contact_form .returnmessage").append(
                  "<span class='contact_success'>" + success + "</span>"
                );
                jQuery(".contact_form .returnmessage")
                  .slideDown(500)
                  .delay(4000)
                  .slideUp(500);
              }
            } else {
              //hide loading message
              loading_msg.style.display = "none";

              jQuery(".contact_form .error_notice")
                .slideDown(500)
                .delay(3000)
                .slideUp(500);
            }

            // console.log(data);
          }
        );
      } else {
        jQuery("div.email_notice").slideDown(500).delay(2000).slideUp(500);
      }
    }
    return false;
  });
}
function elisc_tm_owl_carousel() {
  "use strict";
  var carousel = jQuery(".elisc_tm_testimonials .owl-carousel");
  carousel.owlCarousel({
    loop: true,
    items: 1,
    lazyLoad: false,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 7000,
    rtl: false,
    dots: true,
    nav: false,
    navSpeed: false,
  });
  var carousel2 = jQuery(".elisc_tm_partners .owl-carousel");
  carousel2.owlCarousel({
    loop: true,
    items: 4,
    lazyLoad: false,
    margin: 50,
    autoplay: true,
    autoplayTimeout: 7000,
    dots: true,
    nav: false,
    navSpeed: true,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1040: { items: 4 },
      1200: { items: 4 },
      1600: { items: 4 },
      1920: { items: 4 },
    },
  });
  elisc_tm_imgtosvg();
  var carousel3 = jQuery(".elisc_tm_portfolio .owl-carousel");
  var rtlMode = false;
  if (jQuery("body").hasClass("rtl")) {
    rtlMode = "true";
  }
  carousel3.each(function () {
    var element = jQuery(this);
    element.owlCarousel({
      loop: false,
      items: 3,
      lazyLoad: false,
      margin: 30,
      autoplay: true,
      autoplayTimeout: 7000,
      rtl: rtlMode,
      dots: true,
      nav: false,
      navSpeed: false,
      responsive: { 0: { items: 1 }, 768: { items: 2 }, 1040: { items: 3 } },
    });
    element
      .closest(".elisc_tm_portfolio")
      .find(".next_button")
      .click(function () {
        element.trigger("next.owl.carousel");
        return false;
      });
    element
      .closest(".elisc_tm_portfolio")
      .find(".prev_button")
      .click(function () {
        element.trigger("prev.owl.carousel");
        return false;
      });
  });
}
function elisc_tm_scrollable() {
  "use strict";
  var w = jQuery(window).width();
  var H = jQuery(window).height();
  var spacing = 50;
  if (w <= 1600) {
    spacing = 30;
  }
  var avatarHeight = jQuery(".elisc_tm_sidebar .author").outerHeight();
  var scrollable = jQuery(".elisc_tm_sidebar .menu.scrollable");
  var verMenu = jQuery(".elisc_tm_sidebar .menu");
  var copyright =
    jQuery(".elisc_tm_sidebar .copyright").outerHeight() + spacing;
  verMenu.css({ height: H - avatarHeight - copyright });
  scrollable.each(function () {
    var element = jQuery(this);
    element.css({ height: H - avatarHeight - copyright }).niceScroll({
      touchbehavior: false,
      cursorwidth: 0,
      autohidemode: true,
      cursorborder: "0px solid #eee",
    });
  });
}
function elisc_tm_stickyy() {
  "use strict";
  var el = jQuery(".fn_w_sminiboxes");
  if (el.length) {
    el.each(function (index, element) {
      var child = jQuery(element).find(".fn_w_sminibox");
      child.css({ height: "auto" });
      var W = jQuery(window).width();
      if (W > 1200) {
        var elementHeights = child
          .map(function () {
            return jQuery(this).outerHeight();
          })
          .get();
        var maxHeight = Math.max.apply(null, elementHeights);
        child.css({ height: maxHeight + "px" });
      }
    });
  }
}
jQuery(".anchor_nav")?.onePageNav();
function elisc_tm_down() {
  "use strict";
  jQuery(".anchor").on("click", function () {
    if ($.attr(this, "href") !== "#") {
      $("html, body").animate(
        { scrollTop: $($.attr(this, "href")).offset().top },
        800
      );
    }
    return false;
  });
}
function elisc_tm_location() {
  "use strict";
  var button = jQuery(".href_location");
  button.on("click", function () {
    var element = jQuery(this);
    var address = element.text();
    address = address.replace(/\ /g, "+");
    var text = "https://maps.google.com?q=";
    window.open(text + address);
    return false;
  });
}

Visitor();

(async () => {
  await fetchData();

  setTimeout(() => {
      elisc_tm_modalbox();
      elisc_tm_movingbox();
      elisc_tm_page_transition();
      elisc_tm_trigger_menu();
      elisc_tm_service_popup();
      elisc_tm_experience_popup();
      elisc_tm_modalbox_news();
      elisc_tm_modalbox_portfolio();
      elisc_tm_cursor();
      elisc_tm_imgtosvg();
      elisc_tm_popup();
      elisc_tm_data_images();
      elisc_tm_contact_form();
      elisc_tm_owl_carousel();
      elisc_tm_scrollable();
      elisc_tm_stickyy();
      elisc_tm_down();
      elisc_tm_location();
      jQuery(window).load("body", function () {
        elisc_tm_my_load();
      });
      jQuery(window).on("resize", function () {
        elisc_tm_menu_closer();
      });
  },500);
  
})();

