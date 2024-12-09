const aboutImage = document.querySelectorAll(".about-image");

aboutImage.forEach(parameter => {
    parameter.addEventListener("click", () => {
        removeActiveClasses();
        parameter.classList.add("active");
    })
})

function removeActiveClasses(){
    aboutImage.forEach(parameter => {
        parameter.classList.remove("active");
    })
}