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
                    <a href="project-details.html?project=${project.title}@${project.id}@${project.date}">Read More<span><img class="svg" src="img/svg/rightArrow.svg" alt /></span></a>
                    </div>
                    </div>
                    <a class="elisc_tm_full_link project-${project.id}" href="project-details.html?project=${project.title}@${project.id}@${project.date}"></a>  
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

function ProjectDetails(){
    const endpoint = "/get-project-details"

    function GetProjectParams() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let project = urlParams.get("project");
        return project;
    }

    let project_holder = document.querySelector("div.project_details");
    jQuery.post(domain+endpoint,{
        project: GetProjectParams()
    },
    function(response){
        if (response.status == 200) {
            let project = response.project;
            document.title = project.page_title;

            let thumbnail;
            if (project.video != null) {
                thumbnail = '<iframe width="750px" height="400px" src="'+project.video+'" title="Project Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
            
            } else if(project.image != null){
                thumbnail = '<img class="main" src="'+project.image+'" style="max-height: 350px; display:block;  max-width:fit-content;">';
            }
            project_holder.innerHTML = `
            <div class="news_popup_informations">
                <div class="image" style="margin-bottom: 20px;">
                    <img src="img/thumbs/4-2.jpg" alt="">
                    <img class="main" src="${project.image ? project.image:''}" style="max-height: 350px; display:block;  max-width:fit-content;">
                    ${thumbnail ? thumbnail:''}
                </div>
                <div class="details">
                    <div class="meta">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="svg replaced-svg">
                <path d="M6.66602 4.7915C6.32435 4.7915 6.04102 4.50817 6.04102 4.1665V1.6665C6.04102 1.32484 6.32435 1.0415 6.66602 1.0415C7.00768 1.0415 7.29102 1.32484 7.29102 1.6665V4.1665C7.29102 4.50817 7.00768 4.7915 6.66602 4.7915Z" fill="#55527C"></path>
                <path d="M13.334 4.7915C12.9923 4.7915 12.709 4.50817 12.709 4.1665V1.6665C12.709 1.32484 12.9923 1.0415 13.334 1.0415C13.6757 1.0415 13.959 1.32484 13.959 1.6665V4.1665C13.959 4.50817 13.6757 4.7915 13.334 4.7915Z" fill="#55527C"></path>
                <path d="M17.0827 8.2002H2.91602C2.57435 8.2002 2.29102 7.91686 2.29102 7.5752C2.29102 7.23353 2.57435 6.9502 2.91602 6.9502H17.0827C17.4243 6.9502 17.7077 7.23353 17.7077 7.5752C17.7077 7.91686 17.4243 8.2002 17.0827 8.2002Z" fill="#55527C"></path>
                <path d="M13.3333 18.9584H6.66667C3.625 18.9584 1.875 17.2084 1.875 14.1667V7.08335C1.875 4.04169 3.625 2.29169 6.66667 2.29169H13.3333C16.375 2.29169 18.125 4.04169 18.125 7.08335V14.1667C18.125 17.2084 16.375 18.9584 13.3333 18.9584ZM6.66667 3.54169C4.28333 3.54169 3.125 4.70002 3.125 7.08335V14.1667C3.125 16.55 4.28333 17.7084 6.66667 17.7084H13.3333C15.7167 17.7084 16.875 16.55 16.875 14.1667V7.08335C16.875 4.70002 15.7167 3.54169 13.3333 3.54169H6.66667Z" fill="#55527C"></path>
                <path d="M7.08333 12.0834C6.975 12.0834 6.86666 12.0584 6.76666 12.0167C6.66666 11.975 6.57501 11.9167 6.49167 11.8417C6.41667 11.7584 6.35832 11.6667 6.31666 11.5667C6.27499 11.4667 6.25 11.3584 6.25 11.25C6.25 11.0334 6.34167 10.8167 6.49167 10.6584C6.57501 10.5834 6.66666 10.525 6.76666 10.4834C6.91666 10.4167 7.08334 10.4 7.25001 10.4334C7.30001 10.4417 7.35 10.4584 7.4 10.4834C7.45 10.5 7.5 10.525 7.55 10.5584C7.59166 10.5917 7.63333 10.625 7.67499 10.6584C7.70833 10.7 7.74999 10.7417 7.77499 10.7834C7.80832 10.8334 7.83334 10.8834 7.85001 10.9334C7.87501 10.9834 7.89168 11.0334 7.90001 11.0834C7.90834 11.1417 7.91667 11.1917 7.91667 11.25C7.91667 11.4667 7.82499 11.6834 7.67499 11.8417C7.51666 11.9917 7.3 12.0834 7.08333 12.0834Z" fill="#55527C"></path>
                <path d="M9.99935 12.0832C9.78268 12.0832 9.56602 11.9916 9.40769 11.8416C9.37436 11.7999 9.34103 11.7582 9.30769 11.7166C9.27436 11.6666 9.24934 11.6166 9.23267 11.5666C9.20767 11.5166 9.19101 11.4666 9.18267 11.4166C9.17434 11.3582 9.16602 11.3082 9.16602 11.2499C9.16602 11.1416 9.191 11.0332 9.23267 10.9332C9.27434 10.8332 9.33269 10.7416 9.40769 10.6582C9.64102 10.4249 10.016 10.3499 10.316 10.4832C10.4244 10.5249 10.5077 10.5832 10.591 10.6582C10.741 10.8166 10.8327 11.0332 10.8327 11.2499C10.8327 11.3082 10.8244 11.3582 10.816 11.4166C10.8077 11.4666 10.791 11.5166 10.766 11.5666C10.7494 11.6166 10.7243 11.6666 10.691 11.7166C10.6577 11.7582 10.6243 11.7999 10.591 11.8416C10.5077 11.9166 10.4244 11.9749 10.316 12.0166C10.216 12.0582 10.1077 12.0832 9.99935 12.0832Z" fill="#55527C"></path>
                <path d="M7.08333 15C6.975 15 6.86666 14.975 6.76666 14.9333C6.66666 14.8917 6.57501 14.8333 6.49167 14.7583C6.41667 14.675 6.35832 14.5916 6.31666 14.4833C6.27499 14.3833 6.25 14.275 6.25 14.1666C6.25 13.95 6.34167 13.7333 6.49167 13.575C6.57501 13.5 6.66666 13.4416 6.76666 13.4C7.075 13.2666 7.44166 13.3416 7.67499 13.575C7.70833 13.6166 7.74999 13.6583 7.77499 13.7C7.80832 13.75 7.83334 13.8 7.85001 13.85C7.87501 13.9 7.89168 13.95 7.90001 14.0083C7.90834 14.0583 7.91667 14.1166 7.91667 14.1666C7.91667 14.3833 7.82499 14.6 7.67499 14.7583C7.51666 14.9083 7.3 15 7.08333 15Z" fill="#55527C"></path>
                </svg> <span>${project.date}</span>
                </div><div class="title"><h3>${project.title}</h3></div></div>
                <div class="text" style="margin-top: 30px; margin-bottom:50px;">
                    ${project.description}    
                </div>
            </div>
            `;
        }
    })
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
                    <h3><a href="blog-details.html?blog=${blog.title}@${blog.id}@${blog.date}">${blog.title}</a></h3>
                    </div>
                    </div>
                    <div class="elisc_tm_read_more">
                    <a class="line_effect blog-${blog.id}" href="blog-details.html?blog=${blog.title}@${blog.id}@${blog.date}">Learn More<span><img class="svg" src="img/svg/rightArrow.svg" alt /></span></a>
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

