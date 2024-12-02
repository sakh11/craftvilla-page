document.addEventListener("DOMContentLoaded", function () {
const scrollContainer = document.querySelector(".scroll-container");
let scrollSpeed = 1; // Adjust scroll speed if needed
        
function autoScroll() {
scrollContainer.scrollTop += scrollSpeed;
            
if (scrollContainer.scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight - 1) {
scrollContainer.scrollTop = 0;
    }
}
        
setInterval(autoScroll, 40);
});



    // HTML TO BE ADDED     <div class="content-wrapper"> 
    //     <div class="main-content">    
    //     <div class="scroll-container">
    //         <img src="./Images/logo 2.jpg" alt="Logo">
    //         <img src="./Images/logo 1.jpg" alt="Logo">
    //         <img src="./Images/Live1.jpg" alt="Live">
    //         <img src="./Images/Live2.jpg" alt="Live">
    //         <img src="./Images/albumCover.png" alt="album3">
    //         <img src="./Images/Shadows, My Company.jpg" alt="album2">
    //         <img src="./Images/On stage.jpg" alt="album1">
    //     </div>  
    // </div>
