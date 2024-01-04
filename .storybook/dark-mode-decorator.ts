export const darkModeDecorator = () => ({
    template: `
        <div class="flex min-h-[calc(100vh_-_2rem)]">
            <div class="w-1/2 bg-white">
                <story />
            </div>
            <div class="w-1/2 dark bg-neutral-950">
                <story />
            </div>
        </div>`,
});
