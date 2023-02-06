// Берём данные постов из API
const getPostsData = async () => {
  const pageParams = new URLSearchParams(location.search);
  const postPage = pageParams.get('page');
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${(postPage == null) ? 1 : postPage}`);
  const result = await response.json();

  return {
    posts: result.data,
    pagination: result.meta.pagination,
  };
}


// Отрисовывем список статей
const createPostsList = async () => {
  const articles = await getPostsData();
  const articlesList = document.querySelector('.posts__list');

  for (let i = 0; i < articles.posts.length; i++) {
    arcticleItem = document.createElement('li');
    artecileLink = document.createElement('a');

    arcticleItem.classList.add('list__item');
    artecileLink.classList.add('item__link');

    artecileLink.textContent = articles.posts[i].title;
    artecileLink.href = `post.html?id=${articles.posts[i].id}`;

    articlesList.append(arcticleItem);
    arcticleItem.append(artecileLink);
  }

  createPostsNav(articles);
}
createPostsList();


// Логика пагинации
function createPostsNav(sheets) {
  const postsNav = document.querySelector('.nav__list');
  let linksArr = [];

  if (sheets.pagination.page < 6) {
    for (let i = 1; i <= sheets.pagination.pages; i++) {
      if (i < 6) {
        createPage(postsNav, linksArr, i);
      }
    }

    createPage(postsNav, linksArr, 6);
    createSpace(postsNav);
    createPage(postsNav, linksArr, sheets.pagination.pages);
  } else if (sheets.pagination.page > sheets.pagination.pages - 5) {
    createPage(postsNav, linksArr, 1);
    createSpace(postsNav);
    createPage(postsNav, linksArr, sheets.pagination.pages - 5);

    for (let i = 1; i <= sheets.pagination.pages; i++) {
      if (i > sheets.pagination.pages - 5) {
        createPage(postsNav, linksArr, i);
      }
    }
  } else {
    createPage(postsNav, linksArr, 1);
    createSpace(postsNav);

    createPage(postsNav, linksArr, sheets.pagination.page - 3);
    createPage(postsNav, linksArr, sheets.pagination.page - 2);
    createPage(postsNav, linksArr, sheets.pagination.page - 1);
    createPage(postsNav, linksArr, sheets.pagination.page);
    createPage(postsNav, linksArr, sheets.pagination.page + 1);
    createPage(postsNav, linksArr, sheets.pagination.page + 2);
    createPage(postsNav, linksArr, sheets.pagination.page + 3);

    createSpace(postsNav);
    createPage(postsNav, linksArr, sheets.pagination.pages);
  }

  pagination(sheets, linksArr);
}


// Отрисовывем троеточие
function createSpace(postsNav) {
  sheetItem = document.createElement('li');
  sheetItem.classList.add('nav__item-space');
  sheetItem.textContent = '...';
  postsNav.append(sheetItem);
}


// Отрисовывем номера страниц
function createPage(postsNav, linksArr, i) {
  sheetItem = document.createElement('li');
  sheetLink = document.createElement('a');
  linksArr.push(sheetLink);

  sheetItem.classList.add('nav__item');
  sheetLink.classList.add('nav__link');

  sheetLink.textContent = [i];
  sheetLink.href = `main.html?page=${i}`;

  postsNav.append(sheetItem);
  sheetItem.append(sheetLink);
}


// Стили для кнопок и номеров страниц
function pagination(sheets, linksArr) {
  const prevBtn = document.querySelector('.btn_prev');
  const prevArrow = document.querySelector('.pagination_prev');
  const nextBtn = document.querySelector('.btn_next');
  const nextArrow = document.querySelector('.pagination_next');

  for (let i = 0; i < linksArr.length; i++) {
    if (sheets.pagination.page == linksArr[i].textContent) {
      linksArr[i].style.color = '#C3073F';
    }

    if (sheets.pagination.page === 1) {
      prevBtn.classList.add('pagination_btn-no_active');
      prevBtn.classList.remove('pagination_btn');
      prevBtn.disabled = true;
      prevArrow.classList.add('pagination_arrow-no_active');
      prevArrow.classList.remove('pagination_arrow');
    }

    if (sheets.pagination.page === sheets.pagination.pages) {
      nextBtn.classList.add('pagination_btn-no_active');
      nextBtn.classList.remove('pagination_btn');
      nextBtn.disabled = true;
      nextArrow.classList.add('pagination_arrow-no_active');
      nextArrow.classList.remove('pagination_arrow');
    }

    // перелистывание страниц по нажатию на кнопки
    prevBtn.addEventListener('click', () => {
      window.location.href = `main.html?page=${sheets.pagination.page - 1}`;
    });

    nextBtn.addEventListener('click', () => {
      window.location.href = `main.html?page=${sheets.pagination.page + 1}`;
    });
  }
}
