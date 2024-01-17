const cta = document.querySelectorAll('.cta');
const category = document.querySelector('#category-list');
const categoryList = document.querySelector('#category-list');

const categoriesUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php ';

const getCategories = async () => {
    const response = await fetch(categoriesUrl);
    const data = await response.json();
    return data;
};

window.addEventListener('load', async () => {
    const categories = await getCategories();
    renderCategoiesItem(categories);
});

cta.forEach((button) => {
    button.addEventListener('click', () => {
        scrollToCategory();
    });
});
const renderCategoiesItem = (categories) => {
    categories.categories.forEach((category) => {
        const categoryItem = document.createElement('a');
        categoryItem.href = `/category.html?c=${category.strCategory.toLowerCase()}`;
        categoryItem.className = 'flex flex-col gap-2 items-center';
        const categoryImage = document.createElement('img');
        categoryImage.src = category.strCategoryThumb;
        categoryImage.alt = '';
        categoryImage.className = 'w-24 h-24 object-fit rounded bg-cover';
        const categoryName = document.createElement('p');
        categoryName.textContent = category.strCategory;
        categoryItem.appendChild(categoryImage);
        categoryItem.appendChild(categoryName);
        categoryList.appendChild(categoryItem);
    });
};
const scrollToCategory = () => {
    const categoryOffset = category.offsetTop;
    window.scrollTo({
        top: categoryOffset - 100,
        behavior: 'smooth',
    });
};
