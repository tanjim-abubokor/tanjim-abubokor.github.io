const DATA_URL = "https://raw.githubusercontent.com/tanjim-abubokor/tanjim-abubokor.github.io/main/data.json";
const url = window.location.href;

function Visitor(){
    const endpoint = "https://tanjim.pythonanywhere.com/add-visitor";
    let visitorId = null;

    // Initialize the agent at application startup.
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4')
      .then(FingerprintJS => FingerprintJS.load())
  
    // Get the visitor identifier when you need it.
    fpPromise
      .then(fp => fp.get())
      .then(result => {
        // This is the visitor identifier:
        visitorId = result.visitorId;
      })

    // (url,data,function)
    jQuery.post(endpoint, {
        visitor_id: visitorId,
        visited_url: url
    }, 
    function(data){
        console.log(data)
    });
}

function viewAllProjects(event){
    let parentDiv = document.querySelector('div#portfolio');
    let projects = parentDiv.querySelectorAll('ul.owl-carousel.gallery_zoom');
    console.log(projects);
    if(event.textContent == "View More"){
        projects.forEach(project => {
            project.style.display = "block";
        });
        event.textContent = "View Less";
    }else{
        for(let i = 3; i < projects.length; i++){
            let project = projects[i];
            project.style.display = "none";
            event.textContent = "View More";
        }
    }
}

function fetchData(){
    fetch(DATA_URL)
      .then(data => data.json())
      .then(data => {
          document.title = data.page_title;
          
          home(data);
          about(data);
          service(data);
          project(data);
          testimonial(data);
          blog(data);
          contact(data);
          sidebar(data);
      })
      .catch(error => console.error('Error:', error));
}

function sidebar(data){
    let topbar = document.querySelector('div.elisc_tm_topbar');
    let mobilebar = document.querySelector('div.elisc_tm_mobile_menu');
    let sidebar = document.querySelector('div.elisc_tm_sidebar');

    data = data.sidebar;

    topbar.querySelector('div.logo').querySelector('img').src = data.logo;
    topbar.querySelector('div.logo').querySelector('span').textContent = data.textLogo;
    
    mobilebar.querySelector('div.avatar').querySelector('div.image').setAttribute('data-img-url', data.profile);
    mobilebar.querySelector('div.copyright').querySelector('p').textContent = data.copyright;
    mobilebar.querySelector('div.social').querySelector('ul').innerHTML = "";

    sidebar.querySelector('div.image').querySelector('div.main').setAttribute('data-img-url', data.profile);
    sidebar.querySelector('div.name').querySelector('h3').innerHTML = `<span>Tanjim<span class="back">${data.name}</span></span>`;
    sidebar.querySelector('div.copyright').querySelector('div.text').textContent = data.copyright;
    sidebar.querySelector('div.social').querySelector('ul').innerHTML = "";

    data.social.forEach(social => {
        mobilebar.querySelector('div.social').querySelector('ul').innerHTML += `<li><a href="${social.link}" target="_blank"><img src="${social.logo}" alt /></a></li>`;

        sidebar.querySelector('div.social').querySelector('ul').innerHTML += `<li><a href="${social.link}" target="_blank"><img src="${social.logo}" alt /></a></li>`;
    })
}

function home(data){
    let title = document.querySelector('div#home-title');
    let subtitle = document.querySelector('div#home-subtitle');
    let button = document.querySelector('div#home-button');
    let contact = document.querySelector('ul#home-contact');
    let heroImage = document.querySelector('img#hero-image');

    let contactInfo = data.contact;
    console.log(contactInfo.contacts);
    data = data.home;
    title.innerHTML = data.title;
    subtitle.innerHTML = data.subtitle;
    button.innerHTML = ""; //making contents empty
    for (let button_ of data.buttons){
        button.innerHTML += `<div class="elisc_tm_button">
        <a class="anchor" href="index.html#${button_.url}">${button_.text}</a>
        </div>
        `;
    }
    contact.innerHTML = ""; //making contents empty
    for (let contact_ of contactInfo.contacts){
        contact.innerHTML += `<li><a href="${contact_.href}">${contact_.contact}</a></li>`;
    }

    heroImage.src = data.heroImage;
}

