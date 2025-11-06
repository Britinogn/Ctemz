<template>
    <div @click.self="$emit ('close')"
        class="fixed top-0 left-0 right-0 bottom-0 bg-black/80 flex items-center justify-center z-auto p-4 overflow-y-auto ">

        <div class="bg-amber-200 rounded-xl max-w-[600px] w-full max-h-[90vh] flex flex-col shadow-2xl shadow-black/30">
            <!-- Header -->
            <div class="flex justify-between items-center p-6 border-b border-gray-300">
                <h2>{{ isEdit ? 'Update Project' : 'Create Project' }} </h2>
                <button 
                    @click="$emit('close')"
                    class="bg-none border-0 text-white cursor-pointer p-2 rounded transition-all duration-200 ease-in-out "
                >
                    <XIcon/>
                </button>
            </div>

            <!--    FORM SECTION -->

            <form @submit.prevent="handleSubmit" class="p-6 overflow-y-auto ">

                <!-- Title -->
                <div class="form-group">
                    <label for="Project">Project Title</label>
                    <input 
                        type="text" 
                        v-model="project.title"
                        placeholder="Enter any project you have built..."
                    />

                    <span v-if="errors.title"
                        class="error-text"
                    >
                        {{ errors.title }}
                    </span>
                </div>

                <div  class="form-group">
                    <label for="Project">Description</label>
                    <textarea name="" id="" 
                        v-model="project.description"
                        rows="4"
                        placeholder="Describe your project"
                        class="input-field"
                    ></textarea>
                    
                    <span v-if="errors.description"
                        class="error-text"
                    >
                        {{ errors.description }}
                    </span>

                </div>

                <!-- Tech Stack -->
                <div>
                    <label for="techStack" class="block text-sm font-medium mb-1">Tech Stack</label>
                    <input
                        id="techStack"
                        v-model="project.techStack"
                        type="text"
                        placeholder="e.g., React, Node.js, TypeScript"
                    />
                    <span v-if="errors.description"
                        class="error-text"
                    >
                        {{ errors.description }}
                    </span>
                </div>

                <!-- GitHub URL -->
                <div  class="form-group">
                    <label for="Project">GitHub</label>
                    <textarea name="" id="" 
                        v-model="project.githubUrl"
                        rows="4"
                        placeholder="Link to your github"
                        class="input-field"
                    ></textarea>
                    
                    <span v-if="errors.githubUrl"
                        class="error-text"
                    >
                        {{ errors.githubUrl }}
                    </span>

                </div>

                <!-- Live URL -->
                <div  class="form-group">
                    <label for="Project"> Live URL</label>
                    <textarea name="" id="" 
                        v-model="project.liveURL"
                        rows="4"
                        placeholder="Link to your project"
                        class="input-field"
                    ></textarea>
                    
                    <span v-if="errors.liveURL"
                        class="error-text"
                    >
                        {{ errors.liveURL }}
                    </span>

                </div>
                
                
                <!-- Category -->
            <div  class="form-group">
                    <label for="Category">Category</label>
                    <textarea name="" id="" 
                        v-model="project.category"
                        rows="4"
                        placeholder="Enter the project category"
                        class="input-field"
                    ></textarea>
                    
                    <span v-if="errors.githubUrl"
                        class="error-text"
                    >
                        {{ errors.githubUrl }}
                    </span>

                </div>

                <!-- Year Built -->
                <div  class="form-group">
                    <label for="yearBuilt">Year Built</label>
                    <textarea name="" id="" 
                        v-model="project.yearBuilt"
                        rows="4"
                        placeholder="Enter year you built this project"
                        class="input-field"
                    ></textarea>
                    
                    <span v-if="errors.yearBuilt"
                        class="error-text"
                    >
                        {{ errors.yearBuilt }}
                    </span>

                </div>

                <!-- Image Upload -->
                <div class="form-group">
                    <label for="imageURL">Project Images</label>
                    <!-- Current Images Preview (for edit mode) -->
                    <div v-if="isEdit &&   project.imageURL && project.imageURL.length > 0" class="mb-2">
                        <p class="text-sm text-gray-500 mb-1">Current Images:</p>
                        <div class="flex flex-wrap gap-2">
                            <img v-for="(img, index) in project.imageURL" :key="index" :src="img.url || ''" alt="Current Image" class="w-20 h-20 object-cover rounded" />
                        </div>
                    </div>
                    <!-- File Input for Multiple Images -->
                    <input
                        id="imageURL"
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        multiple
                        @change="handleImageChange"
                        class="w-full border-dashed border-2 rounded px-2 py-1"
                    />

                    <!-- New Images Preview -->
                    <div v-if="imagePreviews.length > 0" class="mt-4 grid grid-cols-3 gap-2">
                        <div v-for="(preview, index) in imagePreviews" :key="index" class="relative">
                            <img :src="preview" alt="Preview" class="w-full h-20 object-cover rounded" />
                            <button @click="removeImage(index)" class="absolute top-1 right-1 bg-red-500 text-white p-1 rounded text-xs"><TrashIcon /></button>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    :disabled="loading"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {{ loading ? 'Saving...' : (isEdit ? "Update" : "Create") }}
                </button>

                <!-- Global Error -->
                <div v-if="error" class="mt-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                    {{ error }}
                </div>




            </form>
            

        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Project } from '../../types/script'
