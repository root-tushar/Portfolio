# Design Document

## Overview

This design document outlines the approach for removing the Wireshark & Packet Analysis service and three home page sections (Projects, Experience, and Testimonials) from the website. The changes are straightforward content removals that require minimal code modifications.

## Architecture

The website follows a Next.js architecture with:
- **Data Layer**: Static data definitions in `src/lib/data.ts`
- **Component Layer**: React components in `src/components/`
- **Page Layer**: Next.js pages in `src/app/`

The removals will affect:
1. Data layer: Remove service definition from `data.ts`
2. Page layer: Remove component imports and usage from `page.tsx`

## Components and Interfaces

### Affected Files

#### 1. `src/lib/data.ts`
- **Current State**: Contains an array of services including the Wireshark service (id: 'cyber-5')
- **Modification**: Remove the service object with id 'cyber-5' from the services array
- **Impact**: The services array will have 9 items instead of 10

#### 2. `src/app/page.tsx`
- **Current State**: Imports and renders ProjectsPreview, ExperienceSection, and TestimonialsSection components
- **Modification**: Remove the three component imports and their usage in the JSX
- **Impact**: The home page will have fewer sections, maintaining the remaining sections in order

### Component Dependencies

```
HomePage (src/app/page.tsx)
├── Nav ✓ (keep)
├── Hero ✓ (keep)
├── ServicesPreview ✓ (keep)
├── ProjectsPreview ✗ (remove)
├── ExperienceSection ✗ (remove)
├── TestimonialsSection ✗ (remove)
├── PricingSection ✓ (keep)
├── LeadMagnetSection ✓ (keep)
└── Footer ✓ (keep)
```

### Services Page Impact

The services page (`src/app/services/page.tsx`) dynamically renders services from the data file:
- Filters services by category ('ai' and 'cybersecurity')
- Renders them in a grid layout
- No code changes needed - it will automatically reflect the updated data

## Data Models

### Service Object Structure
```typescript
{
  id: string,
  title: string,
  description: string,
  icon: string,
  features: string[],
  category: 'ai' | 'cybersecurity'
}
```

The service to be removed:
```typescript
{
  id: 'cyber-5',
  title: 'Wireshark & Packet Analysis',
  description: 'Analyze traffic to detect suspicious behavior or potential leaks.',
  icon: 'network-wired',
  features: ['Traffic Analysis', 'Threat Detection', 'Network Forensics', 'Performance Monitoring'],
  category: 'cybersecurity'
}
```

## Error Handling

### Potential Issues and Mitigations

1. **Build Errors**: 
   - Risk: Unused imports may cause linting warnings
   - Mitigation: Remove all imports for deleted components

2. **Layout Issues**:
   - Risk: Removing sections might affect spacing
   - Mitigation: The existing gap-24 utility class on the parent container will maintain proper spacing

3. **Navigation Links**:
   - Risk: Links to removed sections might break
   - Mitigation: Verify no internal links point to removed sections (projects, experience, testimonials on home page)

## Testing Strategy

### Manual Testing Checklist

1. **Home Page Verification**
   - [ ] Home page loads without errors
   - [ ] Removed sections (Projects, Experience, Testimonials) are not visible
   - [ ] Remaining sections display correctly
   - [ ] Spacing between sections is appropriate
   - [ ] Page is responsive on mobile and desktop

2. **Services Page Verification**
   - [ ] Services page loads without errors
   - [ ] Wireshark service is not displayed
   - [ ] Remaining 4 cybersecurity services display correctly
   - [ ] Grid layout works properly with 4 items
   - [ ] All service cards are clickable and functional

3. **Build Verification**
   - [ ] `npm run build` completes without errors
   - [ ] No TypeScript errors
   - [ ] No ESLint warnings for unused imports
   - [ ] Static export generates correctly

4. **Cross-Page Navigation**
   - [ ] Navigation between pages works correctly
   - [ ] No broken links
   - [ ] Footer links work properly

### Browser Testing
- Test on Chrome, Firefox, Safari
- Test on mobile devices (iOS and Android)
- Verify responsive design at various breakpoints

## Implementation Notes

### Order of Operations
1. Remove Wireshark service from data.ts
2. Remove component imports from page.tsx
3. Remove component usage from JSX
4. Test build locally
5. Verify visual appearance

### Rollback Plan
If issues arise, the changes can be easily reverted by:
1. Re-adding the service object to data.ts
2. Re-adding the component imports and usage in page.tsx

### Performance Considerations
- Removing components will slightly reduce bundle size
- Page load time may improve marginally
- No negative performance impact expected
