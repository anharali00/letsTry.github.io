var differences = []; // Array to store clicked differences

document.getElementById('img2').addEventListener('click', handleClick);

function handleClick(event) {
    var rect = event.target.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    // Check if the click is within any difference
    for (var i = 0; i < differences.length; i++) {
        var diff = differences[i];
        if (x >= diff.x && x <= diff.x + diff.width &&
            y >= diff.y && y <= diff.y + diff.height) {
            highlightDifference(diff);
            return;
        }
    }
}

function highlightDifference(diff) {
    var ctx = document.getElementById('img2').getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(diff.x, diff.y, diff.width, diff.height);
}

function checkDifferences() {
    var img1 = document.getElementById('img1');
    var img2 = document.getElementById('img2');
    
    img1.crossOrigin = "Anonymous";
    img2.crossOrigin = "Anonymous";


    var canvas = document.createElement('canvas');
    canvas.width = img1.width;
    canvas.height = img1.height;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img1, 0, 0);
    var img1Data = ctx.getImageData(0, 0, img1.width, img1.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img2, 0, 0);
    var img2Data = ctx.getImageData(0, 0, img2.width, img2.height);

    differences = []; // Reset differences array
    for (var y = 0; y < img1.height; y++) {
        for (var x = 0; x < img1.width; x++) {
            var index = (y * img1.width + x) * 4;
            if (img1Data.data[index] !== img2Data.data[index] ||
                img1Data.data[index + 1] !== img2Data.data[index + 1] ||
                img1Data.data[index + 2] !== img2Data.data[index + 2]) {
                // Found a difference
                differences.push({ x: x, y: y, width: 5, height: 5 }); // Store difference position
            }
        }
    }

    var resultDiv = document.getElementById('result');
    resultDiv.textContent = "Found " + differences.length + " differences.";

    
}
checkDifferences()
console.log(differences)