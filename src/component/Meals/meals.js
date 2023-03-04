import { Fragment } from "react";
import MealsSummary from "./mealSummary";
import AvailableMeals from "./availableMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};
export default Meals;
