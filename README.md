This project was bootstrapped with [Vite](https://vitejs.dev/).

## Available Scripts

In the project directory, you can run:

### `npm install`

Install dependencies.

### `npm run dev`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

## Requirements

- An Admin Panel called **New Beginnings**
- A table shows a list of participants
  - columns include:
    - Unique reference number
    - Name
    - Date of birth
    - Phone number
    - Address
    - Trial status (active | withdrawn | finished | error)
- Should be able to search a participant by Unique reference number
- Should be able to add a new participant to the table
- Should be able to edit a participant in the table
- Should be able to delete a participant from the table

## Wireframe UI

![wireframe](https://s3.amazonaws.com/assets.mockflow.com/app/wireframepro/company/C7692828fd2d242609c7d26e443c5cd4f/projects/M0BZ6dEEPob/pages/490112dfbcc941cd897035a601d0d89b/image/490112dfbcc941cd897035a601d0d89b.png?1677699041831)
https://wireframepro.mockflow.com/view/M0BZ6dEEPob

## Dependencies

- vite
- [Mock Service Worker](https://mswjs.io/) for testing & development
- [TanStack Query](https://tanstack.com/query/latest/) for asynchronous state management
- [Ant Design](https://ant.design/) for UI components
- Testing
  - vitest
  - @testing-library/react
  - @testing-library/jest-dom
- Eslint
- Prettier

## Optimization

- Performance
  - pagination
- User experience
  - Confirm administrators speak to the right person before adjusting contact information for the participant
  - Should add `latest_update`, `updated_by` attributes when designing API
  - validation with yup
- Accessibility
  - Use the UI with keyboard only(?)
- Developer experience
  - create form with react-hook-form

### Additional Remarks

Initially, I was thinking to use `Redux` to show the **CRUD** part (Import mock data directly and store state in components, use filter and map updating array in the state).\
 But after that, I consider using `TanStack Query` + `Mock Service Worker` instead, because it’s a better way to handle asynchronous data, and it supports refetch after mutation.\
 This will affect the functionality of the assignment and I’m not sure which way is closer to the evaluation criteria of the original design.

### Ref

- [Mockaroo - Random data generator](https://www.mockaroo.com/)
- [Colours for project status](https://ux.stackexchange.com/questions/88528/colours-for-project-status)