import ProjectAPI from '../../api/projectAPI'
import { XIcon, TrashIcon } from 'lucide-vue-next'

interface ProjectProps {
  project: Project
  onSuccess?: () => void
  onClose?: () => void;
  onSave?: (data: any) => void;
  isEdit?: boolean
}

const props = defineProps<ProjectProps>()

const emit = defineEmits<{
  close: []
  save: [data: any]
}>()

const isEdit = computed(() => !!props.project)
const loading = ref(false)
const error = ref('')
const errors = ref<Record<string, string>>({})
const imageFiles = ref<File[]>([])
const imagePreviews = ref<string[]>([])

const formData = ref<Project | null>(props.project ? { ...props.project } : null)

// Initial formData
if (props.project) {
    formData.value = { ...props.project }
}

// Computed for techStackString (get/set for comma-separated input)
const techStackString = computed({
  get: () => {
    if (!formData.value?.techStack) return ''
    return formData.value.techStack.join(', ')
  },
  set: (value: string) => {
    if (!formData.value) return
    const techArray = value.split(',').map(t => t.trim()).filter(t => t.length > 0)
    formData.value.techStack = techArray
  }
})

// Type guard for imageURL
const isImageObject = (imageURL: File | { url: string | null; public_id: string | null } | null): imageURL is { url: string | null; public_id: string | null } => {
  return imageURL !== null && typeof imageURL === 'object' && 'public_id' in imageURL
}

// Handle image change (multiple files)
const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])

  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreviews.value.push(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      imageFiles.value.push(file)
    }
  })
}

// Remove specific image
const removeImage = (index: number) => {
  imageFiles.value.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

// Form validation
const validateForm = (): boolean => {
  errors.value = {}
  let isValid = true

  if (!formData.value?.title || formData.value.title.trim().length < 5) {
    errors.value.title = 'Project title must be at least 5 characters'
    isValid = false
  }

  if (!formData.value?.description || formData.value.description.trim().length < 10) {
    errors.value.description = 'Description must be at least 10 characters'
    isValid = false
  }

  const techArray = techStackString.value.split(',').map(t => t.trim()).filter(t => t.length > 0)
  if (techArray.length < 1) {
    errors.value.techStack = 'At least one tech stack item is required'
    isValid = false
  } else if (techArray.some(t => t.length < 2)) {
    errors.value.techStack = 'Each tech must be at least 2 characters'
    isValid = false
  }

  // GitHub URL validation
  if (formData.value?.githubUrl && !isValidUrl(formData.value.githubUrl)) {
    errors.value.githubUrl = 'GitHub URL must be a valid URL'
    isValid = false
  }

  // Live URL validation
  if (formData.value?.liveURL && !isValidUrl(formData.value.liveURL)) {
    errors.value.liveURL = 'Live URL must be a valid URL'
    isValid = false
  }

  return isValid
}

// Helper for URL validation
const isValidUrl = (string: string): boolean => {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

// Call validation in submit handler
const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return

    // Ensure formData is present
    if (!formData.value) {
        error.value = 'Form data is missing.'
        return
    }

    loading.value = true
    error.value = ''

    try {
        // Create FormData and use the concrete value to avoid null checks everywhere
        const fd = new FormData()
        const data = formData.value

        fd.append('title', data.title ?? '')
        fd.append('description', data.description ?? '')
        // Send tech stack as JSON so backend receives an array shape reliably
        fd.append('techStack', JSON.stringify(data.techStack ?? []))
        fd.append('githubUrl', data.githubUrl ?? '')
        fd.append('liveURL', data.liveURL ?? '')
        if (data.category) fd.append('category', data.category)
        if (data.yearBuilt !== undefined && data.yearBuilt !== null) fd.append('yearBuilt', String(data.yearBuilt))

        // Append multiple images (include filename)
        imageFiles.value.forEach((file) => {
            fd.append('imageURL', file, file.name)
        })

        let response
        if (isEdit.value && data._id) {
            response = await ProjectAPI.updateProject(data._id, fd)
        } else {
            response = await ProjectAPI.createProject(fd)
        }

        console.log('Project saved!', response)
        // Emit save event and call optional onSuccess, then close modal
        emit('save', response)
        if (props.onSuccess) props.onSuccess()
        emit('close')
    } catch (err: any) {
        console.error('Error saving project:', err)
        error.value = err?.message || 'Failed to save project. Please try again.'
    } finally {
        loading.value = false
    }

}

</script>