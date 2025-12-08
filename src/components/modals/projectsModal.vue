<template>
  <div @click.self="$emit ('close')"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black/80 flex items-center justify-center z-auto p-4 overflow-y-auto ">

    <div class="bg-blue-400 rounded-xl max-w-[600px] w-full max-h-[90vh] flex flex-col shadow-2xl shadow-black/30">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-300">
        <h2 class=" text-xl font-extrabold ">{{ isEdit ? 'Update Project' : 'Create Project' }} </h2>
        <button 
          @click="$emit('close')"
          type="button"
          class="bg-none border-0 text-white cursor-pointer p-2 rounded transition-all duration-200 ease-in-out "
        >
          <XIcon/>
        </button>
      </div>

      <!--    FORM SECTION -->

      <form @submit.prevent="handleSubmit" class="p-6 overflow-y-auto  ">

        <!-- Title -->
        <div class="form-group">
          <label for="Project">Project Title</label>
          <input 
            type="text" 
            v-model="formData.title"
            class="input-field"
            
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
            v-model="formData.description"
            rows="4"
            placeholder="Describe your project"
            class="input-field min-h-15 max-h-50"
          ></textarea>
          
          <span v-if="errors.description"
            class="error-text"
          >
            {{ errors.description }}
          </span>

        </div>

        <!-- Tech Stack -->
        <div class="form-group">
          <label for="techStack" class="">Tech Stack</label>
          <input
            id="techStack"
            v-model="techStackString"
            type="text"
            class="input-field"
            placeholder="e.g., React, Node.js, TypeScript"
          />
          <span v-if="errors.techStack"
            class="error-text"
          >
            {{ errors.techStack }}
          </span>
        </div>

        <!-- GitHub URL -->
        <div  class="form-group">
          <label for="githubUrl">GitHub</label>
          <input 
            id="githubUrl"
            type="text"
            v-model="formData.githubUrl"
            placeholder="Link to your github"
            class="input-field"
          />
          
          <span v-if="errors.githubUrl"
            class="error-text"
          >
            {{ errors.githubUrl }}
          </span>

        </div>

        <!-- Live URL -->
        <div  class="form-group">
          <label for="liveURL"> Live URL</label>
          <input 
            id="liveURL"
            type="text"
            v-model="formData.liveURL"
            placeholder="Link to your project"
            class="input-field"
          />
          
          <span v-if="errors.liveURL"
            class="error-text"
          >
            {{ errors.liveURL }}
          </span>

        </div>
        
        
        <!-- Category -->
        <div  class="form-group">
          <label for="category">Category</label>
          <input 
            id="category"
            type="text"
            v-model="formData.category"
            placeholder="Enter the project category"
            class="input-field"
          />
          
          <span v-if="errors.category"
            class="error-text"
          >
            {{ errors.category }}
          </span>

        </div>

        <!-- Year Built -->
        <div  class="form-group">
          <label for="yearBuilt">Year Built</label>
          <input 
            id="yearBuilt"
            type="number"
            v-model.number="formData.yearBuilt"
            placeholder="Enter year you built this project"
            class="input-field"
          />
          
          <span v-if="errors.yearBuilt"
            class="error-text"
          >
            {{ errors.yearBuilt }}
          </span>

        </div>

        <!-- Image Upload -->
        <div class="form-group">
          <label>Project Images</label>
          <div class="image-upload">
            <input 
              type="file" 
              accept="image/*"
              multiple
              @change="handleImageChange"
              ref="fileInput"
              hidden
            />
            
            <!-- Current Images Preview (for edit mode) -->
            <div v-if="isEdit && formData.imageURL && formData.imageURL.length > 0" class="mb-4">
              <p class="text-sm text-gray-500 mb-2">Current Images:</p>
              <div class="grid grid-cols-3 gap-2">
                <div v-for="(img, index) in formData.imageURL" :key="`current-${index}`" class="relative">
                  <img :src="typeof img === 'string' ? img : img.url || ''" alt="Current Image" class="w-full h-24 object-cover rounded" />
                </div>
              </div>
            </div>

            <!-- New Images Preview -->
            <div v-if="imagePreviews.length > 0" class="grid grid-cols-3 gap-2 mb-4">
              <div v-for="(preview, index) in imagePreviews" :key="`preview-${index}`" class="image-preview relative">
                <img :src="preview" alt="Preview" class="w-full h-24 object-cover rounded" />
                <button 
                  type="button" 
                  @click="removeImage(index)" 
                  class="remove-image-btn absolute top-1 right-1 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  <TrashIcon :size="16" />
                </button>
              </div>
            </div>

            <!-- Upload Button -->
            <button 
              type="button" 
                @click="fileInput?.click()" 
              class="upload-btn w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2"
            >
              <UploadIcon :size="24" />
              <span>Choose Images</span>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
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
import { ref, computed, onMounted } from 'vue'
import { Project } from '../../types/script'
import ProjectAPI from '../../api/projectAPI'
import { XIcon, TrashIcon, UploadIcon } from 'lucide-vue-next'

