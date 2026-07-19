# Yulia Balenko Artist Portfolio — Business Requirements

**Status:** Draft  
**Updated:** June 23, 2026  
**Owner:** Yulia Balenko

## 1. Purpose

Create a simple static website where Yulia Balenko can present an artist statement and artwork, share exhibitions, provide a résumé, and receive messages from visitors.

This is an amateur artist portfolio, not an online store or commercial gallery platform.

## 2. Users

- **Visitor:** reads the artist statement, explores images, exhibitions, and résumé, and can leave a message or join the mailing list.
- **Site maintainer:** updates public content through repository files and deploys changes with the website code.

## 3. P0 pages and navigation

The primary navigation contains:

1. **Home**
2. **Exhibitions**
3. **Portfolio**
4. **Resume**
5. **Contacts**

Home is the default landing page.

Navigation must work on mobile and desktop, identify the current destination, and allow visitors to navigate without relying on browser history.

### 3.1 Home

- Contains the artist statement.
- May include a compact manually curated Home carousel that supports the statement, but the carousel images remain distinct from the Portfolio gallery and are not automatically pulled from Portfolio artwork.

### 3.2 Exhibitions

- Exhibitions is a single page with section controls similar to the Portfolio page.
- **Current:** exhibitions taking place now.
- **Past:** completed exhibitions.
- **Upcoming:** announced future exhibitions.
- Each entry may include title, venue, location, start/end dates, description, image, and external link.
- Empty sections show a clear message rather than a blank page.

### 3.3 Portfolio

- Contains only an image gallery and carousel experience.
- Displays approximately 100 Oil and Watercolor artwork images.
- Organizes artwork into **Landscapes**, **Still life**, and **Other** sections.
- Displays published artwork newest first within each Portfolio section.
- Uses the [David Hockney Drawings — 2010s page](https://www.hockney.com/index.php/works/drawings/2010s) as interaction and layout inspiration, without copying its branding.
- Presents one prominent selected image together with a browsable thumbnail gallery.
- Selecting an image opens an accessible carousel/lightbox.
- The carousel supports previous/next navigation, keyboard control, touch gestures where practical, and closing back to the previous gallery position.
- The interface around the artwork remains minimal and visually restrained.
- Images include accessibility text and display restrained artwork metadata: name, medium, size, year, and availability status.
- The page does not display filters, prices, comments, purchasing, or video.

### 3.4 Resume

- Resume redirects to or opens a PDF containing the artist's accomplishments.
- The PDF has a stable public destination and is labeled as a PDF before opening.

### 3.5 Contacts

Contacts contains:

- Configured public email and social links.
- A **Leave a message** form.
- The website's **Privacy Notice**.
- Optional mailing-list signup.

The message form collects name, email, and message. It must:

- Validate required fields.
- Use CAPTCHA and spam/rate-limit protection.
- Deliver legitimate messages to the artist without exposing private delivery configuration.
- Show clear success and failure states.
- Avoid retaining messages longer than required for delivery and troubleshooting.

The Privacy Notice explains contact messages, mailing-list data, CAPTCHA, email delivery, and operational logs.

## 4. Mailing list

- Email is required; name is optional.
- Signup uses double opt-in confirmation.
- Subscribers can unsubscribe.
- P0 collects subscribers but does not create or send newsletters.

## 5. Content updates

- Public content is stored in the source repository as typed data and text. Large media files, including artwork images and the résumé PDF, may be stored in AWS-hosted public object storage and referenced from repository metadata.
- Home, Exhibitions, Portfolio, Resume, Contacts, navigation, and Privacy Notice changes deploy through the code workflow.
- P0 does not include a browser-based content-management interface.
- Subscriber export, if needed, uses protected scripts or AWS tools.

## 6. Out of scope

- Browser-based content editing or image upload
- Separate About or Privacy pages
- Portfolio filters, descriptions, comments, prices, or purchasing
- Sales, payments, shipping, and inventory
- Visitor accounts and favorites
- Video
- Visitor analytics and advertising
- Newsletter campaign tools
- Multiple languages

## 7. Basic quality requirements

- The website works clearly on current mobile and desktop browsers.
- Artwork remains the visual focus.
- Navigation, section controls, carousel, forms, links, and résumé are keyboard accessible and understandable.
- Images are optimized for web delivery.
- Public forms are protected against spam and unsafe input.
- Content is recoverable from source control and AWS backups.
- No analytics cookies are used.

## 8. P0 acceptance

P0 is ready when:

- Home is the default page and displays the artist statement.
- Home may display a compact curated carousel beside the artist statement without duplicating the Portfolio gallery.
- Visitors can navigate among Home, Exhibitions, Portfolio, Resume, and Contacts.
- Exhibitions provides accessible Current, Past, and Upcoming page sections.
- Portfolio displays only images and an accessible carousel and restores gallery context when closed.
- Exhibitions display configured content and external links correctly.
- Resume opens the current PDF.
- Contacts displays public links, Privacy Notice, and a functioning protected message form.
- Repository content changes produce an updated static deployment.
- Mailing-list confirmation and unsubscribe work.

## 9. Remaining decisions

1. Should the old Exhibitions status URLs remain as redirects permanently?
2. What address receives contact messages, and how long may delivery diagnostics be retained?
3. Should carousel images show visible titles or only accessibility text?
4. What content ordering, visual design, public links, domain, budget, and launch date will be used?
5. What ongoing résumé PDF replacement/versioning workflow should be used?
