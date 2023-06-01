document.addEventListener("DOMContentLoaded", function (event) { // Execute when DOM is loaded
    // addEventListener("load", function() { setTimeout( hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); };
    event.preventDefault(); // ???
    //console.log("DOM fully loaded and parsed");

    // Disable scroll to top on iOS-Devices.
    // document.ontouchmove = function (event) {
    //     event.preventDefault();
    // }

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

    // Define function to get a number n of random elements from an array
    function getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
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
        "Read the docs",
        "Visualize Everything",
        "Solve complexity by intuition",
        "Always stay human"
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
        "mountain",
        "night"
    ];

    //let body = document.querySelector("body"); // Define variable body as pointer to <body> element.
    let scrollPosition = 0; // Set initial scroll position
    let randomKeywords = "";
    // +++ Generate image sections with sentences
    sentences.forEach((sentence, idx) => {

        let section = document.createElement("div"); // Create a DIV node
        section.classList.add("section-image", "lazy"); // Add class(es) to div
        // section.id = "section-image"; // Add id to div

        // shuffle(keywords);
        randomKeywords = getRandom(keywords, 3).join();
        // console.log(randomKeywords);
        let imageSize = "1600x900"; // Standard desktop size approved standard size
        if (window.innerWidth < window.innerHeight) {
            imageSize = (window.innerHeight * 2) + "x" + (window.innerHeight * 2); // Define image size as square of longer edge
        } else {
            imageSize = (window.innerWidth * 2) + "x" + (window.innerWidth * 2); // Define image size as square of longer edge
        }
        // imageSize = window.innerWidth + "x" + window.innerHeight; // Define image size matching the viewport dimensions
        // +++ Build up HTML structure and add it to body
        section.style = `background-image:url('https://source.unsplash.com/${imageSize}/?${randomKeywords}')`; // Add background image to div via inline style with url
        let textnode = document.createElement("span"); // Create span for the sentence text
        textnode.classList.add("sentence"); // Add class to span
        let text = document.createTextNode(sentence); // Create a text node with the sentence
        textnode.appendChild(text); // Append text as child of span
        section.appendChild(textnode); // Append span as child of div
        document.body.appendChild(section); // Append div as child of body

        // +++ Add event listener to each sentence
        // textnode.addEventListener("click", function (event) {
        //     scrollPosition += window.innerHeight; // Set viewport height as scroll position

        //     var body = document.body, html = document.documentElement;

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
        // if (idx === (sentences.length - 1)) {
        //     textnode.addEventListener("click", function (event) {

        //         window.scrollTo({
        //             top: 0,
        //             behavior: "smooth"
        //         });

        //         scrollPosition = 0;

        //     });
        // }
        
    });

    // Lazy load CSS background images

    var lazyloadImages;
    let checkdIdx = 0;
    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // console.log("Intersecting");
                    var image = entry.target;
                    // console.log(image);
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                    checkdIdx += 1;
                    if (checkdIdx < lazyloadImages.length) {
                        var nextImage = lazyloadImages[checkdIdx];
                        // console.log(nextImage);
                        nextImage.classList.remove("lazy");
                        // imageObserver.unobserve(nextImage);
                    }
                }
            });
        });

        lazyloadImages.forEach(function (image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function (entry) {
                    if (entry.offsetTop < (window.innerHeight + scrollTop)) {
                        var image = entry.target;
                        image.classList.remove("lazy");
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
});