function BlogDetails(){
    const endpoint = "/get-blog-details"

    function GetBlogParams() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let blog = urlParams.get("blog");
        return blog;
    }

    let blog_holder = document.querySelector("div.blog_details");
    jQuery.post(domain+endpoint,{
        blog: GetBlogParams()
    },
    function(response){
        if (response.status == 200) {
            let blog = response.blog[0];
            document.title = blog.page_title;

            blog_holder.innerHTML = `
            <div class="news_popup_informations">
                <div class="image" style="margin-bottom: 20px;">
                    <img src="img/thumbs/4-2.jpg" alt="">
                    <img class="" src="${blog.image}" style="max-height: 350px; display:block;  width:100%;">
                </div>
                <div class="details">
                    <div class="meta">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="svg replaced-svg">
                <path d="M6.66602 4.7915C6.32435 4.7915 6.04102 4.50817 6.04102 4.1665V1.6665C6.04102 1.32484 6.32435 1.0415 6.66602 1.0415C7.00768 1.0415 7.29102 1.32484 7.29102 1.6665V4.1665C7.29102 4.50817 7.00768 4.7915 6.66602 4.7915Z" fill="#55527C"></path>
                <path d="M13.334 4.7915C12.9923 4.7915 12.709 4.50817 12.709 4.1665V1.6665C12.709 1.32484 12.9923 1.0415 13.334 1.0415C13.6757 1.0415 13.959 1.32484 13.959 1.6665V4.1665C13.959 4.50817 13.6757 4.7915 13.334 4.7915Z" fill="#55527C"></path>
                <path d="M17.0827 8.2002H2.91602C2.57435 8.2002 2.29102 7.91686 2.29102 7.5752C2.29102 7.23353 2.57435 6.9502 2.91602 6.9502H17.0827C17.4243 6.9502 17.7077 7.23353 17.7077 7.5752C17.7077 7.91686 17.4243 8.2002 17.0827 8.2002Z" fill="#55527C"></path>
                <path d="M13.3333 18.9584H6.66667C3.625 18.9584 1.875 17.2084 1.875 14.1667V7.08335C1.875 4.04169 3.625 2.29169 6.66667 2.29169H13.3333C16.375 2.29169 18.125 4.04169 18.125 7.08335V14.1667C18.125 17.2084 16.375 18.9584 13.3333 18.9584ZM6.66667 3.54169C4.28333 3.54169 3.125 4.70002 3.125 7.08335V14.1667C3.125 16.55 4.28333 17.7084 6.66667 17.7084H13.3333C15.7167 17.7084 16.875 16.55 16.875 14.1667V7.08335C16.875 4.70002 15.7167 3.54169 13.3333 3.54169H6.66667Z" fill="#55527C"></path>
                <path d="M7.08333 12.0834C6.975 12.0834 6.86666 12.0584 6.76666 12.0167C6.66666 11.975 6.57501 11.9167 6.49167 11.8417C6.41667 11.7584 6.35832 11.6667 6.31666 11.5667C6.27499 11.4667 6.25 11.3584 6.25 11.25C6.25 11.0334 6.34167 10.8167 6.49167 10.6584C6.57501 10.5834 6.66666 10.525 6.76666 10.4834C6.91666 10.4167 7.08334 10.4 7.25001 10.4334C7.30001 10.4417 7.35 10.4584 7.4 10.4834C7.45 10.5 7.5 10.525 7.55 10.5584C7.59166 10.5917 7.63333 10.625 7.67499 10.6584C7.70833 10.7 7.74999 10.7417 7.77499 10.7834C7.80832 10.8334 7.83334 10.8834 7.85001 10.9334C7.87501 10.9834 7.89168 11.0334 7.90001 11.0834C7.90834 11.1417 7.91667 11.1917 7.91667 11.25C7.91667 11.4667 7.82499 11.6834 7.67499 11.8417C7.51666 11.9917 7.3 12.0834 7.08333 12.0834Z" fill="#55527C"></path>
                <path d="M9.99935 12.0832C9.78268 12.0832 9.56602 11.9916 9.40769 11.8416C9.37436 11.7999 9.34103 11.7582 9.30769 11.7166C9.27436 11.6666 9.24934 11.6166 9.23267 11.5666C9.20767 11.5166 9.19101 11.4666 9.18267 11.4166C9.17434 11.3582 9.16602 11.3082 9.16602 11.2499C9.16602 11.1416 9.191 11.0332 9.23267 10.9332C9.27434 10.8332 9.33269 10.7416 9.40769 10.6582C9.64102 10.4249 10.016 10.3499 10.316 10.4832C10.4244 10.5249 10.5077 10.5832 10.591 10.6582C10.741 10.8166 10.8327 11.0332 10.8327 11.2499C10.8327 11.3082 10.8244 11.3582 10.816 11.4166C10.8077 11.4666 10.791 11.5166 10.766 11.5666C10.7494 11.6166 10.7243 11.6666 10.691 11.7166C10.6577 11.7582 10.6243 11.7999 10.591 11.8416C10.5077 11.9166 10.4244 11.9749 10.316 12.0166C10.216 12.0582 10.1077 12.0832 9.99935 12.0832Z" fill="#55527C"></path>
                <path d="M7.08333 15C6.975 15 6.86666 14.975 6.76666 14.9333C6.66666 14.8917 6.57501 14.8333 6.49167 14.7583C6.41667 14.675 6.35832 14.5916 6.31666 14.4833C6.27499 14.3833 6.25 14.275 6.25 14.1666C6.25 13.95 6.34167 13.7333 6.49167 13.575C6.57501 13.5 6.66666 13.4416 6.76666 13.4C7.075 13.2666 7.44166 13.3416 7.67499 13.575C7.70833 13.6166 7.74999 13.6583 7.77499 13.7C7.80832 13.75 7.83334 13.8 7.85001 13.85C7.87501 13.9 7.89168 13.95 7.90001 14.0083C7.90834 14.0583 7.91667 14.1166 7.91667 14.1666C7.91667 14.3833 7.82499 14.6 7.67499 14.7583C7.51666 14.9083 7.3 15 7.08333 15Z" fill="#55527C"></path>
                </svg> <span>${blog.date}</span>
                </div><div class="title"><h3>${blog.title}</h3></div></div>
                <div class="text" style="margin-top: 30px; margin-bottom:50px;">
                    ${blog.description}    
                </div>
            </div>
            `;
        }
    })
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
