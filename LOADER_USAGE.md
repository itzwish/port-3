# Heavy Operations Loader - Usage Examples

This loader is specifically for **heavy operations** and when the website is under pressure. It does NOT automatically show on page transitions - only when you explicitly need it for:

## 🎯 When to Use This Loader

### ✅ API Requests Taking Time
```vue
<script setup>
const { $pageLoader } = useNuxtApp()

async function fetchLargeDataset() {
  await $pageLoader.with(async () => {
    const data = await $fetch('/api/heavy-data')
    // Process large dataset...
  })
}
</script>
```

### ✅ Form Submissions
```vue
<script setup>
const { $pageLoader } = useNuxtApp()

async function handleSubmit() {
  await $pageLoader.with(async () => {
    await $fetch('/api/submit', {
      method: 'POST',
      body: formData
    })
    toast.success('Submitted successfully!')
  })
}
</script>

<template>
  <button @click="handleSubmit">
    Submit Form
  </button>
</template>
```

### ✅ Authentication & Login
```vue
<script setup>
const { $pageLoader } = useNuxtApp()

async function handleLogin(credentials) {
  await $pageLoader.with(async () => {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })
    await navigateTo('/dashboard')
  })
}
</script>
```

### ✅ File Upload/Download
```vue
<script setup>
const { $pageLoader } = useNuxtApp()

async function uploadFile(file) {
  await $pageLoader.with(async () => {
    const formData = new FormData()
    formData.append('file', file)
    
    await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
  })
}
</script>
```

### ✅ Heavy Computations
```vue
<script setup>
const { $pageLoader } = useNuxtApp()

async function processImages() {
  await $pageLoader.with(async () => {
    // Image processing, compression, etc.
    for (const image of images) {
      await processImage(image)
    }
  })
}
</script>
```

### ✅ Database Operations
```vue
<script setup>
const { $fetchWithLoader } = useNuxtApp()

// Automatically shows loader if query takes >300ms
const { data: users } = await useAsyncData('users', () => 
  $fetchWithLoader('/api/users/list')
)
</script>
```

### ✅ Payment Processing
```vue
<script setup>
const { $pageLoader } = useNuxtApp()

async function processPayment(paymentData) {
  await $pageLoader.with(async () => {
    const result = await $fetch('/api/payment/process', {
      method: 'POST',
      body: paymentData
    })
    
    if (result.success) {
      toast.success('Payment successful!')
      await navigateTo('/confirmation')
    }
  })
}
</script>
```

### ✅ Fetching Dashboard Stats
```vue
<script setup>
const { $pageLoader } = useNuxtApp()

const stats = ref(null)

onMounted(async () => {
  await $pageLoader.with(async () => {
    stats.value = await $fetch('/api/dashboard/stats')
  })
})
</script>
```

### ✅ Manual Control for Complex Operations
```vue
<script setup>
const { $pageLoader } = useNuxtApp()

async function complexOperation() {
  $pageLoader.start()
  
  try {
    // Step 1
    await fetchData()
    
    // Step 2
    await processData()
    
    // Step 3
    await saveData()
    
  } catch (error) {
    toast.error('Operation failed')
  } finally {
    $pageLoader.stop()  // Always stop in finally!
  }
}
</script>
```

## 🔥 Real-World Example: Contact Form

```vue
<script setup>
const { $pageLoader } = useNuxtApp()

const formData = ref({
  name: '',
  email: '',
  message: ''
})

async function sendMessage() {
  // Validate
  if (!formData.value.name || !formData.value.email) {
    toast.error('Please fill all fields')
    return
  }
  
  // Show loader during submission
  await $pageLoader.with(async () => {
    try {
      await $fetch('/api/contact', {
        method: 'POST',
        body: formData.value
      })
      
      toast.success('Message sent successfully!')
      formData.value = { name: '', email: '', message: '' }
      
    } catch (error) {
      toast.error('Failed to send message')
      throw error
    }
  })
}
</script>

<template>
  <form @submit.prevent="sendMessage">
    <input v-model="formData.name" placeholder="Name" />
    <input v-model="formData.email" placeholder="Email" />
    <textarea v-model="formData.message" placeholder="Message" />
    <button type="submit">Send Message</button>
  </form>
</template>
```

## 📊 Server API Example

```typescript
// server/api/emails/send.ts
export default defineEventHandler(async (event) => {
  // This operation might take time
  const body = await readBody(event)
  
  // Send email via Resend
  await sendEmail(body)
  
  return { success: true }
})
```

## ⚡ Important Notes

1. **300ms Smart Delay**: Loader only shows if operation takes >300ms (prevents flashing)
2. **Not for Page Transitions**: Initial loader handles page loads
3. **Always use `finally`**: Ensures loader stops even on errors
4. **Combine with toasts**: Show success/error messages after operations

## 🎨 The Loader Animation

The star-burst animation will appear as a full-screen overlay whenever you use:
- `$pageLoader.with(fn)` - Recommended (handles cleanup)
- `$pageLoader.start()` / `$pageLoader.stop()` - Manual control
- `$fetchWithLoader(url)` - For API calls
