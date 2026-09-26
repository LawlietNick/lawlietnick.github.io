---
layout: ../../layouts/Base.astro
title: "All Blog post elements"
description: "All needed elements that a blog post can have"
date: 2026-07-18
noindex: true
category: analytics
image: /images/blog/example-parts.jpeg
imageAlt: "A turtle points to a visual blog post layout containing headings, paragraphs, lists, tables, images, code, quotes, forms, and embedded media"
imageCredit: "Generated with OpenAI ImageGen"
---
The purpose of this page is to check the default content styles and confirm that common HTML elements have been considered when creating the site design.

---

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

[Back to top](#top)

---

## Paragraph

Lorem ipsum dolor sit amet, [test link](# "Test link"), adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus.

Lorem ipsum dolor sit amet, *emphasis* and **strong emphasis** consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui.

This paragraph contains ~~deleted text~~, <ins>inserted text</ins>, and <mark>highlighted text</mark>.

Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.

The output was <samp>404 Not Found</samp>.

The variable <var>x</var> represents the number of turtles.

A very long URL should wrap or overflow safely:

[https://example.com/this-is-a-very-long-example-url-that-should-be-tested-to-see-how-it-behaves-inside-the-content-column](https://example.com/this-is-a-very-long-example-url-that-should-be-tested-to-see-how-it-behaves-inside-the-content-column)

[Back to top](#top)

---

## List types

### Definition list

<dl>
  <dt>Definition list title</dt>
  <dd>This is a definition list description.</dd>

  <dt>Second definition</dt>
  <dd>This description is longer so spacing and wrapping can be reviewed across multiple lines.</dd>
</dl>

### Ordered list

1. List item 1
2. List item 2
3. List item 3

### Unordered list

- List item 1
- List item 2
- List item 3

### Nested list

- Parent item
  - Nested item
    1. Nested ordered item
    2. Another ordered item
- Second parent item

### Mixed list

1. First item
   - Supporting point
   - Another supporting point
2. Second item

### Task list

- [x] Completed task
- [ ] Incomplete task

[Back to top](#top)

---

## Forms

<section class="form-elements-demo" aria-labelledby="form-elements-heading">
  <h3 id="form-elements-heading">Form elements</h3>
  <form action="#" method="post">
    <fieldset>
      <legend>Basic fields</legend>
      <div class="form-field">
        <label for="text-field">Text field</label>
        <input
          type="text"
          id="text-field"
          name="text-field"
          placeholder="Placeholder text"
        >
      </div>
      <div class="form-field">
        <label for="email-field">Email field</label>
        <input
          type="email"
          id="email-field"
          name="email-field"
          placeholder="name@example.com"
        >
      </div>
      <div class="form-field">
        <label for="url-field">URL field</label>
        <input
          type="url"
          id="url-field"
          name="url-field"
          placeholder="https://example.com"
        >
      </div>
      <div class="form-field">
        <label for="tel-field">Telephone field</label>
        <input
          type="tel"
          id="tel-field"
          name="tel-field"
          placeholder="+358 40 123 4567"
        >
      </div>
      <div class="form-field">
        <label for="password-field">Password field</label>
        <input
          type="password"
          id="password-field"
          name="password-field"
        >
      </div>
      <div class="form-field">
        <label for="search-field">Search field</label>
        <input
          type="search"
          id="search-field"
          name="search-field"
        >
      </div>
      <div class="form-field">
        <label for="number-field">Number field</label>
        <input
          type="number"
          id="number-field"
          name="number-field"
          min="0"
          max="100"
          step="1"
        >
      </div>
      <div class="form-field">
        <label for="date-field">Date field</label>
        <input
          type="date"
          id="date-field"
          name="date-field"
        >
      </div>
      <div class="form-field">
        <label for="time-field">Time field</label>
        <input
          type="time"
          id="time-field"
          name="time-field"
        >
      </div>
      <div class="form-field">
        <label for="datetime-field">Date and time field</label>
        <input
          type="datetime-local"
          id="datetime-field"
          name="datetime-field"
        >
      </div>
      <div class="form-field">
        <label for="month-field">Month field</label>
        <input
          type="month"
          id="month-field"
          name="month-field"
        >
      </div>
      <div class="form-field">
        <label for="week-field">Week field</label>
        <input
          type="week"
          id="week-field"
          name="week-field"
        >
      </div>
      <div class="form-field">
        <label for="color-field">Color field</label>
        <input
          type="color"
          id="color-field"
          name="color-field"
          value="#663399"
        >
      </div>
      <div class="form-field">
        <label for="range-field">Range field</label>
        <input
          type="range"
          id="range-field"
          name="range-field"
          min="0"
          max="100"
          value="50"
        >
      </div>
      <div class="form-field">
        <label for="file-field">File field</label>
        <input
          type="file"
          id="file-field"
          name="file-field"
        >
      </div>
      <div class="form-field">
        <label for="textarea-field">Text area</label>
        <textarea
          id="textarea-field"
          name="textarea-field"
          rows="5"
          cols="40"
        ></textarea>
      </div>
    </fieldset>
    <fieldset>
      <legend>Selection controls</legend>
      <div class="form-field">
        <label for="select-field">Select field</label>
        <select id="select-field" name="select-field">
          <option value="">Choose an option</option>
          <optgroup label="Option group 1">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </optgroup>
          <optgroup label="Option group 2">
            <option value="4">Option 4</option>
            <option value="5">Option 5</option>
            <option value="6">Option 6</option>
          </optgroup>
        </select>
      </div>
      <div class="form-field">
        <label for="multiple-select-field">Multiple select field</label>
        <select
          id="multiple-select-field"
          name="multiple-select-field[]"
          multiple
          size="4"
        >
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </select>
      </div>
      <fieldset>
        <legend>Radio buttons</legend>
        <div class="form-choice">
          <input
            type="radio"
            id="radio-1"
            name="radio-button"
            value="radio-1"
            checked
          >
          <label for="radio-1">Radio 1</label>
        </div>
        <div class="form-choice">
          <input
            type="radio"
            id="radio-2"
            name="radio-button"
            value="radio-2"
          >
          <label for="radio-2">Radio 2</label>
        </div>
        <div class="form-choice">
          <input
            type="radio"
            id="radio-3"
            name="radio-button"
            value="radio-3"
            disabled
          >
          <label for="radio-3">Disabled radio</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Checkboxes</legend>
        <div class="form-choice">
          <input
            type="checkbox"
            id="checkbox-1"
            name="checkboxes"
            value="check-1"
            checked
          >
          <label for="checkbox-1">Checked checkbox</label>
        </div>
        <div class="form-choice">
          <input
            type="checkbox"
            id="checkbox-2"
            name="checkboxes"
            value="check-2"
          >
          <label for="checkbox-2">Unchecked checkbox</label>
        </div>
        <div class="form-choice">
          <input
            type="checkbox"
            id="checkbox-3"
            name="checkboxes"
            value="check-3"
            disabled
          >
          <label for="checkbox-3">Disabled checkbox</label>
        </div>
      </fieldset>
    </fieldset>
    <fieldset>
      <legend>Field states</legend>
      <div class="form-field">
        <label for="required-field">Required field</label>
        <input
          type="text"
          id="required-field"
          name="required-field"
          required
          aria-describedby="required-field-help"
        >
        <small id="required-field-help">
          This field is required.
        </small>
      </div>
      <div class="form-field">
        <label for="valid-field">Valid field</label>
        <input
          type="text"
          id="valid-field"
          name="valid-field"
          value="Valid value"
          aria-invalid="false"
        >
      </div>
      <div class="form-field">
        <label for="invalid-field">Field with an error</label>
        <input
          type="text"
          id="invalid-field"
          name="invalid-field"
          value="Invalid value"
          aria-invalid="true"
          aria-describedby="invalid-field-error"
        >
        <p id="invalid-field-error" role="alert">
          Enter a valid value.
        </p>
      </div>
      <div class="form-field">
        <label for="readonly-field">Read-only field</label>
        <input
          type="text"
          id="readonly-field"
          name="readonly-field"
          value="Read-only value"
          readonly
        >
      </div>
      <div class="form-field">
        <label for="disabled-field">Disabled field</label>
        <input
          type="text"
          id="disabled-field"
          name="disabled-field"
          value="Disabled value"
          disabled
        >
      </div>
    </fieldset>
    <div class="form-actions">
      <button type="submit">Submit</button>
      <button type="reset">Clear</button>
      <button type="button">Regular button</button>
      <button type="button" disabled>Disabled button</button>
    </div>
  </form>
</section>

[Back to top](#top)

---

## Tables

<div class="table-scroll">

<table>
  <caption>Example table caption</caption>
  <thead>
    <tr>
      <th scope="col">Table header 1</th>
      <th scope="col">Table header 2</th>
      <th scope="col">Table header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Row header 1</th>
      <td>Division 2</td>
      <td>Division 3</td>
    </tr>
    <tr>
      <th scope="row">Row header 2</th>
      <td>This cell contains longer content to test wrapping and spacing.</td>
      <td>€1,234.56</td>
    </tr>
    <tr>
      <th scope="row">Row header 3</th>
      <td></td>
      <td>Division 3</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>Summary</td>
      <td>€1,234.56</td>
    </tr>
  </tfoot>
</table>

</div>

[Back to top](#top)

---

## Images and figures

<figure>

![A descriptive example landscape image](@assets/blog/examples/example-landscape.jpeg)

  <figcaption>An example landscape image caption.</figcaption>
</figure>

<figure>

![A descriptive example portrait image](@assets/blog/examples/example-portrait.jpeg)

  <figcaption>An example portrait image caption.</figcaption>
</figure>

<figure>

![A descriptive example wide image](@assets/blog/examples/example-wide.jpeg)

  <figcaption>An example wide image caption.</figcaption>
</figure>

[Back to top](#top)

---

## Code

Inline code looks like `const turtle = "Donatello";`.

```js
const turtles = ["Leonardo", "Michelangelo", "Donatello", "Raphael"];

for (const turtle of turtles) {
  console.log(`${turtle} has entered the analytics report.`);
}
```

A code block with a long line:

```css
.example-selector-with-a-long-name {
  background-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%);
}
```

Code inside a list:

1. Install the package:

   ```bash
   npm install example-package
   ```

2. Import the package:

   ```js
   import examplePackage from "example-package";
   ```

[Back to top](#top)

---

## Blockquotes

<blockquote class="comic-quote">
  <p>This stylesheet is going to help so freaking much.</p>
  <footer class="comic-quote__footer">
    <cite>Blockquote</cite>
  </footer>
</blockquote>

<blockquote class="comic-quote">
  <p>A second blockquote with a longer paragraph. This helps test spacing, quotation marks, citation placement, and how consecutive quotations behave inside the content layout.</p>
  <footer class="comic-quote__footer">
    <cite>Another source</cite>
  </footer>
</blockquote>

[Back to top](#top)

---

## Disclosure content

<details>
  <summary>Show more information</summary>
  <p>Content revealed when the element is opened.</p>
</details>

<details open>
  <summary>This section is open by default</summary>
  <p>This content is visible before the user interacts with the control.</p>
</details>

[Back to top](#top)

---

## Miscellaneous elements

Lorem <sup>superscript</sup> dolor <sub>subscript</sub> amet, consectetuer adipiscing elit.

This sentence contains a citation: <cite>Example publication</cite>.

<abbr title="National Basketball Association" tabindex="0" aria-label="NBA, National Basketball Association">NBA</abbr> is an abbreviation.

<abbr title="Avenue" tabindex="0" aria-label="AVE, Avenue">AVE</abbr> is another abbreviation.

<address>
  Theme Admin<br>
  123 Example Street<br>
  Helsinki, Finland
</address>

Published on <time datetime="2008-09-05">September 5, 2008</time>.

Updated on <time datetime="2021-05-04">May 4, 2021</time>.

<pre>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Nullam dignissim convallis est. Quisque aliquam.
Donec faucibus. Nunc iaculis suscipit dui.
Nam sit amet sem. Aliquam libero nisi.</pre>

[Back to top](#top)

---

## Embeds

<div class="embed-wrapper">
  <iframe
    src="https://example.com"
    title="Example embedded content"
    loading="lazy"
  ></iframe>
</div>

[Back to top](#top)

---

## Content edge cases

### Heading followed immediately by another heading

#### Subheading with no paragraph between

### Extremely long word

pneumonoultramicroscopicsilicovolcanoconiosisthiscontinuesfarbeyondanormalwordlengthtotestoverflowhandling

### Empty paragraph

<p></p>

### Consecutive horizontal rules

---

---

### Heading after a code block

```text
Example code block
```

## Heading directly after code

### Long button label

<button type="button">This is an intentionally long button label for testing wrapping and spacing</button>

### Broken image

<figure>
  <img
    src="/images/this-file-does-not-exist.webp"
  alt="Example of a broken image with useful alternative text"
  width="800"
  height="600"
  >
  <figcaption>Broken image</figcaption>
</figure>

[Back to top](#top)
