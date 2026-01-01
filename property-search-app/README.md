# HomeFind - Property Search Application

A modern, responsive property search application built with Next.js and React. This project demonstrates a full-featured real estate search platform inspired by Rightmove.co.uk.

## Features

- **Advanced Search Form**: Filter properties by type, price range, bedrooms, date added, and postcode area
- **React UI Widgets**: All form inputs use enhanced React components (Select, Slider, Calendar, etc.)
- **Dynamic Search**: Works with any combination of 1-5 search criteria
- **Property Listings**: Beautiful card-based layout with images and key details
- **Property Details**: Individual pages with image galleries, tabs for description/floor plan/map
- **Favourites System**: 
  - Add properties via heart button or drag-and-drop
  - Remove via button click or drag out of favourites
  - Duplicate prevention
  - LocalStorage persistence
- **Responsive Design**: Optimized layouts for desktop, tablet, and mobile
- **Security**: Content Security Policy (CSP) headers and safe React rendering
- **Testing**: Comprehensive Jest tests for core functionality

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19 with JSX
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Testing**: Jest + React Testing Library
- **Drag & Drop**: Native HTML5 Drag and Drop API
- **Maps**: Google Maps Embed API

## Project Structure

```
├── app/
│   ├── layout.jsx          # Root layout with fonts and metadata
│   ├── page.jsx            # Search page with results and favourites
│   └── property/[id]/
│       └── page.jsx        # Property details page
├── components/
│   ├── header.jsx          # Site header
│   ├── search-form.jsx     # Advanced search form with React widgets
│   ├── property-card.jsx   # Property card component
│   ├── favourites-sidebar.jsx  # Favourites management
│   ├── image-gallery.jsx   # Image gallery with lightbox
│   └── google-map.jsx      # Google Maps integration
├── data/
│   └── properties.json     # Property data (7 properties)
├── lib/
│   └── property-utils.js  # Search and formatting utilities
└── __tests__/             # Jest test files
```

## Search Functionality

The search supports filtering by:
- Property type (house, flat, any)
- Min/max price (£0 - £1,000,000+)
- Min/max bedrooms (0-6+)
- Date added (after date or between dates)
- Postcode area (e.g., BR1, NW1)

All filters work independently and in combination.

## Favourites Features

1. **Add to Favourites** (2 methods):
   - Click the heart icon on any property card
   - Drag a property card to the favourites sidebar

2. **Remove from Favourites** (2 methods):
   - Click the X button on a favourite item
   - Drag a favourite item out of the sidebar

3. **Additional Features**:
   - Clear all favourites with confirmation dialog
   - Prevents duplicate entries
   - Persists across page refreshes via localStorage

## Responsive Design

- **Desktop (>1024px)**: Three-column layout (search, results, favourites)
- **Tablet (768-1024px)**: Two-column layout with stacked favourites
- **Mobile (<768px)**: Single column with collapsible sections

Uses CSS Grid, Flexbox, and Tailwind responsive utilities.

## Security Features

- Content Security Policy (CSP) headers
- XSS protection via React's automatic escaping
- Frame options to prevent clickjacking
- Secure referrer policy
- Content type sniffing prevention

## Testing

Run tests with:
```bash
npm test
```

Tests cover:
- Property search filtering (all criteria combinations)
- Price and date formatting
- Favourites add/remove/clear functionality
- Duplicate prevention
- Form rendering and interactions

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
npm start
```

## Design Decisions

- **Color Scheme**: Professional blue primary with warm accent colors
- **Typography**: Inter for UI, Playfair Display for headings
- **Component Architecture**: Modular, reusable components
- **State Management**: React hooks with localStorage for persistence
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- User authentication
- Save searches
- Property comparison
- Email alerts
- Advanced filtering (parking, garden, etc.)
- Virtual tours integration

## License

MIT License - Educational coursework project

## Author

Created for 5COSC026W Advanced Client-Side Web Development coursework
