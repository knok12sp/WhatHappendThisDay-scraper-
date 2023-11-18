const puppeteer = require("puppeteer")
const fs = require("fs/promises")

async function start() {
  const browser = await puppeteer.launch({headless:true})
  const page = await browser.newPage()
  await page.goto("https://en.wikipedia.org/wiki/Main_Page");

  

const body = await page.evaluate(()=>{
    const imgReference= document.querySelector('#mp-otd #mp-otd-img img');
    const listReference= document.querySelectorAll('#mp-otd > ul li');

    let imgSource= imgReference.getAttribute('src');
      imgSource.replace('thumb/', '');
   let fileExtensionIndex= Math.max(imgSource.indexOf('.jpg/'),imgSource.indexOf('.JPG/'),imgSource.indexOf('.png/'),imgSource.indexOf('.PNG/'));

   //imgSource=imgSource.substring(0,fileExtensionIndex + 4);

   const list= Array.from(listReference).map((item)=>{
        const itemLink=item.querySelector('b a').getAttribute('href');
        return{
            link:itemLink ? `https://en.wikipedia.org/${itemLink}`: undefined,
            text: item.innerText
        }

    });
    return {imgSource,list};

});

browser.close();
return body;
  
}

start();
exports.start=start;

