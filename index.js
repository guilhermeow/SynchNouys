const fs = require("fs");
const readline = require("readline");
const request = require("request");
const { red, green, reset } = require("./utils/colors.js");

async function NewConsole() {
    console.log(green);
    LoadAscii("./ascii/initialize.txt");

    console.log(red);
    LoadTextQuestion("Enter the website URL down! \n►  Example: https://example.com/\n");
} NewConsole();

function LoadAscii(image_type) {
    var image = fs.readFileSync(image_type, "utf-8");
    console.clear();
    console.log(image);
}
function LoadAsciiTitle(image) {
    var image = fs.readFileSync(image, "utf-8");
    console.clear();
    console.log(image);
}

function LoadTextQuestion(text_content) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question(text_content, (answer) => {
        typeof answer === "string";
        SiteRequest(answer);
        rl.close();
    });
}
async function WriteText(directory, text) {
    fs.appendFile(directory, text, function (err) {
        if (err) {
            throw err;
        };
    });
};
async function SiteRequest(url) {
    LoadAsciiTitle("./ascii/app.txt");

    var list = require("./utils/admin/array");

    try {
        for (var i = 0; i < list.length; i++) {
            const url_status = url + list[i];
            //https://www.teddyhouse.com/
            request.get(url + list[i], function (error, response) {
                if (!error && response.statusCode == 200) {
                    console.log(green, "[SUCESS] PAGE FOUND", url_status);

                    WriteText("./logs/page_found.txt", `${url_status}\n`, 'utf-8');
                } else {
                    console.log(red, "[ERROR] PAGE NOT FOUND", url_status);
                };
            });
        }
    } catch (err); {
        console.log(reset, "======================================================================================");
        console.log(red, "[ERROR] There was an error accessing the page");
        console.log(reset, "======================================================================================");
    }
}
