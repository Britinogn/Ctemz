<template>
  <div v-if="loading" class="flex justify-center items-center min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div class="relative">
      <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>

  <div v-else-if="error" class="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
    <div class="bg-white border-l-4 border-red-500 p-6 rounded-xl shadow-2xl max-w-md">
      <div class="flex items-start">
        <ExclamationCircleIcon class="h-6 w-6 text-red-500 mr-3 shrink-0" />
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Something went wrong</h3>
          <p class="text-gray-600">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Header -->
    <div class="bg-linear-to-r from-blue-900 via-indigo-800 to-gray-900 text-white rounded-2xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-between items-center">
        <div>
          <h1 class="text-3xl lg:text-5xl font-bold mb-2 drop-shadow-lg">Welcome Back!</h1>
          <p class="text-md text-blue-100">Here's what's happening with your portfolio today</p>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
          <p class="text-2xl font-bold mb-1">{{ currentWeekday }}</p>
          <p class="text-sm text-blue-100">{{ currentDay }}</p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          :icon="RocketLaunchIcon"
          title="Projects"
          :value="stats.totalProjects"
          :subtitle="`${stats.publishedProjects} published`"
          linear="from-blue-500 to-cyan-500"
        />

        <StatCard
          :icon="DocumentTextIcon"
          title="Blog Posts"
          :value="stats.totalBlogs"
          :subtitle="`${stats.publishedBlogs} published`"
          linear="from-purple-500 to-pink-500"
        />
        <StatCard
          :icon="EnvelopeIcon"
          title="Messages"
          :value="stats.totalContacts"
          :subtitle="`${stats.unreadContacts} unread`"
          linear="from-orange-500 to-red-500"
        />
        <StatCard
          :icon="BoltIcon"
          title="Skills"
          :value="stats.totalSkills"
          subtitle="Total expertise"
          linear="from-green-500 to-emerald-500"
        />
      </div>

      <!-- GitHub Stats -->
      <div v-if="github" class="relative group mb-8">
        <div class="absolute -inset-1 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div class="relative bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8 rounded-2xl shadow-2xl overflow-hidden">
          <div class="absolute top-0 right-0 -mt-4 -mr-4 w-64 h-64 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-64 h-64 bg-linear-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div class="p-3 bg-white/10 backdrop-blur-sm rounded-xl mr-3">
                  <CodeBracketIcon class="h-8 w-8" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold">GitHub Activity</h3>
                  <p class="text-sm text-gray-300">@{{ github.username }}</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <GitHubStat label="Repositories" :value="github.totalRepos" icon="📦" />
              <GitHubStat label="Stars" :value="github.totalStars" icon="⭐" />
              <GitHubStat label="Forks" :value="github.totalForks" icon="🔱" />
              <GitHubStat label="Followers" :value="github.followers" icon="👥" />
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Projects and Blogs -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ActivityList
          title="Recent Projects"
          :items="projects"
          :icon="RocketLaunchIcon"
          empty-message="No projects yet"
          color="blue"
        />
        <ActivityList
          title="Recent Blogs"
          :items="blogs"
          :icon="DocumentTextIcon"
          empty-message="No blogs yet"
          color="purple"
        />
      </div>

      <!-- Contact Messages -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="bg-linear-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200 flex justify-between items-center">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg mr-3">
              <EnvelopeIcon class="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Contact Messages</h3>
              <p class="text-sm text-gray-600">Recent inquiries and feedback</p>
            </div>
          </div>
          <span
            v-if="stats.unreadContacts > 0"
            class="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold animate-pulse"
          >
            {{ stats.unreadContacts }} New
          </span>
        </div>

        <div v-if="contacts.length" class="divide-y divide-gray-100">
          <ContactItem v-for="contact in contacts" :key="contact._id" :contact="contact" />
        </div>
        <div v-else class="p-12 text-center">
          <EnvelopeIcon class="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <p class="text-lg font-medium text-gray-900 mb-1">No messages yet</p>
          <p class="text-sm text-gray-500">Check back later for new inquiries</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted , computed } from 'vue'
import { EnvelopeIcon, CodeBracketIcon, RocketLaunchIcon, DocumentTextIcon, BoltIcon } from '@heroicons/vue/24/outline'
import DashboardAPI from '../../api/dashboardAPI'
import type { DashboardData, Contact } from '../../types/script'

const data = ref<DashboardData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const currentDay = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
});

const currentWeekday = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long'
  });
});


async function fetchDashboard() {
  try {
    loading.value = true
    const response = await DashboardAPI.getDashboardData()
    data.value = response as DashboardData
  } catch (err) {
    console.error(err)
    error.value = "Failed to load dashboard data"
  } finally {
    loading.value = false
  }
}

type Stats = {
  totalProjects: number
  publishedProjects: number
  totalBlogs: number
  publishedBlogs: number
  totalContacts: number
  unreadContacts: number
  totalSkills: number
}

const stats = computed<Stats>(() => {
  return data.value?.stats ?? {
    totalProjects: 0,
    publishedProjects: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    totalContacts: 0,
    unreadContacts: 0,
    totalSkills: 0
  }
})

const github = computed(() => data.value?.github || null)
const projects = computed(() => data.value?.projects || [])
const blogs = computed(() => data.value?.blogs || [])
const contacts = computed<Contact[]>(() => (data.value?.contacts ?? []) as Contact[])

