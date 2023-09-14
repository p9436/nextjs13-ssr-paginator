# Next.js Server Side Rendering Paginator

A pagination component for Next.js applications that supports server-side rendering (SSR).

## Installation

Install the package using npm:

```bash
npm install nextjs-ssr-paginator
```

## Usage

To use the Paginator component in your Next.js application, follow these steps:

### Import the Paginator component:

```javascript
import Paginator from 'nextjs-ssr-paginator';
```

### Place the Paginator component in your Page:

```tsx
// page.tsx
import Paginator from "nexjs13-ssr-paginator";
import { getUsers } from "../lib/user.service";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const currentPage = parseInt(searchParams['page'] as string, 10) || 1
    const { data, meta } = await getUsers(currentPage)

    return (
        <div className="p-2">
            <h1 className="mb-2 font-bold">Pagination demo</h1>
            {data.map((user) => (
                <div key={user.id} className="py-2">
                    <div>{user.id} - {user.name} - {user.email}</div>
                </div>
            ))}

            <nav className="pt-6 text-sm">
                <Paginator path="/" params={searchParams} currentPage={currentPage} totalPages={meta.pagination.totalPages}/>
            </nav>
        </div>
    )
}
```

### Use the Pagination Helper on the server:

```typescript
// lib/user.service.ts
import { paginationHelper, prismaPaginationHelper } from "nextjs-ssr-paginator/pagination_helper"

const perPage = 5;

export async function getData(currentPage: number) {
    const prisma = new PrismaClient();
    const [recordsCount, result] = await prisma.$transaction([
        prisma.user.count({}),
        prisma.user.findMany({
            orderBy: { name: 'asc' },
            ...prismaPaginationHelper(currentPage, perPage)
        }),
    ]);
    return {
        meta: paginationHelper(recordsCount, currentPage, perPage),
        data: result as TUser[]
    }
}

```

Now, the Paginator will seamlessly integrate into your page:

![img.png](docs%2Fimg.png)

See the [example](examples%2Fnextjs) 

## Paginator properties
Here's an example with a comprehensive list of available properties:

```tsx
// const urlParams = { q: 'image', in: 'actions' } 
<Paginator
    path="/your-route"         // The base path for pagination links
    currentPage={1}            // The current active page number
    totalPages={10}            // The total number of pages
    params={ urlParams }       // (Optional) Url params, will be conwerted to /your-route?q=image&in=actions
    maxVisiblePages={5}        // (Optional) The maximum number of visible pages
    buttonLabelPrevious="Prev" // (Optional) Label for the "Prev" button
    buttonLabelNext="Next"     // (Optional) Label for the "Next" button
    styleClassWrapper="..."    // (Optional) CSS class for paginator wrapper element
    styleClassItem="..."       // (Optional) CSS class for general styling
    styleClassLeft="..."       // (Optional) CSS class for left buttons (e.g., Prev)
    styleClassRight="..."      // (Optional) CSS class for right buttons (e.g., Next)
    styleClassMiddle="..."     // (Optional) CSS class for middle buttons
    styleClassActive="..."     // (Optional) CSS class for active page number
    styleClassInactive="..."   // (Optional) CSS class for inactive page numbers
    styleClassDisabled="..."   // (Optional) CSS class for disabled buttons
/>
```

## Styling

While this component is primarily based on Tailwind CSS, you have 
the flexibility to customize the styling by redefining your own style 
classes for different elements.

For instance, to redefine the general styling, left buttons, and
right buttons, simply set the new class names for `styleClass*`
props accordingly, and define your own related CSS styles

```tsx
<Paginator styleClassWrapper="my-paginator" styleClassItem="p-item" otherOptions />
```

Another way to modify styles is to override existing CSS in your application:
```css
/* global.css */

/* Override pagination styles */
body {
    background: rgb(32,33,36);
    color: rgb(232,234,237);
}

ul.pagination .item {
    @apply border-amber-900;
}
ul.pagination .item-state-disable{
    @apply bg-gray-800 text-gray-500 !important;
}
ul.pagination .item-state-current {
    @apply bg-amber-950 !important;
}
ul.pagination .item-state-other {
    @apply bg-gray-600 text-amber-400 !important
}
```

## Props

- `path`: The base path for pagination links.
- `currentPage`: The current active page number.
- `totalPages`: The total number of pages.
- `params` (optional): URL params.
- `maxVisiblePages` (optional): The maximum number of visible pages (default: 5).
- `buttonLabelPrevious` (optional): Label for the "Previous" button (default: "Prev").
- `buttonLabelNext` (optional): Label for the "Next" button (default: "Next").
- `styleClassWrapper` (optional) CSS class for paginator wrapper element
- `styleClassItem` (optional): CSS class for general styling.
- `styleClassLeft` (optional): CSS class for left buttons (e.g., Prev).
- `styleClassRight` (optional): CSS class for right buttons (e.g., Next).
- `styleClassMiddle` (optional): CSS class for middle buttons.
- `styleClassActive` (optional): CSS class for active page number.
- `styleClassInactive` (optional): CSS class for inactive page numbers.
- `styleClassDisabled` (optional): CSS class for disabled buttons.

## License

This package is distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

If you encounter any issues or have questions, feel free to [open an issue](https://github.com/your-p9436/nextjs-ssr-paginator/issues) on the GitHub repository.
