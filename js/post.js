// Берём id статей из API
const getParamsData = async () => {
  const pageParams = new URLSearchParams(location.search);
  const postId = pageParams.get('id');
  const response = await fetch(`https://gorest.co.in/public-api/posts?id=${postId}`);
  const result = await response.json();

  return {
    title: result.data[0].title,
    text: result.data[0].body,
  }
}


// Берём id коментариев API
const getCommentsData = async () => {
  const pageParams = new URLSearchParams(location.search);
  const postId = pageParams.get('id');
  const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${postId}`);
  const result = await response.json();

  return {
    data: result.data,
  }
}


// Отрисовываем статью
const createArticle = async () => {
  const article = await getParamsData();
  const articleContent = document.querySelector('.content');

  let articleTitle = document.createElement('h1');
  let articleText = document.createElement('p');

  articleTitle.classList.add('content__title');
  articleText.classList.add('content__text');

  articleTitle.textContent = article.title;
  articleText.textContent = article.text;

  articleContent.append(articleTitle);
  articleContent.append(articleText);
}
createArticle();


// Отрисовывем коментарии к статье
const createComment = async () => {
  const comments = await getCommentsData();
  const commentContent = document.querySelector('.comment');

  for (let i = 0; i < comments.data.length; i++) {
    let commentWrap = document.createElement('div');
    let commentName = document.createElement('h2');
    let emailWrap = document.createElement('p');
    let commentEmail = document.createElement('a');
    let commentText = document.createElement('p');

    commentWrap.classList.add('comment__wrap');
    commentName.classList.add('comment__name');
    emailWrap.classList.add('email__wrap');
    commentEmail.classList.add('comment__email');
    commentText.classList.add('comment__text');

    commentName.textContent = comments.data[i].name;
    commentEmail.textContent = `email: ${comments.data[i].email}`;
    commentEmail.href = `mailto:${comments.data[i].email}`
    commentText.textContent = comments.data[i].body;

    commentContent.append(commentWrap);
    commentWrap.append(commentName);
    commentWrap.append(emailWrap);
    commentWrap.append(commentText);
    emailWrap.append(commentEmail);
  }
}
createComment();
