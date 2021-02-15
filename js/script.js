'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/
const titleClickHandler = function(event){
	event.preventDefault();
	const clickedElement = this;
  	console.log('Link was clicked!');

  /* [Done] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
  	activeLink.classList.remove('active');
   }

  /* [Done] add class 'active' to the clicked link */

  	clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

  /* [Done] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(' .posts .active');

  for (let activeArticle of activeArticles) {
  	activeArticle.classList.remove('active');
  }

  /* [Done] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [Done] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [Done] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}



const optArticleSelector = '.post',
	  optTitleSelector = '.post-title',
	  optTitleListSelector = '.titles';

	function generateTitleLinks(){

	  /* [Done] remove contents of titleList */

	  const titleList = document.querySelector(optTitleListSelector);
	  titleList.innerHTML = '';

	  /* for each article */

	  /* find all the articles and save them to variable: articles */
	  const articles = document.querySelectorAll(optArticleSelector);

	  let html = '';

	  for(let article of articles) {
	    /* get the article id */
	    const articleId = article.getAttribute('id');

	    /* find the title element & get the title from the title element */
	    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

	    /* get the title from the title element */
	    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
	    console.log(linkHTML);

	    /* create HTML of the link */
	    titleList.innerHTML = titleList.innerHTML + linkHTML;

	    /* const titleList = document.getElementByID('article-1');
	    titleList.insertAdjacentHTML('afterend', '<article id="article-2"></article>');

	    /* insert link into titleList */
	    html = html + linkHTML;
		
	   }
		titleList.innerHTML = html;

	}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}



