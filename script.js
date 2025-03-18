let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  const cart = []; // Store selected products
  const productField = document.getElementById("products");

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
          const productName = this.getAttribute("data-product");

          if (!cart.includes(productName)) {
              cart.push(productName);
              productField.value = cart.join(", "); // Update form field
          }
      });
  });
});
