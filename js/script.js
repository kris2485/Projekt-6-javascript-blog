'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  tagAuthorLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
};
const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');

  /* [Done] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [Done] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  //console.log('clickedElement:', clickedElement);

  /* [Done] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(' .posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [Done] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  //console.log(articleSelector);

  /* [Done] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);

  /* [Done] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {
  /* [Done] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log(customSelector);

  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element & get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* create HTML of the link */
    // titleList.innerHTML = titleList.innerHTML + linkHTML;

    /* const titleList = document.getElementByID('article-1');
	    titleList.insertAdjacentHTML('afterend', '<article id="article-2"></article>');

	    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    min: 999999,
    max: 0,
  };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    //console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}
function calculateTagClass(count, params) {
  /* const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1); */

  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
      //const tagsHTML = '<li><a href="#tag-' + tag + '">' + ' ' + tag + ' ' + '</a></li>';
      const linkTagsHTML = { id: tag, tag: tag };
      const tagsHTML = templates.tagLink(linkTagsHTML);
      /* add generated code to html variable */
      html = html + tagsHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams:', tagsParams);
  /* [NEW] create variable for all links HTML code */
  //let allTagsHTML = '';
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')</a></li> ';
    const tagLinkHTML = '<li><a href="#tag-' + tag + '"class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + /*(' + allTags[tag] + ')*/ '</a></li> ';
    //console.log('tagLinkHTML:', tagLinkHTML);
    //allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagsLinks = document.querySelectorAll('a.active[href ^= "#tag-"]');
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

function calculateAuthorsParams(authors) {
  const params = {
    min: 999999,
    max: 0,
  };
  for (let author in authors) {
    if (authors[author] > params.max) {
      params.max = authors[author];
    } else if (authors[author] < params.min) {
      params.min = authors[author];
    }
    console.log(author);
    console.log(author + ' is used ' + authors[author] + ' times');
  }
  return params;
}

function calulateAuthorsClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    //console.log('authorWrapper:', authorWrapper);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);
    //const authorHTML = '<li><a href="#author-' + articleAuthor + '">' + 'by ' + articleAuthor + '</a></li>';
    const linkAuthorHTML = { id: articleAuthor, title: articleAuthor };
    const authorHTML = templates.authorLink(linkAuthorHTML);
    html = html + authorHTML;

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    authorWrapper.innerHTML = html;
  }

  const authorList = document.querySelector(optAuthorsListSelector);

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);
  //let allAuthorsHTML = '';
  const allAuthorsHTML = { authors: [] };
  for (let author in allAuthors) {
    //const authorLinkHTML = '<li><a href="#author-' + author + '"class"' + calculateAuthorsParams(allAuthors[author], authorsParams) + '">' + author + '(' + allAuthors[author] + ') </a></li> ';
    //console.log('authorLinkHTML:', authorLinkHTML);
    //allAuthorsHTML += authorLinkHTML;
    allAuthorsHTML.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateAuthorsParams(allAuthors[author], authorsParams),
    });
  }
  //authorList.innerHTML = allAuthorsHTML;
  authorList.innerHTML = templates.tagAuthorLink(allAuthorsHTML);
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorLinks = document.querySelectorAll('a.active[href ^= "#author-"]');
  console.log(activeAuthorLinks);
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }
  const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let allAuthorsLink of allAuthorsLinks) {
    allAuthorsLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  const allLinksToAuthors = document.querySelectorAll('a[href ^= "#author"]');
  for (let allLinkToAuthor of allLinksToAuthors) {
    allLinkToAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
