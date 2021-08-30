const searchFood = async () => {
    const inputField = document.getElementById('search-field');
    const searchText = inputField.value;
    if (searchText == '') {
        const emptyInput = document.getElementById('empty-input');
        emptyInput.textContent = '';
        const p = document.createElement('p');
        p.classList.add('text-center')
        p.innerText = 'Please write something to display';
        emptyInput.appendChild(p);
    }
    else {
        // console.log(searchText);
        inputField.value = '';
        document.getElementById('empty-input').style.display = 'none';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data.meals);
        }
        catch (error) {
            console.log(error);
        }
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displaySearchResult(data.meals))
    }
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    // clear data
    searchResult.textContent = '';
    console.log(meals);
    if (meals == null) {
        const notFound = document.getElementById('not-found');
        notFound.textContent = '';
        const p = document.createElement('p');
        p.classList.add('text-center')
        p.innerText = 'No result found';
        notFound.appendChild(p);
    }
    else {
        meals.forEach(meal => {
            // console.log(meal)
            document.getElementById('not-found').style.display = 'none';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div onclick="loadDetail(${meal.idMeal})" class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
                `;
            searchResult.appendChild(div);
        })
    }

}

const loadDetail = async mealId => {
    console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0]);
    }
    catch (error) {
        console.log(error);
    }
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    const mealDetails = document.getElementById('meal-detail');
    // clear data
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    mealDetails.appendChild(div);
}