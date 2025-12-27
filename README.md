[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/om7GNoCM)
როგორც გახსოვთ წინა დავალებაში იუპიტერთან ახლოს ხომალდი დაგიზიანდათ,
თქვენი გაგზავნილი SOS წერილი ნასაზე ადრე უცხოპლანეტელებმა ნახეს და თქვენი
დახმარება გადაწყვიტეს, ასე მოხვდით ინტერპლანეტარულ აეროპორტში
სადაც საჭიროა ამ აეროპორტს აუწყოთ ვებგვერდი რომ უფასოდ მგზავრობა შეგეძლოთ დედამიწამდე

შექმენი რეპოზიტორიის რუთში `index.html` ფაილი და დაიწყე დავალების შესრულება

Exercise: Building "Terminal X-Omega"
Objective: Create the semantic HTML structure for a futuristic Spaceport Terminal interface. Focus: Semantic tags, forms, tables, and specific class naming for styling hooks.

Step 1: Project Setup
Create a new file named index.html.

Create an assets folder for your images.

Initialize the HTML boilerplate (standard HTML5 structure).

Step 2: The Head Metadata
Inside the `<head>` tag, set up the following:

Meta Tags: Character set to UTF-8 and viewport settings for responsiveness.

Title: Set the browser tab title to: Terminal X-Omega | Intergalactic Spaceport.

CSS Link: Link to an external stylesheet named styles.css.

Step 3: The Header Area
We need a header that serves as the main title banner.

Open the `<body>` and create a `<header>` tag.

Visual Effect Layer: Immediately inside the header, add an empty div that will be used for a CSS overlay effect later.

HTML

`<div class="warp-overlay"></div>` this will be that empty element`Header Content: Below the overlay, create a container`<div class="header-content">`. Inside it:

Add an `<h1>` with the text: TERMINAL X-OMEGA.

Add a `<p>` with the text: GATEWAY TO THE OUTER RIM SECTOR.

Status Bar: Create a `<div class="status-bar">`. Inside, add three `<span>` elements:

SYSTEM: ONLINE

TRAFFIC: HEAVY (Add the class blink to this span: `<span class="blink">`)

TEMP: -270°C

Step 4: Main Layout & Destinations
Create a `<main>` tag to hold the primary content. We will have three main sections inside it.

Section 1: Popular Flight Paths
Create a `<section>` with the id "destinations".

Add an `<h2>` title: POPULAR FLIGHT PATHS.

The Grid: Create a container `<div class="grid-wrapper">` to hold the cards.

Destination Cards: You need to create 4 `<article>` elements inside the grid wrapper. For each article, use this structure:

HTML

`<article>`
`<figure>`
` <img src="assets/dest_X.jpeg" alt="Destination Name">`
`<figcaption>`
` <h3>Destination Name</h3>`
`<p>Short description here.</p>`
`</figcaption>`
` </figure>`
` <div class="card-details">`
`  <span>Class: Habitable</span>`
` <button>BOOK PASSAGE</button>`
` </div>`
`</article>`
Card 1: Kepler-186f (Class: Habitable) (this is not an css class)

Card 2: Titan Station (Class: Industrial)

Card 3: Nebula Resort (Class: Luxury)

Card 4: Event Horizon (Class: Extreme)

Step 5: The Departure Board
Create the second section for the flight schedule.

Create a `<section>` with the id "schedule".

Hologram Container: We need a specific wrapper for visual effects. Add a div with the class hologram-overlay.

HTML

`<div class="hologram-overlay">`
`</div>`
Inside that div(hologram-overlay), add an `<h2>`: LIVE DEPARTURE BOARD.

The Table: Create a `<table>.`

Add a `<caption>`: REAL-TIME WARP GATE STATUS.

The Head: Use `<thead>` to define columns: Flight, Destination, Gate, Time, Status.

The Body: Use `<tbody>`. Add 5 rows `(<tr>).`

Important: The last cell `(<td>)` in each row needs a specific class for color coding:

class="status-go" (for Boarding/On Time) (here is css classes)

class="status-wait" (for Fueling)

class="status-delay" (for Delayed)

class="status-stop" (for Cancelled)

The Footer: Use `<tfoot>` with a single row. Use `<td colspan="5">` to make the text span across the whole table width. Text: SCANNING FOR INCOMING VESSELS...

Step 6: The Booking Interface
Create the third section for the form.

Create a `<section>` with the id booking.

Container: Add a div with class kiosk-interface.

Add `<h2>`: SELF-SERVICE TERMINAL.

The Form: Create a `<form action="#" method="POST">`.

Fieldset 1 (Identity): Use `<fieldset>` with a `<legend>` "IDENTITY VERIFICATION".

Add inputs for "Full Designation" (text) and "ID Code" (text). Use `<label>` tags for accessibility.

Fieldset 2 (Flight Parameters): Use `<fieldset>` with a `<legend>` "FLIGHT PARAMETERS".

Datalist Input: create an input with list="planets" and a corresponding `<datalist id="planets">` containing options for the 4 destinations.

Select Dropdown: Create a `<select>` for "Cabin Class" with options: Economy (Stasis Pod), Business (Quarters), First (Zero-G Suite).

Submit: Add a `<button type="submit">` with text AUTHORIZE CREDIT TRANSFER.

Step 7: The Footer
Finally, outside of the `<main>` tag, create the footer.

Create a `<footer>` tag.

Add a paragraph: TERMINAL X-OMEGA // OPERATED BY GALACTIC FEDERATION // SAFETY NOT GUARANTEED.

**DONT FORGET ABOUT "WOW EFFECT"**
here is a link below what you have to paste inside `<head>` tag, below
`<title>` tag
`<link rel="stylesheet" href="styles.css">`

Self-Check:

Did you close all your `<div>` tags?

Did you include the empty .warp-overlay in the header?

Are your IDs (destinations, schedule, booking) unique?
