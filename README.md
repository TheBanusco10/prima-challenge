# Prima Challenge

## Why

### Package Manager and Build Tool

- **PNPM**: For faster and more efficient package management.
- **Vite**: For faster and more efficient build times.

### Styling

- **TailwindCSS**: For utility-first styling and rapid development.
- **DaisyUI**: For pre-built, customizable UI components.

### Architecture

- **Domain-Driven Design**: For clear business logic and domain models.

### External Libraries

- **es-toolkit**: For utility functions and helpers. Lightweight alternative to Lodash.
- **vitest**: For unit testing.

### Meals

All cards have an image placeholder (placeholder.svg) in case the image from API is not available or broken.

### Suggestions

Meal link not implemented for SuggestionCard because the API does not provide a link field directly with those endpoints and will make an additional request to get the link. So, in order to keep this challenge simplier, I have implemented it for MealCard which has a link field from endpoint.

Like/Dislike icons implemented instead of Yes/No buttons for better and modern UX. Question "Did it much your preference?" has been moved to a tooltip for Like/Dislike buttons section on desktop to avoid increasing card height.

Suggestions History section implement as a Table to represent the data in an easier and cleaner way.

For loading sections, I have used skeleton loaders to improve the perceived performance and user experience.

### Search meals by name

Wrapped the get function inside a debounce one to avoid fetching the API too many times when user is typing.

### Testing

Simple unit tests have been created for some core components.

### Errors

`MealsApiError` and `InvalidMealsNameLengthError` have been created to handle application's errors in a more structured way. Error messages are not exposed to the user to avoid adding more complexity to this challenge. Also, by creating errors in this way, we can filter them using `instanceof` operator to handle them differently if needed.

Rest of use cases and repositories do not have error handling to avoid overcomplicating the challenge, but they can be implemented following the same pattern.

## Instructions

Install dependencies:

```
pnpm install
```

Run the development server:

```
pnpm dev
```

## Features

Stepped form with:

- Step 1: Cuisine/Area dynamic select
- Step 2: Category select

Suggested meal after form submission with "New Idea" button to suggest again with same criteria.

Suggestions History reactive table displaying liked/disliked suggestions.

Search meals by name section, where users can search for meals by a given name and displaying first five meals.
