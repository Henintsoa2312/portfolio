<template>
    <header class="bg-gray-800 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-2xl font-bold">
                <NuxtLink to="/">Mon Portfolio</NuxtLink>
            </div>
            <nav>
                <ul class="flex space-x-4 items-center">
                    <li><NuxtLink to="/" class="hover:text-gray-400">Accueil</NuxtLink></li>
                    <li><NuxtLink to="/projects" class="hover:text-gray-400">Projets</NuxtLink></li>
                    <li><NuxtLink to="/about" class="hover:text-gray-400">À propos</NuxtLink></li>
                    <li><ContactDropdown /></li>
                </ul>
            </nav>
        </div>
    </header>
</template>