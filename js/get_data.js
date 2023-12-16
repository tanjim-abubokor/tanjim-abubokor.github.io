const domain = "https://tanjim.pythonanywhere.com";
const full_url = window.location.href;
const url = full_url.split("?")[0]; // host url

function Visitor(){
    const endpoint = "/add-visitor";
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
    jQuery.post(domain+endpoint, {
        visitor_id: visitorId,
        visited_url: full_url
    }, 
    function(data){

    });
}

function Sidebar(){

    const endpoint = "/get-sidebar"
    let name = document.querySelectorAll("span.name");
    let menus = document.querySelectorAll("ul.menus");
    let social = document.querySelectorAll("ul.social_links");
    let profile = document.querySelectorAll("div.profileImg");
    let logo = document.querySelector("img#logo");
    let copyright = document.querySelectorAll("p.copyrightText")
    console.log("Running....");
    $.getJSON(domain+endpoint)
    .done(function(response) {
        logo.src = domain+response.logo;

        name.forEach(element => {
            element.innerHTML = `${response.name}<span class="back">${response.name}</span>`;
        });

        profile.forEach(element => {
            element.style.backgroundImage = "url(" + domain+response.profile + ")"
        });

        menus.forEach(element => {
            element.innerHTML = "";
            response.menus.forEach(menu => {
                element.innerHTML += '<li id='+menu.name+'><a href="'+menu.link+'">'+menu.name+'</a></li>';
            });
        });

        social.forEach(element => {
            console.log(response.social);
            element.innerHTML = "";
            response.social.forEach(s => {
                element.innerHTML += '<li><a href="'+s.link+'" target="_blank" ><img class="" src="'+domain+s.logo+'" alt /></a></li>';
            })
        });

        copyright.forEach(element => {
            element.textContent = response.copyright;
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error:', errorThrown);
    });
}

function Home(){
    const endpoint = "/get-home";

    setTimeout(function() {
        let pages = document.querySelectorAll("li#Home");
        pages.forEach(page => {
            page.setAttribute("class", "current");
        });
    },1000)

    let title = document.querySelector("div#hometitle");
    let subtitle = document.querySelector("div.subtitle");
    let image = document.querySelector("img#heroImg");
    let buttons = document.querySelector("div.buttons");
    let contact = document.querySelector("ul.contact-info");

    $.getJSON(domain+endpoint)
    .done(function(response) {

        document.title = response.page_title;
        title.innerHTML = response.title;
        subtitle.innerHTML = response.subtitle;
        image.src = domain+response.image;

        buttons.innerHTML = "";
        response.buttons.forEach( element => {
            buttons.innerHTML += `
                <div class="elisc_tm_button">
                    <a class="anchor" href="${element.url}">${element.text}</a>
                </div>
            `
        });

        contact.innerHTML = "";
        response.contact.forEach( element => {
            contact.innerHTML += '<li><a href="#">'+element.contact+'</a></li>';
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error:', errorThrown);
    });
}

function About(){
    const endpoint = "/get-about";

    setTimeout(function() {
        let pages = document.querySelectorAll("li#About");
        pages.forEach(page => {
            page.setAttribute("class", "current");
        });
    },1000)

    let title = document.querySelector("div#about-title");
    let skills = document.querySelector("ul#skills");
    let description = document.querySelector("div#about-text");
    let buttons = document.querySelector("div.about-btn");
    let contact = document.querySelector("ul#about-info");

    $.getJSON(domain+endpoint)
    .done(function(response) {

        document.title = response.page_title;
        title.innerHTML = response.title;
        description.innerHTML = response.description;
        buttons.innerHTML = '<a class="anchor" href="'+response.btn_link+'">'+response.btn_text+'</a>';

        contact.innerHTML = "";
        response.contact.forEach( element => {
            contact.innerHTML += `<li>
            <span>${element.media}</span>
            <span><a class="href_location" href="">${element.contact}</a></span>
            </li>`;
        });

        skills.innerHTML = "";
        response.skills.forEach(element => {
            skills.innerHTML += `<li>
            <div class="list_inner">
            <div class="short">
            <div class="job">
            <span class="yellowColor">${element.date}</span>
            <h3>${element.field}</h3>
            </div>
            <div class="place">
            <span>${element.subtitle}</span>
            </div>
            </div>
            <div class="text">
            <p>${element.text}</p>
            </div>
            <span class="yellowColor">${element.skill}</span>
            </div>
            </li>`;
        })
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error:', errorThrown);
    });
}

function Service(){
    const endpoint = "/get-service";
    
    setTimeout(function() {
        let pages = document.querySelectorAll("li#Services");
        pages.forEach(page => {
            page.setAttribute("class", "current");
        });
    },1000)

    let service_holder = document.querySelector('ul#service-holder');
    let video_thumbnail = document.querySelector('div#video-thumbnail');
    let v_play_btn = document.querySelector('img#v-play-btn');
    let video_title = document.querySelector('h3#video-title');
    let video_url = document.querySelector('a#video-url');

    $.getJSON(domain+endpoint)
    .done(function(response) {

        service_holder.innerHTML = "";
        i = 1;
        response.services.forEach(service => {
            document.title = service.page_title;
            service_holder.innerHTML += `
                <li>
                <div class="list_inner">
                <div class="details">
                <div class="title">
                <span>${i}</span>
                <h3>${service.title}</h3>
                </div>
                <div class="text">
                <p>${service.description}</p>
                </div>
                <div class="take-service">
                <a href="${service.btn_link}">${service.btn}<span><img class="svg" src="img/svg/rightArrow.svg" alt /></span></a>
                </div>
                </div>
                </div>
                </li>
            `;

            i++
        });

        video_thumbnail.style.backgroundImage = 'url('+domain+response.thumbnail+')';
        v_play_btn.src = domain+response.play_btn;
        video_title.textContent = response.video_title
        video_url.href = response.video_url;
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error:', errorThrown);
    });
}

function Project(){
    const endpoint = "/get-project";
    
    setTimeout(function() {
        let pages = document.querySelectorAll("li#Projects");
        pages.forEach(page => {
            page.setAttribute("class", "current");
        });
    },1000)

    function DisplayProjectDetails() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let project_id = urlParams.get("project");
        setTimeout(function(){
            if(project_id != null){
                let get_project = document.querySelector("a."+project_id);
                get_project.click();
    
            }
        },2000)
    }

    function DisplayProject(){
        let project_holder = document.querySelector('ul#project-holder');
        let testimonials = document.querySelector('ul#testimonials');
        let testimonial_body = document.querySelector('div.elisc_tm_testimonial_wrapper');

        $.getJSON(domain+endpoint)
        .done(function(response) {

            project_holder.innerHTML = "";
            i = 1;
            response.projects.forEach(project => {
                document.title = project.page_title;
                project_holder.innerHTML += `
                    <li>
                    <div class="list_inner">
                    <div class="details">
                    <div class="title">
                    <span>${i}</span>
                    <h3>${project.title}</h3>
                    </div>
                    <div class="text">
                    <p>${project.short_text}</p>
                    </div>
                    <div class="elisc_tm_read_more">
                    <a>Read More<span><img class="svg" src="img/svg/rightArrow.svg" alt /></span></a>
                    </div>
                    </div>
                    <a class="elisc_tm_full_link project-${project.id}"></a>
                    
                    <div class="hidden_details">
                    <span style="float:right" onclick="copyShareLink(this)"><u>Copy Share link</u> <input type="hidden" value="${url}?project=project-${project.id}"></span>
                    <iframe width="100%" height="400px" src="${project.video}" title="Project Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <div class="project-des" style="margin-top: 10px;">
                    ${project.description}
                    </div>
                    </div>
                    
                    </div>
                    </li>
                `;

                i++
            });
            console.log(response);
            if(response.testimonials != null){
                testimonials.innerHTML = "";
                response.testimonials.forEach(testimonial => {
                    testimonials.innerHTML += `
                        <li>
                        <div class="text">
                        <p>${testimonial.description}</p>
                        </div>
                        <div class="short">
                        <div class="detail">
                        <h3>${testimonial.name}</h3>
                        </div>
                        </div>
                        <p class="job">${testimonial.service}</p>
                        </li>
                    `;
                });
            }else{
                testimonial_body.style.display = 'none';
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
        });
    }

    DisplayProject()
    document.addEventListener("DOMContentLoaded", DisplayProjectDetails);

}

function Blog(){
    const endpoint = "/get-blog";

    setTimeout(function() {
        let pages = document.querySelectorAll("li#Blog");
        pages.forEach(page => {
            page.setAttribute("class", "current");
        });
    },1000)

        
    function DisplayBlogDetails() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let blog_id = urlParams.get("blog");
        setTimeout(function(){
            if(blog_id != null){
                let get_blog = document.querySelector("a."+blog_id);
                console.log("The blog is: ",get_blog);
                get_blog.click();
                
            }
        },2000)
    }
        
    function DisplayBlog(){
        let blogs = document.querySelector("ul#blogs");
        $.getJSON(domain + endpoint)
        .done(function(response) {
            blogs.innerHTML = "";
            response.blogs.forEach(blog =>{
                document.title = blog.page_title;
                blogs.innerHTML += `
                    <li>
                    <img class="popup_image" src="${blog.image}" alt />
                    <div class="list_inner">
                    <div class="info">
                    <div class="meta">
                    <img class="svg" src="img/svg/calendar.svg" alt /> <span>${blog.date}</span>
                    </div>
                    <div class="title">
                    <h3><a >${blog.title}</a></h3>
                    </div>
                    </div>
                    <div class="elisc_tm_read_more">
                    <a class="line_effect blog-${blog.id}">Learn More<span><img class="svg" src="img/svg/rightArrow.svg" alt /></span></a>
                    </div>

                    <div class="news_hidden_details">
                    <span style="float:right" onclick="copyShareLink(this)"><u>Copy Share link</u> <input type="hidden" value="${url}?blog=blog-${blog.id}"></span>
                    <div class="news_popup_informations">
                    <div class="text">
                    ${blog.description}
                    </div>
                    </div>
                    </div>
                    </div>
                    </li>
                `;
            });
        })
        .fail(function(jhq,textSatus,error){
            console.error('Error:',error);
        });

        console.log("All The blogs loaded");
    } // end DisplayBlog function

    DisplayBlog();

    document.addEventListener("DOMContentLoaded", DisplayBlogDetails);
}

function Contact(){
    const endpoint = "/get-contact";

    setTimeout(function() {
        let pages = document.querySelectorAll("li#Contact");
        pages.forEach(page => {
            page.setAttribute("class", "current");
        });
    },1000)

    let text = document.querySelector("div#contact-text");
    let contacts = document.querySelector("ul#contact-holder");
    let location = document.querySelector("iframe#gmap_canvas");
    let btn = document.querySelector("a.mail_submit_btn");

    $.getJSON(domain+endpoint)
    .done(function(response){
        document.title = response.page_title;
        contacts.innerHTML = "";
        response.contacts.forEach( element => {
            contacts.innerHTML += '<li><a href="#">'+element.contact+'</a></li>';
        });

        text.innerHTML = "<p>"+response.text+"</p>";
        location.src = response.location;
        btn.textContent = response.btn_text;
    })
    .fail(function(jhql,textStatus,error){
        console.error("Error: ",error);
    });
}

function copyShareLink(event){
    console.log(event)
    let span = event.querySelector("u");
    let link = event.querySelector('input[type="hidden"]');

    navigator.clipboard.writeText(link.value)
        .then(function() {
            span.textContent = "Copied"
            setTimeout(function(){
                span.textContent = "Copy Share Link"
            },3000)
        })
        .catch(function(err) {
            console.error('Unable to copy text to clipboard', err);
        });
}

Sidebar()