onMounted(() => {
  fetchDashboard()
})
</script>

<script lang="ts">
import { defineComponent, h, PropType } from 'vue'
import type { ActivityItem} from '../../types/script'
import { ClockIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

// StatCard
const StatCard = defineComponent({
  props: {
    icon: {
      type: Object as PropType<any>,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    linear: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => h('div', { class: 'group relative' }, [
      h('div', { class: `absolute -inset-0.5 bg-linear-to-r ${props.linear} opacity-0 group-hover:opacity-100 rounded-2xl blur transition duration-300` }),
      h('div', { class: 'relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100' }, [
        h('div', { class: 'flex items-start justify-between mb-4' }, [
          h('div', { class: `p-3 rounded-xl bg-linear-to-br ${props.linear} shadow-lg group-hover:scale-110 transition-transform duration-300` }, [
            h(props.icon, { class: 'h-6 w-6 text-white' })
          ])
        ]),
        h('div', {}, [
          h('p', { class: 'text-sm font-medium text-gray-600 mb-1' }, props.title),
          h('p', { class: 'text-4xl font-bold text-gray-900 mb-2' }, props.value.toLocaleString()),
          h('p', { class: 'text-sm text-gray-500' }, props.subtitle)
        ])
      ])
    ])
  }
})

// GitHubStat
const GitHubStat = defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => h('div', { class: 'bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/10' }, [
      h('div', { class: 'text-center' }, [
        h('p', { class: 'text-4xl mb-1' }, props.icon),
        h('p', { class: 'text-3xl font-bold mb-1' }, props.value.toLocaleString()),
        h('p', { class: 'text-sm text-gray-300' }, props.label)
      ])
    ])
  }
})

// ActivityList
const ActivityList = defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array as PropType<ActivityItem[]>,
      required: true
    },
    icon: {
      type: Object as PropType<any>,
      required: true
    },
    emptyMessage: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const colorClasses = {
      blue: 'from-blue-500 to-cyan-500',
      purple: 'from-purple-500 to-pink-500'
    } as const

    return () => h('div', { class: 'bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden' }, [
      h('div', { class: `bg-linear-to-r ${colorClasses[props.color as keyof typeof colorClasses]} p-6` }, [
        h('div', { class: 'flex items-center text-white' }, [
          h(props.icon, { class: 'h-6 w-6 mr-3' }),
          h('h3', { class: 'text-xl font-bold' }, props.title)
        ])
      ]),
      props.items.length > 0 ? h('div', { class: 'p-4 space-y-2' }, props.items.map((item: ActivityItem) => h('div', { key: item._id, class: 'group p-4 rounded-xl hover:bg-linear-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 border border-transparent hover:border-gray-200' }, [
        h('div', { class: 'flex justify-between items-start' }, [
          h('div', { class: 'flex-1 min-w-0' }, [
            h('p', { class: 'font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors' }, item.title),
            h('div', { class: 'flex items-center gap-3 text-sm text-gray-500' }, [
              h('span', { class: 'flex items-center' }, [
                h(ClockIcon, { class: 'h-4 w-4 mr-1' }),
                new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              ])
            ])
          ]),
          h('span', { class: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700' }, [
            h(CheckCircleIcon, { class: 'h-3 w-3 mr-1' }),
            'New'
          ])
        ])
      ]))) : h('div', { class: 'p-12 text-center' }, [
        h('div', { class: 'inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4' }, [
          h(props.icon, { class: 'h-8 w-8 text-gray-400' })
        ]),
        h('p', { class: 'text-sm text-gray-500' }, props.emptyMessage)
      ])
    ])
  }
})

// ContactItem
const ContactItem = defineComponent({
  props: {
    contact: {
      type: Object as PropType<Contact>,
      required: true
    }
  },
  setup(props) {
    const isUnread = computed(() => !props.contact.isRead)

    return () => h('div', { class: `p-6 rounded-xl transition-all duration-200 ${isUnread.value ? 'bg-blue-50/70 hover:bg-blue-100' : 'bg-gray-50 hover:bg-linear-to-r hover:from-gray-50 hover:to-transparent'}` }, [
      h('div', { class: 'flex items-start gap-4' }, [
        h('div', { class: `flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${isUnread.value ? 'bg-linear-to-br from-blue-500 to-indigo-600' : 'bg-gray-400'}` }, props.contact.name.charAt(0)),
        h('div', { class: 'flex-1 min-w-0' }, [
          h('div', { class: 'flex items-center justify-between mb-2' }, [
            h('div', {}, [
              h('p', { class: 'text-base font-semibold text-gray-900' }, props.contact.name),
              h('p', { class: 'text-sm text-gray-500' }, props.contact.email)
            ]),
            h('div', { class: 'flex flex-col items-end gap-2' }, [
              h('span', { class: 'text-sm text-gray-500 whitespace-nowrap' }, new Date(props.contact.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
              isUnread.value && h('span', { class: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white animate-pulse' }, 'NEW')
            ])
          ]),
          h('p', { class: 'text-sm text-gray-700 line-clamp-2 leading-relaxed' }, props.contact.message)
        ])
      ])
    ])
  }
})
</script>