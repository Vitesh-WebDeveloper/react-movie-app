My React Learnings

Day 13 & 14 Bootcamp Notes

Today I intentionally broke my code to understand how React's engine works under the hood.

State (useState): It acts as the memory of the component. If I remove onChange from an input, the state never updates, and the input becomes permanently frozen.

Effects (useEffect): It controls side effects like fetching data. The dependency array [] is critical. If I remove it, the component enters an infinite loop, fetching data forever and crashing the browser.

Keys in Lists: When using .map(), React requires a unique key prop. If I remove it, React throws a console error because it can no longer uniquely identify which item in the list is which during a re-render.

Day 22 Study: Component Architecture

I spent today analyzing my Movie App's architecture. I learned that breaking a large file into smaller, single-responsibility components (like extracting <MovieCard /> out of <MovieList />) makes the codebase significantly easier to read, debug, and maintain.