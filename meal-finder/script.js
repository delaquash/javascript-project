const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById("random");
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById("single-meal");

// search meal and fetch from api
function searchMeal (e) {
    e.preventDefault();

    // clear single meal
    singleMealEl.innerHTML = '';

    // get search term
    const term = search.value;
    console.log('term');

    // check for empty search
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search result for ${term}</h2>`;
            if(data.meals === null) {
                resultHeading.innerHTML=`<p>There are no search result. Try another keyword</p>`
            } else {
                mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `)
                .join('')
            }
        })
        // clear search value
        search.value= '';
    } else {
        alert('Please enter a search term')
    }
}

// event listeners
submit.addEventListener('submit', searchMeal)