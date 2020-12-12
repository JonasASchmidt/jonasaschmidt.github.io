document.addEventListener("DOMContentLoaded", function (event) { // Fire when DOM is loaded
    //event.preventDefault(); // ?

    // Define number of sections by array of sentences
    let sentences = [
        "Leisure is the mother of Philosophy",
        "Clarity by collision",
        "Just do it",
        "Autonomy by detachment",
        "Discipline equals freedom",
        "To good to be true",
        "Only inspired action is meaningful",
        "No assets No roadmap No backlog",
        "Copy Transform Combine",
        "Arm the rebels",
        "Programming Motherfucker",
        "Don't make decisions on morphine",
        "Erstmal was bauen",
        "You are not what you feel",
        "There is no problems but communication problems",
        "Cross the bridge when you get there",
        "Art knock life",
        "Read the docs"
    ];

    // Define keywords for unsplash random images
    let keywords = [
        "calm",
        "air",
        "breathe",
        "sky",
        "sea",
        "fog",
        "lonely",
        "mountain"
    ];

    let body = document.querySelector("body"); // Define variable body as pointer to <body> element.
    let scrollPosition = 0; // Set initial scroll position

    // Generate image sections with sentences
    sentences.forEach((sentence) => {
        let section = document.createElement("div"); // Create a DIV node

        section.classList.add("section-image"); // Add class to div

        let randomKeywords = ""; // Create variable for random image keywords

        for (let i = 0; i < 3; i++) {
            let randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]; // Get random keyword from array
            if (i !== 0) {
                randomKeywords += "," + randomKeyword; // Add keyword to keywords variable
            } else {
                randomKeywords = randomKeyword; // Add keyword to keywords variable
            }

        }

        // console.log(randomKeywords);

        // Build up HTML structure and add it to body
        section.style = `background-image:url('https://source.unsplash.com/1600x900/?${randomKeywords}')`; // Add background image to div via inline style with url
        let textnode = document.createElement("span"); // Create span for the sentence text
        textnode.classList.add("sentence"); // Add class to span
        let text = document.createTextNode(sentence); // Create a text node with the sentence
        textnode.appendChild(text); // Append text as child of span
        section.appendChild(textnode); // Append span as child of div
        body.appendChild(section); // Append div as child of body

        // Add event listener to each sentence
        textnode.addEventListener("click", function (event) {
            scrollPosition += window.innerHeight; // Set viewport height as scroll position

            var body = document.body,
                html = document.documentElement;

            var height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );

            if (scrollPosition >= height) {
                //document.body.scrollTop = 0;
                //document.documentElement.scrollTop = 0;
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                scrollPosition = 0;
            } else {
                window.scrollTo({
                    top: scrollPosition,
                    behavior: "smooth"
                });
            }
            
        });
    });
    //console.log("DOM fully loaded and parsed");
});
