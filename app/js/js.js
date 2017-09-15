
(function () {
    class httpGetAjax{
        static httpGet(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = function() {
                    if (this.status == 200) {
                        resolve(this.response);
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };

                xhr.onerror = function() {
                    reject(new Error("Network Error"));
                };

                xhr.send();
            });
        }
    };
     // counter next or prev
    let j =  1;                // counter for value
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let my_flex_block = document.querySelectorAll('.my-flex-block');
    let galery = document.querySelector('.galery');
    let modal = document.getElementById('modal');
    let galleryImage = [];
    let authorsList = [];
    httpGetAjax.httpGet("https://unsplash.it/list")
        .then(
            response => {
                galleryImage = JSON.parse(response);
                for (let i = 0 ; i<= galleryImage.length-1 ; i++){
                            authorsList[i]= galleryImage[i].author}
                authorsList.sort();
                console.log(authorsList);  
                for(let i=1 ; i<=authorsList.length-1; i++){
                   if (authorsList[i] != authorsList[i-1]){document.getElementById("autors").innerHTML += `<div class="author">${authorsList[i]}</div>`   }
                } 
                 document.querySelectorAll('.author').forEach((index)=>{
                index.addEventListener('click', function(){
                 console.log(this.innerHTML)  
//нач
              let i = parseInt(document.getElementById('page').getAttribute('data'));
             let a=galleryImage;
        galleryImage = galleryImage.filter((index)=>{ return (index.author === this.innerHTML )});

            next.style.display = "inline-block";
            prev.style.display = "inline-block";
            document.getElementById('page').style.display = "inline-block";
            document.getElementById('page').innerHTML = 1;
            console.log(Math.ceil(galleryImage.length/20));
        my_flex_block.forEach((index,i)=>{
            if(typeof galleryImage[i] !== "undefined"){
                console.log(galleryImage.length);
                index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i].filename}' width="150" height="150" alt=''>`;
            }
            else{index.innerHTML = `<img src='' width="150" height="150" alt=''>`}           
        });
        nextImage(galleryImage);
        prevImage(galleryImage);
        
        let k = 1;
        function nextImage(galleryImage){ 
        next.addEventListener('click',()=>{
//             i += 20;
            k++;
            console.log(galleryImage);
            document.getElementById('page').innerHTML = k;
            // i-=20;
            if(k == Math.ceil(galleryImage.length/20)){
                document.getElementById('page').innerHTML = Math.ceil(galleryImage.length/20);
                next.style.display = "none"}
            else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block"};
                my_flex_block.forEach((index)=>{
                    index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i++].filename}' width="150" height="150" alt=''>`;
            });
        });
    }

    function prevImage(galleryImage) {
        prev.addEventListener('click',()=>{
            // console.log(i);
            // i--;
            document.getElementById('page').innerHTML = --k;
            if(k == 1){
                document.getElementById('page').innerHTML = 1;
                next.style.display = "inline-block";
                prev.style.display = "none";}

            else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block"};
            my_flex_block.forEach((index)=>{
                index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i--].filename}' width="150" height="150" alt=''>`;

            });
        });
       
    }   
      galleryImage = a;
       console.log(a);            //кон
                   })
    });        
                my_flex_block.forEach((index,i)=>{
                    index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i].filename}' width="150" height="150" alt=''>`;
                });
                nextGlobal(galleryImage);
                prevGlobal(galleryImage);
               // autors(galleryImage);
                return galleryImage;
            }
        )
        .then(galleryImage=>{
            document.getElementById('Small').addEventListener("click", ()=>{Small(galleryImage)});
            document.getElementById('Medium').addEventListener("click", ()=>{Medium(galleryImage)});
            document.getElementById('Large').addEventListener("click", ()=>{Large(galleryImage)});
        })
    //    .then(console.log(autorsList))
        .catch(error => {
        console.log(error); //
    });

    function Small(galleryImage) {
        let i = parseInt(document.getElementById('page').getAttribute('data'));
        let SmallnewgalleryImage = galleryImage.filter((index)=>{ return index.height < 800});
        console.log(SmallnewgalleryImage);
        if(SmallnewgalleryImage.length < 20){
            next.style.display = "none";
            prev.style.display = "none";
            document.getElementById('page').style.display = "none";
            my_flex_block.forEach((index,i)=>{
                if(typeof SmallnewgalleryImage[i] !== "undefined"){                    
                    index.innerHTML = `<img src='https://unsplash.it/${SmallnewgalleryImage[i].filename}' width="150" height="150" alt=''>`;
                }
                if (i>=SmallnewgalleryImage.length) {index.innerHTML = `<img src='' width="150" height="150" alt=''>`}
            });
          }
        }

    function Medium(galleryImage) {
        let i = parseInt(document.getElementById('page').getAttribute('data'));
        galleryImage = galleryImage.filter((index)=>{ return (index.height > 799 && index.height < 1499 )});
            next.style.display = "inline-block";
            prev.style.display = "inline-block";
            document.getElementById('page').style.display = "inline-block";
            document.getElementById('page').innerHTML = 1;
            console.log(Math.ceil(galleryImage.length/20));
        my_flex_block.forEach((index,i)=>{
            if(typeof galleryImage[i] !== "undefined"){
                console.log(galleryImage.length);
                index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i].filename}' width="150" height="150" alt=''>`;
            }
            else{index.innerHTML = `<img src='' width="150" height="150" alt=''>`}           
        });
        nextImage(galleryImage);
        prevImage(galleryImage);
        
        let k = 1;
        function nextImage(galleryImage){ 
        next.addEventListener('click',()=>{
//             i += 20;
            k++;
            console.log(galleryImage);
            document.getElementById('page').innerHTML = k;
            // i-=20;
            if(k == Math.ceil(galleryImage.length/20)){
                document.getElementById('page').innerHTML = Math.ceil(galleryImage.length/20);
                next.style.display = "none"}
            else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block"};
                my_flex_block.forEach((index)=>{
                    index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i++].filename}' width="150" height="150" alt=''>`;
            });
        });
    }

    function prevImage(galleryImage) {
        prev.addEventListener('click',()=>{
            // console.log(i);
            // i--;
            document.getElementById('page').innerHTML = --k;
            if(k == 1){
                document.getElementById('page').innerHTML = 1;
                next.style.display = "inline-block";
                prev.style.display = "none";}

            else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block"};
            my_flex_block.forEach((index)=>{
                index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i--].filename}' width="150" height="150" alt=''>`;

            });
        });

    }
    }

    function Large(galleryImage) {
        let i = parseInt(document.getElementById('page').getAttribute('data'));
        let newgalleryImage = galleryImage.filter((index)=>{ return index.height > 1500});
        console.log(newgalleryImage.length);
        next.style.display = "inline-block";
            prev.style.display = "inline-block";
            document.getElementById('page').style.display = "inline-block";
            document.getElementById('page').innerHTML = 1;
            console.log(Math.ceil(galleryImage.length/20));
        my_flex_block.forEach((index,i)=>{
            if(typeof newgalleryImage[i] !== "undefined"){
                console.log(galleryImage.length);
                index.innerHTML = `<img src='https://unsplash.it/${newgalleryImage[i].filename}' width="150" height="150" alt=''>`;
            }           
        });
        nextImage(newgalleryImage);
        prevImage(newgalleryImage);
        
        let l = 1;
        function nextImage(galleryImage){ 
        next.addEventListener('click',()=>{
//             i += 20;
            l++;
            console.log(galleryImage);
            document.getElementById('page').innerHTML = l;
            // i-=20;
            if(l == Math.ceil(galleryImage.length/20)){
                document.getElementById('page').innerHTML = Math.ceil(galleryImage.length/20);
                next.style.display = "none"}
            else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block"};
                my_flex_block.forEach((index)=>{
                    index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i++].filename}' width="150" height="150" alt=''>`;
            });
        });
    }

    function prevImage(galleryImage) {
        prev.addEventListener('click',()=>{
            // console.log(i);
            // i--;
            document.getElementById('page').innerHTML = --l;
            if(l == 1){
                document.getElementById('page').innerHTML = 1;
                next.style.display = "inline-block";
                prev.style.display = "none";}

            else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block"};
            my_flex_block.forEach((index)=>{
                index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i--].filename}' width="150" height="150" alt=''>`;

            });
        });
    }

    }
    
    let i = parseInt(document.getElementById('page').getAttribute('data'));
           function nextGlobal(galleryImage){ 
                next.addEventListener('click',()=>{
//             i += 20;
            j++;
            console.log(galleryImage);
            document.getElementById('page').innerHTML = j;
            // i-=20;
            if(j > Math.ceil(galleryImage.length/20)){
                document.getElementById('page').innerHTML = Math.ceil(galleryImage.length/20);
                next.style.display = "none"}
            else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block"};
                my_flex_block.forEach((index)=>{
                    index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i++].filename}' width="150" height="150" alt=''>`;
            });
        });
    }

    function prevGlobal(galleryImage) {
        prev.addEventListener('click',()=>{
            // console.log(i);
            // i--;
            document.getElementById('page').innerHTML = --j;
            if(j < 1){
                document.getElementById('page').innerHTML = 1;
                next.style.display = "inline-block";
                prev.style.display = "none";}

            else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block"};
            my_flex_block.forEach((index)=>{
                index.innerHTML = `<img src='https://unsplash.it/${galleryImage[i--].filename}' width="150" height="150" alt=''>`;

            });
        });
    }
    
    let showImage = document.getElementById('showImage');    
    document.querySelectorAll('.my-flex-block').forEach((index)=>{
        index.addEventListener('click', function(){
            showImage.innerHTML = this.innerHTML;
            showImage.style.display = 'block';
            showImage.querySelector('img').removeAttribute('width');
            showImage.querySelector('img').removeAttribute('height');
            console.log(showImage.querySelector('img'));            
        })
    });

     
   
    
    
    document.querySelector('#showImage').addEventListener('click',()=>{
        console.log(showImage);
        if(showImage.style.display == 'block'){
            showImage.style.display = 'none';
        }
    });
    
    //let autorsName = document.getElementById('autors');
    //let autorsArray = [];
   /*     function autors(galleryImage){
                for(let i = 0; i < galleryImage.length; i++){                  
                        autorsArray.push(galleryImage[i].author)                                    
                }
        }    
   
    for (let i=1 ; i<=10 ; i++){
        console.log(i);
    };
   f=autorsArray[0];*/

   /*let autorsName = document.getElementById('autors');
   let autorsArray = [];
        function autors(galleryImage){
             
                for(let i = 0; i < galleryImage.length; i++){    
                    
                    autorsArray.push(galleryImage[i].author);
                    //console.log(autorsArray);
                }
//            
        }   */
 
})();
