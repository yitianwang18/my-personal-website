# Change Log

## A11y

1. (blog/index.html former stylecrud.html) in dark mode, the font in the dialog is completely invisible because of color theme, not set the font in the dialog to be black.
2. (style.css) add position: -webkit-sticky; in css to support iOS devices.

## Performances

1. download google fonts into font.css for better performance.

## Design changes

1. (blog/index.html former styledcrud.html) fix inconsistent font by including font into the page.
2. remove unneccessary animation in the main page to reduce cumulative layout shift.
3. assign width and height attributes to images in the main page to reduce cumulative layout shift.

## MISC

1. Put previous makingPortfolio blog into the new blog file.
