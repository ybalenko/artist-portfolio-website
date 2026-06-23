# Yulia Balenko Artist Portfolio — Requirements

**Status:** Draft  
**Date:** June 22, 2026  
**Owner:** Yulia Balenko

## 1. Purpose

Create a simple personal website where Yulia Balenko can display her artwork, share her artistic background and résumé, and interact with visitors through comments and a mailing-list signup.

This is an amateur artist portfolio. It is not an online store, gallery-management system, or commercial art platform.

## 2. Goals

- Present the artwork in an attractive, image-focused website.
- Make the portfolio easy to browse on phones and computers.
- Allow Yulia to add and update artwork without editing code.
- Provide an online artist résumé and configurable contact links.
- Let visitors comment on individual artworks.
- Let visitors subscribe to a future mailing list.

## 3. P0 scope

### Public website

- Home page featuring selected artwork and a short introduction.
- Gallery containing approximately 100 artworks.
- Gallery filters for medium and year.
- Initial medium values: Oil and Watercolor.
- Individual artwork pages with one or more images and artwork details.
- About page with biography and artist statement.
- Résumé page with sections that Yulia can create, rename, reorder, and edit.
- Configurable public email and social-media links.
- English-only content.
- Shareable links for individual artworks.

### Artwork management

- One secure administrator account for Yulia.
- Add artworks one at a time.
- Upload multiple pictures for an artwork to cloud storage.
- Edit, reorder, publish, unpublish, and delete artworks.
- Choose featured artwork and gallery order.
- Automatically create appropriately sized web images from uploads.

Each artwork can contain:

- Title
- One primary image and optional additional images
- Alternative text for accessibility
- Medium
- Year
- Dimensions
- Description
- Optional collection or series
- Display order and featured status
- Draft or published status

### Comments

- Visitors comment using a display name; no account or email is required.
- Comments appear on individual artwork pages.
- Visitors can reply one level deep.
- Newest comments appear first.
- Comments are checked by automated moderation before publication.
- Moderation rejects harassment, profanity, hate speech, spam, links, explicit material, and off-topic content.
- Rejected comments are silently discarded and are not stored for review.
- CAPTCHA or a similar bot check protects comment submission.
- Visitors cannot edit, delete, or report comments.
- Yulia can hide, restore, or delete published comments.
- Yulia can reply with a visible “Artist” label.
- No comment notifications are required.

### Mailing list

- Signup requires an email address; name is optional.
- Subscribers confirm their address through double opt-in email.
- Subscribers can unsubscribe.
- Yulia can view or export confirmed subscribers.
- P0 only collects subscribers; it does not provide newsletter-writing or campaign tools.
- The mailing-list provider will be chosen during technical planning.
- No signup notifications are required.

## 4. Out of scope

- Artwork prices, sales, payments, shipping, or inventory
- Inquiry or contact forms
- Visitor accounts or favorites
- Video
- Visitor analytics or behavioral tracking
- Newsletter creation and sending
- Bulk artwork import
- Multiple administrators
- Multiple languages

## 5. Basic quality requirements

- The website works well on current mobile and desktop browsers.
- Artwork images load at suitable sizes without exposing the original upload unnecessarily.
- Pages and controls are keyboard accessible, readable, and supplied with meaningful image descriptions.
- Administrator pages and cloud uploads are protected from public access.
- Comment and mailing-list forms are protected against spam and unsafe input.
- Artwork information and original uploads can be backed up and exported.
- A short privacy notice explains mailing-list and comment data handling.
- The website does not include analytics cookies.

## 6. Design direction

The [David Hockney website](https://www.hockney.com/home) is the initial inspiration: artwork-first presentation, simple artist-name branding, restrained text, concise captions, and clear organization. The new website should take inspiration from these qualities without copying its identity or structure.

## 7. Practical limitations

- Public images cannot be made impossible to save or screenshot. The site can omit download buttons and discourage casual downloading, but cannot guarantee copy protection.
- Automated comment moderation will occasionally reject acceptable comments or approve unwanted ones.
- Entering metadata for approximately 100 artworks individually will require preparation and time because the information is not currently structured.

## 8. P0 acceptance

P0 is ready when:

- Yulia can add, edit, publish, and remove artwork without developer help.
- Approximately 100 artworks can be browsed and filtered by medium and year.
- Artwork pages display multiple optimized images and their details.
- Visitors can post moderated comments and one-level replies.
- Yulia's replies display the “Artist” label.
- Double-opt-in signup and unsubscribe work correctly.
- The website works clearly on mobile and desktop.
- Private administration and original uploads are protected.

## 9. Remaining decisions

1. Which artwork fields must be completed before an artwork can be published?
2. Should year allow approximate dates, ranges, or unknown values?
3. Should comments be enabled automatically or controlled separately for each artwork?
4. Should the home page show one featured work or a gallery overview?
5. What visual colors and typography should accompany the artwork?
6. Which public email and social links will be used?
7. What domain name should be registered?
8. What budget and target launch date should guide technical choices?
