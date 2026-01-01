# Responsive Design Implementation

This document outlines the responsive design strategy for the HomeFind Property Search application.

## Breakpoint Strategy

The application uses Tailwind CSS responsive prefixes with the following breakpoints:

- **Mobile**: < 640px (default, no prefix)
- **Small Tablet**: 640px - 767px (sm:)
- **Tablet**: 768px - 1023px (md:)
- **Desktop**: 1024px+ (lg:)
- **Large Desktop**: 1280px+ (xl:)

## Layout Adaptations

### Search Page (app/page.tsx)

#### Desktop (lg: 1024px+)
- Three-column grid layout: `grid lg:grid-cols-[350px_1fr_300px]`
- Fixed-width search sidebar (350px)
- Flexible results area
- Fixed-width favourites sidebar (300px)
- Sticky positioning for sidebars: `lg:sticky lg:top-24`

#### Tablet (md: 768px - 1023px)
- Two-column layout for results: `grid sm:grid-cols-2`
- Search form stacks above results
- Favourites sidebar moves below results

#### Mobile (< 768px)
- Single column layout (default)
- Results display one per row: `grid sm:grid-cols-2` (2 columns at 640px+)
- All sections stack vertically
- Touch-optimized spacing

### Property Details Page (app/property/[id]/page.tsx)

#### Desktop (lg: 1024px+)
- Two-column layout: `grid lg:grid-cols-[1fr_400px]`
- Gallery and tabs on left (flexible width)
- Property summary sidebar on right (400px, sticky)

#### Tablet & Mobile
- Single column, stacked layout
- Gallery full width
- Tabs full width
- Summary card full width

## Component Responsiveness

### Search Form (components/search-form.tsx)
- Full width on all devices
- Form fields stack vertically (natural flow)
- Slider inputs adjust to container width
- Date picker popovers adapt to viewport

### Property Cards (components/property-card.tsx)
- Flexible aspect ratio: `aspect-video`
- Images scale proportionally
- Text remains readable with `line-clamp-2`
- Hover effects on desktop only

### Favourites Sidebar (components/favourites-sidebar.tsx)
- Hidden on mobile/tablet: `hidden lg:block`
- Shown below results on mobile: `lg:hidden mt-8`
- Scroll area adjusts height: `h-[calc(100vh-280px)]`
- Touch-friendly drag targets

### Image Gallery (components/image-gallery.tsx)
- Main image maintains aspect ratio: `aspect-video`
- Thumbnail grid adapts: `grid-cols-4 md:grid-cols-8`
- Lightbox fullscreen on all devices
- Touch gestures supported

### Header (components/header.tsx)
- Full width with container: `container flex h-16`
- Navigation collapses gracefully
- Logo always visible

## Responsive Utilities Used

### Flexbox
- `flex items-center justify-between` - Header and card layouts
- `gap-{size}` - Consistent spacing that scales

### Grid
- `grid sm:grid-cols-2` - Results responsive grid
- `grid lg:grid-cols-[350px_1fr_300px]` - Main layout

### Spacing
- `container` - Max-width with responsive padding
- `py-8` - Vertical rhythm
- `gap-{size}` - Grid and flex gaps

### Typography
- `text-balance` - Optimal line breaks on headings
- `text-{size}` with responsive variants
- `line-clamp-{n}` - Truncate text consistently

### Visibility
- `hidden lg:block` - Conditional rendering
- `lg:sticky` - Sticky positioning on desktop only

## Media Query Approach

All responsive design uses Tailwind's utility classes rather than custom CSS media queries. This ensures:
- Consistent breakpoints across the application
- Mobile-first approach (base styles = mobile)
- Easier maintenance and debugging
- Better performance (no duplicate styles)

## Touch Optimization

### Mobile Interactions
- Minimum touch target size: 44x44px (buttons)
- Increased padding on interactive elements
- Drag-and-drop works on touch devices
- Scroll areas use momentum scrolling

### Gestures Supported
- Swipe to navigate images (native behavior)
- Pinch to zoom in lightbox (native)
- Pull to refresh (browser default)
- Drag to add/remove favourites

## Testing Approach

The application should be tested at these specific widths:
- 375px (iPhone SE, small mobile)
- 768px (iPad portrait)
- 1024px (iPad landscape, small desktop)
- 1440px (standard desktop)

## Performance Considerations

- Images use `sizes` attribute for responsive loading
- Layouts avoid layout shift (CLS)
- Sticky elements use GPU acceleration
- Minimal JavaScript for responsive behavior

## Accessibility

- Focus states visible on all devices
- Touch targets meet WCAG 2.1 guidelines (minimum 44x44px)
- Keyboard navigation works regardless of layout
- Screen readers announce layout changes appropriately

## Future Enhancements

- Add intermediate breakpoint (2xl: 1536px) for large monitors
- Implement container queries for component-level responsiveness
- Add print styles for property pages
- Optimize image loading with blur placeholders
