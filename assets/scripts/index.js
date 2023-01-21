var pageActions = {
    mobileOpen: false,
}

function Ele(element){
    return document.querySelector(element);
}

function All(element){
    return document.querySelectorAll(element);
}

function modalOpen(func){
    var modalContainer = Ele(".modal");

    modalContainer.style.display = "block";
    if(func){
        func();
    }
    
    setTimeout(()=>{

        modalContainer.style.opacity = "1";

    }, 50)

}

function modalClose(func){
    var modalContainer = Ele(".modal");

    modalContainer.style.opacity = "0";

    if(func){
        func();
    }
    
    setTimeout(()=>{

        modalContainer.style.display = "none";


    }, 600)

}

function openMobileNav() {
    
    modalOpen(()=>{
        var mobileNavLink = Ele(".modal .mobile-nav-link");
        
        setTimeout(()=>{
    
            mobileNavLink.style.right = "0px";
    
        }, 50)
    });



}

function closeMobileNav() {
    
    modalClose(()=>{
        var mobileNavLink = Ele(".modal .mobile-nav-link");

        mobileNavLink.style.right = "-500px";

    });



}

function downloadResume () {
    var url = "./assets/files/my_cv.pdf"
    var request = new XMLHttpRequest();
    request.responseType = "blob"
    request.open("get", url, true);
    request.send();

    request.onreadystatechange = (req) => {

        
        if(req.currentTarget.readyState === 4 && req.currentTarget.status === 200){
            console.log(req.currentTarget.response)
            var fileUrl = window.URL.createObjectURL(req.currentTarget.response);
            
            var anchor = document.createElement("a");
            anchor.href = fileUrl;
            anchor.download = "Fabiyi Temple Temituoyo Portfolio";
            anchor.click();

        }else if(req.currentTarget.status !== 200){

            console.log(req.currentTarget)
            showAlert("Download Failed! Please try again later")

        }

        

    }

    request.onprogress = (e)=>{
        var percent = Math.floor((e.loaded/e.total) * 100)
        var downloadTextContainerOne = Ele(".download-cv")
        var downloadTextContainerTwo = Ele(".download-in-progress");

        if(e.currentTarget.status === 200){

            downloadTextContainerTwo.innerHTML = "Download in progress" + " <i class=\"fa-solid fa-download\"></i>";
            downloadTextContainerOne.style.display = "none";
            downloadTextContainerTwo.style.display = "inline-block";
            var requiredWidth = ((percent/100) * (downloadTextContainerTwo.scrollWidth));
            downloadTextContainerTwo.style.width = requiredWidth + "px";
            
            if(percent === 100){
                downloadTextContainerTwo.innerHTML = "Download Complete";
            }
        }else{
            
            downloadTextContainerTwo.style.display = "none";
            downloadTextContainerOne.style.display = "inline-block";


        }


    }
}

function showAlert(message, type){
    var alertBox = Ele(".alert-notification");
    var alertMessage = Ele(".alert-notification .message");
    var notificationType = "error"

    if(alertBox.classList.contains("shown")){
        
        alertBox.classList.remove("shown")
    }
    
    if(alertBox.classList.contains("success")){
        
        alertBox.classList.remove("success")
    }
    
    if(alertBox.classList.contains("error")){
        
        alertBox.classList.remove("error")
    }
    
    if(type){
        notificationType = notificationType;
    }
    
    if(message){

        alertMessage.innerText = message;

        setTimeout(()=>{

            alertBox.classList.add("shown")
            
            alertBox.classList.add(notificationType);

        }, 100)

        alertBox.addEventListener ("click", () =>{
            alertBox.classList.remove("shown");
        })
        

    }

}

function resizeTestimonialScrollElement () {
    
    var testimonialCardContainer = Ele(".testimonial-section .testimonial-cards-container")
    var testimonialWidth = testimonialCardContainer.clientWidth;
    var testimonialScrollWidth = testimonialCardContainer.scrollWidth;
    var scaleRatio = testimonialWidth/testimonialScrollWidth;
    var scrollBar = Ele(".testimonial-section .testimonial-progress-bar-container .progress-bar");
    var scrollBarThumb = Ele(".testimonial-section .testimonial-progress-bar-container .progress-bar .progress-bar-active"); 
    var availableScrolledWidth = (scrollBar.clientWidth * scaleRatio);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    scrollBarThumb.style.width = availableScrolledWidth + "px";
    

    testimonialCardContainer.addEventListener("scroll", (e) => {
        var scrollPercentage = testimonialCardContainer.scrollLeft / testimonialScrollWidth;
        var leftOff = (scrollBar.clientWidth * scrollPercentage);
        console.dir(leftOff)
        scrollBarThumb.style.marginLeft = leftOff + "px";
    })

    scrollBarThumb.onmousedown = (e)=>{


    };

    

}

window.addEventListener("load", (e) => {
    var mobileLinkOpenMenu = Ele(".nav-bar .open-mobile-link-btn");
    var mobileLinkCloseMenu = Ele(".mobile-nav-link .mobile-nav-link-header .close-mobile-nav-button");
    var pageLoader = Ele(".page-loader");
    var cvDownloadButton = Ele(".cv-btn");

    mobileLinkOpenMenu.addEventListener("click", ()=> {
        // console.log("clicked")
        openMobileNav();
    });

    mobileLinkCloseMenu.addEventListener("click", ()=> {
        closeMobileNav();
    });

    cvDownloadButton.addEventListener("click", ()=>{
        downloadResume();
    })

    setTimeout(()=>{
        pageLoader.style.display = "none";
        resizeTestimonialScrollElement();
    }, 100)

    
    window.addEventListener("resize", ()=>{
        resizeTestimonialScrollElement();
    })



})