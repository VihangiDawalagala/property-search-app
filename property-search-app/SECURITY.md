# Security Implementation

This document outlines the security measures implemented in the HomeFind Property Search application.

## Content Security Policy (CSP)

The application implements CSP headers via `next.config.mjs` to prevent XSS attacks and other code injection vulnerabilities.

### CSP Directives

```
default-src 'self'
```
- Only allows resources from the same origin by default

```
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live
```
- Allows scripts from same origin
- `unsafe-eval` required for Next.js hot reload
- `unsafe-inline` required for React hydration
- Vercel Live for preview deployments

```
style-src 'self' 'unsafe-inline'
```
- Allows styles from same origin
- `unsafe-inline` required for styled-jsx and CSS-in-JS

```
img-src 'self' data: blob: https:
```
- Allows images from same origin, data URLs, blob URLs, and HTTPS sources
- Supports placeholder images and dynamically generated images

```
font-src 'self' data:
```
- Allows fonts from same origin and data URLs

```
connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://sockjs-us3.pusher.com
```
- API calls restricted to same origin
- Vercel Live connections for development

```
frame-src 'self' https://www.google.com
```
- Allows embedding Google Maps
- Prevents other iframe injections

```
media-src 'self' blob:
```
- Media files from same origin and blob URLs

## Additional Security Headers

### X-Frame-Options
```
X-Frame-Options: SAMEORIGIN
```
- Prevents clickjacking attacks
- Only allows framing from same origin

### X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```
- Prevents MIME type sniffing
- Forces browsers to respect Content-Type headers

### Referrer-Policy
```
Referrer-Policy: strict-origin-when-cross-origin
```
- Sends full URL for same-origin requests
- Only sends origin for cross-origin requests
- Protects user privacy

### X-XSS-Protection
```
X-XSS-Protection: 1; mode=block
```
- Enables browser XSS filtering
- Blocks page if attack detected
- Legacy header for older browsers

## React Security Features

### Automatic XSS Prevention

React automatically escapes values embedded in JSX:

```tsx
// Safe - automatically escaped
<p>{userInput}</p>

// Safe - property values are escaped
<div title={userInput} />
```

### Dangerous HTML

The application NEVER uses `dangerouslySetInnerHTML` to prevent XSS attacks.

### Safe Property Handling

All user inputs are sanitized:
- Form inputs use controlled components
- Search criteria validated before processing
- LocalStorage data parsed with try-catch

## Client-Side Security

### LocalStorage Safety

```typescript
// Always wrap in try-catch
try {
  const saved = localStorage.getItem('favourites')
  const ids = JSON.parse(saved)
  // Validate data structure
  if (Array.isArray(ids)) {
    // Process
  }
} catch {
  // Handle gracefully
}
```

### Input Validation

All user inputs are validated:
- Price ranges checked for valid numbers
- Dates validated before filtering
- Postcode format sanitized
- Type constrained to enum values

### URL Parameters

The application doesn't use URL parameters for sensitive data, only property IDs which are validated against the data source.

## Third-Party Dependencies

### Dependency Management
- All dependencies are pinned to specific versions
- Regular updates for security patches
- Minimal dependency tree to reduce attack surface

### Trusted Sources Only
- @radix-ui components (trusted UI library)
- Lucide React icons (official icon library)
- Next.js and React (official packages)
- Vercel Analytics (first-party)

## Data Security

### No Sensitive Data
- Application is frontend-only
- No authentication system
- No personal user data collected
- No server-side processing

### LocalStorage Usage
- Only stores property IDs in favourites
- No sensitive information
- Data easily clearable by user

## API Security

### No External APIs
The application doesn't make external API calls except:
- Google Maps embed (sandboxed iframe)
- All property data is local JSON

### Future Considerations
If backend is added:
- Use HTTPS only
- Implement CORS properly
- Add rate limiting
- Use authentication tokens
- Validate all inputs server-side

## Image Security

### Placeholder Images
- Uses Next.js Image component for optimization
- All images served over HTTPS
- No external image sources without validation

### User-Uploaded Content
Not applicable - application has no upload functionality

## Development vs Production

### Development
- More permissive CSP for hot reload
- Source maps enabled
- Detailed error messages

### Production
- Stricter CSP where possible
- No source maps
- Generic error messages

## Security Checklist

- [x] CSP headers implemented
- [x] XSS protection enabled
- [x] Clickjacking prevention (X-Frame-Options)
- [x] MIME sniffing disabled
- [x] Secure referrer policy
- [x] All user inputs validated
- [x] React automatic escaping utilized
- [x] No dangerouslySetInnerHTML used
- [x] LocalStorage data validated
- [x] Dependencies from trusted sources
- [x] No sensitive data exposure
- [x] HTTPS enforced (via deployment platform)

## Reporting Security Issues

For security concerns, please contact:
- Email: security@homefind.com
- Or open a private security advisory on GitHub

## Compliance

This application follows:
- OWASP Top 10 best practices
- React security guidelines
- Next.js security recommendations
- MDN Web Security guidelines

## Regular Audits

Recommended security checks:
1. Monthly dependency updates
2. Quarterly security audits
3. Annual penetration testing
4. Regular CSP review and tightening
