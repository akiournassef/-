// =======================
// EmailJS
// =======================

emailjs.init("lWBdgmKNj-iI358J0");

// =======================
// Preview Image
// =======================

const form = document.getElementById("riskForm");

const photo = document.getElementById("photo");
const preview = document.getElementById("preview");

photo.addEventListener("change", function () {

    const file = this.files[0];

    if(file){

        preview.src = URL.createObjectURL(file);

        preview.style.display = "block";

    }

});


// =======================
// Submit
// =======================

form.addEventListener("submit", async function(event){

event.preventDefault();

const btn = document.querySelector("button");

btn.disabled = true;
btn.innerHTML = "⏳ جاري الإرسال...";

try{

// =======================
// Upload Image
// =======================

const image = photo.files[0];

const data = new FormData();

data.append("file", image);

data.append("upload_preset","risk-report");

const upload = await fetch(
"https://api.cloudinary.com/v1_1/nqczpklw/image/upload",
{
method:"POST",
body:data
});

const result = await upload.json();

const imageUrl = result.secure_url;


// =======================
// Send Email
// =======================

await emailjs.send(
"service_wckeh6g",
"template_m04jszq",
{

name:document.getElementById("name").value,

location:document.getElementById("location").value,

type:document.getElementById("type").value,

description:document.getElementById("description").value,

image:imageUrl

}

);


// =======================
// Success
// =======================

Swal.fire({

icon:"success",

title:"تم إرسال البلاغ",

text:"شكراً لك على المساهمة في تحسين السلامة.",

confirmButtonText:"حسناً"

});

form.reset();

preview.style.display="none";

}catch(error){

console.log(error);

Swal.fire({

icon:"error",

title:"حدث خطأ",

text:"تعذر إرسال البلاغ."

});

}

btn.disabled=false;

btn.innerHTML="إرسال البلاغ";

});