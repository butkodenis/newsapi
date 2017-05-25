 //

    //



 // var xhr = new XMLHttpRequest();
 // xhr.open('GET', 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=c36aae913023435db7d385e4125a3d68' );
 //
 // xhr.send();
 //
 // xhr.onreadystatechange = function () {
 //     if (this.readyState !== 4) return;
 //
 //     if (xhr.status != 200) {
 //         // обработать ошибку
 //         console.log(xhr.status + ': ' + xhr.statusText);
 //     } else {
 //         try {
 //             var news = JSON.parse(xhr.responseText);
 //         }
 //         catch (e) {
 //             console.log("Некорректный ответ " + e.message);
 //         }
 //     }
 // };
 //
 // console.log(news);

 var getCNN = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=c36aae913023435db7d385e4125a3d68';
 var getBBC = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=c36aae913023435db7d385e4125a3d68';
 var xhr = new XMLHttpRequest();
 //    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?APPID={Ваш APPID, зарегистрируйтесь и бесплатно получите}&q=Zaporizhya&units=metric&lang=ua');
 xhr.open('GET', 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=c36aae913023435db7d385e4125a3d68');

 xhr.send();
 xhr.onreadystatechange = function() {
     if (xhr.readyState !== 4)
         return;
     if(xhr.status === 200) {
         try {

             var news = JSON.parse(xhr.responseText);
             var newsAutor = news.source;
             var title = news.articles[2].title;
             var authorPost = news.articles[2].author;
             var urlNews = news.articles[2].url;
             var datePubl = news.articles[2].publishedAt;
             var newsImg = news.articles[2].urlToImage;


             console.log(newsAutor);
             console.log(news);
             console.log(title);
             console.log(newsImg);
         }
         catch (e) {
             console.log("Wrong JSON!");
         }
     }
     else {
         console.log(xhr.status + " " + xhr.statusText);
     }
 };



     var btn = $('.btn-info');
     btn.click( function () {
        $('p').text(title);
     });






