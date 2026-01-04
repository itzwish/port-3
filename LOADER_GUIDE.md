# Page Loader Implementation Guide

The page loader has been successfully integrated into your Nuxt application with the star animation. It automatically shows when page transitions take >300ms and can be used for any async operation.

## ✅ What's Implemented

### 1. **LoadingScreen Component** (`app/components/LoadingScreen.vue`)
- Star-burst animation with rotating stars
- Full-screen overlay with smooth fade transitions
- Automatically shown during page transitions

### 2. **usePageLoader Composable** (`app/composables/usePageLoader.ts`)
- Smart delay: only shows loader if action takes >300ms
- Prevents unnecessary flashing for quick operations
- Global state management

### 3. **Automatic Page Transitions** (`app/app.vue`)
- Loader shows automatically when navigating between pages
- Integrated with Vue Router
- 300ms delay before showing to avoid flashing

### 4. **Helper Plugin** (`app/plugins/page-loader.ts`)
- Pre-configured utilities for common use cases
- Easy-to-use API for custom implementations

## 📖 Usage Examples

### Automatic (Already Working)
The loader automatically shows during page navigation:
```vue
<!-- No code needed - works automatically -->
<NuxtLink to="/about">About</NuxtLink>
```

### Manual Control in Components
```vue
<script setup>
const { $pageLoader } = useNuxtApp()

// Example: Form submission
async function handleSubmit() {
  await $pageLoader.with(async () => {
    await $fetch('/api/submit', {
      method: 'POST',
      body: formData
    })
  })
}

// Or use start/stop manually
async function handleLogin() {
  $pageLoader.start()
  try {
    await loginUser()
  } finally {
    $pageLoader.stop()
  }
}
</script>
```

### API Calls with Loader
```vue
<script setup>
const { $fetchWithLoader } = useNuxtApp()

// This will automatically show loader if request takes >300ms
const { data } = await useAsyncData('userData', () => 
  $fetchWithLoader('/api/user')
)
</script>
```

### Using the Composable Directly
```vue
<script setup>
const { withLoading } = usePageLoader()

async function processData() {
  await withLoading(async () => {
    // Heavy computation or API call
    await someAsyncOperation()
  })
}
</script>
```

## 🎯 When Loader Shows (Implemented)

✅ **Page Navigation** - Automatic
- Navigating between routes
- Language switching
- Any route change

✅ **>300ms Actions** - Use `withLoading()`
- API requests
- Database queries
- File uploads/downloads
- Form submissions
- Authentication

## 🎨 Customization

### Change Loader Delay
Edit `app/composables/usePageLoader.ts`:
```typescript
const LOADER_DELAY = 500 // Change from 300ms to 500ms
```

### Customize Animation
Edit `app/components/LoadingScreen.vue`:
- Change `background-color` in `.crack` class
- Adjust `animation-delay` values
- Modify star sizes (width percentages)
- Change animation duration (currently 6s)

### Disable for Specific Routes
In your page component:
```vue
<script setup>
definePageMeta({
  pageTransition: false
})
</script>
```

## 🚀 Testing

1. **Test Page Transitions:**
   ```bash
   npm run dev
   ```
   Navigate between pages - loader should appear for transitions >300ms

2. **Test Manual Loader:**
   ```vue
   <button @click="$pageLoader.with(() => new Promise(r => setTimeout(r, 1000)))">
     Test Loader
   </button>
   ```

## 🎭 Animation Details

The loader uses a **star-burst** animation with:
- 5 rotating stars at different sizes
- Staggered animation delays (0s, 1s, 1.5s, 2s, 2.5s)
- 6-second rotation cycle
- White glow effect with drop-shadow
- Smooth fade in/out transitions

## 📝 Best Practices

1. **Don't overuse manual loaders** - automatic page transitions handle most cases
2. **Use `withLoading()` for async operations** - handles start/stop automatically
3. **Avoid showing loader for <300ms operations** - already built-in
4. **For partial content**, consider inline loaders instead of full-page
5. **Always stop loader in finally blocks** - prevents stuck loaders

## 🔧 Troubleshooting

**Loader not showing?**
- Check if navigation is actually taking >300ms
- Verify `usePageLoader` is imported correctly
- Check browser console for errors

**Loader stuck?**
- Ensure `stopLoading()` is called in finally blocks
- Check for unhandled promise rejections

**Animation not smooth?**
- Verify no CSS conflicts
- Check z-index (loader is at 9999)
- Ensure transitions are not disabled globally
