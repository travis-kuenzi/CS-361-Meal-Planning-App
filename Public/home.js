let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", getData);

async function getData() {

    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1';
    const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '9817e57fd8mshf7324149cf3ce09p16854fjsnfbdc7fd0ff39',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}












// let searchBtn = document.querySelector("#searchBtn");
// searchBtn.addEventListener("click", getData);

// function delay(ms)
// {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function getData() 
// {
//     const recipesDiv = document.querySelector('#recipes');
//     recipesDiv.replaceChildren([]);


//     const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=2';
//     const options = {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': '9817e57fd8mshf7324149cf3ce09p16854fjsnfbdc7fd0ff39',
//         'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
//       }
//     };

//     try {
//         let response = await fetch(url, options);

//         if (response.status != 200)
//             throw response.status + " " + response.statusText;

//         let results = await response.json();
//         console.log(results);
//     } catch (error) {
//         console.error(error);
//     }


//     for (const recipe of results.recipes)
//     {
//         await delay(1500);
//         let recipeElement = createCard(recipe);
//         recipesDiv.appendChild(recipeElement);
//     }
// }


// function createCard(recipeObj)
// {
//     //Element that contains the card and insert in layout
//     let container = createElement('div', 'col-md-6');

//     let card = createElement('div', 'card h-100 d-flex justify-content-center align-items-center'); // change?
//     container.appendChild(card);

//     let title = createElement('h2', 'card-title', recipeObj.title);
//     card.append(title);

//     // let img = createElement('img', 'img-fluid countryImage');
//     // img.src = countryObj.data.flagImageUri;
//     // img.style.width = "75%";
//     // img.style.height = "auto";
//     // card.appendChild(img);
//     // need to set attribute for alt

//     return container;
// }



// function createElement(type, classes, data = null) {
//     let element = document.createElement(type);
//     element.className = classes;
//     if (data) {
//       element.innerHTML = data;
//     }
//     return element;
// }
