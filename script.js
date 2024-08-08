var sidebar=document.querySelector(".sidebar")
var menuicon=document.getElementById("menu-icon")
var clseicon=document.getElementById("close-icon")

function displaymenu()
{
    sidebar.style.display= "block";
    event.target.style.display="none"
    clseicon.style.display="block"
}
function closemenu()
{
    sidebar.style.display= "none";
    clseicon.style.display="none"
    menuicon.style.display="block"

}


document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav p a");
    const upArrow = document.getElementById("uparrow");

    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        let homeVisible = false;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                const activeNavLink = document.querySelector(".nav-active");
                if (activeNavLink) {
                    activeNavLink.classList.remove("nav-active");
                }
                const newActiveNavLink = document.querySelector(`#nav-${id}`);
                if (newActiveNavLink) {
                    newActiveNavLink.classList.add("nav-active");
                }
        // Show or hide the upArrow based on whether the home section is visible
        if (id === "home") {
            upArrow.style.display = "none";
            upArrow.style.position = "static";
            upArrow.style.zIndex = "-1000";

        } else {
            upArrow.style.position = "fixed";
            upArrow.style.display = "block";
            upArrow.style.zIndex = "1000";
        }
                
            }
        });


    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function() {
    const allNavLinks = document.querySelectorAll('#about-nav a, #side-nav a');
    const allNavItems = document.querySelectorAll('#about-nav p, #side-nav p');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTabContent(id) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');
    }

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            allNavItems.forEach(item => {
                item.classList.remove('active-nav');
            });
            this.parentElement.classList.add('active-nav');
            const targetId = this.getAttribute('href').substring(1);
            showTabContent(targetId);
        });
    });

    // Set the default active tab
    document.querySelector('#about-nav #nav-education').classList.add('active-nav');
    document.querySelector('#side-nav #nav-education').classList.add('active-nav');
    showTabContent('education');
});


document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create FormData object from the form
    let formData = new FormData(this);

    // Send the form data using Fetch API
    fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              // Show the success message
              const successMessage = document.getElementById('successMessage');
              successMessage.style.display = 'block';
              
              // Refresh the form inputs after a short delay
              setTimeout(() => {
                  document.getElementById('myForm').reset(); // Reset the form inputs
              }, 200); // 3 seconds delay for better UX
          } else {
              console.error('Submission failed:', data);
          }
      }).catch(error => {
          console.error('Form submission error:', error);
      });
});
