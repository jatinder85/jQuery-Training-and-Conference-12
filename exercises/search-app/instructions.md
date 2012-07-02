# Exercise: Search App

In this exercise, we'll use jQuery to load search results based on a search
term entered by a user. You'll be working with the HTML at
`/exercises/search-app/index.html`, which you can view on your local server at
[http://localhost:8000/exercises/search-app/](http://localhost:8000/exercises/search-app/).
Use the file at `/exercises/search-app/js/app.js` to write your solution.

We've gone over most of the information you'll need to know for this exercise
during the class, so refert to the `notes.js` files for the various topics in
the `/content` directory. However, just like real life, you'll probably have to
look some stuff up as well :)

## Phase 1
- When a user enters a search term, send a GET request to `/data/search.json`
  that includes a `q` parameter whose value is the search term.
- When you receive the results, use the template at
  `/templates/person-detailed.tmpl` to display them.
- If there are no results, you should show a message indicating there are no
  results.

Note: If you're having a hard time coming up with a search term that returns
results, you can [see some example data here](http://localhost:8000/data/search/sample.json).

## Phase 2
- When a user clicks on the "Remove" button next to a search result, that
  search result should be removed from the list.
- When a user clicks on the "Like" button next to a search result, the name
  from that search result should be added to the list of favorite names on the
  right-hand side of the page; the "You haven't liked anything yet" message
  should be removed.
- Ensure that subsequent searches work as expected. The "Remove" and "Like"
  buttons should continue to work; the favorite names list should be
  maintained; and old results should be removed from the list.

## Phase 3
- Avoid making a request for a search that is empty or for a search that only
  contains spaces.
- Prevent the user from submitting a new search while an existing search
  request is in progress.

There is a mockup at `/exercises/search-app/mockup.png` for reference.

## Additional Resources

- [Underscore](http://underscorejs.org/) is included in the page for you, and
  should be used for templating.

A solution for this exercise is located at
`/exercises/search-app/js/solution.js`.
