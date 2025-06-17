document.addEventListener("DOMContentLoaded", function () {
  // --- Task 1: Form Validation and AJAX ---
  const form = document.getElementById("myForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("submitBtn");

  function showError(element, message) {
    const errorSpan = document.getElementById(`${element.id}-error`);
    element.classList.add("invalid");
    errorSpan.textContent = message;
  }

  function clearError(element) {
    const errorSpan = document.getElementById(`${element.id}-error`);
    element.classList.remove("invalid");
    errorSpan.textContent = "";
  }

  function validateName() {
    const value = nameInput.value.trim();
    const regex = /^[a-zA-Z\s]+$/;
    if (value === "") {
      showError(nameInput, "Name is required.");
      return false;
    } else if (!regex.test(value)) {
      showError(nameInput, "Name can only contain alphabets and spaces.");
      return false;
    } else {
      clearError(nameInput);
      return true;
    }
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
      showError(emailInput, "Email is required.");
      return false;
    } else if (!regex.test(value)) {
      showError(emailInput, "Please enter a valid email address.");
      return false;
    } else {
      clearError(emailInput);
      return true;
    }
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const regex = /^[0-9]+$/;
    if (value === "") {
      showError(phoneInput, "Phone number is required.");
      return false;
    } else if (!regex.test(value)) {
      showError(phoneInput, "Phone number can only contain numeric values.");
      return false;
    } else {
      clearError(phoneInput);
      return true;
    }
  }

  function validateAddress() {
    const value = addressInput.value.trim();
    const regex = /^[a-zA-Z0-9,\s]+$/;
    if (value === "") {
      showError(addressInput, "Address is required.");
      return false;
    } else if (!regex.test(value)) {
      showError(
        addressInput,
        "Address can only contain alphanumeric characters, commas, and spaces."
      );
      return false;
    } else {
      clearError(addressInput);
      return true;
    }
  }

  function validatePassword() {
    const value = passwordInput.value.trim();
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:"';?/>.<,]).*$/;
    if (value === "") {
      showError(passwordInput, "Password is required.");
      return false;
    } else if (!regex.test(value)) {
      showError(
        passwordInput,
        "Password must include a capital letter, a number, and a special character."
      );
      return false;
    } else {
      clearError(passwordInput);
      return true;
    }
  }

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  phoneInput.addEventListener("blur", validatePhone);
  addressInput.addEventListener("blur", validateAddress);
  passwordInput.addEventListener("blur", validatePassword);

  function validateForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isAddressValid = validateAddress();
    const isPasswordValid = validatePassword();
    return (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isAddressValid &&
      isPasswordValid
    );
  }

  const formStatusDiv = document.getElementById("form-status");
  const progressBar = formStatusDiv.querySelector(".progress-bar");
  const statusMessage = document.getElementById("status-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
      statusMessage.textContent = "Please correct the errors in the form.";
      statusMessage.style.color = "red";
      formStatusDiv.style.display = "block";
      progressBar.style.width = "0%";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";
    formStatusDiv.style.display = "block";
    progressBar.style.width = "20%";

    let progress = 20;
    const progressInterval = setInterval(() => {
      if (progress < 90) {
        progress += 10;
        progressBar.style.width = `${progress}%`;
      } else {
        clearInterval(progressInterval);
      }
    }, 300);

    setTimeout(() => {
      clearInterval(progressInterval);
      progressBar.style.width = "100%";

      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        statusMessage.textContent = "Form submitted successfully!";
        statusMessage.style.color = "green";
        progressBar.style.backgroundColor = "#4CAF50";
        form.reset();
        [
          nameInput,
          emailInput,
          phoneInput,
          addressInput,
          passwordInput,
        ].forEach(clearError);
        formStatusDiv.style.display = "none"; // to hide after delay
      } else {
        statusMessage.textContent = "Form submission failed. Please try again.";
        statusMessage.style.color = "red";
        progressBar.style.backgroundColor = "red";
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
        //formStatusDiv.style.display = "none"; // to hide after delay
        progressBar.style.width = "0%";
        progressBar.style.backgroundColor = "#4CAF50";
      }, 2000);
    }, 3000);
  });

  // --- Task 2: Custom JS Plugin for Banner Slider ---

  // Array of image paths for the slider which reside in images folder
  const sliderImages = [
    "./images/p1.jpg",
    "./images/p2.jpg",
    "./images/p3.jpg",
    "./images/p4.jpg",
    "./images/p5.jpg",
    "./images/p6.jpg",
    "./images/p7.jpg",
    "./images/p8.jpg",
    "./images/p9.jpg",
    "./images/p10.jpg",
    "./images/p11.jpg",
    "./images/p12.jpg",
    "./images/p13.jpg",
    "./images/p14.jpg",
    "./images/p15.jpg",
    "./images/p16.jpg",
    "./images/p17.jpg",
    "./images/p18.jpg",
    "./images/p19.jpg",
    "./images/p20.jpg",
    "./images/p21.jpg",
    "./images/p22.jpg",
    "./images/p23.jpg",
    "./images/p24.jpg",
    "./images/p25.jpg",
    "./images/p26.jpg",
    "./images/p27.jpg",
  ];

  // Main plugin function
  (function (window, document) {
    "use strict";

    // Slider Plugin constructor
    function SimpleImageSlider(selector, images, options) {
      this.container = document.querySelector(selector);
      if (!this.container) {
        console.error("Slider container not found:", selector);
        return;
      }
      this.images = images;
      this.currentIndex = 0;
      this.intervalId = null;
      this.isPlaying = true; // For play/pause functionality

      // Default options
      this.options = {
        autoPlay: true,
        interval: 3000, // 3 seconds
        ...options, // Merge user-provided options
      };

      this.init(); // Initialize the slider
    }

    // Adding methods to the prototype for reusability
    SimpleImageSlider.prototype = {
      init: function () {
        this.renderSlider();
        this.attachEvents();
        if (this.options.autoPlay) {
          this.startAutoPlay();
        }
      },

      renderSlider: function () {
        // Clearing existing content
        this.container.innerHTML = "";

        // Creating main image element
        this.mainImageWrapper = document.createElement("div");
        this.mainImageWrapper.className = "slider-main-image";
        this.mainImage = document.createElement("img");
        this.mainImage.alt = "Banner Slide";
        this.mainImageWrapper.appendChild(this.mainImage);
        this.container.appendChild(this.mainImageWrapper);

        // Creating navigation buttons
        this.nav = document.createElement("div");
        this.nav.className = "slider-nav";
        this.prevBtn = document.createElement("button");
        this.prevBtn.className = "prev-btn";
        this.prevBtn.textContent = "<";
        this.nextBtn = document.createElement("button");
        this.nextBtn.className = "next-btn";
        this.nextBtn.textContent = ">";
        this.nav.appendChild(this.prevBtn);
        this.nav.appendChild(this.nextBtn);
        this.container.appendChild(this.nav);

        // Creating thumbnails container
        this.thumbnailsContainer = document.createElement("div");
        this.thumbnailsContainer.className = "slider-thumbnails";
        this.images.forEach((imageSrc, index) => {
          const thumb = document.createElement("img");
          thumb.src = imageSrc;
          thumb.alt = `Thumbnail ${index + 1}`;
          thumb.className = "thumbnail";
          thumb.dataset.index = index; // Storing index for later use
          this.thumbnailsContainer.appendChild(thumb);
        });
        this.container.appendChild(this.thumbnailsContainer);

        // Creating slide number display
        this.slideNumberDisplay = document.createElement("div");
        this.slideNumberDisplay.className = "slide-number";
        this.container.appendChild(this.slideNumberDisplay);

        this.updateSlide(this.currentIndex);
      },

      attachEvents: function () {
        // Next/Previous buttons as per the requirement in Task 2
        this.prevBtn.addEventListener("click", this.prevSlide.bind(this));
        this.nextBtn.addEventListener("click", this.nextSlide.bind(this));

        // Play/Pause on hover as per the requirement in Task 2
        this.container.addEventListener(
          "mouseenter",
          this.pauseAutoPlay.bind(this)
        );
        this.container.addEventListener(
          "mouseleave",
          this.resumeAutoPlay.bind(this)
        );

        // Clicking on thumbnail as per the requirement in Task 2
        this.thumbnailsContainer.addEventListener(
          "click",
          this.handleThumbnailClick.bind(this)
        );

        // Clicking on the banner will show that image into a modal
        this.mainImageWrapper.addEventListener(
          "click",
          this.showModal.bind(this)
        );
      },

      updateSlide: function (index) {
        // Ensure index wraps around as per the requirement in Task 2
        // Creating Infinite sliding functionality
        this.currentIndex = (index + this.images.length) % this.images.length;
        this.mainImage.src = this.images[this.currentIndex];

        // Updating slide number according to the current picture index
        this.slideNumberDisplay.textContent = `${this.currentIndex + 1} / ${
          this.images.length
        }`;

        // Updating active thumbnail according to the current picture
        const thumbnails =
          this.thumbnailsContainer.querySelectorAll(".thumbnail");
        thumbnails.forEach((thumb, i) => {
          if (i === this.currentIndex) {
            thumb.classList.add("active");
          } else {
            thumb.classList.remove("active");
          }
        });

        // Scroll the thumbnails into view after updating the slide
        this.scrollThumbnailIntoView(this.currentIndex);
      },

      nextSlide: function () {
        this.updateSlide(this.currentIndex + 1);
        if (this.isPlaying) {
          // Restart autoplay only if it was playing
          this.startAutoPlay(); // Resetting timer on manual navigation
        }
      },

      prevSlide: function () {
        this.updateSlide(this.currentIndex - 1);
        if (this.isPlaying) {
          // Restart autoplay only if it was playing
          this.startAutoPlay(); // Resetting timer on manual navigation
        }
      },

      startAutoPlay: function () {
        this.pauseAutoPlay(); // Clearing any existing interval first
        this.intervalId = setInterval(() => {
          this.nextSlide();
        }, this.options.interval);
        this.isPlaying = true;
      },

      pauseAutoPlay: function () {
        clearInterval(this.intervalId);
        this.isPlaying = false;
      },

      resumeAutoPlay: function () {
        if (!this.isPlaying) {
          // Resuming if it was paused by hover
          this.startAutoPlay();
        }
      },

      handleThumbnailClick: function (event) {
        const target = event.target;
        if (target.classList.contains("thumbnail")) {
          const index = parseInt(target.dataset.index, 10);
          this.updateSlide(index);
          if (this.isPlaying) {
            this.startAutoPlay(); // Resetting timer on thumbnail click
          }
        }
      },

      // Scroll Thumbnail Into View
      scrollThumbnailIntoView: function (index) {
        const activeThumbnail = this.thumbnailsContainer.querySelector(
          `.thumbnail[data-index="${index}"]`
        );
        if (activeThumbnail) {
          // Calculating the position to scroll to center the thumbnail
          const containerWidth = this.thumbnailsContainer.offsetWidth;
          const thumbnailWidth = activeThumbnail.offsetWidth;
          const thumbnailLeft = activeThumbnail.offsetLeft;

          // Added padding/gap consideration for more accurate centering
          const gap = 10; // As defined in CSS for .slider-thumbnails img gap
          const totalWidthPerThumb = thumbnailWidth + gap; // Width of thumb + its right gap

          // Adjusting based on visibility of 6-10 thumbs.
          // It will help to target thumbnail to be roughly in the middle of 6-10 visible thumbs,
          // Calculating the center point of the container and adjust based on thumbnail's position.
          const centerOfContainer = containerWidth / 2;
          const centerOfThumbnail = thumbnailLeft + thumbnailWidth / 2;

          // Scroll so that the center of the thumbnail aligns with the center of the container
          const scrollTo = centerOfThumbnail - centerOfContainer;

          this.thumbnailsContainer.scrollTo({
            left: scrollTo,
            behavior: "smooth", // Smooth scrolling effect
          });
        }
      },

      // Show Modal with Full Size Image
      // This function will create a modal to show the full size image when clicked
      showModal: function () {
        const modal = document.createElement("div");
        modal.className = "image-modal"; // Apply initial modal style
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <img src="${this.mainImage.src}" alt="Full size image">
            </div>
        `;
        document.body.appendChild(modal);

        // Trigger transition by adding 'active' class after a slight delay
        // This allows the CSS transition to work from opacity: 0 and transform: -50px
        setTimeout(() => {
          modal.classList.add("active");
        }, 10); // Small delay to ensure CSS is applied before transition

        const closeButton = modal.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
          modal.classList.remove("active"); // Start fade out/slide up
          modal.addEventListener(
            "transitionend",
            function handler() {
              document.body.removeChild(modal);
              modal.removeEventListener("transitionend", handler); // Clean up listener
            },
            { once: true }
          ); // Ensuring listener is removed after first use
        });

        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.classList.remove("active"); // Start fade out/slide up
            modal.addEventListener(
              "transitionend",
              function handler() {
                document.body.removeChild(modal);
                modal.removeEventListener("transitionend", handler);
              },
              { once: true }
            );
          }
        });
      },
    };

    // Exposing the plugin to the global window object
    window.SimpleImageSlider = SimpleImageSlider;
  })(window, document); // Pass window and document for slight optimization/encapsulation

  // Initializing the slider when the DOM is ready
  // Making sure the selector matches the ID/class in the HTML File
  const mySlider = new SimpleImageSlider(".slider-container", sliderImages, {
    autoPlay: true,
    interval: 3000, // 3 seconds duration per slide
  });
});
