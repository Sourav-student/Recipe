const question = document.getElementById('question');
const answer = document.getElementById('answer');
const upArr = document.getElementById('upArr');
const search = document.getElementById('search');
const aiField = document.getElementById('aiField');

const getRecipe = async (recipe) => {
	const url = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${recipe}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '723f74391amsh880d733e2d484c7p198fe3jsn0381b9d6c77d',
			'x-rapidapi-host': 'recipe-by-api-ninjas.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();

		setTimeout(() => {

			answer.innerHTML = "";

			for (let i = 0; i < result.length; i++) {

				answer.innerHTML = `<img src="aiImage.png" alt="aiImage" class='imageAi' />
				<div class = "block">
				<h2>${result[i].title}</h2>
	
				<div><h3> Ingredients Required </h3><p><ul>
                 ${result[i].ingredients.split("|").map(ingredient => `<li>${ingredient.trim()}</li>`).join(' ')}
                </ul></p></div>
	
				<div><h3> Instructions Required </h3><p>${result[i].instructions.replace(/\|----\|.*\|----\|/g, '')}</p></div>
	
				<div><h3>${result[i].servings}</h3></div>
				</div>` + answer.innerHTML;
			}

			if (answer.innerHTML === "") {
				alert("Recipe Not Available")
			}

		}, 1000);

	} catch (error) {
		alert(error);
	}
}

upArr.addEventListener("click", () => {
	getRecipe(search.value);
	question.innerHTML = `<img src="man.png" alt="manImage" class='imageAi' />
	<div>${search.value}</div>`
	answer.innerHTML = "Loading..."

});

search.addEventListener("keypress", (event) => {

	if (event.key === "Enter") { // Check if the "Enter" key was pressed
		getRecipe(search.value);
		question.innerHTML = `<img src="man.png" alt="manImage" class='imageAi' />
	    <div>${search.value}</div>`
		answer.innerHTML = "Loading..."
	}


});
