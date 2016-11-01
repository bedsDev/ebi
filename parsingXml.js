

function run() {
    var articleJson = parseXml2Json(articlesXml);
    var counter = countAuthorPublications(articleJson);
    console.log(counter)

    displayOnPage(counter);
}

function displayOnPage(counter) {
    console.log(counter)
    var html = "<table>";
    var authorMap = counter.authorMap;
    var authors = Object.keys(authorMap);
    var counts = counter.counts;

    var row1 = "<tr> <td></td>";
    authors.map(function(author) {
        row1 += "<td>"
        row1 += authorMap[author].last + "</br>" + authorMap[author].init;
        row1 += "</td>";
    });
    row1 += "</tr>";

    html += row1;
    var row;
    authors.map(function(authorRow,indxRow) {
        row = "<tr><td>"
        row += authorMap[authorRow].last + "</br>" + authorMap[authorRow].init;
        row += "</td>";

        authors.map(function(authorCol,indxCol) { 
            row += "<td>"
            row += insersection(counts[authorRow],counts[authorCol]).length;
row += "</td>"
        });

        row += "</tr>";
        html += row;
    });
    
    html += "</table>";
    console.log(html)
    var displayDiv = document.getElementById("display");
    console.log(displayDiv)
    displayDiv.innerHTML = html;
}

function countAuthorPublications(articles) {
    console.log(articles)
    var counts = {};
    var authorMap = {};
    articles.map(function(article, indx) {
            authors = article.authors;
            authors.map(function(author) {
                var name = generateAuthorName(author);
                if (!authorMap.hasOwnProperty(name)) {
                    authorMap[name] = author;
                }
                if (!counts.hasOwnProperty(name)) {
                    counts[name] = [];
                }
                counts[name].push(indx);

            });





        })
        //         var allAuthors = Object.keys(authorMap);
    console.log({ counts: counts, authorMap: authorMap });
    return { counts: counts, authorMap: authorMap }

}

function insersection(arr1, arr2) {
    var common = [];
    arr1.map(function(elem) {
        if (arr2.indexOf(elem) > 0) {
            common.push(elem);
        }
    })
    return common;
}

function parseXml2Json(articlesXml) {

    var xmlParser, xmlDoc;



    console.log(articlesXml);

    xmlParser = new DOMParser();
    xmlDoc = xmlParser.parseFromString(articlesXml, "text/xml");

    // document.getElementById("display").innerHTML =
    //     articleNodes = xmlDoc.documentElement.childNodes;
    articleNodes = xmlDoc.getElementsByTagName("Article")
    console.log(articleNodes.length);

    articles = [];

    for (var i = 0; i < articleNodes.length; i++) {
        var article = {};
        articles.push(article);
        articleNode = articleNodes[i];
        if (articleNode.nodeType == 1) {
            console.log(i, articleNode)
            article.title = articleNode.childNodes[0].childNodes[0].nodeValue;
            article.authors = [];
            authorNodes = articleNode.childNodes[1].childNodes;
            for (j = 0; j < authorNodes.length; j++) {
                authorObj = {};
                authorNode = authorNodes[j];
                console.log(authorNode);
                nameElements = authorNode.childNodes;
                authorObj.last = nameElements[0].childNodes[0].nodeValue;
                authorObj.fore = nameElements[1].childNodes[0].nodeValue;
                authorObj.init = nameElements[2].childNodes[0].nodeValue;
                article.authors.push(authorObj);

                console.log(authorObj);

            }
            //             console.log(title);
            //  console.log(titles.articletitle);

            //  console.log(title.nodeName)

            //  console.log( titles)

            //  article.title 
        }
    }
    //     console.log(articles)
    return articles;
}
//to synth name as lower case
function generateAuthorName(author) {
    var name = author.init + "." + author.fore + "." + author.last;
    name = name.toLowerCase();

    return name;
}
