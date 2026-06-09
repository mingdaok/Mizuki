<script lang="ts">
import Icon from "@iconify/svelte";
import { onMount } from "svelte";

const MODES = ['none', 'sakura', 'rain', 'snow'];
let mode = $state('none');
let isChanging = false;

onMount(() => {
    if (typeof window !== "undefined") {
        mode = localStorage.getItem('weather-effect') || 'none';
    }
});

function switchEffect(newMode: string) {
    if (isChanging) return;
    isChanging = true;
    mode = newMode;
    localStorage.setItem('weather-effect', newMode);
    
    document.dispatchEvent(new CustomEvent('weather-change', { detail: newMode }));

    setTimeout(() => {
        isChanging = false;
    }, 50);
}

function toggleEffect() {
    if (isChanging) return;
    let i = MODES.indexOf(mode);
    if (i === -1) i = 0;
    switchEffect(MODES[(i + 1) % MODES.length]);
}

if (typeof window !== "undefined") {
    const handleContentReplace = () => {
        requestAnimationFrame(() => {
            const newMode = localStorage.getItem('weather-effect') || 'none';
            if (mode !== newMode) mode = newMode;
        });
    };

    if (window.swup?.hooks) {
        window.swup.hooks.on("content:replace", handleContentReplace);
    } else {
        document.addEventListener("swup:enable", () => {
            if (window.swup?.hooks) {
                window.swup.hooks.on("content:replace", handleContentReplace);
            }
        });
    }
}
</script>

<button
    aria-label="Toggle Weather Effect"
    class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90 theme-switch-btn z-50 flex items-center justify-center"
    id="weather-switch"
    onclick={toggleEffect}
    data-mode={mode}
>
    <!-- None -->
    <div
        class="absolute transition-all duration-300 ease-in-out"
        class:opacity-0={mode !== 'none'}
        class:scale-50={mode !== 'none'}
    >
        <Icon
            icon="material-symbols:cloud-off-outline-rounded"
            class="text-[1.25rem]"
        ></Icon>
    </div>
    
    <!-- Sakura -->
    <div
        class="absolute transition-all duration-300 ease-in-out text-pink-400"
        class:opacity-0={mode !== 'sakura'}
        class:scale-50={mode !== 'sakura'}
    >
        <Icon
            icon="material-symbols:local-florist-outline-rounded"
            class="text-[1.25rem]"
        ></Icon>
    </div>

    <!-- Rain -->
    <div
        class="absolute transition-all duration-300 ease-in-out text-blue-400"
        class:opacity-0={mode !== 'rain'}
        class:scale-50={mode !== 'rain'}
    >
        <Icon
            icon="material-symbols:rainy-outline-rounded"
            class="text-[1.25rem]"
        ></Icon>
    </div>

    <!-- Snow -->
    <div
        class="absolute transition-all duration-300 ease-in-out text-white"
        class:opacity-0={mode !== 'snow'}
        class:scale-50={mode !== 'snow'}
    >
        <Icon
            icon="material-symbols:ac-unit-rounded"
            class="text-[1.25rem]"
        ></Icon>
    </div>
</button>
