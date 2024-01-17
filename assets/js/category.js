// get params
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('c');
const mealList = document.querySelector('#meal-list');

window.addEventListener('load', async () => {
    const capitalizeCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
    changeTitle(`${capitalizeCategory} Meals`);
    renderCategoryTitle(category);
    renderBreadcrumbItem(category);

    mealList.appendChild(createLoader());
    const meals = await getMealsByCategory(category);
    if (meals) {
        mealList.removeChild(mealList.firstElementChild);
        meals.meals.forEach((meal) => {
            renderMealItem(meal, mealList);
        });
    }
});

const changeTitle = (title) => {
    document.title = title;
};

const getMealsByCategory = async (category) => {
    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const renderCategoryTitle = (category) => {
    const categoryTitle = document.querySelector('#category-title');
    categoryTitle.textContent = `${category} Meals`;
};

const renderBreadcrumbItem = (category) => {
    const breadcrumbItem = document.querySelector('#breadcrumb-item');
    breadcrumbItem.textContent = category;
};

const renderMealItem = (meal, target) => {
    const mealItem = document.createElement('div');
    mealItem.className = 'relative rounded overflow-hidden group';
    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = '';
    mealImage.className = 'w-full h-52 object-cover bg-cover rounded';
    const mealOverlay = document.createElement('div');
    mealOverlay.className =
        'absolute inset-0 bg-black bg-opacity-50 items-center justify-center flex group-hover:opacity-100 opacity-0 duration-300';
    const mealOverlayContent = document.createElement('div');
    mealOverlayContent.className = 'text-center';
    const mealName = document.createElement('h2');
    mealName.className = 'text-xl font-semibold text-white';
    mealName.textContent = meal.strMeal;
    const mealButton = document.createElement('a');
    mealButton.href = `/recipe.html?id=${meal.idMeal}`;
    mealButton.className =
        'bg-white text-sm px-4 py-2 rounded mt-4 block max-w-max mx-auto';
    mealButton.textContent = 'View Recipes';
    mealOverlayContent.appendChild(mealName);
    mealOverlayContent.appendChild(mealButton);
    mealOverlay.appendChild(mealOverlayContent);
    mealItem.appendChild(mealImage);
    mealItem.appendChild(mealOverlay);
    target.appendChild(mealItem);
};

const createLoader = () => {
    const loader = `<div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>`;
    const loaderElement = document.createElement('div');
    loaderElement.className = 'flex justify-center w-full py-8 col-span-full';
    loaderElement.innerHTML = loader;
    return loaderElement;
};