function about(data){
    let title = document.querySelector('div#about-title');
    let button = document.querySelector('div#about-button');
    let contact = document.querySelector('ul#about-contact');
    let description = document.querySelector('div#about-text');
    let banner = document.querySelector('ul#about-banner');
    let skill = document.querySelector('ul#about-skill');

    let contactInfo = data.contact;
    data = data.about;
    console.log(data.buttons);
    title.innerHTML = data.title;
    description.innerHTML = data.description;
    button.innerHTML = ""; //making contents empty
    for (let button_ of data.buttons){
        button.innerHTML += `<div class="elisc_tm_button">
        <a class="anchor" href="index.html#${button_.url}">${button_.text}</a>
        </div> 
        `;
    }
    contact.innerHTML = ""; //making contents empty
    for (let contact_ of contactInfo.contacts){
        contact.innerHTML += `<li>
        <span>${contact_.media}</span>
        <span><a href="${contact_.href}" target="_blank">${contact_.contact}</a></span>
        </li>`;
    }
    banner.innerHTML = ""; //making contents empty
    for (let banner_ of data.banner){
        banner.innerHTML += `<li>
        <div class="list_inner">
        <h3>${banner_.years}+</h3>
        <span>${banner_.text}</span>
        </div>
        </li>`;
    }
    skill.innerHTML = ""; // making contents empty
    for (let skill_ of data.skills){
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
    let title = document.querySelector('div#service-title');
    let service = document.querySelector('ul#service_list');
    let thumbnail = document.querySelector('div#service-thumbnail');
    let play_btn = document.querySelector('img#service-vdo-btn');
    let intro_vdo = document.querySelector('a#service-intro-vdo');
    let vdo_title = document.querySelector('div#service-vdo-text');

    data = data.service;
    title.innerHTML = data.title;
    service.innerHTML = "";
    data.services.forEach( service_ => {
        
        service.innerHTML += `
        <li>
        <img class="popup_image" src="${service_.image}" alt />
        <div class="list_inner">
        <div class="details">
        <div class="title">
        <span>${data.services.indexOf(service_)+1}</span>
        <h3>${service_.title}</h3>
        </div>
        <div class="text">
        <p>${service_.short_description}</p>
        </div>
        <div class="elisc_tm_read_more">
        <a href="index.html#">${service_.btn}<span><img class="svg" src="img/svg/rightArrow.svg" alt /></span></a>
        </div>
        </div>
        <a class="elisc_tm_full_link" href="index.html#"></a>

        <div class="hidden_details">
        <div class="descriptions">${service_.description}</div>
        </div>
        </div>
        </li>`;
    });
    thumbnail.setAttribute('data-img-url', data.thumbnail);
    play_btn.src = data.play_btn;
    intro_vdo.href = data.video_url;
    vdo_title.innerHTML = data.video_title;
}

function project(data){
    let parentDiv = document.querySelector('div#portfolio');
    let project = parentDiv.querySelector('div.portfolio_list');
    // let modalBox = parentDiv.querySelector('ul#all_projects_view');
    let button = parentDiv.querySelector('div.elisc_tm_button');

    

    data = data.project;

    if(data.projects.length < 6){
        button.style.display = "none";
    }
    project.querySelector('div.projects').innerHTML = "";
    
    let allProjects = '<ul class="owl-carousel gallery_zoom">';
    console.log(data.projects);
    for (let i = 0; i < data.projects.length; i++) {
        let project_ = data.projects[i];

        if (i%3 == 0) {
            if(i>5){
                allProjects += '</ul><ul class="owl-carousel gallery_zoom" style="display: none;">';
            }else{
                allProjects += '</ul><ul class="owl-carousel gallery_zoom">';
            }
        }

        if (project_.type.toLowerCase() == "video"){
            let htmlCode = `
                <li>
                    <div class="list_inner">
                    <div class="image">
                    <img src="img/thumbs/31-36.jpg" alt />
                    <div class="main" data-img-url="${project_.thumbnail}"></div>
                    <a class="elisc_tm_full_link popup-youtube" href="${project_.url}"></a>
                    </div>
                    <div class="details">
                    <span class="category"><a href="index.html#">Video</a></span>
                    <h3 class="title"><a class="line_effect popup-youtube" href="${project_.url}">${project_.title}</a></h3>
                    </div>
                    </div>
                </li>
            `;
            allProjects += htmlCode;
        }else{
            let htmlCode= `
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
                    <span>Alvaro Morata</span>
                    </li>
                    <li>
                    <span class="first">Category</span>
                    <span><a href="index.html#">Modalbox</a></span>
                    </li>
                    <li>
                    <span class="first">Date</span>
                    <span>${project_.date}</span>
                    </li>
                    <li>
                    <span class="first">Share</span>
                    <ul class="share">
                    <li><a href="index.html#"><img class="svg" src="img/svg/social/facebook.svg" alt /></a></li>
                    <li><a href="index.html#"><img class="svg" src="img/svg/social/twitter.svg" alt /></a></li>
                    <li><a href="index.html#"><img class="svg" src="img/svg/social/instagram.svg" alt /></a>
                    </li>
                    </ul>
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
        
    };
    allProjects += '</ul>';
    project.querySelector('div.projects').innerHTML = allProjects;
}

function testimonial(data){
    let parentDiv = document.querySelector('div.elisc_tm_testimonial_wrapper');
    let testimonial = parentDiv.querySelector('ul.owl-carousel.owl-theme');
    let clientDiv = document.querySelector('div.elisc_tm_partners');

    data = data.testimonial;
    testimonial.innerHTML = "";
    if(data !== undefined){
        data.testimonials.forEach(testimonial_ => {
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
    }else{
        parentDiv.remove();
        clientDiv.remove();
    }
}

function blog(data){
    let parentDiv = document.querySelector('div#news');
    let leftSide = parentDiv.querySelector('div.elisc_tm_sticky_section');
    let blog = parentDiv.querySelector('ul#blogs');

    data = data.blog;

    leftSide.querySelector('span').textContent = data.title;
    leftSide.querySelector('h3').textContent = data.heading;

    data.buttons.forEach(button => {
        leftSide.innerHTML += `
            <div class="elisc_tm_button">
                <a class="anchor" href="${button.url}">${button.text}</a>
            </div>
        `;
    });

    blog.innerHTML = "";
    data.blogs.forEach(blog_ => {
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

function contact(data){
    let parentDiv = document.querySelector('div#contact');
    let leftSide = parentDiv.querySelector('div.left');
    let contact = leftSide.querySelector('div.info').querySelector('ul');
    let button = parentDiv.querySelector('a#send_message');
    let location = parentDiv.querySelector('iframe');

    data = data.contact;

    button.textContent = data.btn_text;
    leftSide.querySelector('span').textContent = data.title;
    leftSide.querySelector('h3').textContent = data.heading;
    leftSide.querySelector('div.text').querySelector('p').textContent = data.text;
    location.src = data.location;

    contact.innerHTML = "";
    data.contacts.forEach(contact_ => {
        contact.innerHTML += `
            <li>
                <a href="${contact_.href}">${contact_.contact}</a>
            </li>
        `;

    })
}

fetchData()
Visitor()
