import Dashboard from "../pages/admin/dashboard/Dashboard";
import Meals from "../pages/admin/meals/Meals";
import AddMeal from "../pages/admin/meals/AddMeal";
import MealDetail from "../pages/admin/meals/MealDetail";
import EditMeal from "@/pages/admin/meals/EditMeal";
import MealsQuestions from "@/pages/admin/mealsPrefQuestions/MealsQuestions";
import AddMealQuestion from "@/pages/admin/mealsPrefQuestions/AddMealQuestion";
import MealQuestionDetail from "@/pages/admin/mealsPrefQuestions/MealQuestionDetail";
import EditMealQuestion from "@/pages/admin/mealsPrefQuestions/EditMealQuestion";
import Tags from "@/pages/admin/tags/Tags";
import AddTag from "@/pages/admin/tags/AddTag";
import Explores from "@/pages/admin/explores/Explores";
import AddExplore from "@/pages/admin/explores/AddExplore";
import ExploreDetail from "@/pages/admin/explores/ExploreDetail";
import EditExplore from "@/pages/admin/explores/EditExplore";
import Faqs from "@/pages/admin/faqs/Faqs";
import AddFaq from "@/pages/admin/faqs/AddFaq";
import FaqDetail from "@/pages/admin/faqs/FaqDetail";
import EditFaq from "@/pages/admin/faqs/EditFaq";
import GutSurvQuestions from "@/pages/admin/gutSurvQuestions/GutSurvQuestions";
import AddGutQuestion from "@/pages/admin/gutSurvQuestions/AddGutQuestion";
import GutSurvDetail from "@/pages/admin/gutSurvQuestions/GutSurvDetail";
import EditGutSurvQuestion from "@/pages/admin/gutSurvQuestions/EditGutSurvQuestion";
import AddSubQuestion from "@/pages/admin/mealsPrefQuestions/SubQuestion/AddSubQuestion";
import SubQuestionDetail from "@/pages/admin/mealsPrefQuestions/SubQuestion/SubQuestionDetail";
import EditSubQuestion from "@/pages/admin/mealsPrefQuestions/SubQuestion/EditSubQuestion";
import Users from "@/pages/admin/users/users";

const adminRoutes = [
  { path: "dashboard", element: <Dashboard /> },

  // meals routes
  { path: "meals", element: <Meals /> },
  { path: "meals/create", element: <AddMeal /> },
  { path: "meals/:_id", element: <MealDetail /> },
  { path: "meals/edit/:_id", element: <EditMeal /> },

  // meal preference questions route
  { path: "mealsPrefQuestions", element: <MealsQuestions /> },
  { path: "mealsPrefQuestions/create", element: <AddMealQuestion /> },
  { path: "mealsPrefQuestions/:_id", element: <MealQuestionDetail /> },
  { path: "mealsPrefQuestions/edit/:_id", element: <EditMealQuestion /> },

  // meal preference sub-question
  { path: "addSubQuestion", element: <AddSubQuestion /> },
  { path: "subQuestionDetail/:_id", element: <SubQuestionDetail /> },
  { path: "subQuestionDetail/edit/:_id", element: <EditSubQuestion /> },

  // tag routes
  { path: "tags", element: <Tags /> },
  { path: "tags/create", element: <AddTag /> },

  // explore routes
  { path: "explores", element: <Explores /> },
  { path: "explores/create", element: <AddExplore /> },
  { path: "explores/:_id", element: <ExploreDetail /> },
  { path: "explores/edit/:_id", element: <EditExplore /> },

  // faqs routes
  { path: "faqs", element: <Faqs /> },
  { path: "faqs/create", element: <AddFaq /> },
  { path: "faqs/:_id", element: <FaqDetail /> },
  { path: "faqs/edit/:_id", element: <EditFaq /> },

  // gutsurvey routes
  { path: "gutSurvQuestions", element: <GutSurvQuestions /> },
  { path: "gutSurvQuestions/create", element: <AddGutQuestion /> },
  { path: "gutSurvQuestions/:_id", element: <GutSurvDetail /> },
  { path: "gutSurvQuestions/edit/:_id", element: <EditGutSurvQuestion /> },

  // users
  { path: "users", element: <Users /> },
];

export default adminRoutes;
