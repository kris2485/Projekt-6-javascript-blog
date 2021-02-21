'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/
const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [Done] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
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
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author';

function generateTitleLinks(customSelector = '') {
  /* [Done] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(customSelector);

  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element & get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';

    /* create HTML of the link */
    // titleList.innerHTML = titleList.innerHTML + linkHTML;

    /* const titleList = document.getElementByID('article-1');
	    titleList.insertAdjacentHTML('afterend', '<article id="article-2"></article>');

	    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagsHTML =
        '<li><a href="#tag-' + tag + '">' + ' ' + tag + ' ' + '</a></li>';
      /* add generated code to html variable */
      html = html + tagsHTML;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
    /* END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagsLinks = document.querySelectorAll(
    'a.active[href ^= "#tag-"]'
  );
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagsLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let allTagsLink of allTagsLinks) {
    /* add class active */
    allTagsLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href ^= "#tag-"]');
  /* START LOOP: for each link */
  for (let allLinksToTag of allLinksToTags) {
    /* add tagClickHandler as event listener for that link */
    allLinksToTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log('authorWrapper:', authorWrapper);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    const authorHTML =
      '<li><a href="#author-' +
      articleAuthor +
      '">' +
      'by ' +
      articleAuthor +
      '</a></li>';
    html = html + authorHTML;
    authorWrapper.innerHTML = html;
  }
}
generateAuthors();
