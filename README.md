# text-annotator

Annotate text in the page with predefined and styles. Useful for linking specific parts of a graphic with text in the page.

Inpsired by past work on the [Voice referendum](https://www.abc.net.au/news/2023-10-15/voice-results-explained-map/102978520) and others.

## Usage

This plugin can be used with or without [Odyssey](https://github.com/abcnews/odyssey).

1. Add the `text-annotator` JavaScript to your article in CoreMedia (content id: 101718598).
2. Add a config, e.g. `#textannotatorBRACEtxtffffffff571axorange` on its own line.
3. You can add multiple `BRACE` entries, one per style.
4. For any text you want to annotate, add the `textString` in brackets at the end, and italicise the whole thing. e.g. _No (orange)_

Each BRACE attribute consists of:

type                 | hexCodeFg            | hexCodeBg            | x | textString          
---------------------|----------------------|----------------------|---|---------------------
One of `txt` (change the text foreground & background) or `box` (add a coloured box after the text). | Text colour, or box colour. | Text background colour, or box border | A single character `x`. This is a delineator between the fixed width fields and the freetext `textString`, so we can expand this syntax later. | String to match this style (no spaces allowed)

Please note that hex colours must be 6 characters long.

## Authors

- Ash Kyd ([ash@kyd.com.au](mailto:ash@kyd.com.au))
