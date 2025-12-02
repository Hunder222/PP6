console.log(EKdataset); // local dataset from EKDatasetLocal.js imported via index.html

////// import and DOM //////
const subSections = document.querySelectorAll('.subSections');










////// charts //////











////// misc functions //////

// function to reverse every 2nd subsection direction, for zigzag effekt
subSections.forEach((section, i) => {
    if (i % 2 !== 0) {
        section.classList.add('reversed');
    }
});









////// eventlisteners //////










