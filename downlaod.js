const btn = document.querySelector(".btn")
btn.addEventListener("click",function(){
    const imgsrc = document.querySelector(".image").src ;
    const link = document.createElement('a')
    link.href = imgsrc ;
    link.download = "imagegenerated.png" ;
    link.click();
})
