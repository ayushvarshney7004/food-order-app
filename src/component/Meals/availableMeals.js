import classes from "./availableMeals.module.css";
import WrapperCard from "../UI/Card";
import MealItem from "./Mealitem/mealitem";
import { useState, useEffect } from "react";
function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      //method = post , pushing the data into the database
      const response = await fetch(
        "https://react-movie-app-5b5aa-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
      const responseData = await response.json();

      const loadMeals = [];

      for (const key in responseData) {
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={classes.loadingState}>
        <p>Loading ....</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.errorState}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <WrapperCard>
        <ul>{mealsList}</ul>
      </WrapperCard>
    </section>
  );
}
export default AvailableMeals;
