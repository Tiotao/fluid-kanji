// Dependencies 
const imageToAscii = require("image-to-ascii");
 
// // The path can be either a local path or an url 
// imageToAscii("https://octodex.github.com/images/octofez.png", (err, converted) => {
//     console.log(err || converted);
// });
 
// Passing options 
imageToAscii("image.png", {
    colored: false,
	pixels: "1.",
	size: {
		height: 30,
	}
}, (err, converted) => {
    console.log(err || converted);
});