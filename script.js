let slideIndex = 1;
let autoSlideTimeout;

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

function plusSlides(n) {
  clearTimeout(autoSlideTimeout);
  showSlides(slideIndex += n);
  autoSlide();
}

function currentSlide(n) {
  clearTimeout(autoSlideTimeout);
  showSlides(slideIndex = n);
  autoSlide();
}

function autoSlide() {
  autoSlideTimeout = setTimeout(() => {
    slideIndex++;
    showSlides(slideIndex);
    autoSlide();
  }, 2000);
}

// Init on DOM load
document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex);
  autoSlide();

});

document.addEventListener("DOMContentLoaded", function () {
  const cart = {};
  const productField = document.getElementById("products");

  function updateProductField() {
    const entries = Object.entries(cart).map(([name, qty]) => `${name} - ${qty}`);
    productField.value = entries.join(", ");
  }

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      const productName = this.getAttribute("data-product");

      if (!(productName in cart)) {
        cart[productName] = 1;
        updateProductField();

        // Replacing button with quantity controls
        const parent = this.parentElement;
        this.style.display = "none";

        const controlDiv = document.createElement("div");
        controlDiv.className = "cart-controls";

        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";

        const qtySpan = document.createElement("span");
        qtySpan.textContent = "1";
        qtySpan.style.margin = "0 10px";

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.style.marginLeft = "10px";

        minusBtn.addEventListener("click", () => {
          cart[productName]--;
          if (cart[productName] <= 0) {
            delete cart[productName];
            parent.removeChild(controlDiv);
            button.style.display = "inline-block";
          } else {
            qtySpan.textContent = cart[productName];
          }
          updateProductField();
        });

        plusBtn.addEventListener("click", () => {
          cart[productName]++;
          qtySpan.textContent = cart[productName];
          updateProductField();
        });

        delBtn.addEventListener("click", () => {
          delete cart[productName];
          parent.removeChild(controlDiv);
          button.style.display = "inline-block";
          updateProductField();
        });

        controlDiv.appendChild(minusBtn);
        controlDiv.appendChild(qtySpan);
        controlDiv.appendChild(plusBtn);
        controlDiv.appendChild(delBtn);

        parent.appendChild(controlDiv);
      }
    });
  });
});
