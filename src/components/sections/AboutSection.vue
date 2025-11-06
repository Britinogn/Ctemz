<template>
  <section class="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 md:px-12 overflow-hidden">
    
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden opacity-20">
      <div class="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      
      <!-- Section Title -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r text-[-var(--text-primary)] bg-clip-text mb-4">
          About Me
        </h1>
        <div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto rounded-full"></div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">
        
        <!-- Left Content - Text -->
        <div class="w-full md:w-1/2 space-y-6 animate-slide-in-left">
        
            <div class="space-y-4">
                <h2 class="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight">
                Hey, I'm 
                <span class="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                    Tino Ctemz
                </span> 
                <span class="inline-block animate-wave ">🪖 ⚙️ </span>
                </h2>

                <p class="text-xl md:text-2xl text-gray-300 font-semibold leading-relaxed">
                    A Freelance 
                    <span class="text-orange-400">Web Designer</span> & 
                    <span class="text-orange-400">Developer</span> based in 
                    <span class="text-yellow-400">Agbor, Nigeria</span>.
                </p>
            </div>

            <p class="text-lg text-gray-400 leading-relaxed">
                I specialize in crafting 
                <span class="text-orange-400 font-semibold">intuitive</span>, 
                <span class="text-orange-400 font-semibold">high-performance</span> web and mobile applications, 
                from sleek portfolios to robust e-commerce platforms.
            </p>

            <div class="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <p class="text-gray-300 leading-relaxed">
                Passionate about turning ideas into digital realities, I blend creativity with technical prowess to solve real-world challenges. Whether it's diving into backend proxies, hyping up DevFest events, or motivating the grind toward that first big freelance win, I'm all in on building what lasts.
                </p>
            </div>

            <marquee behavior="scroll" direction="left" scrollamount="6" style="width: 100%; overflow: hidden; white-space: nowrap;">
                <div style="display: inline-flex; gap: 1rem; align-items: center;">
                    <span class="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold border border-orange-500/30">
                        React
                    </span>
                    <span class="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                        Vue
                    </span>
                    <span class="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/30">
                        TypeScript
                    </span>
                    <span class="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold border border-purple-500/30">
                        Github
                    </span>

                    <span class="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold border border-orange-500/30">
                        Php
                    </span>
                    <span class="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                        Python
                    </span>
                    <span class="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/30">
                        MongoDB
                    </span>
                    <span class="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold border border-purple-500/30">
                        Node.js
                    </span>
                </div>
            </marquee>
        </div>

        <!-- Right Content - Image -->
        <div class="w-90 lg:w-90 md:w-1/2 flex justify-center items-center animate-slide-in-right">
          <div class="relative group">
            
            <!-- Decorative Elements -->
            <div class="absolute -inset-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
            
            <div class="absolute -top-8 -left-8 w-20 h-20 bg-orange-500 rounded-full opacity-40 blur-2xl animate-bounce-slow"></div>
            <div class="absolute -bottom-8 -right-8 w-24 h-24 bg-yellow-500 rounded-full opacity-40 blur-2xl animate-bounce-slow delay-1000"></div>
            <div class="absolute top-1/4 -right-6 w-16 h-16 bg-purple-500 rounded-full opacity-30 blur-xl animate-float"></div>
            
            <!-- Main Image Container -->
            <div class="relative bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-1 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
              <div class="bg-gray-900 rounded-3xl p-2">
                <img 
                  src="../../assets/images/ctemz.jpg" 
                  alt="Tino Ctemz portrait" 
                  class="rounded-2xl w-full max-w-md h-auto shadow-2xl group-hover:scale-105 transition-transform duration-500 object-cover"
                />
              </div>
            </div>

            <!-- Floating Badge -->
            <div class="absolute -bottom-4 -left-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-6 py-3 rounded-2xl font-bold shadow-xl animate-float">
              <span class="text-sm">Available for Freelance</span>
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
}

.animate-wave {
  animation: wave 2s ease-in-out infinite;
  display: inline-block;
  transform-origin: 70% 70%;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}

.delay-500 {
  animation-delay: 500ms;
}

.delay-1000 {
  animation-delay: 1000ms;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>