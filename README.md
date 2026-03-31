# HFO SHS Platform Maintenance Guide

This document provides instructions for maintaining and updating the Holy Faithful Obedient (HFO) Senior High School digital platform.

## 1. Branding Updates

All branding elements are centralized in `src/constants.ts`. To update the school's identity, modify this file:

- **School Logo**: Update `SCHOOL_LOGO_URL` with a new image URL.
- **Foundation Logo**: Update `YPKB_LOGO_URL` for the YPKB foundation logo.
- **School Name**: Update `SCHOOL_NAME` (short version) and `SCHOOL_FULL_NAME` (long version).
- **Contact Info**: Update the `CONTACT_INFO` object to change email, phone, address, or Google Maps link.

```typescript
// src/constants.ts
export const SCHOOL_LOGO_URL = "https://example.com/new-logo.png";
export const SCHOOL_NAME = "HFO SHS";
// ...
```

## 2. Content Management

### Announcements
Teachers can post announcements directly from the **Classroom** stream. These are stored in the `announcements` collection in Firestore.

### Assignments
Currently, assignments are managed within the `Classroom.tsx` component state. For long-term use, these should be moved to a Firestore collection named `assignments`.

### Calendar Events
The calendar in `src/pages/Calendar.tsx` uses mock data. To make it dynamic:
1. Create an `events` collection in Firestore.
2. Update `Calendar.tsx` to fetch data from this collection using `onSnapshot`.

## 3. User Management

Administrators can view all registered users at `/dashboard/users`. 
- **Roles**: Users are assigned roles (`student`, `teacher`, `admin`) upon their first Google Sign-in.
- **Profile Updates**: Users can update their name and avatar URL in the **Settings** page.

## 4. Technical Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (`motion/react`)
- **Backend**: Firebase (Firestore & Authentication)
- **Icons**: Lucide React

## 5. Deployment

The app is configured for deployment on Cloud Run.
- **Build**: `npm run build`
- **Start**: `npm start` (for full-stack) or automatic static serving.

## 6. Security Rules

Firestore security rules are defined in `firestore.rules`. Always test rules after making changes to ensure data remains protected.
- **Default Admin**: The user `nataliariyadi37@gmail.com` is configured as the default administrator in `firestore.rules`.

---
*Developed for Holy Faithful Obedient Senior High School*
