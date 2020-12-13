document.addEventListener("DOMContentLoaded", function (event) { // Execute when DOM is loaded
    //event.preventDefault(); // ?


    // Define shuffle function for arrays according to Fisher-Yates 
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            // you'll find more details about that syntax in later chapters
            // same can be written as:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

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

    shuffle(sentences);

    // Define keywords for unsplash random images
    let keywords = [
        "calm",
        "air",
        "breathe",
        "sky",
        "sea",
        "fog",
        "lonely",
        "mountain",
        "winter"
    ];

    //let body = document.querySelector("body"); // Define variable body as pointer to <body> element.
    let scrollPosition = 0; // Set initial scroll position

    // +++ Generate image sections with sentences
    sentences.forEach((sentence, idx) => {

        let section = document.createElement("div"); // Create a DIV node
        section.classList.add("section-image"); // Add class to div

        let randomKeywords = ""; // Create variable for random image keywords

        for (let i = 0; i < 3; i++) {
            let randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]; // Get random keyword from array
            if (randomKeywords === "") { // If not adding the first keyword
                randomKeywords = randomKeyword; // Reassign keyword (1st) to keywords variable
            } else {
                randomKeywords += "," + randomKeyword; // Add , + keyword to keywords variable
            }
        }

        // +++ Build up HTML structure and add it to body
        section.style = `background-image:url('https://source.unsplash.com/1600x900/?${randomKeywords}')`; // Add background image to div via inline style with url
        let textnode = document.createElement("span"); // Create span for the sentence text
        textnode.classList.add("sentence"); // Add class to span
        let text = document.createTextNode(sentence); // Create a text node with the sentence
        textnode.appendChild(text); // Append text as child of span
        section.appendChild(textnode); // Append span as child of div
        document.body.appendChild(section); // Append div as child of body

        // +++ Add event listener to each sentence
        // textnode.addEventListener("click", function (event) {
        //     scrollPosition += window.innerHeight; // Set viewport height as scroll position

        //     var body = document.body,
        //         html = document.documentElement;

        //     var height = Math.max(
        //         body.scrollHeight,
        //         body.offsetHeight,
        //         html.clientHeight,
        //         html.scrollHeight,
        //         html.offsetHeight
        //     );

        //     if (scrollPosition >= height) {

        //         window.scrollTo({
        //             top: 0,
        //             behavior: "smooth"
        //         });
        //         scrollPosition = 0;
        //     } else {
        //         window.scrollTo({
        //             top: scrollPosition,
        //             behavior: "smooth"
        //         });
        //     }

        // });

        // +++ Add event listener to last sentence
        if (idx === (sentences.length - 1)) {
            textnode.addEventListener("click", function (event) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                scrollPosition = 0;
            });
        }
    });
    //console.log("DOM fully loaded and parsed");
});