interface ProjectProps {
  project?: Project | null
  onSuccess?: () => void
  onClose?: () => void
  onSave?: (data: any) => void
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
const fileInput = ref<HTMLInputElement | null>(null)

const formData = ref<Project>({
  _id: '',
  title: '',
  description: '',
  techStack: [],
  githubUrl: '',
  liveURL: '',
  imageURL: [],
  category: '',
  yearBuilt: undefined,
  createdAt: '',
  updatedAt: ''
})

// Initialize formData from props.project if provided
onMounted(() => {
  if (props.project) {
    formData.value = { ...props.project }
  }
})

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

// Handle image change (multiple files)
const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])

  if (files.length === 0) return

  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          imagePreviews.value.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
      imageFiles.value.push(file)
    }
  })

  // // Reset file input
  // if (fileInput.value) {
  //   fileInput.value.value = ''
  // }
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

  // GitHub URL validation (optional field)
  if (formData.value?.githubUrl && formData.value.githubUrl.trim() && !isValidUrl(formData.value.githubUrl)) {
    errors.value.githubUrl = 'GitHub URL must be a valid URL'
    isValid = false
  }

  // Live URL validation (optional field)
  if (formData.value?.liveURL && formData.value.liveURL.trim() && !isValidUrl(formData.value.liveURL)) {
    errors.value.liveURL = 'Live URL must be a valid URL'
    isValid = false
  }

  // Category validation (optional, but if present, min length)
  if (formData.value?.category && formData.value.category.trim().length > 0 && formData.value.category.trim().length < 2) {
    errors.value.category = 'Category must be at least 2 characters'
    isValid = false
  }

  // Year Built validation (optional, but if present, numeric 1900-2100)
  if (formData.value?.yearBuilt !== undefined && formData.value?.yearBuilt !== null) {
    const year = Number(formData.value.yearBuilt)
    if (isNaN(year) || year < 1900 || year > 2100) {
      errors.value.yearBuilt = 'Year must be a valid number between 1900 and 2100'
      isValid = false
    }
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

  loading.value = true
  error.value = ''

  try {
    const fd = new FormData()

    fd.append('title', formData.value.title ?? '')
    fd.append('description', formData.value.description ?? '')
    fd.append('techStack', JSON.stringify(formData.value.techStack ?? []))
    fd.append('githubUrl', formData.value.githubUrl ?? '')
    fd.append('liveURL', formData.value.liveURL ?? '')
    
    // Only append category if it has a value
    if (formData.value.category && formData.value.category.trim()) {
      fd.append('category', formData.value.category.trim())
    }
    
    // Only append yearBuilt if it has a value
    if (formData.value.yearBuilt !== undefined && formData.value.yearBuilt !== null) {
      fd.append('yearBuilt', String(formData.value.yearBuilt))
    }

    // Append multiple images
    newFunction(fd)

    console.log('FormData contents:')
    for (let pair of fd.entries()) {
      console.log(pair[0], pair[1])
    } 

    let response
    if (isEdit.value && formData.value._id) {
      response = await ProjectAPI.updateProject(formData.value._id, fd)
    } else {
      response = await ProjectAPI.createProject(fd)
    }

    console.log('Project saved!', response)
    emit('save', response)
    if (props.onSuccess) props.onSuccess()
    emit('close')
  } catch (err: any) {
    console.error('Error saving project:', err)
    error.value = err?.response?.data?.message || err?.message || 'Failed to save project. Please try again.'
  } finally {
    loading.value = false
  }

  function newFunction(fd: FormData) {
    imageFiles.value.forEach((file) => {
      fd.append('imageURL', file)
    })
  }
}
</script>