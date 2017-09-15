'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var httpGetAjax = function () {
        function httpGetAjax() {
            _classCallCheck(this, httpGetAjax);
        }

        _createClass(httpGetAjax, null, [{
            key: 'httpGet',
            value: function httpGet(url) {
                return new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onload = function () {
                        if (this.status == 200) {
                            resolve(this.response);
                        } else {
                            var error = new Error(this.statusText);
                            error.code = this.status;
                            reject(error);
                        }
                    };

                    xhr.onerror = function () {
                        reject(new Error("Network Error"));
                    };

                    xhr.send();
                });
            }
        }]);

        return httpGetAjax;
    }();

    ;
    // counter next or prev
    var j = 1; // counter for value
    var next = document.getElementById('next');
    var prev = document.getElementById('prev');
    var my_flex_block = document.querySelectorAll('.my-flex-block');
    var galery = document.querySelector('.galery');
    var modal = document.getElementById('modal');
    var galleryImage = [];
    var authorsList = [];
    httpGetAjax.httpGet("https://unsplash.it/list").then(function (response) {
        galleryImage = JSON.parse(response);
        for (var _i = 0; _i <= galleryImage.length - 1; _i++) {
            authorsList[_i] = galleryImage[_i].author;
        }
        authorsList.sort();
        console.log(authorsList);
        for (var _i2 = 1; _i2 <= authorsList.length - 1; _i2++) {
            if (authorsList[_i2] != authorsList[_i2 - 1]) {
                document.getElementById("autors").innerHTML += '<div class="author">' + authorsList[_i2] + '</div>';
            }
        }
        document.querySelectorAll('.author').forEach(function (index) {
            index.addEventListener('click', function () {
                var _this = this;

                console.log(this.innerHTML);
                //нач
                var i = parseInt(document.getElementById('page').getAttribute('data'));
                var a = galleryImage;
                galleryImage = galleryImage.filter(function (index) {
                    return index.author === _this.innerHTML;
                });

                next.style.display = "inline-block";
                prev.style.display = "inline-block";
                document.getElementById('page').style.display = "inline-block";
                document.getElementById('page').innerHTML = 1;
                console.log(Math.ceil(galleryImage.length / 20));
                my_flex_block.forEach(function (index, i) {
                    if (typeof galleryImage[i] !== "undefined") {
                        console.log(galleryImage.length);
                        index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i].filename + '\' width="150" height="150" alt=\'\'>';
                    } else {
                        index.innerHTML = '<img src=\'\' width="150" height="150" alt=\'\'>';
                    }
                });
                nextImage(galleryImage);
                prevImage(galleryImage);

                var k = 1;
                function nextImage(galleryImage) {
                    next.addEventListener('click', function () {
                        //             i += 20;
                        k++;
                        console.log(galleryImage);
                        document.getElementById('page').innerHTML = k;
                        // i-=20;
                        if (k == Math.ceil(galleryImage.length / 20)) {
                            document.getElementById('page').innerHTML = Math.ceil(galleryImage.length / 20);
                            next.style.display = "none";
                        } else {
                            prev.style.display = "inline-block";
                            next.style.display = "inline-block";
                        };
                        my_flex_block.forEach(function (index) {
                            index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i++].filename + '\' width="150" height="150" alt=\'\'>';
                        });
                    });
                }

                function prevImage(galleryImage) {
                    prev.addEventListener('click', function () {
                        // console.log(i);
                        // i--;
                        document.getElementById('page').innerHTML = --k;
                        if (k == 1) {
                            document.getElementById('page').innerHTML = 1;
                            next.style.display = "inline-block";
                            prev.style.display = "none";
                        } else {
                            prev.style.display = "inline-block";
                            next.style.display = "inline-block";
                        };
                        my_flex_block.forEach(function (index) {
                            index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i--].filename + '\' width="150" height="150" alt=\'\'>';
                        });
                    });
                }
                galleryImage = a;
                console.log(a); //кон
            });
        });
        my_flex_block.forEach(function (index, i) {
            index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i].filename + '\' width="150" height="150" alt=\'\'>';
        });
        nextGlobal(galleryImage);
        prevGlobal(galleryImage);
        // autors(galleryImage);
        return galleryImage;
    }).then(function (galleryImage) {
        document.getElementById('Small').addEventListener("click", function () {
            Small(galleryImage);
        });
        document.getElementById('Medium').addEventListener("click", function () {
            Medium(galleryImage);
        });
        document.getElementById('Large').addEventListener("click", function () {
            Large(galleryImage);
        });
    })
    //    .then(console.log(autorsList))
    .catch(function (error) {
        console.log(error); //
    });

    function Small(galleryImage) {
        var i = parseInt(document.getElementById('page').getAttribute('data'));
        var SmallnewgalleryImage = galleryImage.filter(function (index) {
            return index.height < 800;
        });
        console.log(SmallnewgalleryImage);
        if (SmallnewgalleryImage.length < 20) {
            next.style.display = "none";
            prev.style.display = "none";
            document.getElementById('page').style.display = "none";
            my_flex_block.forEach(function (index, i) {
                if (typeof SmallnewgalleryImage[i] !== "undefined") {
                    index.innerHTML = '<img src=\'https://unsplash.it/' + SmallnewgalleryImage[i].filename + '\' width="150" height="150" alt=\'\'>';
                }
                if (i >= SmallnewgalleryImage.length) {
                    index.innerHTML = '<img src=\'\' width="150" height="150" alt=\'\'>';
                }
            });
        }
    }

    function Medium(galleryImage) {
        var i = parseInt(document.getElementById('page').getAttribute('data'));
        galleryImage = galleryImage.filter(function (index) {
            return index.height > 799 && index.height < 1499;
        });
        next.style.display = "inline-block";
        prev.style.display = "inline-block";
        document.getElementById('page').style.display = "inline-block";
        document.getElementById('page').innerHTML = 1;
        console.log(Math.ceil(galleryImage.length / 20));
        my_flex_block.forEach(function (index, i) {
            if (typeof galleryImage[i] !== "undefined") {
                console.log(galleryImage.length);
                index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i].filename + '\' width="150" height="150" alt=\'\'>';
            } else {
                index.innerHTML = '<img src=\'\' width="150" height="150" alt=\'\'>';
            }
        });
        nextImage(galleryImage);
        prevImage(galleryImage);

        var k = 1;
        function nextImage(galleryImage) {
            next.addEventListener('click', function () {
                //             i += 20;
                k++;
                console.log(galleryImage);
                document.getElementById('page').innerHTML = k;
                // i-=20;
                if (k == Math.ceil(galleryImage.length / 20)) {
                    document.getElementById('page').innerHTML = Math.ceil(galleryImage.length / 20);
                    next.style.display = "none";
                } else {
                    prev.style.display = "inline-block";
                    next.style.display = "inline-block";
                };
                my_flex_block.forEach(function (index) {
                    index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i++].filename + '\' width="150" height="150" alt=\'\'>';
                });
            });
        }

        function prevImage(galleryImage) {
            prev.addEventListener('click', function () {
                // console.log(i);
                // i--;
                document.getElementById('page').innerHTML = --k;
                if (k == 1) {
                    document.getElementById('page').innerHTML = 1;
                    next.style.display = "inline-block";
                    prev.style.display = "none";
                } else {
                    prev.style.display = "inline-block";
                    next.style.display = "inline-block";
                };
                my_flex_block.forEach(function (index) {
                    index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i--].filename + '\' width="150" height="150" alt=\'\'>';
                });
            });
        }
    }

    function Large(galleryImage) {
        var i = parseInt(document.getElementById('page').getAttribute('data'));
        var newgalleryImage = galleryImage.filter(function (index) {
            return index.height > 1500;
        });
        console.log(newgalleryImage.length);
        next.style.display = "inline-block";
        prev.style.display = "inline-block";
        document.getElementById('page').style.display = "inline-block";
        document.getElementById('page').innerHTML = 1;
        console.log(Math.ceil(galleryImage.length / 20));
        my_flex_block.forEach(function (index, i) {
            if (typeof newgalleryImage[i] !== "undefined") {
                console.log(galleryImage.length);
                index.innerHTML = '<img src=\'https://unsplash.it/' + newgalleryImage[i].filename + '\' width="150" height="150" alt=\'\'>';
            }
        });
        nextImage(newgalleryImage);
        prevImage(newgalleryImage);

        var l = 1;
        function nextImage(galleryImage) {
            next.addEventListener('click', function () {
                //             i += 20;
                l++;
                console.log(galleryImage);
                document.getElementById('page').innerHTML = l;
                // i-=20;
                if (l == Math.ceil(galleryImage.length / 20)) {
                    document.getElementById('page').innerHTML = Math.ceil(galleryImage.length / 20);
                    next.style.display = "none";
                } else {
                    prev.style.display = "inline-block";
                    next.style.display = "inline-block";
                };
                my_flex_block.forEach(function (index) {
                    index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i++].filename + '\' width="150" height="150" alt=\'\'>';
                });
            });
        }

        function prevImage(galleryImage) {
            prev.addEventListener('click', function () {
                // console.log(i);
                // i--;
                document.getElementById('page').innerHTML = --l;
                if (l == 1) {
                    document.getElementById('page').innerHTML = 1;
                    next.style.display = "inline-block";
                    prev.style.display = "none";
                } else {
                    prev.style.display = "inline-block";
                    next.style.display = "inline-block";
                };
                my_flex_block.forEach(function (index) {
                    index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i--].filename + '\' width="150" height="150" alt=\'\'>';
                });
            });
        }
    }

    var i = parseInt(document.getElementById('page').getAttribute('data'));
    function nextGlobal(galleryImage) {
        next.addEventListener('click', function () {
            //             i += 20;
            j++;
            console.log(galleryImage);
            document.getElementById('page').innerHTML = j;
            // i-=20;
            if (j > Math.ceil(galleryImage.length / 20)) {
                document.getElementById('page').innerHTML = Math.ceil(galleryImage.length / 20);
                next.style.display = "none";
            } else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block";
            };
            my_flex_block.forEach(function (index) {
                index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i++].filename + '\' width="150" height="150" alt=\'\'>';
            });
        });
    }

    function prevGlobal(galleryImage) {
        prev.addEventListener('click', function () {
            // console.log(i);
            // i--;
            document.getElementById('page').innerHTML = --j;
            if (j < 1) {
                document.getElementById('page').innerHTML = 1;
                next.style.display = "inline-block";
                prev.style.display = "none";
            } else {
                prev.style.display = "inline-block";
                next.style.display = "inline-block";
            };
            my_flex_block.forEach(function (index) {
                index.innerHTML = '<img src=\'https://unsplash.it/' + galleryImage[i--].filename + '\' width="150" height="150" alt=\'\'>';
            });
        });
    }

    var showImage = document.getElementById('showImage');
    document.querySelectorAll('.my-flex-block').forEach(function (index) {
        index.addEventListener('click', function () {
            showImage.innerHTML = this.innerHTML;
            showImage.style.display = 'block';
            showImage.querySelector('img').removeAttribute('width');
            showImage.querySelector('img').removeAttribute('height');
            console.log(showImage.querySelector('img'));
        });
    });

    document.querySelector('#showImage').addEventListener('click', function () {
        console.log(showImage);
        if (showImage.style.display == 'block') {
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