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

    mobileLinkOpenMenu.addEventListener("click", ()=> {
        // console.log("clicked")
        openMobileNav();
    });

    mobileLinkCloseMenu.addEventListener("click", ()=> {
        closeMobileNav();
    });

    setTimeout(()=>{
        pageLoader.style.display = "none";
        resizeTestimonialScrollElement();
    }, 100)

})

typeWords("I Love my parents")